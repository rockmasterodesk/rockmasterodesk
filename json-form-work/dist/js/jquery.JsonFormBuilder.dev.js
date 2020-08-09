"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
JSON Form Builder
Author: A.S.M. Asaduzzaman (https://www.upwork.com/freelancers/~0183d400d9b82308ef)
*/
var JsonFormBuilder =
/*#__PURE__*/
function () {
  // this.JsonData = The data as JSON
  // this.StringData = The data as String
  // this.data = The Formatted Data

  /*
    Pipeline:-
    -> JsonData (User provides)
    // -> Formatted Data (We format this data and store)
    -> Build Form (Build the form from Formatted Data)
    // -> Update Formatted Data (All DOM changes will be reflected to Formatted Data)
    -> Generate JsonData (Export: We generate JSON from formatted Data)
  */
  function JsonFormBuilder(json_data) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, JsonFormBuilder);

    if ("string" === typeof json_data) {
      this.StringData = json_data;
      this.JsonData = JSON.parse(json_data);
    } else if ("object" === _typeof(json_data)) {
      this.JsonData = json_data;
    } // Store the data in formatted way


    this.$options = this.JsonData.options;
    this.$variants = [];
    this.JsonData.variants.forEach(function (v, i) {
      _this.$variants.push(_objectSpread({
        id: i
      }, v));
    }); // Configuration Options

    this.config = {};
    this.config.table = undefined !== options.table ? options.table : ".jfb-table"; // Validate required options

    var required_fields = ["price_multiplier", "price_multiplier_mode", "compare_multiplier", "compare_multiplier_mode"];

    for (var _i = 0, _required_fields = required_fields; _i < _required_fields.length; _i++) {
      var field = _required_fields[_i];

      if (undefined === options[field]) {
        console.error("Missing " + field + " in JsonFormBuilder() instanciation options");
        return;
      }

      if ("mode" === field.substr(field.length - 4)) {
        if ("multiply" !== options[field] && "fixed" !== options[field]) {
          console.error(field + " in JsonFormBuilder() instanciation must be either of \"multiply\" or \"fixed\"");
          return;
        }
      } else {
        var int_val = parseInt(options[field]);

        if (isNaN(int_val)) {
          console.error(field + " in JsonFormBuilder() instanciation must be a number");
          return;
        }
      }
    } // Now set the options


    this.config.price_multiplier = options.price_multiplier;
    this.config.price_multiplier_mode = options.price_multiplier_mode;
    this.config.compare_multiplier = options.compare_multiplier;
    this.config.compare_multiplier_mode = options.compare_multiplier_mode; // Build the form from Data

    this.buildForm();
    return this;
  }

  _createClass(JsonFormBuilder, [{
    key: "buildForm",
    value: function buildForm() {
      var _this2 = this;

      var content = '';
      this.$variants.forEach(function (variant, index) {
        var fulfillNameJson = JSON.parse(variant.fulfillName);
        var cost = undefined !== variant.skuSalePrice ? variant.skuSalePrice : skuPrice;
        var SKU = 10000000 + Math.floor(Math.random() * 90000000) + // Random Digits
        "-" + variant.variantName.replace(/[^A-Za-z0-9.]+/g, "-"); // The String

        var price = "multiply" === _this2.config.price_multiplier_mode ? cost * _this2.config.price_multiplier : cost + _this2.config.price_multiplier;
        var comparedAtPrice = "multiply" === _this2.config.compare_multiplier_mode ? cost * _this2.config.compare_multiplier : cost + _this2.config.compare_multiplier;
        var shipping = 0;
        content += "\n      <tr id=\"".concat(variant.id, "\">\n        <th scope=\"row\"><input type=\"checkbox\" name=\"checkbox[]\" /></th>\n        <td class=\"jfb-img-td\"><img src=\"").concat(variant.variantImages, "\" alt=\"\"></td>\n        <td><input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(SKU, "\" /></td>\n        <td><input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(_this2.$options.Color[fulfillNameJson.Color - 1], "\" /></td>\n        <td><input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(_this2.$options.Width[fulfillNameJson.Width - 1], "\" /></td>\n        <td><input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(_this2.$options.Length[fulfillNameJson.Length - 1], "\" /></td>\n        <td><input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(variant.shipsFrom, "\" /></td>\n        <td>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">USD$</span>\n            </div>\n            <input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(cost, "\" />\n          </div>\n        </td>\n        <td>--</td> <!-- Shipping -->\n        <td>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">USD$</span>\n            </div>\n            <input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(price, "\" />\n          </div>\n        </td> <!-- Price -->\n        <td>").concat(price - cost - shipping, "</td> <!-- Profit -->\n        <td>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">USD$</span>\n            </div>\n            <input class=\"form-control\" type=\"text\" name=\"\" value=\"").concat(comparedAtPrice, "\" />\n          </div>\n        </td> <!-- Compared At Price -->\n        <td>").concat(variant.inventory, "</td>\n      </tr>\n      ");
      }); // console.log(content);
      // Now inject the contents in the table

      window.jQuery(this.config.table).find('tbody').html(content);
    }
  }]);

  return JsonFormBuilder;
}();