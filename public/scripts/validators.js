/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/validators.js":
/*!***************************!*\
  !*** ./src/validators.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validConfirmPass\": () => (/* binding */ validConfirmPass),\n/* harmony export */   \"validEmail\": () => (/* binding */ validEmail),\n/* harmony export */   \"validEntry\": () => (/* binding */ validEntry),\n/* harmony export */   \"validPassword\": () => (/* binding */ validPassword),\n/* harmony export */   \"validUsername\": () => (/* binding */ validUsername)\n/* harmony export */ });\nvar errors = [];\r\n\r\nconst validEmail = (email) => {\r\n  errors = [];\r\n  if(email === ''){\r\n    errors.push(`📧 Email: Can't be blank`);\r\n  } else if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])/.test(email)){\r\n    errors.push(`📧 Email: Invalid format`);\r\n  }\r\n  return errors;\r\n}\r\n\r\nconst validUsername = (username) => {\r\n  errors = [];\r\n  if(username === ''){\r\n    errors.push(`👤 Username: Can't be blank`);\r\n  } else {\r\n    if(/^_|_$/.test(username)){\r\n      errors.push(`👤 Username: Can't start or end with underscore`);\r\n    }\r\n    if(/\\W/.test(username)){\r\n      errors.push(`👤 Username: Can only have:\\nA-Z a-z 0-9 _`);\r\n    }\r\n    if(username.length < 3 || username.length > 20){\r\n      errors.push(`👤 Username: Must be 3-20 characters long`);\r\n    }\r\n  }\r\n  return errors;\r\n}\r\n\r\nconst validPassword = (password) => {\r\n  errors = [];\r\n  if(password === ''){\r\n    errors.push(`🔑 Password: Can't be blank`);\r\n  } else if(/^(.)\\1*$/.test(password)){\r\n    errors.push(`🔑 Change your password. Change all of your passwords if you think that was a good password... 🤨`);\r\n  } else {\r\n    if(password.length < 6){\r\n      errors.push(`🔑 Password: Needs at least 6 characters`);\r\n    }\r\n    if(/^[^a-z]*$/.test(password)){\r\n      errors.push(`🔑 Password: Needs a lowercase letter a-z`);\r\n    }\r\n    if(/^[^A-Z]*$/.test(password)){\r\n      errors.push(`🔑 Password: Needs an uppercase letter A-Z`);\r\n    }\r\n    if(/^\\D*$/.test(password)){\r\n      errors.push(`🔑 Password: Needs a number 0-9`);\r\n    }\r\n    if(/^[^!-/:-@[-`{-~]*$/.test(password)){\r\n      errors.push(`🔑 Password: Needs a special character (~ : ? < | _ etc.)`);\r\n    }\r\n  }\r\n  return errors;\r\n}\r\n\r\nconst validConfirmPass = (confirmPass, password) => {\r\n  errors = [];\r\n  if(confirmPass === '') {\r\n    errors.push(`🔐 Confirm Pass: Can't be blank`);\r\n  } else if(confirmPass !== password){\r\n      errors.push(`🔑🔐 Passwords don't match`);\r\n  }\r\n  return errors;\r\n}\r\n\r\nconst validEntry = (entry, inputId, password) => {\r\n  if(inputId === 'sign-up-email'){\r\n    return validEmail(entry);\r\n  } else if(inputId === 'sign-up-username'){\r\n    return validUsername(entry);\r\n  } else if(inputId === 'sign-up-password'){\r\n    return validPassword(entry);\r\n  } else {\r\n    return validConfirmPass(entry, password);\r\n  }\r\n}\n\n//# sourceURL=webpack://holymolyv2/./src/validators.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/validators.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;