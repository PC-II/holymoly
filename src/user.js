import { auth, db } from "./config";
import { connectAuthEmulator, onAuthStateChanged } from "firebase/auth";
import { connectDatabaseEmulator } from "firebase/database";

connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});
connectDatabaseEmulator(db, "localhost", 9000);

onAuthStateChanged(auth, user => {
  if(user){
    document.querySelector('.header h1').textContent = user.displayName;
    document.querySelector('.profile-pic img').setAttribute('src', user.photoURL);
  } else {
    console.log(`not signed in`);
  }
})

/* Setting Height */
window.addEventListener('load', () => {
  document.firstElementChild.style.height = (window.innerHeight - 2) + 'px';
  document.firstElementChild.lastElementChild.style.height = (window.innerHeight - 2) + 'px';
})

const header = document.querySelector('.header');
const infoButton = document.querySelector('.info-button');
window.expand = () => {
  if(infoButton.textContent == '> More Info'){
    header.style.height = '250px';
    infoButton.textContent = '^ Less Info';
  } else {
    header.style.height = '160px';
    infoButton.textContent = '> More Info';
  }
}

const viewButtons = document.querySelectorAll('.action-bar div');
const selector = document.querySelector('.selector');
viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(button.className == 'up-votes'){
      selector.style.left = '72.69%';
    } else {
      selector.style.left = '22%';
    }
  })
})

