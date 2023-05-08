import { app } from "./config";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, connectAuthEmulator, signOut } from "firebase/auth";
import { ref, getDatabase, set } from "firebase/database";

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});

const db = getDatabase(app);

const signUpSubmit = document.getElementById('sign-up-submit');
const email = document.getElementById('sign-up-email');
const username = document.getElementById('sign-up-username');
const password = document.getElementById('sign-up-password');
const confirm = document.getElementById('sign-up-confirm');
const logInWindow = document.querySelector('.log-in-window');
const signUpWindow = document.querySelector('.sign-up-window');

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
    const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
    
    user.displayName = username.value;
    const userRef = ref(db, `users/${user.uid}`);
    set(userRef, {
      username: user.displayName,
      email: user.email,
      posts: 0,
      rating: 0,
    })

  }catch(err){
    console.log(err);
  }
})




onAuthStateChanged(auth, user => {
  if(user){
    console.log(user);
    alert(`you're logged in as ${user.displayName} (uid: ${user.uid}, email: ${user.email})`);
    logInWindow.close();
    signUpWindow.close();
  }else{
    alert(`you're not logged in`);
  }
})

