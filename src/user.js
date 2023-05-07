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