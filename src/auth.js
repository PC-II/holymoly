import { app } from "./config";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
  signOut,
  updateProfile, 
  signInWithEmailAndPassword } from "firebase/auth";
import { 
  ref,
  getDatabase,
  set,
  get,
  connectDatabaseEmulator } from "firebase/database";
import { getDefaultProfilePic } from "./storage";
import { validEmail, validUsername, validPassword, validConfirmPass, validentry, validEntry } from "./validators";

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});

const db = getDatabase();
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
const signUpInputs = signUpWindow.querySelectorAll('input');
signUpInputs.forEach(input => {
  input.addEventListener('focusout', () => {
    var inputErrs = validEntry(input.value, input.id, signUpPassword.value);
    if(inputErrs.length > 0){
      if(input.id === 'sign-up-email'){
        errMessages[0] = inputErrs;
      } else if (input.id === 'sign-up-username'){
        errMessages[1] = inputErrs;
      } else if (input.id === 'sign-up-password'){
        errMessages[2] = inputErrs;
      } else {  // validate matching password
        errMessages[3] = inputErrs;
      }
      input.style.border = `2px solid var(--warning)`;
    } else {
      input.style.border = `2px solid green`;
    }

    if(errMessages.length > 0){
      showErrorBox();
      showErrors(errMessages.flat());
    } else {
      hideErrorBox();
      console.log(`${input.id} valid`);
    }
  });
});
const showErrorBox = () => {
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
const showErrors = (errors) => {  // work on this !!!!!
  errors.forEach(error => {
    console.log(error);
  })
}

/* Register New User */
signUpSubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  // Validate Entries
  // var errMessages = [];
  // var emailErrs = validEmail(signUpEmail.value);
  // if(emailErrs.length > 0){
  //   emailErrs.forEach(message => {
  //     errMessages.push(message);
  //   });
  // }
  // var usernameErrs = validUsername(signUpUsername.value);
  // if(usernameErrs.length > 0){
  //   usernameErrs.forEach(message => {
  //     errMessages.push(message);
  //   });
  // }
  // var passwordErrs = validPassword(signUpPassword.value);
  // if(passwordErrs.length > 0){
  //   passwordErrs.forEach(message => {
  //     errMessages.push(message);
  //   });
  // }
  // var confirmPassErrs = validConfirmPass(signUpConfirmPass.value, signUpPassword.value);
  // if(confirmPassErrs.length > 0){
  //   confirmPassErrs.forEach(message => {
  //     errMessages.push(message);
  //   });
  // }


  // // Compress errors into a single error list
  // if(errMessages.length > 0){
  //   showErrors(errMessages);
  // } else {
  //   console.log('successful submission!');
  // }

  // if(errMessages.length > 0){
  //   console.log(`not valid`);
  // } else {
  //   console.log(`valid`);
  // }

  
  // else {
  //   try{
  //     const userCredentials = await createUserWithEmailAndPassword(auth, signUpEmail.value.toUpperCase(), signUpPassword.value);
  //     const user = userCredentials.user;
  //     const userRef = ref(db, `users/${user.uid}`);
  //     const usernameRef = ref(db, `usernames/${signUpUsername.value.toUpperCase()}`);
  //     const defaultProfilePic = await getDefaultProfilePic();
      
  //     if(user){
  //       const set1 = set(userRef, {
  //         username: signUpUsername.value.toUpperCase(),
  //         email: signUpEmail.value.toUpperCase(),
  //         posts: 0,
  //         rating: 0,
  //         last_login: Date.now(),
  //         profile_pic: defaultProfilePic,
  //       });
  //       const set2 = set(usernameRef, {email: signUpEmail.value.toUpperCase()});
  //       const set3 = updateProfile(user, {
  //         displayName: signUpUsername.value.toUpperCase(),
  //         photoURL: defaultProfilePic,
  //       })
  //       await Promise.allSettled([set1, set2, set3]);
  //       overhead.insertAdjacentHTML('beforeend', `
  //         <h1 class="user-title">${user.displayName}</h1>
  //       `)
  //       userProfilePic.setAttribute('src', user.photoURL);
  
  //       logInWindow.close();
  //       signUpWindow.close();
  //       return;
  //     } 
  //   }catch(err){
  //     console.error(err);
  //   }
  // }
});


/* Log In */
const logInSubmit = document.getElementById('log-in-submit');
const logInUsername = document.getElementById('log-in-username');
const logInPass = document.getElementById('log-in-pass');
logInSubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  try{
    const logInEmail = await getEmail(logInUsername.value.toUpperCase());
    if(logInEmail != null) {
      const userCredentials = await signInWithEmailAndPassword(auth, logInEmail, logInPass.value);
      
      
      logInWindow.close();
    } else {

      // pass this to the error log
      // alert(`Error: ${logInUsername.value} does not exist!`);
    }
    return null;
  }catch(err){
    console.error(err);
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

/* Log Out */
const logOutConfirm = document.getElementById('log-out-confirm');
logOutConfirm.addEventListener('click', async () => {
  try{
    await signOut(auth);
    location.reload();
    return;
  }catch(err){
    console.error(err);
  }
})

/* Update on Value change */

/* UI Selection */
const userProfilePic = document.querySelector('.user-profile-pic');
const logInButton = document.querySelector('.log-in-button');
const userTitle = document.querySelector('.user-title');
const overhead = document.querySelector('.overhead');
const logOutButton = document.querySelector('.log-out-button');
onAuthStateChanged(auth, user => {
  if(user){
    if(user.displayName != null && userTitle == null){
      // user title
      overhead.insertAdjacentHTML('beforeend', `
        <h1 class="user-title">${user.displayName}</h1>
      `);
      // user profile pic
      userProfilePic.setAttribute('src', user.photoURL);
    }
    showHeader();
    logOutButton.classList.add('show-log-out-button');
  }else{
    hideHeader();
    logOutButton.classList.remove('show-log-out-button');
    if(userTitle != null){
      userTitle.remove();
    }
  }
});
function showHeader() {
  userProfilePic.classList.remove('hidden');
  logInButton.classList.add('hidden');
}
function hideHeader(){
  userProfilePic.classList.add('hidden');
  logInButton.classList.remove('hidden');
}