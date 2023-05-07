/* Firebase */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();

/* Setting Height */
window.addEventListener('load', () => {
  document.firstElementChild.style.height = (window.innerHeight - 2) + 'px';
  document.firstElementChild.lastElementChild.style.height = (window.innerHeight - 2) + 'px';
})

/* Menu Toggles */
const menuButton = document.querySelectorAll('.menu-button'),
  menu = document.querySelector('.menu');
menuButton.forEach(button => {
  button.addEventListener('click', () => {
    menu.classList.toggle('menu-toggle');
  });
});
const genreButton = document.querySelector('.genre-button'),
  genreList = document.querySelector('.genre-list');
genreButton.addEventListener('click', () => {
  genreList.classList.toggle('genre-list-toggle');
});

/* Log In | Sign Up */
const logInButton = document.querySelector('.log-in-button'),
  logInWindow = document.querySelector('.log-in-window');
logInButton.addEventListener('click', () => {
  logInWindow.showModal();
})
const signUpButton = document.querySelector('.sign-up a'),
  signUpWindow = document.querySelector('.sign-up-window');
signUpButton.addEventListener('click', () => {
  signUpWindow.showModal();
  logInWindow.firstElementChild.reset();
  if(showHidePW[0].classList.contains('bx-show')){
    showHidePW[0].classList.replace('bx-show', 'bx-hide');
    showHidePW[0].previousElementSibling.setAttribute('type', 'password');
  }
})
const backToLogIn = document.querySelector('.back-to-log-in');
backToLogIn.addEventListener('click', () => {
  signUpWindow.close();
  signUpWindow.firstElementChild.reset();
  if(showHidePW[1].classList.contains('bx-show')){
    showHidePW[1].classList.replace('bx-show', 'bx-hide');
    showHidePW[1].previousElementSibling.setAttribute('type', 'password');
  }
})
logInWindow.addEventListener("click", e => {
  const dialogDimensions = logInWindow.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
    ) {
    logInWindow.close();
    signUpWindow.close();
    logInWindow.firstElementChild.reset();
    signUpWindow.firstElementChild.reset();
    showHidePW.forEach(button => {
      if(button.classList.contains('bx-show')){
      button.classList.replace('bx-show', 'bx-hide');
      button.previousElementSibling.setAttribute('type', 'password');
      }
    })
  }
})
const showHidePW = document.querySelectorAll('.pass i');
showHidePW.forEach(button => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    if(input.getAttribute('type') == 'password'){
      button.classList.replace('bx-hide', 'bx-show');
      input.setAttribute('type', 'text');
    } else {
      button.classList.replace('bx-show', 'bx-hide');
      input.setAttribute('type', 'password');
    }
  });
});




