import { auth, db } from "./config";
import { connectAuthEmulator, onAuthStateChanged, signOut } from "firebase/auth";
import { connectDatabaseEmulator, ref, set } from "firebase/database";
import { generateMyPosts } from "./storage";

connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});
connectDatabaseEmulator(db, "localhost", 9000);

/* Check if User is Signed in Before Anything */
const previewMyPosts = document.querySelector('.preview-my-posts');
onAuthStateChanged(auth, async user => {
  if(user){
    document.querySelector('.load-screen').remove(); // move to bottom when finished


    document.title = user.displayName;
    document.querySelector('.header h1').textContent = user.displayName;
    document.querySelector('.profile-pic img').setAttribute('src', user.photoURL);
    
    // Generate User Posts
    await generateMyPosts(user.uid);


  } else {
    window.location=`index.html`;
  }
})

/* Setting Height */
window.addEventListener('load', () => {
  document.firstElementChild.style.height = (window.innerHeight - 2) + 'px';
  document.firstElementChild.lastElementChild.style.height = (window.innerHeight - 2) + 'px';
})

/* Action Bar Selection */
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

/* Back to Top Button */
const container = document.querySelector('.container');
const actionBar = document.querySelector('.action-bar');
const backToTopButton = document.getElementById('back-to-top');
container.addEventListener('scroll', () => {
  if(actionBar.getBoundingClientRect().top === 0 && backToTopButton.style.bottom !== 0){
    backToTopButton.style.bottom = `0`;
  } else {
    backToTopButton.style.bottom = `-100%`;
  }
});
backToTopButton.addEventListener('click', () => {
  container.scrollTop = 0;
})

/* Toggle Menu */
const menu = document.querySelector('.menu');
const toggleMenuButtons = document.querySelectorAll('.menu-button');
toggleMenuButtons.forEach(button => {
  button.addEventListener('click', () => {
    menu.classList.toggle('show-menu');
  })
})

/* Toggle Genre List */
const genreButton = document.querySelector('.genre-button');
const genreList = document.getElementById('genre-list');
genreButton.addEventListener('click', () => {
  genreList.classList.toggle('show-genre-list');
});

/* Log Out Menu */
const logOutButtons = document.querySelectorAll('#log-out-toggle');
const logOutContainer = document.querySelector('.log-out-container');
logOutButtons.forEach(button => {
  button.addEventListener('click', () => {
    logOutContainer.classList.toggle('show-log-out-menu');
  })
})

/* Log Out */
const logOutConfirm = document.getElementById('log-out-confirm');
logOutConfirm.addEventListener('click', async () => {
  try{
    const logoutRef = ref(db, `users/${auth.currentUser.uid}/last_logout`);
    await set(logoutRef, Date());
    await signOut(auth);
  }catch(err){
    console.error(err);
  }
});

/* Make a Post */
const postButton = document.querySelector('.make-a-post');
postButton.addEventListener('click',() => {
  window.location.href = `./make_a_post.html`;
});
