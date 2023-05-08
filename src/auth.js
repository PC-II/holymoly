import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator, signOut } from "firebase/auth";
import { ref, getDatabase, set } from "firebase/database";
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
    var user = userCredentials.user
    user.displayName = username.value;

    const userRef = ref(db, `users/${user.uid}`);
    set(userRef, {
      username: user.displayName,
      email: user.email,
      posts: 0,
      rating: 0,
      last_login: Date.now(),
    })
    logInWindow.close();
    signUpWindow.close();
  }catch(err){
    console.log(err);
  }
})

const userProfilePic = document.querySelector('.user-profile-pic');
const logInButton = document.querySelector('.log-in-button');


onAuthStateChanged(auth, user => {
  if(user){
    userProfilePic.classList.remove('hidden');
    logInButton.classList.add('hidden');
  }else{
    userProfilePic.classList.add('hidden');
    logInButton.classList.remove('hidden');
  }
})