/* Register Users */
document.cookie="SameSite=None; Secure;";
const auth = getAuth();
// connectAuthEmulator(auth, 'http://127.0.1.3000');
const signUpSubmit = document.getElementById('sign-up-submit');
signUpSubmit.addEventListener('click', (e) => {

  const email = document.getElementById('sign-up-email').value;
  const username = document.getElementById('sign-up-username').value;
  const password = document.getElementById('sign-up-password').value;
  const passConfirm = document.getElementById('sign-up-confirm').value;

  if(validateEmail(email) == false) {
    e.preventDefault();
    alert('email is invalid!');
    return;
  }
  if(validateUsername(username) == false) {
    e.preventDefault();
    alert('username is invalid!');
    return;
  }
  if(validatePassword(password) == false){
    e.preventDefault();
    alert('password is invalid!');
    return;
  }
  if(password != passConfirm){
    e.preventDefault();
    alert("passwords don't match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    // database
    const userRef = ref(db, `users/${user.uid}`);
    set(userRef, {
      email: email,
      username: username,
      rating: 0,
      last_login: Date.now(),
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    alert(errorMessage);
  });
});
function validateEmail(email) {
  const expression = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
  if(expression.test(email) == true){
    return true;
  }
  return false;
}
function validatePassword(password) {
  if(password.length < 6) {
    return false;
  }
  return true;
}
function validateUsername(username) {
  if(username == null || username.length <= 2) {
    return false;
  }
  return true;
}

/* Generating Posts */
// const storage = getStorage();
// const storageRef = ref(storage, 'images');



// document.getElementById('upload').addEventListener('change', () => {
//   const file = document.getElementById('upload').files[0];
//   const reader = new FileReader();
//   reader.addEventListener('load', () => {
//     var input = reader.result;
//     console.log(input);
//   })
//   reader.readAsDataURL(file);
// })


// function generatePicture(data, i){
//   let picturePost = 
//   `<div class="post ${i}">
//       <img src="./test-content/${data.name}" alt="" id="${data.type}">
//       <div class="comments-share">
//         <i class='bx bx-share' ></i>
//         <i class='bx bx-comment-dots' ></i>
//       </div>
//       <div class="info">
//         <div class="profile">
//           <img class="profile-pic" src="./test-content/alexander.jpeg"></img>
//           <span>${data.accountInfo}</span>
//         </div>
//         <div class="votes">
//           <i class='bx bxs-chevrons-down' id="down-down"></i>
//           <i class='bx bxs-chevron-down' id="down"></i>
//           <i class='bx bxs-chevron-up' id="up"></i>
//           <i class='bx bxs-chevrons-up' id="up-up"></i>
//         </div>
//         <div class="rating">
//           <i class='bx bx-trash' ></i>
//           <div class="bar disgrace"></div>
//           <div class="bar fame"></div>
//           <i class='bx bx-crown' ></i>
//         </div>
//       </div>
//     </div>`;
//   return picturePost;
// }
// function generateVideo(data, i){
//   let videoPost = 
//   `<div class="post ${i}"> 
//     <div class="media-container">
//     <i class='bx bx-volume-mute'></i>
//       <video src="./test-content/${data.name}" id="${data.type}" autoplay muted loop></video>
//     </div>
//     <div class="comments-share">
//       <i class='bx bx-share' ></i>
//       <i class='bx bx-comment-dots' ></i>
//     </div>
//     <div class="info">
//       <div class="profile">
//         <img class="profile-pic" src="./test-content/alexander.jpeg"></img>
//         <span>${data.accountInfo}</span>
//       </div>
//       <div class="votes">
//         <i class='bx bxs-chevrons-down' id="down-down"></i>
//         <i class='bx bxs-chevron-down' id="down"></i>
//         <i class='bx bxs-chevron-up' id="up"></i>
//         <i class='bx bxs-chevrons-up' id="up-up"></i>
//       </div>
//       <div class="rating">
//         <i class='bx bx-trash' ></i>
//         <div class="bar disgrace"></div>
//         <div class="bar fame"></div>
//         <i class='bx bx-crown' ></i>
//       </div>
//     </div>
//   </div>`;
//   return videoPost;
// }
// const container = document.querySelector('.container');
// function generatePosts(){
//   for(let i = 0; i < data.length; i++){
//     if(data[i].type == 'pic'){
//       container.insertAdjacentHTML('beforeend', generatePicture(data[i], i));
//     } else if(data[i].type == 'vid') {
//       container.insertAdjacentHTML('beforeend', generateVideo(data[i], i));
//     } else {
//       console.log('could not identify file type');
//     }
//   }
// }
// generatePosts();

/* Voting */
const voteBars = document.querySelectorAll('.votes');
voteBars.forEach(voteBar => {
  voteBar.querySelectorAll('i').forEach(voteButton => {
    voteButton.addEventListener('click', () => {
      let selected = voteBar.querySelector('.selected');
      if(!voteButton.classList.contains('selected')){
        if( selected != null ){
          selected.classList.remove('selected');
        } 
        voteButton.classList.add('selected');
      } else {
        voteButton.classList.remove('selected')
      }
    })
  })
})