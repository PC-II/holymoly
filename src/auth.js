import { app } from "./config";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
  signOut,
  updateProfile, 
  signInWithEmailAndPassword } from "firebase/auth";

import { ref, getDatabase, set, get, query, equalTo, limitToFirst, child, onValue } from "firebase/database";
import { getDefaultProfilePic } from "./storage"

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});

const db = getDatabase();

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
    const userCredentials = await createUserWithEmailAndPassword(auth, email.value.toUpperCase(), password.value);
    const user = userCredentials.user;
    const userRef = ref(db, `users/${user.uid}`);
    const usernamesRef = ref(db, `usernames/${username.value.toUpperCase()}`);

    if(user){
      logInWindow.close();
      signUpWindow.close();

      set(userRef, {
        username: username.value.toUpperCase(),
        email: email.value.toUpperCase(),
        posts: 0,
        rating: 0,
        last_login: Date.now(),
        profile_pic: await getDefaultProfilePic(),
      });
      set(usernamesRef, {email: email.value.toUpperCase()});

    } 

  }catch(err){
    console.log(err);
  }
});

/* UI Selection */
const userProfilePic = document.querySelector('.user-profile-pic');
const logInButton = document.querySelector('.log-in-button');
const userTitle = document.querySelector('.user-title');
onAuthStateChanged(auth, async user => {
  try{
    console.log(user);
    if(user){
      // userTitle.insertAdjacentText('afterbegin', `${user.displayName}`);
      // userProfilePic.setAttribute('src', `${user.photoURL}`);
      showHeader();
    }else{
      hideHeader();
    }
  }catch(err){
    console.error(err);
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

/* Log In */
const logInSubmit = document.getElementById('log-in-submit');
const logInUsername = document.getElementById('log-in-username');
const logInPass = document.getElementById('log-in-pass');
logInSubmit.addEventListener('click', async (e) => {
  try{
    if(!logInPass.checkValidity() || !logInUsername.checkValidity()) {
      return;
    }
    if(logInPass.value == '' || logInUsername.value == ''){
      return;
    }


    e.preventDefault();
    const email = await getEmail(logInUsername.value);
    if(email != null) {
      const userCredentials = await signInWithEmailAndPassword(auth, email, logInPass.value);
    } else {
      alert(`Error: ${logInUsername.value} does not exist!`);
    }






  }catch(err){
    console.error(err);
    alert(err);
  }
})
const getEmail = async (username) => {
  const usernamesRef = ref(db, `usernames/${username}`);
  const snapshot = await get(query(usernamesRef), limitToFirst(1));
  if(snapshot.exists()){
    return snapshot.val().email;
  } else {
    return null;
  }
}