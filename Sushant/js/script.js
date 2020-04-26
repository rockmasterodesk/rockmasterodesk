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

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var $ = window.jQuery;\n$(document).ready(function () {\n  // Scrolls\n  $('#Conversations').niceScroll({});\n  $('#MessagesContainer').niceScroll({}); // Top Right Search Icon\n\n  $(document).on('click', \"#searchIcon\", function () {\n    $(\"#searchForm\").toggle();\n  }); // Search Button\n\n  $(document).on('click', \"#searchButton\", function (e) {\n    e.preventDefault();\n    $(this).parent().parent().find('.search-results').toggle();\n  }); // Search Input -> show results div on focus\n\n  $(document).on('focus', \"#searchInput\", function () {\n    $(this).parent().find('.search-results').show();\n  });\n  $(document).mouseup(function (e) {\n    var container = $(\".search-results\");\n    var input = $(\"#searchInput\"); // if the target of the click isn't the container nor a descendant of the container\n\n    if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) {\n      container.hide();\n    }\n  }); // Profile Tooltip\n\n  window.shouldHidePopup = true;\n  window.shouldShowPopup = true; // Take some time to show the popup\n\n  $(document).on('mouseenter', '[popover-profileInfo]', function (e) {\n    $this = $(this);\n    window.shouldShowPopup = true; // It will show the popup\n\n    setTimeout(function () {\n      if (!window.shouldShowPopup) // the mouse has left, abort the popup\n        return;\n      $pid = $this.attr('popover-profileInfo'); // console.log($pid);\n      // Do anything with the user id\n      // This is the place where we'll update the person details inside the div\n\n      $tooltip = $('#profile-tooltip'); // Show the popup\n\n      Popper.createPopper($this[0], $tooltip[0], {\n        placement: 'bottom-start'\n      }); // $tooltip.html('<p>Loading...</p>');\n\n      $tooltip.show();\n    }, 100);\n  });\n  $(document).on('mouseleave', '[popover-profileInfo]', function (e) {\n    // Mouse has left, set show variable to false\n    window.shouldShowPopup = false;\n    setTimeout(function () {\n      // If the popup is visible, hide it\n      hidePopupNow();\n    }, 100);\n  });\n  $(document).on('mouseenter', '#profile-tooltip', function (e) {\n    // Mouse is inside the tooltip, don't hide it now\n    window.shouldHidePopup = false;\n  });\n  $(document).on('mouseleave', '#profile-tooltip', function (e) {\n    window.shouldHidePopup = true;\n    hidePopupNow();\n  });\n\n  function hidePopupNow() {\n    if (window.shouldHidePopup) $('#profile-tooltip').hide();\n  } // Click ProfileInfo\n\n\n  $(document).on('click', '[click-profileInfo]', function (e) {\n    $this = $(this);\n    window.shouldShowPopup = true; // It will show the popup\n    // Get the User ID\n\n    $pid = $this.attr('click-profileInfo'); // console.log($pid);\n    // Do anything with the user id\n    // This is the place where we'll update the person details inside the div\n\n    $tooltip = $('#click-tooltip'); // Show the popup\n\n    Popper.createPopper($this[0], $tooltip[0], {\n      placement: 'right'\n    }); // $tooltip.html('<p>Loading...</p>');\n\n    $tooltip.show();\n  });\n  $(document).mouseup(function (e) {\n    var container = $(\"#click-tooltip\");\n    var input = $(\"[click-profileInfo]\"); // if the target of the click isn't the container nor a descendant of the container\n\n    if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) {\n      container.hide();\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0LmpzPzY4YjAiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJuaWNlU2Nyb2xsIiwib24iLCJ0b2dnbGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJmaW5kIiwic2hvdyIsIm1vdXNldXAiLCJjb250YWluZXIiLCJpbnB1dCIsImlzIiwidGFyZ2V0IiwiaGFzIiwibGVuZ3RoIiwiaGlkZSIsInNob3VsZEhpZGVQb3B1cCIsInNob3VsZFNob3dQb3B1cCIsIiR0aGlzIiwic2V0VGltZW91dCIsIiRwaWQiLCJhdHRyIiwiJHRvb2x0aXAiLCJQb3BwZXIiLCJjcmVhdGVQb3BwZXIiLCJwbGFjZW1lbnQiLCJoaWRlUG9wdXBOb3ciXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxNQUFmO0FBRUFGLENBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlDLEtBQVosQ0FBa0IsWUFBVTtBQUMzQjtBQUNBSixHQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQkssVUFBcEIsQ0FBK0IsRUFBL0I7QUFFQUwsR0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0JLLFVBQXhCLENBQW1DLEVBQW5DLEVBSjJCLENBUTNCOztBQUNBTCxHQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixhQUF4QixFQUF1QyxZQUFVO0FBQ2hETixLQUFDLENBQUMsYUFBRCxDQUFELENBQWlCTyxNQUFqQjtBQUNBLEdBRkQsRUFUMkIsQ0FhM0I7O0FBQ0FQLEdBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGVBQXhCLEVBQXlDLFVBQVNFLENBQVQsRUFBVztBQUNuREEsS0FBQyxDQUFDQyxjQUFGO0FBQ0FULEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVUsTUFBUixHQUFpQkEsTUFBakIsR0FBMEJDLElB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O0FBVUEsQ0F0SEQiLCJmaWxlIjoiLi9zcmMvc2NyaXB0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0ICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHQvLyBTY3JvbGxzXHJcblx0JCgnI0NvbnZlcnNhdGlvbnMnKS5uaWNlU2Nyb2xsKHtcclxuXHR9KTtcclxuXHQkKCcjTWVzc2FnZXNDb250YWluZXInKS5uaWNlU2Nyb2xsKHtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8vIFRvcCBSaWdodCBTZWFyY2ggSWNvblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI3NlYXJjaEljb25cIiwgZnVuY3Rpb24oKXtcclxuXHRcdCQoXCIjc2VhcmNoRm9ybVwiKS50b2dnbGUoKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2VhcmNoIEJ1dHRvblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI3NlYXJjaEJ1dHRvblwiLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnNlYXJjaC1yZXN1bHRzJykudG9nZ2xlKCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFNlYXJjaCBJbnB1dCAtPiBzaG93IHJlc3VsdHMgZGl2IG9uIGZvY3VzXHJcblx0JChkb2N1bWVudCkub24oJ2ZvY3VzJywgXCIjc2VhcmNoSW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykucGFyZW50KCkuZmluZCgnLnNlYXJjaC1yZXN1bHRzJykuc2hvdygpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gJChcIi5zZWFyY2gtcmVzdWx0c1wiKTtcclxuXHRcdFx0dmFyIGlucHV0ID0gJChcIiNzZWFyY2hJbnB1dFwiKTtcclxuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcclxuXHRcdFx0aWYgKCFjb250YWluZXIuaXMoZS50YXJnZXQpICYmICFpbnB1dC5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gUHJvZmlsZSBUb29sdGlwXHJcblx0d2luZG93LnNob3VsZEhpZGVQb3B1cCA9IHRydWU7XHJcblx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IHRydWU7IC8vIFRha2Ugc29tZSB0aW1lIHRvIHNob3cgdGhlIHBvcHVwXHJcblx0JChkb2N1bWVudCkub24oJ21vdXNlZW50ZXInLCAnW3BvcG92ZXItcHJvZmlsZUluZm9dJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IHRydWU7IC8vIEl0IHdpbGwgc2hvdyB0aGUgcG9wdXBcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGlmICghd2luZG93LnNob3VsZFNob3dQb3B1cCkgLy8gdGhlIG1vdXNlIGhhcyBsZWZ0LCBhYm9ydCB0aGUgcG9wdXBcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0XHRcdFx0JHBpZCA9ICR0aGlzLmF0dHIoJ3BvcG92ZXItcHJvZmlsZUluZm8nKTtcclxuXHRcdFx0XHRcdC8vIGNvbnNvbGUubG9nKCRwaWQpO1xyXG5cdFx0XHRcdFx0Ly8gRG8gYW55dGhpbmcgd2l0aCB0aGUgdXNlciBpZFxyXG5cdFx0XHRcdFx0Ly8gVGhpcyBpcyB0aGUgcGxhY2Ugd2hlcmUgd2UnbGwgdXBkYXRlIHRoZSBwZXJzb24gZGV0YWlscyBpbnNpZGUgdGhlIGRpdlxyXG5cclxuXHRcdFx0XHRcdCR0b29sdGlwID0gJCgnI3Byb2ZpbGUtdG9vbHRpcCcpO1xyXG5cclxuXHRcdFx0XHRcdC8vIFNob3cgdGhlIHBvcHVwXHJcblx0XHRcdFx0XHRQb3BwZXIuY3JlYXRlUG9wcGVyKCR0aGlzWzBdLCAkdG9vbHRpcFswXSwge1xyXG5cdFx0XHRcdFx0XHRwbGFjZW1lbnQ6ICdib3R0b20tc3RhcnQnLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vICR0b29sdGlwLmh0bWwoJzxwPkxvYWRpbmcuLi48L3A+Jyk7XHJcblx0XHRcdFx0XHQkdG9vbHRpcC5zaG93KCk7XHJcblx0XHRcdH0sMTAwKTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbignbW91c2VsZWF2ZScsICdbcG9wb3Zlci1wcm9maWxlSW5mb10nLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0Ly8gTW91c2UgaGFzIGxlZnQsIHNldCBzaG93IHZhcmlhYmxlIHRvIGZhbHNlXHJcblx0XHRcdHdpbmRvdy5zaG91bGRTaG93UG9wdXAgPSBmYWxzZTtcclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Ly8gSWYgdGhlIHBvcHVwIGlzIHZpc2libGUsIGhpZGUgaXRcclxuXHRcdFx0XHRcdGhpZGVQb3B1cE5vdygpO1xyXG5cdFx0XHR9LCAxMDApO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoZG9jdW1lbnQpLm9uKCdtb3VzZWVudGVyJywgJyNwcm9maWxlLXRvb2x0aXAnLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0Ly8gTW91c2UgaXMgaW5zaWRlIHRoZSB0b29sdGlwLCBkb24ndCBoaWRlIGl0IG5vd1xyXG5cdFx0XHR3aW5kb3cuc2hvdWxkSGlkZVBvcHVwID0gZmFsc2U7XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkub24oJ21vdXNlbGVhdmUnLCAnI3Byb2ZpbGUtdG9vbHRpcCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHR3aW5kb3cuc2hvdWxkSGlkZVBvcHVwID0gdHJ1ZTtcclxuXHRcdFx0aGlkZVBvcHVwTm93KCk7XHJcblx0fSk7XHJcblxyXG5cdGZ1bmN0aW9uIGhpZGVQb3B1cE5vdygpe1xyXG5cdFx0XHRpZiAod2luZG93LnNob3VsZEhpZGVQb3B1cClcclxuXHRcdFx0XHRcdCQoJyNwcm9maWxlLXRvb2x0aXAnKS5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHJcblx0Ly8gQ2xpY2sgUHJvZmlsZUluZm9cclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCAnW2NsaWNrLXByb2ZpbGVJbmZvXScsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHQkdGhpcyA9ICQodGhpcyk7XHJcblx0XHRcdHdpbmRvdy5zaG91bGRTaG93UG9wdXAgPSB0cnVlOyAvLyBJdCB3aWxsIHNob3cgdGhlIHBvcHVwXHJcblxyXG5cdFx0XHQvLyBHZXQgdGhlIFVzZXIgSURcclxuXHRcdFx0JHBpZCA9ICR0aGlzLmF0dHIoJ2NsaWNrLXByb2ZpbGVJbmZvJyk7XHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCRwaWQpO1xyXG5cdFx0XHQvLyBEbyBhbnl0aGluZyB3aXRoIHRoZSB1c2VyIGlkXHJcblx0XHRcdC8vIFRoaXMgaXMgdGhlIHBsYWNlIHdoZXJlIHdlJ2xsIHVwZGF0ZSB0aGUgcGVyc29uIGRldGFpbHMgaW5zaWRlIHRoZSBkaXZcclxuXHJcblx0XHRcdCR0b29sdGlwID0gJCgnI2NsaWNrLXRvb2x0aXAnKTtcclxuXHJcblx0XHRcdC8vIFNob3cgdGhlIHBvcHVwXHJcblx0XHRcdFBvcHBlci5jcmVhdGVQb3BwZXIoJHRoaXNbMF0sICR0b29sdGlwWzBdLCB7XHJcblx0XHRcdFx0cGxhY2VtZW50OiAncmlnaHQnLFxyXG5cdFx0XHR9KTtcclxuXHRcdFx0XHJcblx0XHRcdC8vICR0b29sdGlwLmh0bWwoJzxwPkxvYWRpbmcuLi48L3A+Jyk7XHJcblx0XHRcdCR0b29sdGlwLnNob3coKTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5tb3VzZXVwKGZ1bmN0aW9uKGUpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKFwiI2NsaWNrLXRvb2x0aXBcIik7XHJcblx0XHR2YXIgaW5wdXQgPSAkKFwiW2NsaWNrLXByb2ZpbGVJbmZvXVwiKTtcclxuXHRcdC8vIGlmIHRoZSB0YXJnZXQgb2YgdGhlIGNsaWNrIGlzbid0IHRoZSBjb250YWluZXIgbm9yIGEgZGVzY2VuZGFudCBvZiB0aGUgY29udGFpbmVyXHJcblx0XHRpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgIWlucHV0LmlzKGUudGFyZ2V0KSAmJiBjb250YWluZXIuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIFxyXG5cdFx0e1xyXG5cdFx0XHRcdGNvbnRhaW5lci5oaWRlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/script.js\n");

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
/*!**********************************************!*\
  !*** multi ./src/script.js ./src/style.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\Programming\Upwork\sushant\src\script.js */"./src/script.js");
module.exports = __webpack_require__(/*! D:\Programming\Upwork\sushant\src\style.scss */"./src/style.scss");


/***/ })

/******/ });