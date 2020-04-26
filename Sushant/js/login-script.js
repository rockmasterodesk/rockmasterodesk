/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/login-script.js":
/*!*****************************!*\
  !*** ./src/login-script.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var $ = window.jQuery;\n$(document).ready(function () {\n  $(document).ready(function () {\n    $RegisterLink = '#RegisterLink';\n    $LoginLink = '#LoginLink';\n    $GuestLink = '#GuestLink';\n    $Register_form = '.register-form';\n    $Login_form = '.login-form';\n    $Guest_form = '.guest-form'; // Hide others, Show Register Form\n\n    $(document).on('click', $RegisterLink, function (e) {\n      e.preventDefault();\n      $($Login_form).hide();\n      $($Guest_form).hide();\n      $($Register_form).show();\n    }); // Hide others, Show Login Form\n\n    $(document).on('click', $LoginLink, function (e) {\n      e.preventDefault();\n      $($Register_form).hide();\n      $($Guest_form).hide();\n      $($Login_form).show();\n    }); // Hide others, Show Guest Form\n\n    $(document).on('click', $GuestLink, function (e) {\n      e.preventDefault();\n      $($Register_form).hide();\n      $($Login_form).hide();\n      $($Guest_form).show();\n    });\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbG9naW4tc2NyaXB0LmpzPzA5ZGUiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCIkUmVnaXN0ZXJMaW5rIiwiJExvZ2luTGluayIsIiRHdWVzdExpbmsiLCIkUmVnaXN0ZXJfZm9ybSIsIiRMb2dpbl9mb3JtIiwiJEd1ZXN0X2Zvcm0iLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImhpZGUiLCJzaG93Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBZjtBQUVBRixDQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVU7QUFDMUJKLEdBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUMxQkMsaUJBQWEsR0FBRyxlQUFoQjtBQUNBQyxjQUFVLEdBQUcsWUFBYjtBQUNBQyxjQUFVLEdBQUcsWUFBYjtBQUVBQyxrQkFBYyxHQUFHLGdCQUFqQjtBQUNBQyxlQUFXLEdBQUcsYUFBZDtBQUNBQyxlQUFXLEdBQUcsYUFBZCxDQVAwQixDQVMxQjs7QUFDQVYsS0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWVEsRUFBWixDQUFlLE9BQWYsRUFBd0JOLGFBQXhCLEVBQXVDLFVBQVNPLENBQVQsRUFBVztBQUNoREEsT0FBQyxDQUFDQyxjQUFGO0FBQ0FiLE9BQUMsQ0FBQ1MsV0FBRCxDQUFELENBQWVLLElBQWY7QUFDQWQsT0FBQyxDQUFDVSxXQUFELENBQUQsQ0FBZUksSUFBZjtBQUNBZCxPQUFDLENBQUNRLGNBQUQsQ0FBRCxDQUFrQk8sSUFBbEI7QUFDRCxLQUxELEVBVjBCLENBaUIxQjs7QUFDQWYsS0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWVEsRUFBWixDQUFlLE9BQWYsRUFBd0JMLFVBQXhCLEVBQW9DLFVBQVNNLENBQVQsRUFBVztBQUM3Q0EsT0FBQyxDQUFDQyxjQUFGO0FBQ0FiLE9BQUMsQ0FBQ1EsY0FBRCxDQUFELENBQWtCTSxJQUFsQjtBQUNBZCxPQUFDLENBQUNVLFdBQUQsQ0FBRCxDQUFlSSxJQUFmO0FBQ0FkLE9BQUMsQ0FBQ1MsV0FBRCxDQUFELENBQWVNLElBQWY7QUFDRCxLQUxELEVBbEIwQixDQXlCMUI7O0FBQ0FmLEtBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlRLEVBQVosQ0FBZSxPQUFmLEVBQXdCSixVQUF4QixFQUFvQyxVQUFTSyxDQUFULEVBQVc7QUFDN0NBLE9BQUMsQ0FBQ0MsY0FBRjtBQUNBYixPQUFDLENBQUNRLGNBQUQsQ0FBRCxDQUFrQk0sSUFBbEI7QUFDQWQsT0FBQyxDQUFDUyxXQUFELENBQUQsQ0FBZUssSUFBZjtBQUNBZCxPQUFDLENBQUNVLFdBQUQsQ0FBRCxDQUFlSyxJQUFmO0FBQ0QsS0FMRDtBQU1ELEdBaENEO0FBaUNELENBbENEIiwiZmlsZSI6Ii4vc3JjL2xvZ2luLXNjcmlwdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICRSZWdpc3RlckxpbmsgPSAnI1JlZ2lzdGVyTGluayc7XHJcbiAgICAkTG9naW5MaW5rID0gJyNMb2dpbkxpbmsnO1xyXG4gICAgJEd1ZXN0TGluayA9ICcjR3Vlc3RMaW5rJztcclxuXHJcbiAgICAkUmVnaXN0ZXJfZm9ybSA9ICcucmVnaXN0ZXItZm9ybSc7XHJcbiAgICAkTG9naW5fZm9ybSA9ICcubG9naW4tZm9ybSc7XHJcbiAgICAkR3Vlc3RfZm9ybSA9ICcuZ3Vlc3QtZm9ybSc7XHJcblxyXG4gICAgLy8gSGlkZSBvdGhlcnMsIFNob3cgUmVnaXN0ZXIgRm9ybVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJFJlZ2lzdGVyTGluaywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgJCgkTG9naW5fZm9ybSkuaGlkZSgpO1xyXG4gICAgICAkKCRHdWVzdF9mb3JtKS5oaWRlKCk7XHJcbiAgICAgICQoJFJlZ2lzdGVyX2Zvcm0pLnNob3coKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhpZGUgb3RoZXJzLCBTaG93IExvZ2luIEZvcm1cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICRMb2dpbkxpbmssIGZ1bmN0aW9uKGUpe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICQoJFJlZ2lzdGVyX2Zvcm0pLmhpZGUoKTtcclxuICAgICAgJCgkR3Vlc3RfZm9ybSkuaGlkZSgpO1xyXG4gICAgICAkKCRMb2dpbl9mb3JtKS5zaG93KCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgLy8gSGlkZSBvdGhlcnMsIFNob3cgR3Vlc3QgRm9ybVxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJEd1ZXN0TGluaywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgJCgkUmVnaXN0ZXJfZm9ybSkuaGlkZSgpO1xyXG4gICAgICAkKCRMb2dpbl9mb3JtKS5oaWRlKCk7XHJcbiAgICAgICQoJEd1ZXN0X2Zvcm0pLnNob3coKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/login-script.js\n");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuc2Nzcz9jNzU0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Ii4vc3JjL3N0eWxlLnNjc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/style.scss\n");

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/login-script.js ./src/style.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Programming\Upwork\sushant\src\login-script.js */"./src/login-script.js");
module.exports = __webpack_require__(/*! D:\Programming\Upwork\sushant\src\style.scss */"./src/style.scss");


/***/ })

/******/ });