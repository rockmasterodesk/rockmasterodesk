"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    } // Set Table Columns


    this.$columns = ["#", "Image", "SKU", "Cost", "Shipping", "Price", "Profit", "Compared At Price", "Inventory"]; // Configuration Options

    this.config = {};
    this.config.initialCounts = {};
    this.config.table = undefined !== options.table ? options.table : ".jfb-table";
    this.config.selectors = undefined !== options.selectors ? options.selectors : ".jfb-selector-nav";
    this.config.jQuery = undefined !== options.jQuery ? options.jQuery : window.jQuery; // Validate required options

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
    this.config.compare_multiplier_mode = options.compare_multiplier_mode; // Store the data in formatted way

    this.$options = this.JsonData.options;
    this.$variants = [];
    this.JsonData.variants.forEach(function (v, i) {
      var cost = undefined !== v.skuSalePrice ? v.skuSalePrice : skuPrice;
      var randomDigits = 10000000 + Math.floor(Math.random() * 90000000);
      var price = "multiply" === _this.config.price_multiplier_mode ? cost * _this.config.price_multiplier : cost + _this.config.price_multiplier;
      var comparedAtPrice = "multiply" === _this.config.compare_multiplier_mode ? cost * _this.config.compare_multiplier : cost + _this.config.compare_multiplier;
      var shipping = 0;

      _this.$variants.push({
        id: i,
        variantImages: v.variantImages,
        SKUId: v.SKUId,
        typeID: v.typeID,
        variantName: v.variantName,
        fulfillName: JSON.parse(v.fulfillName),
        // Parse the JSON
        skuPrice: v.skuPrice,
        skuSalePrice: v.skuSalePrice,
        inventory: v.inventory,
        shipsFrom: v.shipsFrom,
        // New elements (__attr__ means hidden elements)
        __cost__: cost,
        __randomNumber__: randomDigits,
        __shipping__: 0,
        price: _this.roundNumber(price).toFixed(2),
        comparePrice: _this.roundNumber(comparedAtPrice).toFixed(2),
        shopSKU: _this.getShopSku(randomDigits, v.variantName)
      });
    }); // Set the Selectors

    this.generateSelectors();
    this.updateDOMSelectors(); // Build the form from Data

    this.buildForm();
    this.updateDeleteButtonState();
    this.addEventListeners();
    return this;
  }

  _createClass(JsonFormBuilder, [{
    key: "getShopSku",
    value: function getShopSku(randomDigits, variantName) {
      return randomDigits + "-" + variantName.replace(/[^A-Za-z0-9.]+/g, "-");
    }
  }, {
    key: "updateShopSKU",
    value: function updateShopSKU(variant_index) {
      var variant = this.$variants[variant_index];
      variant.shopSKU = this.getShopSku(variant.__randomNumber__, variant.variantName);
      this.config.jQuery(this.config.table).find('tr#variant_' + variant.id).find('input.shop-sku-field').val(variant.shopSKU);
    }
  }, {
    key: "buildForm",
    value: function buildForm() {
      // First, update the columns with additional options
      this.updateColumns();
      this.updateDOMTable();
      var content = this.generateContent(); // Now inject the contents in the table

      this.config.jQuery(this.config.table).find('tbody').html(content);
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var $ = this.config.jQuery;
      var thisClass = this;
      $(document).ready(function () {
        // Top Selector Event Listener
        $(document).on('click', thisClass.config.selectors + "  a.nav-link", function (e) {
          e.preventDefault();
          var key = $(this).data('selector');
          var option = $(this).data('option');
          var s_index = $(this).data('s_index'); // Change Selected Selector

          $(thisClass.config.selectors + "  a.active").removeClass('active');
          $(this).addClass('active');

          if ("All" === key) {
            $('.main-checkbox').each(function () {
              $(this).prop('checked', true);
            });
          } else {
            // Uncheck All
            $('.main-checkbox').each(function () {
              $(this).prop('checked', false);
            }); // Check All with that option

            thisClass.$variants.forEach(function (v) {
              // console.log(option, v.variantName, v.fulfillName[option] === s_index + 1 + "");
              if (v.fulfillName[option] === s_index + 1 + "") {
                $("#variant_" + v.id).find(".main-checkbox").prop('checked', true);
              }
            });
          }

          thisClass.updateDeleteButtonState();
        }); // Update delete button stata on checkbox selection

        $(document).on('click', thisClass.config.table + " .main-checkbox", function (e) {
          thisClass.updateDeleteButtonState();
        }); // Delete Button Action

        $(document).on('click', thisClass.config.table + " .jfb-delete-button", function (e) {
          var _this2 = this;

          var sure = confirm('Are you sure you want to delete these variants?');
          var selectedVariants = thisClass.getSelectedVariants();

          if (sure && selectedVariants.length > 0) {
            selectedVariants.forEach(function (id) {
              // Remove variant from $variants
              thisClass.$variants.splice(thisClass.getVariantIndexByID(id), 1); // Remove variant from DOM

              $(thisClass.config.table + " tr#variant_" + id).remove();
              $(_this2).attr('disabled', true);
            });
          }
        }); // Edit Option Event Listener

        var EditOptionListener = function EditOptionListener(e) {
          var option = $(this).parent().data('option');
          var s_index = $(this).parent().data('s_index');
          var s_name = thisClass.$options[option][s_index];
          var value = $(this).val();
          console.log(option, s_index, s_name); // Check whether this is a new value

          var new_index = thisClass.$options[option].indexOf(value);
          var isNew = new_index <= -1; // If new, add it to the options and update top bar

          if (isNew) {
            // Add this to options
            new_index = thisClass.$options[option].push(value) - 1; // Add this to Selectors and Top Bar

            $(thisClass.config.selectors).find('.selector-' + option.replace(" ", "-")).append("\n            <a class=\"nav-link\" href=\"#\" data-option=\"".concat(option, "\" data-selector=\"").concat(value, "\" data-s_index=\"").concat(new_index, "\">").concat(value, "</a>\n          "));
          } // Update the variants field for this row with associated index


          var variant_id = $(this).parent().parent().attr('id').substr(8);
          var variant_index = thisClass.getVariantIndexByID(variant_id);
          thisClass.$variants[variant_index].fulfillName[option] = new_index + 1 + "";
          thisClass.$variants[variant_index].variantName = thisClass.generateVariantName(thisClass.$variants[variant_index].fulfillName);
          $(this).parent().attr('data-s_index', new_index); // Update shopSKU Field

          thisClass.updateShopSKU(variant_index); // console.log(thisClass.$variants[variant_index]);
          // Update selected status
        };

        $(document).on('blur', ".jfb_option_input", EditOptionListener); // Edit Price Field

        var EditPriceListener = function EditPriceListener(e) {
          var price = $(this).val();

          if (isNaN(parseFloat(price))) {
            return;
          }

          var variant_id = $(this).parent().parent().parent().attr('id').substr(8);
          var variant_index = thisClass.getVariantIndexByID(variant_id);
          var variant = thisClass.$variants[variant_index]; // Update $variants value

          variant.price = thisClass.roundNumber(price).toFixed(2); // thisClass.$variants[variant_index].price(thisClass.roundNumber(price));
          // Update Dependencies (profit field)

          if ("change" === e.type) {
            $(this).val(variant.price);
          }

          var profit = thisClass.roundNumber(thisClass.calculateProfit(variant));
          $(thisClass.config.table + " tr#variant_" + variant.id + " span.jfb-profit-field").text(profit);
        };

        $(document).on('keyup', thisClass.config.table + " .jfb-price-field", EditPriceListener);
        $(document).on('change', thisClass.config.table + " .jfb-price-field", EditPriceListener);

        var EditComparePriceListener = function EditComparePriceListener(e) {
          var price = $(this).val();

          if (isNaN(parseFloat(price))) {
            return;
          }

          var variant_id = $(this).parent().parent().parent().attr('id').substr(8);
          var variant_index = thisClass.getVariantIndexByID(variant_id);
          var variant = thisClass.$variants[variant_index]; // Update $variants value

          variant.comparePrice = thisClass.roundNumber(price).toFixed(2); // Update Dependencies (profit field)

          if ("change" === e.type) {
            $(this).val(variant.comparePrice);
          }
        };

        $(document).on('keyup', thisClass.config.table + " .jfb-compare-price-field", EditComparePriceListener);
        $(document).on('change', thisClass.config.table + " .jfb-compare-price-field", EditComparePriceListener); // Change all prices

        $(document).on('click', thisClass.config.table + " .price-change-all .dropdown-item", function () {
          var mode = $(this).data('mode');
          $(thisClass.config.table + ' .price-change-all .change-input').attr('data-mode', mode);
          $(thisClass.config.table + ' .price-change-all .change-input').css('display', 'flex');
        }); // Apply Button Click

        $(document).on('click', thisClass.config.table + " .price-change-all .apply-button", function () {
          var $inputContainer = $(this).parent().parent();
          var mode = $inputContainer.attr('data-mode'); // if "new", then set new value, otherwise multiply

          var value = $inputContainer.find('.input>input').val();

          if (isNaN(value) || null === value || "" === value) {
            return;
          }

          thisClass.$variants.forEach(function (v) {
            var new_price = "new" === mode ? thisClass.roundNumber(value) : thisClass.roundNumber(parseFloat(v.__cost__) * parseFloat(value)); // Set the price to $variant

            v.price = new_price.toFixed(2); // 2 decimal places
            // Update DOM Dependencies

            $(thisClass.config.table + ' tr#variant_' + v.id + ' .jfb-price-field').val(v.price); // Price Field

            $(thisClass.config.table + ' tr#variant_' + v.id + ' .jfb-profit-field').text(thisClass.calculateProfit(v)); // Price Field
          });
          $(this).val("");
          $inputContainer.hide();
        }); // Change all compare prices

        $(document).on('click', thisClass.config.table + " .compare-price-change-all .dropdown-item", function () {
          var mode = $(this).data('mode');
          $(thisClass.config.table + ' .compare-price-change-all .change-input').attr('data-mode', mode);
          $(thisClass.config.table + ' .compare-price-change-all .change-input').css('display', 'flex');
        }); // Apply Button Click Compare prices

        $(document).on('click', thisClass.config.table + " .compare-price-change-all .apply-button", function () {
          var $inputContainer = $(this).parent().parent();
          var mode = $inputContainer.attr('data-mode'); // if "new", then set new value, otherwise multiply

          var value = $inputContainer.find('.input>input').val();

          if (isNaN(value) || null === value || "" === value) {
            return;
          }

          thisClass.$variants.forEach(function (v) {
            var new_price = "new" === mode ? thisClass.roundNumber(value) : thisClass.roundNumber(parseFloat(v.__cost__) * parseFloat(value)); // Set the price to $variant

            v.comparePrice = new_price.toFixed(2); // 2 decimal places
            // Update DOM Dependencies

            $(thisClass.config.table + ' tr#variant_' + v.id + ' .jfb-compare-price-field').val(v.comparePrice);
          });
          $(this).val("");
          $inputContainer.hide();
        }); // Close Button Click

        $(document).on('click', thisClass.config.table + " .close-button", function () {
          $(this).parent().parent().css('display', 'none');
        });
      });
    }
  }, {
    key: "calculateProfit",
    value: function calculateProfit(variant) {
      var profit = parseFloat(variant.price) - parseFloat(variant.__cost__) - parseFloat(variant.__shipping__);
      return this.roundNumber(profit).toFixed(2);
    }
  }, {
    key: "getVariantIndexByID",
    value: function getVariantIndexByID(id) {
      return this.$variants.findIndex(function (el) {
        return el.id === parseInt(id);
      });
    }
  }, {
    key: "generateVariantName",
    value: function generateVariantName(fulfillName) {
      var _this3 = this;

      var v_name = [];
      Object.keys(this.$options).forEach(function (v) {
        v_name.push(_this3.$options[v][fulfillName[v] - 1]);
      });
      return v_name.join(',');
    }
  }, {
    key: "updateColumns",
    value: function updateColumns() {
      if (Object.keys(this.$options).length > 0) {
        var _this$$columns;

        (_this$$columns = this.$columns).splice.apply(_this$$columns, [3, 0].concat(_toConsumableArray(Object.keys(this.$options))));
      }
    }
  }, {
    key: "updateDOMTable",
    value: function updateDOMTable() {
      var titles = '';
      var buttons = '';
      var blankColumns = 3 + Object.keys(this.$options).length; // Generate Titles

      this.$columns.forEach(function (v, i) {
        titles += "<th scope=\"col\" class=\"\">".concat(v, "</th>");
      }); // Generate Buttons

      buttons += "\n        <th colspan=\"1\"><button class=\"btn btn-danger jfb-delete-button btn-sm\" disabled>Delete</button></th>\n        <th colspan=\"".concat(blankColumns, "\"></th>\n        <th colspan=\"1\"><button class=\"btn btn-primary btn-sm\">USA</button></th>\n        <th colspan=\"1\">\n          <div class=\"dropdown price-change-all\">\n            <button class=\"btn btn-primary btn-sm dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              Change All\n            </button>\n            <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n              <a class=\"dropdown-item\" data-mode=\"new\" href=\"#\">Set New Value</a>\n              <a class=\"dropdown-item\" data-mode=\"multiply\" href=\"#\">Multiply By</a>\n            </div>\n            <div class=\"change-input\" data-mode=\"new\">\n              <div class=\"input\">\n                <input type=\"text\" placeholder=\"Enter Value\" class=\"form-control\" />\n              </div>\n              <div class=\"buttons\">\n                <button type=\"submit\" class=\"btn btn-primary apply-button\">Apply</button>\n                <button type=\"close\" class=\"btn btn-danger close-button\">X</button>\n              </div>\n            </div>\n          </div>\n        </th>\n        <th colspan=\"1\"></th>\n        <th colspan=\"1\">\n          <div class=\"dropdown compare-price-change-all\">\n            <button class=\"btn btn-primary btn-sm dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              Change All\n            </button>\n            <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n              <a class=\"dropdown-item\" data-mode=\"new\" href=\"#\">Set New Value</a>\n              <a class=\"dropdown-item\" data-mode=\"multiply\" href=\"#\">Multiply By</a>\n            </div>\n            <div class=\"change-input\" data-mode=\"new\">\n              <div class=\"input\">\n                <input type=\"text\" placeholder=\"Enter Value\" class=\"form-control\" />\n              </div>\n              <div class=\"buttons\">\n                <button type=\"submit\" class=\"btn btn-primary apply-button\">Apply</button>\n                <button type=\"close\" class=\"btn btn-danger close-button\">X</button>\n              </div>\n            </div>\n          </div>\n        </th>\n    ");
      this.config.jQuery(this.config.table).find('thead>tr.titles').html(titles);
      this.config.jQuery(this.config.table).find('thead>tr.buttons').html(buttons);
    }
  }, {
    key: "generateSelectors",
    value: function generateSelectors() {
      var _this4 = this;

      var selectors = [{
        option: "All",
        selector: "All",
        index: -1
      }];

      if (Object.keys(this.$options).length > 0) {
        Object.keys(this.$options).forEach(function (v) {
          _this4.config.initialCounts[v] = _this4.$options[v].length;

          _this4.$options[v].forEach(function (element, index) {
            selectors.push({
              option: v,
              selector: element,
              index: index
            });
          });
        });
      }

      this.$selectors = selectors;
    }
  }, {
    key: "updateDOMSelectors",
    value: function updateDOMSelectors() {
      var selectors = "<div class=\"All\">";
      var option = "All";
      this.$selectors.forEach(function (v, i) {
        if (option !== v.option) {
          selectors += "</div><div class='selector-" + v.option.replace(" ", "-") + "'>";
        }

        selectors += "<a class=\"nav-link".concat(i == 0 ? ' active' : '', "\" href=\"#\" data-option=\"").concat(v.option, "\" data-selector=\"").concat(v.selector, "\" data-s_index=\"").concat(v.index, "\">").concat(v.selector, "</a>");
        option = v.option;
      });
      selectors += "</div>";
      this.config.jQuery(this.config.selectors).html(selectors);
    }
  }, {
    key: "generateContent",
    value: function generateContent() {
      var _this5 = this;

      var content = '';
      this.$variants.forEach(function (variant, index) {
        content += "\n      <tr id=\"variant_".concat(variant.id, "\">\n        <th scope=\"row\"><input class=\"main-checkbox\" type=\"checkbox\" name=\"checkbox[]\" checked /></th>\n        <td class=\"jfb-img-td\"><img src=\"").concat(variant.variantImages, "\" alt=\"\"></td>\n        <td><input disabled class=\"form-control shop-sku-field\" type=\"text\" name=\"shop_sku_").concat(variant.id, "\" value=\"").concat(variant.shopSKU, "\" /></td>");

        if (Object.keys(_this5.$options).length > 0) {
          Object.keys(_this5.$options).forEach(function (v, i) {
            content += "\n            <td data-option=\"".concat(v, "\" data-s_index=\"").concat(variant.fulfillName[v] - 1, "\"><input class=\"form-control jfb_option_input\" type=\"text\" name=\"color_of_").concat(variant.id, "\" value=\"").concat(_this5.$options[v][variant.fulfillName[v] - 1], "\" /></td>\n          ");
          });
        }

        content += "\n        <td class=\"jfb-nowrap\">USD$ ".concat(variant.__cost__, "</td>\n        <td>--</td> <!-- Shipping -->\n        <td>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">USD$</span>\n            </div>\n            <input class=\"form-control jfb-price-field\" type=\"text\" name=\"price_").concat(variant.id, "\" value=\"").concat(_this5.roundNumber(variant.price).toFixed(2), "\" />\n          </div>\n        </td> <!-- Price -->\n        <td class=\"jfb-nowrap\">USD$ <span class=\"jfb-profit-field\">").concat(_this5.roundNumber(_this5.calculateProfit(variant)).toFixed(2), "</span></td> <!-- Profit -->\n        <td>\n          <div class=\"input-group\">\n            <div class=\"input-group-prepend\">\n              <span class=\"input-group-text\" id=\"basic-addon1\">USD$</span>\n            </div>\n            <input class=\"form-control jfb-compare-price-field\" type=\"text\" name=\"comparePrice_").concat(variant.id, "\" value=\"").concat(_this5.roundNumber(variant.comparePrice).toFixed(2), "\" />\n          </div>\n        </td> <!-- Compared At Price -->\n        <td>").concat(variant.inventory, "</td>\n      </tr>\n      ");
      });
      return content;
    }
  }, {
    key: "getSelectedVariants",
    value: function getSelectedVariants() {
      var ids = [];
      this.config.jQuery(this.config.table + " .main-checkbox:checked").each(function () {
        ids.push($(this).parent().parent().attr('id').substr(8));
      });
      return ids;
    }
  }, {
    key: "updateDeleteButtonState",
    value: function updateDeleteButtonState() {
      if (this.getSelectedVariants().length > 0) {
        this.config.jQuery(this.config.table + " .jfb-delete-button").removeAttr('disabled');
      } else {
        this.config.jQuery(this.config.table + " .jfb-delete-button").attr('disabled', true);
      }
    }
  }, {
    key: "roundNumber",
    value: function roundNumber(num) {
      num = parseFloat(num);
      return Math.round((num + Number.EPSILON) * 100) / 100;
    }
  }, {
    key: "generateExportData",
    value: function generateExportData() {
      var exportData = {};
      exportData.options = this.$options;
      exportData.variants = this.$variants.map(function (v) {
        return {
          variantImages: v.variantImages,
          SKUId: v.SKUId,
          typeID: v.typeID,
          variantName: v.variantName,
          fulfillName: JSON.stringify(v.fulfillName),
          // Stringify JSON
          skuPrice: v.skuPrice,
          skuSalePrice: v.skuSalePrice,
          inventory: v.inventory,
          shipsFrom: v.shipsFrom,
          // New Attributes
          price: v.price,
          comparePrice: v.comparePrice,
          shopSKU: v.shopSKU
        };
      });
      return JSON.stringify(exportData);
    }
  }]);

  return JsonFormBuilder;
}();