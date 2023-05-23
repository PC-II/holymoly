import { app } from "./config";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
  signOut,
  updateProfile, 
  signInWithEmailAndPassword } from "firebase/auth";

import { ref, getDatabase, set, get, connectDatabaseEmulator, child, onValue } from "firebase/database";
import { getDefaultProfilePic } from "./storage"

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});

const db = getDatabase();
connectDatabaseEmulator(db, "localhost", 9000);
const dbRef = ref(db);

const signUpSubmit = document.getElementById('sign-up-submit');
const signUpEmail = document.getElementById('sign-up-email');
const signUpUsername = document.getElementById('sign-up-username');
const signUpPassword = document.getElementById('sign-up-password');
const signUpConfirmPass = document.getElementById('sign-up-confirm');
const logInWindow = document.querySelector('.log-in-window');
const signUpWindow = document.querySelector('.sign-up-window');


/* Register New User */
signUpSubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  // // Validate Entry Fields
  // if(password.value != confirm.value){
  //   e.preventDefault();
  //   alert('Passwords do not match');
  //   return;
  // }
  // if(password.value.length < 6){
  //   e.preventDefault();
  //   alert('Password must be at least 6 characters');
  //   return;
  // }

  try{
    const userCredentials = await createUserWithEmailAndPassword(auth, signUpEmail.value.toUpperCase(), signUpPassword.value);
    const user = userCredentials.user;
    const userRef = ref(db, `users/${user.uid}`);
    const usernameRef = ref(db, `usernames/${signUpUsername.value.toUpperCase()}`);
    const defaultProfilePic = await getDefaultProfilePic();
    
    if(user){
      const set1 = set(userRef, {
        username: signUpUsername.value.toUpperCase(),
        email: signUpEmail.value.toUpperCase(),
        posts: 0,
        rating: 0,
        last_login: Date.now(),
        profile_pic: defaultProfilePic,
      });
      const set2 = set(usernameRef, {email: signUpEmail.value.toUpperCase()});
      const set3 = updateProfile(user, {
        displayName: signUpUsername.value.toUpperCase(),
        photoURL: defaultProfilePic,
      })
      logInWindow.close();
      signUpWindow.close();
      await Promise.allSettled([set1, set2, set3]);

      overhead.insertAdjacentHTML('beforeend', `
        <h1 class="user-title">${user.displayName}</h1>
      `)
      userProfilePic.setAttribute('src', user.photoURL);

      return;
    } 
  }catch(err){
    console.log(err);
  }
});

/* Log In */
const logInSubmit = document.getElementById('log-in-submit');
const logInUsername = document.getElementById('log-in-username');
const logInPass = document.getElementById('log-in-pass');
logInSubmit.addEventListener('click', async (e) => {
  e.preventDefault();

  // Check Validity
  
  try{
    const logInEmail = await getEmail(logInUsername.value.toUpperCase());
    if(logInEmail != null) {
      const userCredentials = await signInWithEmailAndPassword(auth, logInEmail, logInPass.value);
      
      
      logInWindow.close();
    } else {
      alert(`Error: ${logInUsername.value} does not exist!`);
    }
    return null;
  }catch(err){
    console.error(err);
    alert(err);
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
// const getUsername = async (uid) => {
//   const snapshot = await get(child(dbRef, `users/${uid}`));
//   return snapshot.val().username
// }
// const getProfilePic = async (uid) => {
//   const snapshot = await get(child(dbRef, `users/${uid}`));
//   return snapshot.val().profile_pic;
// }

/* Error Message */
// const inputFields = document.querySelectorAll('form input');
// inputFields.forEach(inputField => {
//   inputField.addEventListener('focusout', () => {
//     if(inputField.value == ''){
//       inputField.insertAdjacentHTML('afterbegin', `
//       <p class="error-message"><i class='bx bx-error-circle'></i>This field is still empty!</p>
//       `);
//     }
//   })
// })

// /* Check Form Validity*/
// const validLogUsername = (username) => {

// }
// const validLogPass = (pass) => {

// }
// const validSignEmail = (email) => {

// }
// const validSignUsername = (username) => {

// }
// const validSignPassword = (pass) => {

// }
// const validSignConfirmPass = (passConfirm) => {

// }


/* <p class="error-message"><i class='bx bx-error-circle'></i>this is an error message!</p> */
