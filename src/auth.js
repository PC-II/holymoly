import { app } from "./config";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
  signOut,
  updateProfile } from "firebase/auth";

import { ref, getDatabase, set } from "firebase/database";
import { getDefaultProfilePic } from "./storage"

const db = getDatabase(app);
const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});

const signUpSubmit = document.getElementById('sign-up-submit');
const email = document.getElementById('sign-up-email');
const username = document.getElementById('sign-up-username');
const password = document.getElementById('sign-up-password');
const confirm = document.getElementById('sign-up-confirm');
const logInWindow = document.querySelector('.log-in-window');
const signUpWindow = document.querySelector('.sign-up-window');

/* Register New User */
signUpSubmit.addEventListener('click', async (e) => {
  try{
    if(!email.checkValidity() || !username.checkValidity() || !password.checkValidity() || !confirm.checkValidity()){
      return;
    }
    if(password.value != confirm.value){
      e.preventDefault();
      alert('Passwords do not match');
      return;
    }
    if(password.value.length < 6){
      e.preventDefault();
      alert('Password must be at least 6 characters');
      return;
    }
    e.preventDefault();
    const userCredentials = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredentials.user;
    const userRef = ref(db, `users/${user.uid}`);
    const usernameRef = ref(db, `usernames/${user.uid}`);

    if(user){
      logInWindow.close();
      signUpWindow.close();
      
      // try{
      //   await updateProfile(user, {
      //     displayName: username.value,
      //     photoURL: await getDefaultProfilePic(),
      //   })
      // }catch(err){
      //   console.error(err);
      // }

      set(userRef, {
        username: username.value,
        email: email.value,
        posts: 0,
        rating: 0,
        last_login: Date.now(),
        profile_pic: await getDefaultProfilePic(),
      });
      set(usernameRef, {
        username: username.value,
      });
    } 
  }catch(err){
    console.log(err);
  }
})

/* UI Selection */
const userProfilePic = document.querySelector('.user-profile-pic');
const logInButton = document.querySelector('.log-in-button');
const userTitle = document.querySelector('.user-title');
onAuthStateChanged(auth, user => {
  if(user){
    userTitle.insertAdjacentText('afterbegin', `${user.displayName}`);
    userProfilePic.setAttribute('src', `${user.photoURL}`);
    console.log(user);
    showHeader();
  }else{
    hideHeader();
  }
})
function showHeader() {
  userProfilePic.classList.remove('hidden');
  logInButton.classList.add('hidden');
}
function hideHeader(){
  userProfilePic.classList.add('hidden');
  logInButton.classList.remove('hidden');
}