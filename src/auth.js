import { app, auth, db } from "./config";
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
  signOut,
  updateProfile, 
  signInWithEmailAndPassword, 
} from "firebase/auth";
import { 
  ref,
  set,
  get,
  connectDatabaseEmulator,
  query, 
  orderByChild,
  equalTo
} from "firebase/database";
import { getDefaultProfilePic } from "./storage";
import {
  validEmail,
  validUsername,
  validPassword,
  validConfirmPass,
  validEntry 
} from "./validators";

connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});
connectDatabaseEmulator(db, "localhost", 9000);

const signUpSubmit = document.getElementById('sign-up-submit');
const signUpEmail = document.getElementById('sign-up-email');
const signUpUsername = document.getElementById('sign-up-username');
const signUpPassword = document.getElementById('sign-up-password');
const signUpConfirmPass = document.getElementById('sign-up-confirm');
const logInWindow = document.querySelector('.log-in-window');
const signUpWindow = document.querySelector('.sign-up-window');

/* Dynamic Validity Check for Sign Up */
var errMessages = [];
var usernameAvail = true;
var emailAvail = true;
const errorBox = document.querySelector('.error-box');
const signUpInputs = signUpWindow.querySelectorAll('input');
signUpInputs.forEach(input => {
  input.addEventListener('focusout', () => {
    errorBox.innerHTML = '';
    var inputErrs = validEntry(input.value, input.id, signUpPassword.value);
    if(input.id === 'sign-up-email'){
      errMessages[0] = inputErrs;
    } else if (input.id === 'sign-up-username'){
      errMessages[1] = inputErrs;
    } else if (input.id === 'sign-up-password'){
      errMessages[2] = inputErrs;
    } else {  // validate matching password
      errMessages[3] = inputErrs;
    }

    if(inputErrs.length > 0){
      input.style.border = `2px solid var(--warning)`;
    } else {
      input.style.border = `2px solid green`;
    }

    if(!emailAvail && input.id === 'sign-up-email'){
      errMessages[0] = [`📧 Email: Not Available`];
      input.style.border = `2px solid var(--warning)`;
    }
    if(!usernameAvail && input.id === 'sign-up-username'){
      errMessages[1] = [`👤 Username: Not available`];
      input.style.border = `2px solid var(--warning)`;
    }

    if(errMessages.flat().length > 0){
      showErrorBox();
      showErrors(errMessages.flat(), errorBox);
    } else {
      hideErrorBox();
    }
  });
});
const showErrorBox = () => {
  errorBox.style.border = `2px solid var(--warning)`;
  signUpWindow.lastElementChild.style.display = `block`;
  signUpWindow.style.height = `500px`;
  signUpWindow.firstElementChild.style.height = `50%`;
  signUpWindow.firstElementChild.style.top = `10px`;
}
const hideErrorBox = () => {
  signUpWindow.lastElementChild.style.display = `none`;
  signUpWindow.style.height = `400px`;
  signUpWindow.firstElementChild.style.height = `70%`;
  signUpWindow.firstElementChild.style.top = `40px`;
}
const showErrors = (errors, box) => {
  errors.forEach(error => {
    var message = document.createElement('p');
    message.textContent = error;
    box.appendChild(message);
  })
}

/* Register New User */
signUpSubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  // Validate Entries
  errMessages = [];
  errorBox.innerHTML = '';
  errorBox.style.border = `none`;
  var emailErrs = validEmail(signUpEmail.value);
  if(emailErrs.length > 0){
    errMessages[0] = emailErrs;
    signUpEmail.style.border = `2px solid var(--warning)`;
  } else{
    if(!(await checkEmailAvail(signUpEmail.value))){
      errMessages[0] = [`📧 Email: Not Available`];
      signUpEmail.style.border = `2px solid var(--warning)`;
      emailAvail = false;
    } else {
      emailAvail = true;
      signUpEmail.style.border = `2px solid green`;
    }
  }
  var usernameErrs = validUsername(signUpUsername.value);
  if(usernameErrs.length > 0){
    errMessages[1] = usernameErrs;
    signUpUsername.style.border = `2px solid var(--warning)`;
  } else{ 
    if(!(await checkUsernameAvail(signUpUsername.value))){
    errMessages[1] = [`👤 Username: Not available`];
    signUpUsername.style.border = `2px solid var(--warning)`;
    usernameAvail = false;
    } else {
      usernameAvail = true;
      signUpUsername.style.border = `2px solid green`;
    }
  }
  var passwordErrs = validPassword(signUpPassword.value);
  if(passwordErrs.length > 0){
    errMessages[2] = passwordErrs;
    signUpPassword.style.border = `2px solid var(--warning)`;
  }
  var confirmPassErrs = validConfirmPass(signUpConfirmPass.value, signUpPassword.value);
  if(confirmPassErrs.length > 0){
    errMessages[3] = confirmPassErrs;
    signUpConfirmPass.style.border = `2px solid var(--warning)`;
  }

  // last check for errors
  if(errMessages.flat().length > 0){
    showErrorBox();
    showErrors(errMessages.flat(), errorBox);
    shake(errorBox);
  } else {
    try{
      const userCredentials = await createUserWithEmailAndPassword(auth, signUpEmail.value.toUpperCase(), signUpPassword.value);
      const user = userCredentials.user;

      // email verification?
      // await sendEmailVerification(user);
      // console.log(`the email was sent successfully!`);

      // Might move this to be after email verification
      const userRef = ref(db, `users/${user.uid}`);
      const usernameRef = ref(db, `usernames/${signUpUsername.value.toUpperCase()}`);
      const defaultProfilePic = await getDefaultProfilePic();

      // successfully created an account
      if(user){
        const set1 = set(userRef, {
          username: signUpUsername.value.toUpperCase(),
          email: signUpEmail.value.toUpperCase(),
          posts: 0,
          rating: 0,
          last_login: Date(),
          profile_pic: defaultProfilePic,
        });
        const set2 = set(usernameRef, {email: signUpEmail.value.toUpperCase()});
        const set3 = updateProfile(user, {
          displayName: signUpUsername.value.toUpperCase(),
          photoURL: defaultProfilePic,
        })
        await Promise.allSettled([set1, set2, set3]);
        userTitle.textContent = user.displayName;
        userProfilePic.setAttribute('src', user.photoURL);
        logInWindow.close();
        signUpWindow.close();
      }
    }catch(err){
      console.error(err);
    }
  }
});
const checkEmailAvail = async (email) => {
  const usernamesRef = ref(db, `usernames`);
  const snapshot = await get(query(usernamesRef, orderByChild('email'), equalTo(email.toUpperCase())));
  if(snapshot.exists()){
    return false;
  } else {
    return true;
  }
}
const checkUsernameAvail = async (username) => {
  const usernameRef = ref(db, `usernames/${username.toUpperCase()}`);
  const snapshot = await get(usernameRef);
  if(snapshot.exists()){
    return false;
  } else {
    return true;
  }
}
const shake = (element) => {
  setTimeout(() => {
    element.classList.add('shake');
  }, 150);
  element.classList.remove('shake');
}
              
