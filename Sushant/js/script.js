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

eval("var $ = window.jQuery;\n$(document).ready(function () {\n  // Scrolls\n  $('#Conversations').niceScroll({});\n  $('#MessagesContainer').niceScroll({}); // Top Right Search Icon\n\n  $(document).on('click', \"#searchIcon\", function () {\n    $(\"#searchForm\").toggle();\n  }); // Search Button\n\n  $(document).on('click', \"#searchButton\", function (e) {\n    e.preventDefault();\n    $(this).parent().parent().find('.search-results').toggle();\n  }); // Search Input -> show results div on focus\n\n  $(document).on('focus', \"#searchInput\", function () {\n    $(this).parent().find('.search-results').show();\n  });\n  $(document).mouseup(function (e) {\n    var container = $(\".search-results\");\n    var input = $(\"#searchInput\"); // if the target of the click isn't the container nor a descendant of the container\n\n    if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) {\n      container.hide();\n    }\n  }); // Profile Tooltip\n\n  window.shouldHidePopup = true;\n  window.shouldShowPopup = true;\n  $(document).on('mouseenter', '[popover-profileInfo]', function (e) {\n    $this = $(this);\n    window.shouldShowPopup = true;\n    setTimeout(function () {\n      if (!window.shouldShowPopup) return;\n      $pid = $this.attr('popover-profileInfo');\n      console.log($pid);\n      $tooltip = $('#profile-tooltip');\n      Popper.createPopper($this[0], $tooltip[0], {\n        placement: 'bottom-start'\n      }); // $tooltip.html('<p>Loading...</p>');\n\n      $tooltip.show();\n    }, 100);\n  });\n  $(document).on('mouseleave', '[popover-profileInfo]', function (e) {\n    window.shouldShowPopup = false;\n    setTimeout(function () {\n      hidePopupNow();\n    }, 100);\n  });\n  $(document).on('mouseenter', '#profile-tooltip', function (e) {\n    window.shouldHidePopup = false;\n  });\n  $(document).on('mouseleave', '#profile-tooltip', function (e) {\n    window.shouldHidePopup = true;\n    hidePopupNow();\n  });\n\n  function hidePopupNow() {\n    if (window.shouldHidePopup) $('#profile-tooltip').hide();\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0LmpzPzY4YjAiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJuaWNlU2Nyb2xsIiwib24iLCJ0b2dnbGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJwYXJlbnQiLCJmaW5kIiwic2hvdyIsIm1vdXNldXAiLCJjb250YWluZXIiLCJpbnB1dCIsImlzIiwidGFyZ2V0IiwiaGFzIiwibGVuZ3RoIiwiaGlkZSIsInNob3VsZEhpZGVQb3B1cCIsInNob3VsZFNob3dQb3B1cCIsIiR0aGlzIiwic2V0VGltZW91dCIsIiRwaWQiLCJhdHRyIiwiY29uc29sZSIsImxvZyIsIiR0b29sdGlwIiwiUG9wcGVyIiwiY3JlYXRlUG9wcGVyIiwicGxhY2VtZW50IiwiaGlkZVBvcHVwTm93Il0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxDQUFDLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBZjtBQUVBRixDQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZQyxLQUFaLENBQWtCLFlBQVU7QUFDM0I7QUFDQUosR0FBQyxDQUFDLGdCQUFELENBQUQsQ0FBb0JLLFVBQXBCLENBQStCLEVBQS9CO0FBRUFMLEdBQUMsQ0FBQyxvQkFBRCxDQUFELENBQXdCSyxVQUF4QixDQUFtQyxFQUFuQyxFQUoyQixDQVEzQjs7QUFDQUwsR0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWUcsRUFBWixDQUFlLE9BQWYsRUFBd0IsYUFBeEIsRUFBdUMsWUFBVTtBQUNoRE4sS0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQk8sTUFBakI7QUFDQSxHQUZELEVBVDJCLENBYTNCOztBQUNBUCxHQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZRyxFQUFaLENBQWUsT0FBZixFQUF3QixlQUF4QixFQUF5QyxVQUFTRSxDQUFULEVBQVc7QUFDbkRBLEtBQUMsQ0FBQ0MsY0FBRjtBQUNBVCxLQUFDLENBQUMsSUFBRCxDQUFELENBQVFVLE1BQVIsR0FBaUJBLE1BQWpCLEdBQTBCQyxJQUExQixDQUErQixpQkFBL0IsRUFBa0RKLE1BQWxEO0FBQ0EsR0FIRCxFQWQyQixDQW1CM0I7O0FBQ0FQLEdBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlHLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGNBQXhCLEVBQXdDLFlBQVU7QUFDakROLEtBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUVUsTUFBUixHQUFpQkMsSUFBakIsQ0FBc0IsaUJBQXRCLEVBQXlDQyxJQUF6QztBQUNBLEdBRkQ7QUFJQVosR0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWVUsT0FBWixDQUFvQixVQUFTTCxDQUFULEVBQVk7QUFDOUIsUUFBSU0sU0FBUyxHQUFHZCxDQUFDLENBQUMsaUJBQUQsQ0FBakI7QUFDQSxRQUFJZSxLQUFLLEdBQUdmLENBQUMsQ0FBQyxjQUFELENBQWIsQ0FGOEIsQ0FHOUI7O0FBQ0EsUUFBSSxDQUFDYyxTQUFTLENBQUNFLEVBQVYsQ0FBYVIsQ0FBQyxDQUFDUyxNQUFmLENBQUQsSUFBMkIsQ0FBQ0YsS0FBSyxDQUFDQyxFQUFOLENBQVNSLENBQUMsQ0FBQ1MsTUFBWCxDQUE1QixJQUFrREgsU0FBUyxDQUFDSSxHQUFWLENBQWNWLENBQUMsQ0FBQ1MsTUFBaEIsRUFBd0JFLE1BQXhCLEtBQW1DLENBQXpGLEVBQ0E7QUFDRUwsZUFBUyxDQUFDTSxJQUFWO0FBQ0Q7QUFDRixHQVJELEVBeEIyQixDQW1DM0I7O0FBQ0FuQixRQUFNLENBQUNvQixlQUFQLEdBQXlCLElBQXpCO0FBQ0FwQixRQUFNLENBQUNxQixlQUFQLEdBQXlCLElBQXpCO0FBQ0F0QixHQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZRyxFQUFaLENBQWUsWUFBZixFQUE2Qix1QkFBN0IsRUFBc0QsVUFBU0UsQ0FBVCxFQUFXO0FBQy9EZSxTQUFLLEdBQUd2QixDQUFDLENBQUMsSUFBRCxDQUFUO0FBQ0FDLFVBQU0sQ0FBQ3FCLGVBQVAsR0FBeUIsSUFBekI7QUFFQUUsY0FBVSxDQUFDLFlBQVU7QUFDbkIsVUFBSSxDQUFDdkIsTUFBTSxDQUFDcUIsZUFBWixFQUNFO0FBRUZHLFVBQUksR0FBR0YsS0FBSyxDQUFDRyxJQUFOLENBQVcscUJBQVgsQ0FBUDtBQUNBQyxhQUFPLENBQUNDLEdBQVIsQ0FBWUgsSUFBWjtBQUVBSSxjQUFRLEdBQUc3QixDQUFDLENBQUMsa0JBQUQsQ0FBWjtBQUVBOEIsWUFBTSxDQUFDQyxZQUFQLENBQW9CUixLQUFLLENBQUMsQ0FBRCxDQUF6QixFQUE4Qk0sUUFBUSxDQUFDLENBQUQsQ0FBdEMsRUFBMkM7QUFDMUNHLGlCQUFTLEVBQUU7QUFEK0IsT0FBM0MsRUFUbUIsQ0FhbkI7O0FBQ0FILGNBQVEsQ0FBQ2pCLElBQVQ7QUFDRCxLQWZTLEVBZVIsR0FmUSxDQUFWO0FBZ0JELEdBcEJEO0FBcUJBWixHQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZRyxFQUFaLENBQWUsWUFBZixFQUE2Qix1QkFBN0IsRUFBc0QsVUFBU0UsQ0FBVCxFQUFXO0FBQy9EUCxVQUFNLENBQUNxQixlQUFQLEdBQXlCLEtBQXpCO0FBQ0FFLGNBQVUsQ0FBQyxZQUFVO0FBQ25CUyxrQkFBWTtBQUNiLEtBRlMsRUFFUCxHQUZPLENBQVY7QUFHRCxHQUxEO0FBT0FqQyxHQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZRyxFQUFaLENBQWUsWUFBZixFQUE2QixrQkFBN0IsRUFBaUQsVUFBU0UsQ0FBVCxFQUFXO0FBQzFEUCxVQUFNLENBQUNvQixlQUFQLEdBQXlCLEtBQXpCO0FBQ0QsR0FGRDtBQUlBckIsR0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWUcsRUFBWixDQUFlLFlBQWYsRUFBNkIsa0JBQTdCLEVBQWlELFVBQVNFLENBQVQsRUFBVztBQUMxRFAsVUFBTSxDQUFDb0IsZUFBUCxHQUF5QixJQUF6QjtBQUNBWSxnQkFBWTtBQUNiLEdBSEQ7O0FBS0EsV0FBU0EsWUFBVCxHQUF1QjtBQUNyQixRQUFJaEMsTUFBTSxDQUFDb0IsZUFBWCxFQUNFckIsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JvQixJQUF0QjtBQUNIO0FBQ0QsQ0EvRUQiLCJmaWxlIjoiLi9zcmMvc2NyaXB0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0ICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuXHQvLyBTY3JvbGxzXHJcblx0JCgnI0NvbnZlcnNhdGlvbnMnKS5uaWNlU2Nyb2xsKHtcclxuXHR9KTtcclxuXHQkKCcjTWVzc2FnZXNDb250YWluZXInKS5uaWNlU2Nyb2xsKHtcclxuXHR9KTtcclxuXHJcblxyXG5cdC8vIFRvcCBSaWdodCBTZWFyY2ggSWNvblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI3NlYXJjaEljb25cIiwgZnVuY3Rpb24oKXtcclxuXHRcdCQoXCIjc2VhcmNoRm9ybVwiKS50b2dnbGUoKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2VhcmNoIEJ1dHRvblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsIFwiI3NlYXJjaEJ1dHRvblwiLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLnNlYXJjaC1yZXN1bHRzJykudG9nZ2xlKCk7XHJcblx0fSk7XHJcblxyXG5cdC8vIFNlYXJjaCBJbnB1dCAtPiBzaG93IHJlc3VsdHMgZGl2IG9uIGZvY3VzXHJcblx0JChkb2N1bWVudCkub24oJ2ZvY3VzJywgXCIjc2VhcmNoSW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykucGFyZW50KCkuZmluZCgnLnNlYXJjaC1yZXN1bHRzJykuc2hvdygpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0XHR2YXIgY29udGFpbmVyID0gJChcIi5zZWFyY2gtcmVzdWx0c1wiKTtcclxuXHRcdFx0dmFyIGlucHV0ID0gJChcIiNzZWFyY2hJbnB1dFwiKTtcclxuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcclxuXHRcdFx0aWYgKCFjb250YWluZXIuaXMoZS50YXJnZXQpICYmICFpbnB1dC5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFx0Y29udGFpbmVyLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gUHJvZmlsZSBUb29sdGlwXHJcblx0d2luZG93LnNob3VsZEhpZGVQb3B1cCA9IHRydWU7XHJcblx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IHRydWU7XHJcblx0JChkb2N1bWVudCkub24oJ21vdXNlZW50ZXInLCAnW3BvcG92ZXItcHJvZmlsZUluZm9dJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IHRydWU7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRpZiAoIXdpbmRvdy5zaG91bGRTaG93UG9wdXApXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdFx0XHRcdCRwaWQgPSAkdGhpcy5hdHRyKCdwb3BvdmVyLXByb2ZpbGVJbmZvJyk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygkcGlkKTtcclxuXHJcblx0XHRcdFx0XHQkdG9vbHRpcCA9ICQoJyNwcm9maWxlLXRvb2x0aXAnKTtcclxuXHJcblx0XHRcdFx0XHRQb3BwZXIuY3JlYXRlUG9wcGVyKCR0aGlzWzBdLCAkdG9vbHRpcFswXSwge1xyXG5cdFx0XHRcdFx0XHRwbGFjZW1lbnQ6ICdib3R0b20tc3RhcnQnLFxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vICR0b29sdGlwLmh0bWwoJzxwPkxvYWRpbmcuLi48L3A+Jyk7XHJcblx0XHRcdFx0XHQkdG9vbHRpcC5zaG93KCk7XHJcblx0XHRcdH0sMTAwKTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbignbW91c2VsZWF2ZScsICdbcG9wb3Zlci1wcm9maWxlSW5mb10nLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IGZhbHNlO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRoaWRlUG9wdXBOb3coKTtcclxuXHRcdFx0fSwgMTAwKTtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbignbW91c2VlbnRlcicsICcjcHJvZmlsZS10b29sdGlwJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdHdpbmRvdy5zaG91bGRIaWRlUG9wdXAgPSBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbignbW91c2VsZWF2ZScsICcjcHJvZmlsZS10b29sdGlwJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdHdpbmRvdy5zaG91bGRIaWRlUG9wdXAgPSB0cnVlO1xyXG5cdFx0XHRoaWRlUG9wdXBOb3coKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gaGlkZVBvcHVwTm93KCl7XHJcblx0XHRcdGlmICh3aW5kb3cuc2hvdWxkSGlkZVBvcHVwKVxyXG5cdFx0XHRcdFx0JCgnI3Byb2ZpbGUtdG9vbHRpcCcpLmhpZGUoKTtcclxuXHR9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/script.js\n");

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