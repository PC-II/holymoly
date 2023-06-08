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

/***/ "./src/make_a_post.js":
/*!****************************!*\
  !*** ./src/make_a_post.js ***!
  \****************************/
/***/ (() => {

eval("/* Cancel Button */\r\nconst uploadCancelButton = document.getElementById('upload-cancel');\r\nuploadCancelButton.addEventListener('click', () => {\r\n  window.history.back();\r\n});\r\n\r\n/* Select a File */\r\nconst fileInput = document.getElementById('file-input');\r\nconst previewImg = document.querySelector('.preview img');\r\nconst previewVid = document.querySelector('.preview video');\r\nconst errors = document.querySelector('.errors');\r\nfileInput.addEventListener('change', () => {\r\n  let file = fileInput.files[0];\r\n  if(!file){\r\n    return\r\n  } else {\r\n    console.log(file);\r\n    if(file.type.includes('image')){\r\n      console.log(`this file is an image!`);\r\n      previewVid.src = '';\r\n      previewImg.src = URL.createObjectURL(file);\r\n    }\r\n    if(file.type.includes('video')){\r\n      console.log(`this file is a video!`);\r\n      if(file.size > 200000000){\r\n        console.log(`this file is too big!`);\r\n        if(previewVid.hasAttribute('autoplay')){\r\n          previewVid.toggleAttribute('autoplay');\r\n        }\r\n        if(!previewVid.classList.contains('darken')){\r\n          previewVid.classList.toggle('darken');\r\n        }\r\n        if(previewVid.hasAttribute('controls')){\r\n          previewVid.toggleAttribute('controls');\r\n        }\r\n        errors.textContent = 'File must be less than 200MB';\r\n      } else {\r\n        if(!previewVid.hasAttribute('autoplay')){\r\n          previewVid.toggleAttribute('autoplay');\r\n        }\r\n        if(previewVid.classList.contains('darken')){\r\n          previewVid.classList.toggle('darken');\r\n        }\r\n        if(!previewVid.hasAttribute('controls')){\r\n          previewVid.toggleAttribute('controls');\r\n        }\r\n        errors.textContent = '';\r\n      }\r\n      previewImg.src = '';\r\n      previewVid.src = URL.createObjectURL(file);\r\n    }\r\n    \r\n  }\r\n})\n\n//# sourceURL=webpack://holymolyv2/./src/make_a_post.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/make_a_post.js"]();
/******/ 	
/******/ })()
;