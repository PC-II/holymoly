/* Cancel Button */
const uploadCancelButton = document.getElementById('upload-cancel');
uploadCancelButton.addEventListener('click', () => {
  window.history.back();
});

/* Select a File */
const fileInput = document.getElementById('file-input');
const previewImg = document.querySelector('.preview img');
const previewVid = document.querySelector('.preview video');
const errors = document.querySelector('.errors');
fileInput.addEventListener('change', () => {
  let file = fileInput.files[0];
  if(!file){
    return
  } else {
    console.log(file);
    if(file.type.includes('image')){
      console.log(`this file is an image!`);
      previewVid.src = '';
      previewImg.src = URL.createObjectURL(file);
    }
    if(file.type.includes('video')){
      console.log(`this file is a video!`);
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
    
  }
})