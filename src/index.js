/* Loading */
document.onreadystatechange = () => {
  if(document.readyState === 'complete'){
    document.body.removeChild(document.querySelector('.load-screen'));
  }
}

/* Setting Height */
window.addEventListener('load', () => {
  document.firstElementChild.style.height = (window.innerHeight - 2) + 'px';
  document.firstElementChild.lastElementChild.style.height = (window.innerHeight - 2) + 'px';
})

/* Main Menu */
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

/* Log In Menu | Sign Up Menu */
const logInButton = document.querySelector('.log-in-button'),
  logInWindow = document.querySelector('.log-in-window');
logInButton.addEventListener('click', () => {
  logInWindow.showModal();
});
const signUpButton = document.querySelector('.sign-up a'),
  signUpWindow = document.querySelector('.sign-up-window');
signUpButton.addEventListener('click', () => {
  logInWindow.querySelectorAll('form input').forEach(input => {
    input.style.border = 'unset';
  });
  signUpWindow.showModal();
  logInWindow.firstElementChild.reset();
});
const backToLogIn = document.querySelector('.back-to-log-in');
backToLogIn.addEventListener('click', () => {
  signUpWindow.querySelectorAll('form input').forEach(input => {
    input.style.border = 'unset';
  });
  signUpWindow.close();
  signUpWindow.firstElementChild.reset();
});
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
    document.querySelectorAll('form input').forEach(input => {
      input.style.border = 'unset';
    });
  }
});

/* Log Out Menu */
const logOutButtons = document.querySelectorAll('#log-out-toggle');
const logOutContainer = document.querySelector('.log-out-container');
logOutButtons.forEach(button => {
  button.addEventListener('click', () => {
    logOutContainer.classList.toggle('show-log-out-menu');
  })
})

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