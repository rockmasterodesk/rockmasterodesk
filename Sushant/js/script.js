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

eval("var $ = window.jQuery;\n$(document).ready(function () {\n  window.deviceSize = 'small'; // Responsive Design Mobile First\n\n  $('#MessagesContainer').niceScroll({});\n  $(document).on('click', '#ConversationDetailsOpener', function () {\n    $('#ConversationDetails').toggleClass('display-none-min-screen');\n    $('.black-overlay').toggle();\n  });\n  $(document).on('click', function (e) {\n    var container = $(\"#ConversationDetails\");\n    var input = $(\"#ConversationDetailsOpener\"); // if the target of the click isn't the container nor a descendant of the container\n\n    if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0 && input.has(e.target).length === 0) {\n      container.addClass('display-none-min-screen');\n      $('.black-overlay').hide();\n    }\n  });\n  $(document).on('click', '#CloseDetails', function (e) {\n    e.preventDefault();\n    $(\"#ConversationDetails\").addClass('display-none-min-screen');\n    $('.black-overlay').hide();\n  }); // Top Right Search Icon\n\n  $(document).on('click', \"#searchIcon\", function () {\n    $(\"#searchForm\").toggle();\n  }); // Search Button\n\n  $(document).on('click', \"#searchButton\", function (e) {\n    e.preventDefault();\n    $(this).parent().parent().find('.search-results').toggle();\n  }); // Search Input -> show results div on focus\n\n  $(document).on('focus', \"#searchInput\", function () {\n    $(this).parent().find('.search-results').show();\n  });\n  $(document).mouseup(function (e) {\n    var container = $(\".search-results\");\n    var input = $(\"#searchInput\"); // if the target of the click isn't the container nor a descendant of the container\n\n    if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) {\n      container.hide();\n    }\n  }); // Profile Tooltip\n\n  window.shouldHidePopup = true;\n  window.shouldShowPopup = true; // Take some time to show the popup\n\n  $(document).on('mouseenter', '[popover-profileInfo]', function (e) {\n    $this = $(this);\n    window.shouldShowPopup = true; // It will show the popup\n\n    setTimeout(function () {\n      if (!window.shouldShowPopup) // the mouse has left, abort the popup\n        return;\n      $pid = $this.attr('popover-profileInfo'); // console.log($pid);\n      // Do anything with the user id\n      // This is the place where we'll update the person details inside the div\n\n      $tooltip = $('#profile-tooltip'); // Show the popup\n\n      Popper.createPopper($this[0], $tooltip[0], {\n        placement: 'bottom-start'\n      }); // $tooltip.html('<p>Loading...</p>');\n\n      $tooltip.show();\n    }, 100);\n  });\n  $(document).on('mouseleave', '[popover-profileInfo]', function (e) {\n    // Mouse has left, set show variable to false\n    window.shouldShowPopup = false;\n    setTimeout(function () {\n      // If the popup is visible, hide it\n      hidePopupNow();\n    }, 100);\n  });\n  $(document).on('mouseenter', '#profile-tooltip', function (e) {\n    // Mouse is inside the tooltip, don't hide it now\n    window.shouldHidePopup = false;\n  });\n  $(document).on('mouseleave', '#profile-tooltip', function (e) {\n    window.shouldHidePopup = true;\n    hidePopupNow();\n  });\n\n  function hidePopupNow() {\n    if (window.shouldHidePopup) $('#profile-tooltip').hide();\n  } // Click ProfileInfo\n\n\n  $(document).on('click', '[click-profileInfo]', function (e) {\n    $this = $(this);\n    window.shouldShowPopup = true; // It will show the popup\n    // Get the User ID\n\n    $pid = $this.attr('click-profileInfo'); // console.log($pid);\n    // Do anything with the user id\n    // This is the place where we'll update the person details inside the div\n\n    $tooltip = $('#click-tooltip'); // Show the popup\n\n    Popper.createPopper($this[0], $tooltip[0], {\n      placement: window.deviceSize == 'large' ? 'right' : 'bottom-start'\n    }); // $tooltip.html('<p>Loading...</p>');\n\n    $tooltip.show();\n  });\n  $(document).mouseup(function (e) {\n    var container = $(\"#click-tooltip\");\n    var input = $(\"[click-profileInfo]\"); // if the target of the click isn't the container nor a descendant of the container\n\n    if (!container.is(e.target) && !input.is(e.target) && container.has(e.target).length === 0) {\n      container.hide();\n    }\n  });\n\n  function changeDeviceSize(x) {\n    if (x.matches) {\n      // This is large screen;\n      window.deviceSize = 'large';\n    } else {\n      window.deviceSize = 'small';\n    }\n  }\n\n  var x = window.matchMedia(\"(min-width: 768px)\");\n  changeDeviceSize(x);\n  x.addListener(changeDeviceSize); // Attach listener function on state changes\n  // Scrolls\n\n  if (window.deviceSize == 'large') {\n    $('#Conversations').niceScroll({});\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0LmpzPzY4YjAiXSwibmFtZXMiOlsiJCIsIndpbmRvdyIsImpRdWVyeSIsImRvY3VtZW50IiwicmVhZHkiLCJkZXZpY2VTaXplIiwibmljZVNjcm9sbCIsIm9uIiwidG9nZ2xlQ2xhc3MiLCJ0b2dnbGUiLCJlIiwiY29udGFpbmVyIiwiaW5wdXQiLCJpcyIsInRhcmdldCIsImhhcyIsImxlbmd0aCIsImFkZENsYXNzIiwiaGlkZSIsInByZXZlbnREZWZhdWx0IiwicGFyZW50IiwiZmluZCIsInNob3ciLCJtb3VzZXVwIiwic2hvdWxkSGlkZVBvcHVwIiwic2hvdWxkU2hvd1BvcHVwIiwiJHRoaXMiLCJzZXRUaW1lb3V0IiwiJHBpZCIsImF0dHIiLCIkdG9vbHRpcCIsIlBvcHBlciIsImNyZWF0ZVBvcHBlciIsInBsYWNlbWVudCIsImhpZGVQb3B1cE5vdyIsImNoYW5nZURldmljZVNpemUiLCJ4IiwibWF0Y2hlcyIsIm1hdGNoTWVkaWEiLCJhZGRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsQ0FBQyxHQUFHQyxNQUFNLENBQUNDLE1BQWY7QUFFQUYsQ0FBQyxDQUFDRyxRQUFELENBQUQsQ0FBWUMsS0FBWixDQUFrQixZQUFVO0FBQzNCSCxRQUFNLENBQUNJLFVBQVAsR0FBb0IsT0FBcEIsQ0FEMkIsQ0FDRTs7QUFFN0JMLEdBQUMsQ0FBQyxvQkFBRCxDQUFELENBQXdCTSxVQUF4QixDQUFtQyxFQUFuQztBQUVBTixHQUFDLENBQUNHLFFBQUQsQ0FBRCxDQUFZSSxFQUFaLENBQWUsT0FBZixFQUF3Qiw0QkFBeEIsRUFBc0QsWUFBVTtBQUMvRFAsS0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJRLFdBQTFCLENBQXNDLHlCQUF0QztBQUNBUixLQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQlMsTUFBcEI7QUFDQSxHQUhEO0FBS0FULEdBQUMsQ0FBQ0csUUFBRCxDQUFELENBQVlJLEVBQVosQ0FBZSxPQUFm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MkIsQ0FBQ0YsS0FBSyxDQUFDQyxFQUFOLENBQVNILENBQUMsQ0FBQ0ksTUFBWCxDQUE1QixJQUFrREgsU0FBUyxDQUFDSSxHQUFWLENBQWNMLENBQUMsQ0FBQ0ksTUFBaEIsRUFBd0JFLE1BQXhCLEtBQW1DLENBQXpGLEVBQ0E7QUFDRUwsZUFBUyxDQUFDTyxJQUFWO0FBQ0Q7QUFDRCxHQVJEOztBQVVBLFdBQVNpQixnQkFBVCxDQUEwQkMsQ0FBMUIsRUFBNEI7QUFDM0IsUUFBSUEsQ0FBQyxDQUFDQyxPQUFOLEVBQWM7QUFBRTtBQUNmcEMsWUFBTSxDQUFDSSxVQUFQLEdBQW9CLE9BQXBCO0FBQ0EsS0FGRCxNQUVPO0FBQ05KLFlBQU0sQ0FBQ0ksVUFBUCxHQUFvQixPQUFwQjtBQUNBO0FBQ0Q7O0FBRUQsTUFBSStCLENBQUMsR0FBR25DLE1BQU0sQ0FBQ3FDLFVBQVAsQ0FBa0Isb0JBQWxCLENBQVI7QUFDQUgsa0JBQWdCLENBQUNDLENBQUQsQ0FBaEI7QUFDQUEsR0FBQyxDQUFDRyxXQUFGLENBQWNKLGdCQUFkLEVBcEoyQixDQW9KSztBQUdoQzs7QUFDQSxNQUFJbEMsTUFBTSxDQUFDSSxVQUFQLElBQXFCLE9BQXpCLEVBQWlDO0FBQ2hDTCxLQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQk0sVUFBcEIsQ0FBK0IsRUFBL0I7QUFDQTtBQUVELENBNUpEIiwiZmlsZSI6Ii4vc3JjL3NjcmlwdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCAkID0gd2luZG93LmpRdWVyeTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcblx0d2luZG93LmRldmljZVNpemUgPSAnc21hbGwnOyAvLyBSZXNwb25zaXZlIERlc2lnbiBNb2JpbGUgRmlyc3RcclxuXHJcblx0JCgnI01lc3NhZ2VzQ29udGFpbmVyJykubmljZVNjcm9sbCh7fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjQ29udmVyc2F0aW9uRGV0YWlsc09wZW5lcicsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKCcjQ29udmVyc2F0aW9uRGV0YWlscycpLnRvZ2dsZUNsYXNzKCdkaXNwbGF5LW5vbmUtbWluLXNjcmVlbicpO1xyXG5cdFx0JCgnLmJsYWNrLW92ZXJsYXknKS50b2dnbGUoKTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciBjb250YWluZXIgPSAkKFwiI0NvbnZlcnNhdGlvbkRldGFpbHNcIik7XHJcblx0XHR2YXIgaW5wdXQgPSAkKFwiI0NvbnZlcnNhdGlvbkRldGFpbHNPcGVuZXJcIik7XHJcblx0XHQvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxyXG5cdFx0aWYgKCFjb250YWluZXIuaXMoZS50YXJnZXQpICYmICFpbnB1dC5pcyhlLnRhcmdldCkgJiYgY29udGFpbmVyLmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwICYmIGlucHV0LmhhcyhlLnRhcmdldCkubGVuZ3RoID09PSAwKSBcclxuXHRcdHtcclxuXHRcdFx0Y29udGFpbmVyLmFkZENsYXNzKCdkaXNwbGF5LW5vbmUtbWluLXNjcmVlbicpO1xyXG5cdFx0XHQkKCcuYmxhY2stb3ZlcmxheScpLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNDbG9zZURldGFpbHMnLCBmdW5jdGlvbihlKXtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdCQoXCIjQ29udmVyc2F0aW9uRGV0YWlsc1wiKS5hZGRDbGFzcygnZGlzcGxheS1ub25lLW1pbi1zY3JlZW4nKTtcclxuXHRcdCQoJy5ibGFjay1vdmVybGF5JykuaGlkZSgpO1xyXG5cdH0pO1xyXG5cclxuXHJcblx0Ly8gVG9wIFJpZ2h0IFNlYXJjaCBJY29uXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIjc2VhcmNoSWNvblwiLCBmdW5jdGlvbigpe1xyXG5cdFx0JChcIiNzZWFyY2hGb3JtXCIpLnRvZ2dsZSgpO1xyXG5cdH0pO1xyXG5cclxuXHQvLyBTZWFyY2ggQnV0dG9uXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywgXCIjc2VhcmNoQnV0dG9uXCIsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuc2VhcmNoLXJlc3VsdHMnKS50b2dnbGUoKTtcclxuXHR9KTtcclxuXHJcblx0Ly8gU2VhcmNoIElucHV0IC0+IHNob3cgcmVzdWx0cyBkaXYgb24gZm9jdXNcclxuXHQkKGRvY3VtZW50KS5vbignZm9jdXMnLCBcIiNzZWFyY2hJbnB1dFwiLCBmdW5jdGlvbigpe1xyXG5cdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuc2VhcmNoLXJlc3VsdHMnKS5zaG93KCk7XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbihlKSB7XHJcblx0XHRcdHZhciBjb250YWluZXIgPSAkKFwiLnNlYXJjaC1yZXN1bHRzXCIpO1xyXG5cdFx0XHR2YXIgaW5wdXQgPSAkKFwiI3NlYXJjaElucHV0XCIpO1xyXG5cdFx0XHQvLyBpZiB0aGUgdGFyZ2V0IG9mIHRoZSBjbGljayBpc24ndCB0aGUgY29udGFpbmVyIG5vciBhIGRlc2NlbmRhbnQgb2YgdGhlIGNvbnRhaW5lclxyXG5cdFx0XHRpZiAoIWNvbnRhaW5lci5pcyhlLnRhcmdldCkgJiYgIWlucHV0LmlzKGUudGFyZ2V0KSAmJiBjb250YWluZXIuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XHRjb250YWluZXIuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHQvLyBQcm9maWxlIFRvb2x0aXBcclxuXHR3aW5kb3cuc2hvdWxkSGlkZVBvcHVwID0gdHJ1ZTtcclxuXHR3aW5kb3cuc2hvdWxkU2hvd1BvcHVwID0gdHJ1ZTsgLy8gVGFrZSBzb21lIHRpbWUgdG8gc2hvdyB0aGUgcG9wdXBcclxuXHQkKGRvY3VtZW50KS5vbignbW91c2VlbnRlcicsICdbcG9wb3Zlci1wcm9maWxlSW5mb10nLCBmdW5jdGlvbihlKXtcclxuXHRcdFx0JHRoaXMgPSAkKHRoaXMpO1xyXG5cdFx0XHR3aW5kb3cuc2hvdWxkU2hvd1BvcHVwID0gdHJ1ZTsgLy8gSXQgd2lsbCBzaG93IHRoZSBwb3B1cFxyXG5cclxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0aWYgKCF3aW5kb3cuc2hvdWxkU2hvd1BvcHVwKSAvLyB0aGUgbW91c2UgaGFzIGxlZnQsIGFib3J0IHRoZSBwb3B1cFxyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHJcblx0XHRcdFx0XHQkcGlkID0gJHRoaXMuYXR0cigncG9wb3Zlci1wcm9maWxlSW5mbycpO1xyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJHBpZCk7XHJcblx0XHRcdFx0XHQvLyBEbyBhbnl0aGluZyB3aXRoIHRoZSB1c2VyIGlkXHJcblx0XHRcdFx0XHQvLyBUaGlzIGlzIHRoZSBwbGFjZSB3aGVyZSB3ZSdsbCB1cGRhdGUgdGhlIHBlcnNvbiBkZXRhaWxzIGluc2lkZSB0aGUgZGl2XHJcblxyXG5cdFx0XHRcdFx0JHRvb2x0aXAgPSAkKCcjcHJvZmlsZS10b29sdGlwJyk7XHJcblxyXG5cdFx0XHRcdFx0Ly8gU2hvdyB0aGUgcG9wdXBcclxuXHRcdFx0XHRcdFBvcHBlci5jcmVhdGVQb3BwZXIoJHRoaXNbMF0sICR0b29sdGlwWzBdLCB7XHJcblx0XHRcdFx0XHRcdHBsYWNlbWVudDogJ2JvdHRvbS1zdGFydCcsXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gJHRvb2x0aXAuaHRtbCgnPHA+TG9hZGluZy4uLjwvcD4nKTtcclxuXHRcdFx0XHRcdCR0b29sdGlwLnNob3coKTtcclxuXHRcdFx0fSwxMDApO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKCdtb3VzZWxlYXZlJywgJ1twb3BvdmVyLXByb2ZpbGVJbmZvXScsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHQvLyBNb3VzZSBoYXMgbGVmdCwgc2V0IHNob3cgdmFyaWFibGUgdG8gZmFsc2VcclxuXHRcdFx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IGZhbHNlO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHQvLyBJZiB0aGUgcG9wdXAgaXMgdmlzaWJsZSwgaGlkZSBpdFxyXG5cdFx0XHRcdFx0aGlkZVBvcHVwTm93KCk7XHJcblx0XHRcdH0sIDEwMCk7XHJcblx0fSk7XHJcblx0XHJcblx0JChkb2N1bWVudCkub24oJ21vdXNlZW50ZXInLCAnI3Byb2ZpbGUtdG9vbHRpcCcsIGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHQvLyBNb3VzZSBpcyBpbnNpZGUgdGhlIHRvb2x0aXAsIGRvbid0IGhpZGUgaXQgbm93XHJcblx0XHRcdHdpbmRvdy5zaG91bGRIaWRlUG9wdXAgPSBmYWxzZTtcclxuXHR9KTtcclxuXHRcclxuXHQkKGRvY3VtZW50KS5vbignbW91c2VsZWF2ZScsICcjcHJvZmlsZS10b29sdGlwJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdHdpbmRvdy5zaG91bGRIaWRlUG9wdXAgPSB0cnVlO1xyXG5cdFx0XHRoaWRlUG9wdXBOb3coKTtcclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gaGlkZVBvcHVwTm93KCl7XHJcblx0XHRcdGlmICh3aW5kb3cuc2hvdWxkSGlkZVBvcHVwKVxyXG5cdFx0XHRcdFx0JCgnI3Byb2ZpbGUtdG9vbHRpcCcpLmhpZGUoKTtcclxuXHR9XHJcblxyXG5cclxuXHQvLyBDbGljayBQcm9maWxlSW5mb1xyXG5cdCQoZG9jdW1lbnQpLm9uKCdjbGljaycsICdbY2xpY2stcHJvZmlsZUluZm9dJywgZnVuY3Rpb24oZSl7XHJcblx0XHRcdCR0aGlzID0gJCh0aGlzKTtcclxuXHRcdFx0d2luZG93LnNob3VsZFNob3dQb3B1cCA9IHRydWU7IC8vIEl0IHdpbGwgc2hvdyB0aGUgcG9wdXBcclxuXHJcblx0XHRcdC8vIEdldCB0aGUgVXNlciBJRFxyXG5cdFx0XHQkcGlkID0gJHRoaXMuYXR0cignY2xpY2stcHJvZmlsZUluZm8nKTtcclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJHBpZCk7XHJcblx0XHRcdC8vIERvIGFueXRoaW5nIHdpdGggdGhlIHVzZXIgaWRcclxuXHRcdFx0Ly8gVGhpcyBpcyB0aGUgcGxhY2Ugd2hlcmUgd2UnbGwgdXBkYXRlIHRoZSBwZXJzb24gZGV0YWlscyBpbnNpZGUgdGhlIGRpdlxyXG5cclxuXHRcdFx0JHRvb2x0aXAgPSAkKCcjY2xpY2stdG9vbHRpcCcpO1xyXG5cclxuXHRcdFx0Ly8gU2hvdyB0aGUgcG9wdXBcclxuXHRcdFx0UG9wcGVyLmNyZWF0ZVBvcHBlcigkdGhpc1swXSwgJHRvb2x0aXBbMF0sIHtcclxuXHRcdFx0XHRwbGFjZW1lbnQ6IHdpbmRvdy5kZXZpY2VTaXplID09ICdsYXJnZScgPyAncmlnaHQnIDogJ2JvdHRvbS1zdGFydCcsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly8gJHRvb2x0aXAuaHRtbCgnPHA+TG9hZGluZy4uLjwvcD4nKTtcclxuXHRcdFx0JHRvb2x0aXAuc2hvdygpO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24oZSkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoXCIjY2xpY2stdG9vbHRpcFwiKTtcclxuXHRcdHZhciBpbnB1dCA9ICQoXCJbY2xpY2stcHJvZmlsZUluZm9dXCIpO1xyXG5cdFx0Ly8gaWYgdGhlIHRhcmdldCBvZiB0aGUgY2xpY2sgaXNuJ3QgdGhlIGNvbnRhaW5lciBub3IgYSBkZXNjZW5kYW50IG9mIHRoZSBjb250YWluZXJcclxuXHRcdGlmICghY29udGFpbmVyLmlzKGUudGFyZ2V0KSAmJiAhaW5wdXQuaXMoZS50YXJnZXQpICYmIGNvbnRhaW5lci5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdFx0Y29udGFpbmVyLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0ZnVuY3Rpb24gY2hhbmdlRGV2aWNlU2l6ZSh4KXtcclxuXHRcdGlmICh4Lm1hdGNoZXMpeyAvLyBUaGlzIGlzIGxhcmdlIHNjcmVlbjtcclxuXHRcdFx0d2luZG93LmRldmljZVNpemUgPSAnbGFyZ2UnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d2luZG93LmRldmljZVNpemUgPSAnc21hbGwnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIHggPSB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDc2OHB4KVwiKVxyXG5cdGNoYW5nZURldmljZVNpemUoeCk7XHJcblx0eC5hZGRMaXN0ZW5lcihjaGFuZ2VEZXZpY2VTaXplKSAvLyBBdHRhY2ggbGlzdGVuZXIgZnVuY3Rpb24gb24gc3RhdGUgY2hhbmdlc1xyXG5cclxuXHRcclxuXHQvLyBTY3JvbGxzXHJcblx0aWYgKHdpbmRvdy5kZXZpY2VTaXplID09ICdsYXJnZScpe1xyXG5cdFx0JCgnI0NvbnZlcnNhdGlvbnMnKS5uaWNlU2Nyb2xsKHt9KTtcclxuXHR9XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/script.js\n");

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