/* Log In */
const logInSubmit = document.getElementById('log-in-submit');
const logInUsername = document.getElementById('log-in-username');
const logInPass = document.getElementById('log-in-pass');
const logInErrorBox = document.querySelector('.log-in-error-box');
var logInErrorMessages = [];
logInSubmit.addEventListener('click', async (e) => {
  e.preventDefault();
  logInErrorBox.innerHTML = '';
  logInErrorMessages = [];
  logInErrorBox.style.border = `none`;
  
  // Check for Errors
  const logInEmail = await getEmail(logInUsername.value.toUpperCase());
  if(logInUsername.value === ''){
    logInErrorMessages.push(`👤 Username: Can't be blank`);
  } else if(logInEmail == null) {
    logInErrorMessages.push(`👤 ${logInUsername.value} does not exist`);
  } else {
    logInUsername.style.border = `none`;
  }
  if(logInPass.value === ''){
    logInErrorMessages.push(`🔑 Password: Can't be blank`);
  } else {
    logInPass.style.border = `none`;
  }

  if(logInErrorMessages.length > 0){
    showLogInErrorBox();
    showErrors(logInErrorMessages, logInErrorBox);
    shake(logInErrorBox);
  } else {
    hideLogInErrorBox();
    try{
      const userCredentials = await signInWithEmailAndPassword(auth, logInEmail, logInPass.value);
      const user = userCredentials.user;
      logInWindow.close();
      
      const loginRef = ref(db, `users/${user.uid}/last_login`);
      await set(loginRef, Date());

    }catch(err){
      console.error(err);
      showLogInErrorBox();
      showErrors([`👤🔑 Username or password is incorrect`], logInErrorBox);
      shake(logInErrorBox);
    }
  }
})
const getEmail = async (username) => {
  const usernameRef = ref(db, `usernames/${username}`);
  const snapshot = await get(usernameRef);
  if(snapshot.exists()){
    return snapshot.val().email;
  } else {
    return;
  }
}
const showLogInErrorBox = () => {
  logInErrorBox.style.border = `2px solid var(--warning)`;
  logInWindow.lastElementChild.style.display = `block`;
  logInWindow.firstElementChild.style.height = `60%`;
  logInWindow.firstElementChild.style.top = `10px`;
}
const hideLogInErrorBox = () => {
  logInWindow.lastElementChild.style.display = `none`;
  logInWindow.style.height = `300px`;
  logInWindow.firstElementChild.style.height = `70%`;
  logInWindow.firstElementChild.style.top = `30px`;
}

/* UI Selection */
const userProfilePic = document.querySelector('.user-profile-pic');
const logInButton = document.querySelector('.log-in-button');
const userTitle = document.querySelector('.user-title');
const overhead = document.querySelector('.overhead');
onAuthStateChanged(auth, user => {
  if(user){
    console.log(user.displayName);
    if(user.displayName != null){
      userTitle.textContent = user.displayName;
      userProfilePic.setAttribute('src', user.photoURL);
    }
    userProfilePic.addEventListener('load', () => {showLoggedIn()}, {once: true});
  }else{
    showLoggedOut();
  }
});
function showLoggedIn() {
  userTitle.classList.remove('hidden');
  userProfilePicContainer.classList.remove('hidden');
  logInButton.classList.add('hidden');
}
function showLoggedOut(){
  userProfilePicContainer.classList.add('hidden');
  logInButton.classList.remove('hidden');
  userTitle.textContent = ``;
}

/* Userpage Icon Button */
const userProfilePicContainer = document.querySelector('.user-profile-pic-container');
userProfilePic.addEventListener('click', () => {
  const user = auth.currentUser;
  if(user){
    window.location = `user.html?${user.displayName}`;
  } else {
    console.error(`Missing or insufficient permissions`);
  }
});