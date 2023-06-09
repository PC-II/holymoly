import { auth, storage } from './config'
import { connectStorageEmulator, ref, uploadBytesResumable } from 'firebase/storage'
import { connectAuthEmulator } from 'firebase/auth';

connectAuthEmulator(auth, "http://localhost:9099", {disableWarnings: true});
connectStorageEmulator(storage, "localhost", 9199);

/* Cancel Button */
const uploadCancelButton = document.getElementById('upload-cancel');
uploadCancelButton.addEventListener('click', () => {
  window.history.back();
});

/* Select a File */
const fileInput = document.getElementById('file-input');
const previewImg = document.querySelector('.preview img');
const previewVid = document.querySelector('.preview video');
const previewMessages = document.querySelectorAll('.preview i, .preview p');
const errors = document.querySelector('.errors');
fileInput.addEventListener('change', () => {
  let file = fileInput.files[0];
  if(!file){
    return;
  }
  previewMessages.forEach(message => {
    message.setAttribute('style', 'opacity:0');
  })
  if(file.type.includes('image')){
    if(previewVid.hasAttribute('controls')){
      previewVid.toggleAttribute('controls');
    }
    previewVid.src = '';
    previewImg.src = URL.createObjectURL(file);
  }
  if(file.type.includes('video')){
    if(file.size > 200000000){
      console.log(`this file is too big!`);
      if(previewVid.hasAttribute('autoplay')){
        previewVid.toggleAttribute('autoplay');
      }
      if(!previewVid.classList.contains('darken')){
        previewVid.classList.toggle('darken');
      }
      if(previewVid.hasAttribute('controls')){
        previewVid.toggleAttribute('controls');
      }
      errors.textContent = 'File must be less than 200MB';
    } else {
      if(!previewVid.hasAttribute('autoplay')){
        previewVid.toggleAttribute('autoplay');
      }
      if(previewVid.classList.contains('darken')){
        previewVid.classList.toggle('darken');
      }
      if(!previewVid.hasAttribute('controls')){
        previewVid.toggleAttribute('controls');
      }
      errors.textContent = '';
    }
    previewImg.src = '';
    previewVid.src = URL.createObjectURL(file);
  }
});

/* Uploading | Storing Post */
const submitButton = document.getElementById('upload-submit');
const uploadProgress = document.querySelector('.upload-progress')
submitButton.addEventListener('click', async () => {
  let file = fileInput.files[0];
  if(!file || auth.currentUser == null || file.size > 200000000){
    return;
  }
  const blob = URL.createObjectURL(file);
  const tail = blob.slice(blob.lastIndexOf('/'));  
  const userStorage = ref(storage, `users/${auth.currentUser.uid}`);
  if(file.type.includes('image')){
    const imageRef = ref(userStorage, `images${tail}`);
    var upload = uploadBytesResumable(imageRef, file); // may be better to use uploadBytesResumable to track upload progress
  }
  if(file.type.includes('video')){
    const videoRef = ref(userStorage, `videos${tail}`);
    var upload = uploadBytesResumable(videoRef, file);
  }

  document.querySelector('.upload-buttons').setAttribute('style', 'display:none');
  document.querySelector('.select-img label').setAttribute('style', 'display:none');
  
  uploadProgress.setAttribute('style', 'opacity:1');
  upload.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    document.querySelector('.upload-progress span').setAttribute('style', `width:${progress}%`);
    if(progress == 100){
      const done = document.createElement('h1');
      done.textContent = 'Done!';
      uploadProgress.insertAdjacentElement('afterend', done);
      setTimeout(() => {
        window.location = './user.html';
      }, 350);
    }
  });
});
