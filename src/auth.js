import { app } from "./config";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
  signOut } from "firebase/auth";

import { ref, getDatabase, set, onValue } from "firebase/database";
const db = getDatabase(app);

console.log('`hello`');

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
    if(!usernameAvailable(username.value)){
      e.preventDefault();
      alert(`${username.value} is already taken!`);
      username.value = '';
      return;
    }
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

    if(user){
      try{
        await set(userRef, {
          username: username.value,
          email: email.value,
          posts: 0,
          rating: 0,
          last_login: Date.now(),
        });
        logInWindow.close();
        signUpWindow.close();
      }catch(e){
        console.log(e);
      }
    } 
  }catch(err){
    console.log(err);
  }
})


// const usernameRef = ref(db, `usernames/${user.uid}`);
// const userRef = ref(db, `users/${user.uid}`);

// async () => {
//   try{
//     await set(usernameRef, {
//       username: 'PC II',
//     })
//   }catch(err){
//     console.log(err);
//   }
// }



// usernameAvailable('PC II');

function usernameAvailable(username){
  onValue(usernameRef, (snapshot) => {
    console.log(`snapshot: ${snapshot.val()}\nentered username: ${username}`);
  })
  return true;
}

const userProfilePic = document.querySelector('.user-profile-pic');
const logInButton = document.querySelector('.log-in-button');
const userTitle = document.querySelector('.user-title');
onAuthStateChanged(auth, user => {
  if(user){
    showHeader();
  }else{
    hideHeader();
  }
})
function showHeader() {
  userProfilePic.classList.remove('hidden');
  logInButton.classList.add('hidden');
  userTitle.insertAdjacentText('afterbegin',`${auth.currentUser.displayName}`);
}
function hideHeader(){
  userProfilePic.classList.add('hidden');
  logInButton.classList.remove('hidden');
}