/* Firebase */
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
const auth = getAuth();
const db = getDatabase();

/* Testing Server Side */
// document.cookie = "SameSite=None;Secure";
// alert( document.cookie );

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
// window.register = () => {
//   const email = document.getElementById('sign-up-email').value;
//   const username = document.getElementById('sign-up-username').value;
//   const password = document.getElementById('sign-up-password').value;
//   const passConfirm = document.getElementById('sign-up-confirm').value;

//   // CHECK FOR USERNAME AND PASSWORD VALIDATION HERE

//   createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
    
//     // database
//     const userRef = ref(db, `users/${user.uid}`);
//     set(userRef, {
//       email: email,
//       username: username,
//     })
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
    
//     alert(errorMessage);
//   });
// }

/* Generating Posts */
var data = [
  {
    'type': 'vid',
    'id': 'v1',
    'name': 'clip1.mp4',
    'accountInfo': 'Emptyabyss',
    'rating': 3,
  },
  {
    'type': 'pic',
    'id': 'v4',
    'name': 'wallie.jpg',
    'accountInfo': 'Niteside',
    'rating': 3,
  },
  {
    'type': 'pic',
    'id': 'p1',
    'name': 'cat.jpg',
    'accountInfo': 'Brohto',
    'rating': 4,
  },
  {
    'type': 'vid',
    'id': 'v2',
    'name': 'clip2.mp4',
    'accountInfo': 'Johnny_Sins',
    'rating': 2,
  },
  {
    'type': 'pic',
    'id': 'p2',
    'name': 'pen.jpg',
    'accountInfo': 'Fool_Tilt',
    'rating': 5,
  },
  {
    'type': 'vid',
    'id': 'p3',
    'name': 'trim.B33BDA6F-7C21-424D-A414-0C394ABC1F2A.mov',
    'accountInfo': 'MonseNite09',
    'rating': 3,
  },
  {
    'type': 'vid',
    'id': 'v3',
    'name': 'clip1.mp4',
    'accountInfo': 'IIRivasII',
    'rating': 4,
  },
  {
    'type': 'vid',
    'id': 'v3',
    'name': 'clip3.mp4',
    'accountInfo': 'PC II',
    'rating': 4,
  },
  {
    'type': 'pic',
    'id': 'p4',
    'name': 'alexander.jpeg',
    'accountInfo': 'nrop___',
    'rating': 4,
  },
];
function generatePicture(data, i){
  let picturePost = 
  `<div class="post ${i}">
      <img src="./test-content/${data.name}" alt="" id="${data.type}">
      <div class="comments-share">
        <i class='bx bx-share' ></i>
        <i class='bx bx-comment-dots' ></i>
      </div>
      <div class="info">
        <div class="profile">
          <img class="profile-pic" src="./test-content/alexander.jpeg"></img>
          <span>${data.accountInfo}</span>
        </div>
        <div class="votes">
          <i class='bx bxs-chevrons-down' id="down-down"></i>
          <i class='bx bxs-chevron-down' id="down"></i>
          <i class='bx bxs-chevron-up' id="up"></i>
          <i class='bx bxs-chevrons-up' id="up-up"></i>
        </div>
        <div class="rating">
          <i class='bx bx-trash' ></i>
          <div class="bar disgrace"></div>
          <div class="bar fame"></div>
          <i class='bx bx-crown' ></i>
        </div>
      </div>
    </div>`;
  return picturePost;
}
function generateVideo(data, i){
  let videoPost = 
  `<div class="post ${i}"> 
    <div class="media-container">
    <i class='bx bx-volume-mute'></i>
      <video src="./test-content/${data.name}" id="${data.type}" autoplay muted loop></video>
    </div>
    <div class="comments-share">
      <i class='bx bx-share' ></i>
      <i class='bx bx-comment-dots' ></i>
    </div>
    <div class="info">
      <div class="profile">
        <img class="profile-pic" src="./test-content/alexander.jpeg"></img>
        <span>${data.accountInfo}</span>
      </div>
      <div class="votes">
        <i class='bx bxs-chevrons-down' id="down-down"></i>
        <i class='bx bxs-chevron-down' id="down"></i>
        <i class='bx bxs-chevron-up' id="up"></i>
        <i class='bx bxs-chevrons-up' id="up-up"></i>
      </div>
      <div class="rating">
        <i class='bx bx-trash' ></i>
        <div class="bar disgrace"></div>
        <div class="bar fame"></div>
        <i class='bx bx-crown' ></i>
      </div>
    </div>
  </div>`;
  return videoPost;
}
const container = document.querySelector('.container');
function generatePosts(){
  for(let i = 0; i < data.length; i++){
    if(data[i].type == 'pic'){
      container.insertAdjacentHTML('beforeend', generatePicture(data[i], i));
    } else if(data[i].type == 'vid') {
      container.insertAdjacentHTML('beforeend', generateVideo(data[i], i));
    } else {
      console.log('could not identify file type');
    }
  }
}
generatePosts();

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