/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("/* Loading */\r\ndocument.onreadystatechange = () => {\r\n  if(document.readyState !== 'complete'){\r\n    \r\n  }\r\n}\r\n\r\n/* Setting Height */\r\nwindow.addEventListener('load', () => {\r\n  document.firstElementChild.style.height = (window.innerHeight - 2) + 'px';\r\n  document.firstElementChild.lastElementChild.style.height = (window.innerHeight - 2) + 'px';\r\n})\r\n\r\n/* Menu Toggles */\r\nconst menuButton = document.querySelectorAll('.menu-button'),\r\n  menu = document.querySelector('.menu');\r\nmenuButton.forEach(button => {\r\n  button.addEventListener('click', () => {\r\n    menu.classList.toggle('menu-toggle');\r\n  });\r\n});\r\nconst genreButton = document.querySelector('.genre-button'),\r\n  genreList = document.querySelector('.genre-list');\r\ngenreButton.addEventListener('click', () => {\r\n  genreList.classList.toggle('genre-list-toggle');\r\n});\r\n\r\n/* Log In | Sign Up */\r\nconst logInButton = document.querySelector('.log-in-button'),\r\n  logInWindow = document.querySelector('.log-in-window');\r\nlogInButton.addEventListener('click', () => {\r\n  logInWindow.showModal();\r\n})\r\nconst signUpButton = document.querySelector('.sign-up a'),\r\n  signUpWindow = document.querySelector('.sign-up-window');\r\nsignUpButton.addEventListener('click', () => {\r\n  signUpWindow.showModal();\r\n  logInWindow.firstElementChild.reset();\r\n})\r\nconst backToLogIn = document.querySelector('.back-to-log-in');\r\nbackToLogIn.addEventListener('click', () => {\r\n  signUpWindow.close();\r\n  signUpWindow.firstElementChild.reset();\r\n})\r\nlogInWindow.addEventListener(\"click\", e => {\r\n  const dialogDimensions = logInWindow.getBoundingClientRect()\r\n  if (\r\n    e.clientX < dialogDimensions.left ||\r\n    e.clientX > dialogDimensions.right ||\r\n    e.clientY < dialogDimensions.top ||\r\n    e.clientY > dialogDimensions.bottom\r\n    ) {\r\n    logInWindow.close();\r\n    signUpWindow.close();\r\n    logInWindow.firstElementChild.reset();\r\n    signUpWindow.firstElementChild.reset();\r\n  }\r\n})\r\n\r\n/* Generating Posts */\r\n// const storage = getStorage();\r\n// const storageRef = ref(storage, 'images');\r\n\r\n\r\n// document.getElementById('upload').addEventListener('change', () => {\r\n//   const file = document.getElementById('upload').files[0];\r\n//   const reader = new FileReader();\r\n//   reader.addEventListener('load', () => {\r\n//     var input = reader.result;\r\n//     console.log(input);\r\n//   })\r\n//   reader.readAsDataURL(file);\r\n// })\r\n\r\n\r\n// function generatePicture(data, i){\r\n//   let picturePost = \r\n//   `<div class=\"post ${i}\">\r\n//       <img src=\"./test-content/${data.name}\" alt=\"\" id=\"${data.type}\">\r\n//       <div class=\"comments-share\">\r\n//         <i class='bx bx-share' ></i>\r\n//         <i class='bx bx-comment-dots' ></i>\r\n//       </div>\r\n//       <div class=\"info\">\r\n//         <div class=\"profile\">\r\n//           <img class=\"profile-pic\" src=\"./test-content/alexander.jpeg\"></img>\r\n//           <span>${data.accountInfo}</span>\r\n//         </div>\r\n//         <div class=\"votes\">\r\n//           <i class='bx bxs-chevrons-down' id=\"down-down\"></i>\r\n//           <i class='bx bxs-chevron-down' id=\"down\"></i>\r\n//           <i class='bx bxs-chevron-up' id=\"up\"></i>\r\n//           <i class='bx bxs-chevrons-up' id=\"up-up\"></i>\r\n//         </div>\r\n//         <div class=\"rating\">\r\n//           <i class='bx bx-trash' ></i>\r\n//           <div class=\"bar disgrace\"></div>\r\n//           <div class=\"bar fame\"></div>\r\n//           <i class='bx bx-crown' ></i>\r\n//         </div>\r\n//       </div>\r\n//     </div>`;\r\n//   return picturePost;\r\n// }\r\n// function generateVideo(data, i){\r\n//   let videoPost = \r\n//   `<div class=\"post ${i}\"> \r\n//     <div class=\"media-container\">\r\n//     <i class='bx bx-volume-mute'></i>\r\n//       <video src=\"./test-content/${data.name}\" id=\"${data.type}\" autoplay muted loop></video>\r\n//     </div>\r\n//     <div class=\"comments-share\">\r\n//       <i class='bx bx-share' ></i>\r\n//       <i class='bx bx-comment-dots' ></i>\r\n//     </div>\r\n//     <div class=\"info\">\r\n//       <div class=\"profile\">\r\n//         <img class=\"profile-pic\" src=\"./test-content/alexander.jpeg\"></img>\r\n//         <span>${data.accountInfo}</span>\r\n//       </div>\r\n//       <div class=\"votes\">\r\n//         <i class='bx bxs-chevrons-down' id=\"down-down\"></i>\r\n//         <i class='bx bxs-chevron-down' id=\"down\"></i>\r\n//         <i class='bx bxs-chevron-up' id=\"up\"></i>\r\n//         <i class='bx bxs-chevrons-up' id=\"up-up\"></i>\r\n//       </div>\r\n//       <div class=\"rating\">\r\n//         <i class='bx bx-trash' ></i>\r\n//         <div class=\"bar disgrace\"></div>\r\n//         <div class=\"bar fame\"></div>\r\n//         <i class='bx bx-crown' ></i>\r\n//       </div>\r\n//     </div>\r\n//   </div>`;\r\n//   return videoPost;\r\n// }\r\n// const container = document.querySelector('.container');\r\n// function generatePosts(){\r\n//   for(let i = 0; i < data.length; i++){\r\n//     if(data[i].type == 'pic'){\r\n//       container.insertAdjacentHTML('beforeend', generatePicture(data[i], i));\r\n//     } else if(data[i].type == 'vid') {\r\n//       container.insertAdjacentHTML('beforeend', generateVideo(data[i], i));\r\n//     } else {\r\n//       console.log('could not identify file type');\r\n//     }\r\n//   }\r\n// }\r\n// generatePosts();\r\n\r\n/* Voting */\r\nconst voteBars = document.querySelectorAll('.votes');\r\nvoteBars.forEach(voteBar => {\r\n  voteBar.querySelectorAll('i').forEach(voteButton => {\r\n    voteButton.addEventListener('click', () => {\r\n      let selected = voteBar.querySelector('.selected');\r\n      if(!voteButton.classList.contains('selected')){\r\n        if( selected != null ){\r\n          selected.classList.remove('selected');\r\n        } \r\n        voteButton.classList.add('selected');\r\n      } else {\r\n        voteButton.classList.remove('selected')\r\n      }\r\n    })\r\n  })\r\n})\r\n\r\n\n\n//# sourceURL=webpack://holymolyv2/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;