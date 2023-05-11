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

/***/ "./src/user.js":
/*!*********************!*\
  !*** ./src/user.js ***!
  \*********************/
/***/ (() => {

eval("/* Setting Height */\r\nwindow.addEventListener('load', () => {\r\n  document.firstElementChild.style.height = (window.innerHeight - 2) + 'px';\r\n  document.firstElementChild.lastElementChild.style.height = (window.innerHeight - 2) + 'px';\r\n})\r\n\r\nconst header = document.querySelector('.header');\r\nconst infoButton = document.querySelector('.info-button');\r\nwindow.expand = () => {\r\n  if(infoButton.textContent == '> More Info'){\r\n    header.style.height = '250px';\r\n    infoButton.textContent = '^ Less Info';\r\n  } else {\r\n    header.style.height = '160px';\r\n    infoButton.textContent = '> More Info';\r\n  }\r\n}\r\n\r\nconst viewButtons = document.querySelectorAll('.action-bar div');\r\nconst selector = document.querySelector('.selector');\r\nviewButtons.forEach(button => {\r\n  button.addEventListener('click', () => {\r\n    if(button.className == 'up-votes'){\r\n      selector.style.left = '72.69%';\r\n    } else {\r\n      selector.style.left = '22%';\r\n    }\r\n  })\r\n})\r\n\r\n\r\n\r\n\r\nconst pullUpMenu = document.querySelector('.pull-up-menu');\r\npullUpMenu.addEventListener('click', () => {\r\n console.log(\"hello\") \r\n})\n\n//# sourceURL=webpack://holymolyv2/./src/user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/user.js"]();
/******/ 	
/******/ })()
;