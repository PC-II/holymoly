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




const pullUpMenu = document.querySelector('.pull-up-menu');
pullUpMenu.addEventListener('click', () => {
 console.log("hello") 
})