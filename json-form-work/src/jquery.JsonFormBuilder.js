/*
JSON Form Builder
Author: A.S.M. Asaduzzaman (https://www.upwork.com/freelancers/~0183d400d9b82308ef)
*/


class JsonFormBuilder {
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

  constructor(json_data, options = {}){
    if ("string" === typeof json_data){
      this.StringData = json_data;
      this.JsonData = JSON.parse(json_data);
    } else if ("object" === typeof json_data){
      this.JsonData = json_data;
    }

    // Set Table Columns
    this.$columns = [
      "#", "Image", "SKU", "Cost", "Shipping", "Price", "Profit", "Compared At Price", "Inventory"
    ];

    // Configuration Options
    this.config = {};
    this.config.initialCounts = {};
    this.config.table = undefined !== options.table ? options.table : ".jfb-table";
    this.config.selectors = undefined !== options.selectors ? options.selectors : ".jfb-selector-nav";
    this.config.jQuery = undefined !== options.jQuery ? options.jQuery : window.jQuery;
    this.config.changeShippingFunction = undefined !== options.changeShippingFunction ? options.changeShippingFunction : callback=>{callback(0,"","")};
    this.config.shipping = undefined !== options.shippingOptions ? options.shippingOptions : {};
    this.config.price_cents = undefined !== options.price_cents ? options.price_cents : null;
    this.config.price_compare_cents = undefined !== options.price_compare_cents ? options.price_compare_cents : null;
    window.SHIPPING_INFO = this.config.shipping;
    // this.config.shipping.country = null;
    // this.config.shipping.option = null;
    // this.config.shipping.price = null;

    // Validate required options
    const required_fields = ["price_multiplier", "price_multiplier_mode", "compare_multiplier", "compare_multiplier_mode"];
    for(let field of required_fields){
      if (undefined === options[field]){
        console.error("Missing " + field + " in JsonFormBuilder() instanciation options");
        return;
      }
      if ("mode" === field.substr(field.length-4)){
        if ("multiply" !== options[field] && "fixed" !== options[field]){
          console.error(field + " in JsonFormBuilder() instanciation must be either of \"multiply\" or \"fixed\"");
          return;
        }
      } else {
        let int_val = parseInt(options[field]);
        if (isNaN(int_val)){
          console.error(field + " in JsonFormBuilder() instanciation must be a number");
          return;
        }
      }
    }

    // Now set the options
    this.config.price_multiplier = parseFloat(options.price_multiplier);
    this.config.price_multiplier_mode = options.price_multiplier_mode;
    this.config.compare_multiplier = parseFloat(options.compare_multiplier);
    this.config.compare_multiplier_mode = options.compare_multiplier_mode;

    // Store the data in formatted way
    this.$options = this.JsonData.options;
    this.$variants = [];
    let randomDigits = (10000000 + Math.floor(Math.random() * 90000000));
    // console.log(this.config.price_multiplier_mode, this.config.compare_multiplier_mode);
    this.JsonData.variants.forEach((v,i)=>{
      let cost = undefined !== v.skuSalePrice ? v.skuSalePrice : skuPrice;
      let costFloat = parseFloat(cost);
      let price = "multiply" === this.config.price_multiplier_mode ? (costFloat * this.config.price_multiplier) : (costFloat + this.config.price_multiplier);
      let comparedAtPrice = "multiply" === this.config.compare_multiplier_mode ? (costFloat * this.config.compare_multiplier) : (costFloat + this.config.compare_multiplier);

      // console.log(cost, this.config.price_multiplier, this.config.compare_multiplier, price, comparedAtPrice);

      this.$variants.push({
        id: i,
        variantImages: v.variantImages,
        SKUId: v.SKUId,
        typeID: v.typeID,
        variantName: v.variantName,
        fulfillName: JSON.parse(v.fulfillName), // Parse the JSON
        skuPrice: v.skuPrice,
        skuSalePrice: v.skuSalePrice,
        inventory: v.inventory,
        shipsFrom: v.shipsFrom,

        // New elements (__attr__ means hidden elements)
        __cost__: cost,
        __randomNumber__: randomDigits,
        __shipping__: this.config.shipping.price !== undefined ? this.config.shipping.price : 0,

        price: undefined !== v.price ? v.price : this.roundNumber(price).toFixed(2),
        comparePrice: undefined !== v.comparePrice ? v.comparePrice :  this.roundNumber(comparedAtPrice).toFixed(2),
        shopSKU: undefined !== v.shopSKU ? v.shopSKU : this.getShopSku(randomDigits, v.variantName)

      });
    });

    
    this.updateOptionsUseCount();

    // Set the Selectors
    this.generateSelectors();
    this.updateDOMSelectors();

    // Build the form from Data
    this.buildForm();

    this.updateDeleteButtonState();

    this.addEventListeners();

    return this;
  }

  getShopSku(randomDigits, variantName){
    return randomDigits + "-" + variantName.replace(/[^A-Za-z0-9.]+/g, "-"); 
  }

  updateShopSKU(variant_index){
    let variant = this.$variants[variant_index];

    variant.shopSKU = this.getShopSku(variant.__randomNumber__, variant.variantName);

    this.config.jQuery(this.config.table).find('tr#variant_'+variant.id).find('input.shop-sku-field').val(variant.shopSKU);
  }

  buildForm(){
    // First, update the columns with additional options
    this.updateColumns();
    this.updateDOMTable();

    let content = this.generateContent();

    // Now inject the contents in the table
    this.config.jQuery(this.config.table).find('tbody').html(content);
  }

  generateOptionsUseCount(){
    let options_use_count = {};

    Object.keys(this.$options).forEach(option=>{
      options_use_count[option] = [];
      this.$options[option].forEach((value,index)=>{
        options_use_count[option].push(0);
      });
    });

    this.$options_use_count = options_use_count;
  }

  updateOptionsUseCount(){
    this.generateOptionsUseCount();

    this.$variants.forEach(variant=>{
      Object.keys(variant.fulfillName).forEach(key=>{
        this.$options_use_count[key][variant.fulfillName[key]-1]++;
      });
    });
  }

  removeUnusedOptions(){
    // For each option
    Object.keys(this.$options).forEach(option=>{

      let deleteLater = [];
      // For each value of option
      this.$options[option].forEach((value,index)=>{
        if (this.$options_use_count[option][index] === 0){
          // console.log("Found zero length for : " + this.$options[option][index]);
          // update next options in $variants and DOM by -1
          for(let i=index+1; i<this.$options[option].length; i++){
            let nextOption = this.$options[option][i];
            // console.log(nextOption, i);

            // update top DOM list
            this.config.jQuery(this.config.selectors+" a.nav-link[data-option='"+option+"'][data-s_index='"+(i)+"']").attr('data-s_index', (i-1));

            // update $variants.fulfillName[option] by -1 for 
            // update tr#variant_# [data-option="OPTION"] data-s_index by -1
            this.$variants.filter((v)=>{
                // console.log("Finding " + (i+1) + " index for " + nextOption);
                return v.fulfillName[option] === (i+1)+"";
            }).forEach(variant=>{
              // console.log("Found at",variant.variantName, variant.fulfillName[option]);
              // console.log("Before update",variant.variantName, " = ", variant.fulfillName[option]);
              variant.fulfillName[option] = (i)+"";
              // console.log("After update",variant.variantName, " = ", variant.fulfillName[option]);
              // console.log(variant);
              this.config.jQuery(this.config.table+" tr#variant_"+variant.id+" td[data-option='"+option+"']").attr('data-s_index', (i-1)+"");
            });
          }

          // remove this option from $options and $options_use_count and DOM top list
          deleteLater.push({index,option,value});
        }
      });

      deleteLater.forEach(d=>{
        // Update Index
        d.index = this.$options[d.option].findIndex(o=>{return o === d.value});
        // console.log(this.$options[d.option]);
        // console.log("Deleting " + d.index + "-" + d.value);
        this.$options[option].splice(d.index,1);
        this.$options_use_count[option].splice(d.index,1);
        // console.log(this.$options[d.option]);
        this.config.jQuery(this.config.selectors+" a.nav-link[data-option='"+d.option+"'][data-selector='"+d.value+"']").remove();
      });

    });
  }

  calculateAndUpdateProfit(v){
    let profit = this.calculateProfit(v);
    let $profitTD = $(this.config.table + " tr#variant_"+v.id).find('.jfb-profit-field').parent();

    // Update DOM to success or danger
    if (parseFloat(profit) < 0){
      $profitTD.removeClass('text-success');
      $profitTD.addClass('text-danger');
    } else {
      $profitTD.removeClass('text-danger');
      $profitTD.addClass('text-success');
    }

    // Update profit field
    $(this.config.table + " tr#variant_"+v.id).find('.jfb-profit-field').text(profit);
  }

  trancatedValue(value, maximumLength=10, expander="..."){
    if (value === undefined || typeof value !== "string" ){
      return '';
    }
    if (value.length <= maximumLength){
      return value;
    }
    return value.substring(0,maximumLength-expander.length) + expander;
  }

  addEventListeners(){
    let $ = this.config.jQuery;
    const thisClass = this;

    // Only add these Listeners on First Instanciation
    //if (undefined === window.JFB_EVENT_LISTENERS_REGISTERED || false === window.JFB_EVENT_LISTENERS_REGISTERED){
    //  window.JFB_EVENT_LISTENERS_REGISTERED = true;
      $(document).ready(function(){
        // Top Selector Event Listener
        $(document).off('click',thisClass.config.selectors + "  a.nav-link").on('click', thisClass.config.selectors + "  a.nav-link", function(e){
          e.preventDefault();
          
          let key = $(this).attr('data-selector');
          let option = $(this).attr('data-option');
          let s_index = parseInt($(this).attr('data-s_index'));
          
          // Change Selected Selector
          $(thisClass.config.selectors + "  a.active").removeClass('active');
          $(this).addClass('active');
  
          if ("All" === key){
            $('.main-checkbox').each(function(){
              $(this).prop('checked', true);
            });
          } else if ("None" === key){
            $('.main-checkbox').each(function(){
              $(this).prop('checked', false);
            });
          } else {
            // Uncheck All
            $('.main-checkbox').each(function(){
              $(this).prop('checked', false);
            });
            // Check All with that option
            thisClass.$variants.forEach((v)=>{
              // console.log("Finding to check : " + (s_index+1));
              if (v.fulfillName[option] === (s_index + 1) + ""){
                $("#variant_"+v.id).find(".main-checkbox").prop('checked', true);
              }
            });
          }
  
          thisClass.updateDeleteButtonState();
        });
  
        // Update delete button stata on checkbox selection
        $(document).off('click',thisClass.config.table + " .main-checkbox").on('click', thisClass.config.table + " .main-checkbox", function(e){
          thisClass.updateDeleteButtonState();
        });
  
        // Delete Button Action
        $(document).off('click',thisClass.config.table + " .jfb-delete-button").on('click', thisClass.config.table + " .jfb-delete-button", function(e){
          // console.log('delete action called');return;
          let sure = false;
          if (typeof window.rushModalConfirm === 'function'){
            rushModalConfirm({title: 'Confirm',
	 				   content: 'Are you sure you want to delete these variants?',
                  buttons: {ok: 'Yes Delete', cancel: 'Cancel' },	
                  callback: function(e){
                    if (e == 'Ok') {
                      $("#RushModal").modal("hide");

                      sure = true;

                      let selectedVariants = thisClass.getSelectedVariants();

                      if (sure && selectedVariants.length > 0){
  
                        selectedVariants.forEach(id=>{
                          if (thisClass.$variants.length===1){
                            alert('At least one variant must exist.');
                            return;
                          }
                          // Remove variant from $variants
                          thisClass.$variants.splice(thisClass.getVariantIndexByID(id),1);
              
                          // Remove variant from DOM
                          $(thisClass.config.table + " tr#variant_" + id).remove();
              
                          $(this).attr('disabled',true);
                          
                          // Update Delete Fields
                          thisClass.updateOptionsUseCount();
                          thisClass.removeUnusedOptions();
                        });
                      }

                      return true;
                    }
	  			   		  }	
	  			   	});
          } else {
            sure = confirm('Are you sure you want to delete these variants?');
            let selectedVariants = thisClass.getSelectedVariants();
    
            // console.log(sure);
            if (sure && selectedVariants.length > 0){
    
              selectedVariants.forEach(id=>{
                if (thisClass.$variants.length===1){
                  alert('At least one variant must exist.');
                  return;
                }
                // Remove variant from $variants
                thisClass.$variants.splice(thisClass.getVariantIndexByID(id),1);
    
                // Remove variant from DOM
                $(thisClass.config.table + " tr#variant_" + id).remove();
    
                $(this).attr('disabled',true);
                
                // Update Delete Fields
                thisClass.updateOptionsUseCount();
                thisClass.removeUnusedOptions();
              });
            }
            // console.error("Function window.rushModalConfirm not found.");
          }
        });

        // Change Shipping Action
        $(document).off('click',thisClass.config.table + " #changeShipping").on('click', thisClass.config.table + " #changeShipping", function(e){
          let button = $(this);
          thisClass.config.changeShippingFunction(function(price=0, country=null, option=null){
            thisClass.config.shipping.price = price;
            thisClass.config.shipping.country = country;
            thisClass.config.shipping.option = option;

            window.SHIPPING_INFO = thisClass.config.shipping;

            thisClass.$variants.forEach(function(v){
              // console.log(v.id);
              // update variant
              v.__shipping__ = thisClass.roundNumber(price);
              // Change the shipping price
              $(thisClass.config.table + " tr#variant_"+v.id).find('.shipping-cost').text("US$ "+thisClass.roundNumber(price).toFixed(2));
              // Update profit for each element
              thisClass.calculateAndUpdateProfit(v);
            });
    
            button.find('.country').text(thisClass.trancatedValue(country, 13));
            button.find('.option').text(thisClass.trancatedValue(option, 13));
          }, {country:thisClass.config.shipping.country, option:thisClass.config.shipping.option});
        });

        // Edit Option Event Listener
        let EditOptionListener = function(e){
          let option = $(this).parent().attr('data-option');
          let s_index = $(this).parent().attr('data-s_index');
          let s_name = thisClass.$options[option][s_index];
  
          let value = $(this).val();
          let originalValue = $(this).attr('value');
          let thisField = $(this);

          let variant_id = $(this).parent().parent().attr('id').substr(8);
          let variant_index = thisClass.getVariantIndexByID(variant_id);
  
          // Can't be empty
          if ("" === value || null === value){
            $(this).val(s_name);
            return;
          }
          // console.log(option,s_index,s_name);
  
          // Check whether this is a new value
          let new_index = thisClass.$options[option].indexOf(value);
          let isNew = new_index <= -1;
          // If new, add it to the options and update top bar
          if (isNew){
            // Add this to options
            new_index = thisClass.$options[option].push(value) - 1 ;
  
            // Add this to Selectors and Top Bar
            $(thisClass.config.selectors).find('.selector-'+option.replace(" ","-")).append(`
              <a class="nav-link" href="#" data-option="${option}" data-selector="${value}" data-s_index="${new_index}">${value}</a>
            `);
            console.log("New - " + value);
          } else { // If not new, check whether it is unique for all variants
            // check for uniqueness
            console.log("Existing - Check uniqueness - " + value);
            let unique = true;
            thisClass.$variants.filter(v=>{
              return v.fulfillName[option] === new_index+1+""
            }).forEach(v=>{
              let thisfulfillName = {...thisClass.$variants[variant_index].fulfillName};
              thisfulfillName[option] = new_index+1+"";
              let thisString = JSON.stringify(thisfulfillName);
              let compareToString = JSON.stringify(v.fulfillName);

              // console.log(thisString,variant_id,compareToString,v.id);

              if (thisString === compareToString && thisClass.$variants[variant_index].id !== v.id){
              // console.log("Matched",thisString,variant_id,compareToString,v.id);
                unique = false;
              }

            });

            if (!unique){
              alert("This options combination is not unique");
              thisField.val(originalValue);
              return;
            }
          }
  
          // Update the variants field for this row with associated index
          thisClass.$variants[variant_index].fulfillName[option] = new_index + 1 +"";
          thisClass.$variants[variant_index].variantName = thisClass.generateVariantName(thisClass.$variants[variant_index].fulfillName);
          $(this).parent().attr('data-s_index', new_index);
          thisField.attr('value', value);
          
          // Update shopSKU Field
          // thisClass.updateShopSKU(variant_index);
  
          // Update options use count
          thisClass.updateOptionsUseCount();
          thisClass.removeUnusedOptions();
          
          // console.log(thisClass.$variants[variant_index]);
          // Update selected status
        }
        $(document).off('blur',".jfb_option_input").on('blur', ".jfb_option_input", EditOptionListener);

        // Edit shop sku field
        $(document).off('blur',thisClass.config.table + ' .shop-sku-field').on('blur', thisClass.config.table + ' .shop-sku-field', function(){
          let thisField = $(this);
          let variant_id = thisField.parent().parent().attr('id').substr(8);
          let variant_index = thisClass.getVariantIndexByID(variant_id);
          let thisValue = thisField.val();
          let originalValue = $(this).attr('value');

          // check for uniqueness
          let unique = true;
          $(thisClass.config.table + ' .shop-sku-field').each(function(){
            let value_matched = $(this).val() === thisValue;
            if (value_matched && $(this)[0] !== thisField[0]){
              unique = false;
            }
          });

          if (unique){
            thisClass.$variants[variant_index].shopSKU = thisValue;
            thisField.attr('value', thisValue);
          } else {
            alert("This SKU already exists on other variants.");
            thisField.val(originalValue);
          }

          // console.log(value, val2);
        });
  
        // Edit Price Field
        let EditPriceListener = function(e){
          let price = $(this).val();
          
          if (isNaN(parseFloat(price))){
            return;
          }
  
  
          let variant_id = $(this).parent().parent().parent().attr('id').substr(8);
          let variant_index = thisClass.getVariantIndexByID(variant_id);
          let variant = thisClass.$variants[variant_index];
  
          // Update $variants value
          variant.price = thisClass.roundNumber(price).toFixed(2) ;
          // thisClass.$variants[variant_index].price(thisClass.roundNumber(price));
          // Update Dependencies (profit field)
          if ("change" === e.type){
            $(this).val(variant.price);
          }
          thisClass.calculateAndUpdateProfit(variant);
        };
        $(document).off('keyup',thisClass.config.table + " .jfb-price-field").on('keyup', thisClass.config.table + " .jfb-price-field", EditPriceListener);
        $(document).off('change',thisClass.config.table + " .jfb-price-field").on('change', thisClass.config.table + " .jfb-price-field", EditPriceListener);
  
        let EditComparePriceListener = function(e){
          let price = $(this).val();
          
          if (isNaN(parseFloat(price))){
            return;
          }
  
          let variant_id = $(this).parent().parent().parent().attr('id').substr(8);
          let variant_index = thisClass.getVariantIndexByID(variant_id);
          let variant = thisClass.$variants[variant_index];
  
          // Update $variants value
          variant.comparePrice = thisClass.roundNumber(price).toFixed(2);
          // Update Dependencies (profit field)
          if ("change" === e.type){
            $(this).val(variant.comparePrice);
          }
        };
        $(document).off('keyup',thisClass.config.table + " .jfb-compare-price-field").on('keyup', thisClass.config.table + " .jfb-compare-price-field", EditComparePriceListener);
        $(document).off('change',thisClass.config.table + " .jfb-compare-price-field").on('change', thisClass.config.table + " .jfb-compare-price-field", EditComparePriceListener);
  
        // Change all prices
        $(document).off('click',thisClass.config.table + " .price-change-all .dropdown-item").on('click', thisClass.config.table + " .price-change-all .dropdown-item", function(){
          let mode = $(this).data('mode');
  
          $(thisClass.config.table + ' .price-change-all .change-input').attr('data-mode',mode);
          $(thisClass.config.table + ' .price-change-all .change-input').css('display','flex');
        });
  
        // Apply Button Click
        $(document).off('click',thisClass.config.table + " .price-change-all .apply-button").on('click', thisClass.config.table + " .price-change-all .apply-button", function(){
          let $inputContainer = $(this).parent().parent();
          let mode = $inputContainer.attr('data-mode'); // if "new", then set new value, otherwise multiply
  
  
          let value = $inputContainer.find('.input>input').val();
  
          if (isNaN(value) || null === value || "" === value){
            return;
          }
  
          thisClass.$variants.forEach(v=>{
            let new_price = "new" === mode ? thisClass.roundNumber(value) : thisClass.roundNumber(parseFloat(v.__cost__) * parseFloat(value));
            // Set the price to $variant
            v.price = new_price.toFixed(2); // 2 decimal places

            if ("multiply" === mode && thisClass.config.price_cents !== null){
              // Change the cents. For Example: 4.57 -> 4.99
              v.price = v.price.split('.')[0] + '.' + thisClass.config.price_cents;
            }
  
            // Update DOM Dependencies
            $(thisClass.config.table + ' tr#variant_' + v.id + ' .jfb-price-field').val(v.price); // Price Field
            thisClass.calculateAndUpdateProfit(v);
  
          });
  
          $(this).val("");
          $inputContainer.hide();
  
        });
  
        // Change all compare prices
        $(document).off('click',thisClass.config.table + " .compare-price-change-all .dropdown-item").on('click', thisClass.config.table + " .compare-price-change-all .dropdown-item", function(){
          let mode = $(this).data('mode');
  
          $(thisClass.config.table + ' .compare-price-change-all .change-input').attr('data-mode',mode);
          $(thisClass.config.table + ' .compare-price-change-all .change-input').css('display','flex');
        });
  
        // Apply Button Click Compare prices
        $(document).off('click',thisClass.config.table + " .compare-price-change-all .apply-button").on('click', thisClass.config.table + " .compare-price-change-all .apply-button", function(){
          let $inputContainer = $(this).parent().parent();
          let mode = $inputContainer.attr('data-mode'); // if "new", then set new value, otherwise multiply
  
  
          let value = $inputContainer.find('.input>input').val();
  
          if (isNaN(value) || null === value || "" === value){
            return;
          }
  
          thisClass.$variants.forEach(v=>{
            let new_price = "new" === mode ? thisClass.roundNumber(value) : thisClass.roundNumber(parseFloat(v.__cost__) * parseFloat(value));
            // Set the price to $variant
            v.comparePrice = new_price.toFixed(2); // 2 decimal places

            if ("multiply" === mode && thisClass.config.price_compare_cents !== null){
              // Change the cents. For Example: 4.57 -> 4.99
              v.comparePrice = v.comparePrice.split('.')[0] + '.' + thisClass.config.price_compare_cents;
            }
  
            // Update DOM Dependencies
            $(thisClass.config.table + ' tr#variant_' + v.id + ' .jfb-compare-price-field').val(v.comparePrice);
          });
  
          $(this).val("");
          $inputContainer.hide();
  
        });
  
        // Close Button Click
        $(document).off('click',thisClass.config.table + " .close-button").on('click', thisClass.config.table + " .close-button", function(){
          $(this).parent().parent().css('display','none');
        });
      });
    //} else {
      // Do nothing
    //}
  }

  calculateProfit(variant){
    let profit = parseFloat(variant.price) - parseFloat(variant.__cost__) - parseFloat(variant.__shipping__);
    return this.roundNumber(profit).toFixed(2);
  }

  getVariantIndexByID(id){
    return this.$variants.findIndex((el)=>{return el.id === parseInt(id)});
  }

  generateVariantName(fulfillName){
    let v_name = [];
    Object.keys(this.$options).forEach(v=>{
      v_name.push(this.$options[v][fulfillName[v]-1]);
    });

    return v_name.join(',');
  }

  updateColumns(){
    if (Object.keys(this.$options).length > 0){
      this.$columns.splice(3, 0, ...Object.keys(this.$options));
    }
  }

  updateDOMTable(){
    let titles = '';
    let buttons = '';
    let blankColumns = 3 + Object.keys(this.$options).length;

    // Generate Titles
    this.$columns.forEach((v,i)=>{
      titles += `<th scope="col" class="">${v}</th>`;
    });

    // Generate Buttons
    buttons += `
        <th colspan="1"><button class="btn btn-danger jfb-delete-button btn-sm" disabled>Delete</button></th>
        <th colspan="${blankColumns}"></th>
        <th colspan="1" id="changeShipping">
          <button class="btn btn-primary btn-sm">
            <span class="country">${this.trancatedValue(this.config.shipping.country, 13)}</span> - 
            <span class="option">${this.trancatedValue(this.config.shipping.option, 13)}</span>
          </button>
        </th>
        <th colspan="1">
          <div class="dropdown price-change-all">
            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Change All
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" data-mode="new" href="#">Set New Value</a>
              <a class="dropdown-item" data-mode="multiply" href="#">Multiply By</a>
            </div>
            <div class="change-input" data-mode="new">
              <div class="input">
                <input type="text" placeholder="Enter Value" class="form-control" />
              </div>
              <div class="buttons">
                <button type="submit" class="btn btn-primary apply-button">Apply</button>
                <button type="close" class="btn btn-danger close-button">X</button>
              </div>
            </div>
          </div>
        </th>
        <th colspan="1"></th>
        <th colspan="1">
          <div class="dropdown compare-price-change-all">
            <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Change All
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" data-mode="new" href="#">Set New Value</a>
              <a class="dropdown-item" data-mode="multiply" href="#">Multiply By</a>
            </div>
            <div class="change-input" data-mode="new">
              <div class="input">
                <input type="text" placeholder="Enter Value" class="form-control" />
              </div>
              <div class="buttons">
                <button type="submit" class="btn btn-primary apply-button">Apply</button>
                <button type="close" class="btn btn-danger close-button">X</button>
              </div>
            </div>
          </div>
        </th>
    `;
    
    this.config.jQuery(this.config.table).find('thead>tr.titles').html(titles);
    this.config.jQuery(this.config.table).find('thead>tr.buttons').html(buttons);
  }

  generateSelectors(){
    let selectors = [{option:"All",selector:"All",index:-1},{option:"None",selector:"None",index:-2}];
    if (Object.keys(this.$options).length > 0){
      Object.keys(this.$options).forEach((v)=>{
        this.config.initialCounts[v] = this.$options[v].length;
        this.$options[v].forEach((element, index) => {
          selectors.push({option:v, selector:element, index: index});
        });
      });
    }
    this.$selectors = selectors;
  }

  updateDOMSelectors(){
    let selectors = `<div class="All">`;
    let option = "All";

    this.$selectors.forEach((v,i)=>{
      if (option !== v.option){
        selectors += "</div><div class='selector-"+v.option.replace(" ","-")+"'>";
      }
      selectors += `<a class="nav-link${i==0 ? ' active':''}" href="#" data-option="${v.option}" data-selector="${v.selector}" data-s_index="${v.index}">${v.selector}</a>`;
      option = v.option;
    });
    selectors += "</div>";

    this.config.jQuery(this.config.selectors).html(selectors);
  }

  generateContent(){
    let content = '';
    // Original Checkbox Was: <input class="main-checkbox" type="checkbox" name="checkbox[]" checked />
    // Updated to Bootstrap-4 Custom Checkbox
    this.$variants.forEach((variant, index)=>{
      content += `
      <tr id="variant_${variant.id}">
        <th scope="row">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input main-checkbox" id="customCheck_${variant.id}" name="checkbox[]" checked>
            <label class="custom-control-label" for="customCheck_${variant.id}"></label>
          </div>
        </th>
        <td class="jfb-img-td"><img src="${variant.variantImages}" alt=""></td>
        <td><input class="form-control shop-sku-field" type="text" name="shop_sku_${variant.id}" value="${variant.shopSKU}" /></td>`;

      if (Object.keys(this.$options).length > 0){
        Object.keys(this.$options).forEach((v,i) => {
          content+= `
            <td data-option="${v}" data-s_index="${variant.fulfillName[v]-1}"><input class="form-control jfb_option_input" type="text" name="color_of_${variant.id}" value="${this.$options[v][variant.fulfillName[v]-1]}" /></td>
          `;
        });
      }

      content += `
        <td class="jfb-nowrap">US$ ${variant.__cost__}</td>
        <td class="shipping-cost">${this.config.shipping.price !== undefined ? "US$ " + this.roundNumber(this.config.shipping.price).toFixed(2) : "--"}</td> <!-- Shipping -->
        <td>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">US$</span>
            </div>
            <input class="form-control jfb-price-field" type="text" name="price_${variant.id}" value="${this.roundNumber(variant.price).toFixed(2)}" />
          </div>
        </td> <!-- Price -->
        <td class="jfb-nowrap ${parseFloat(this.calculateProfit(variant)) < 0 ? 'text-danger' : 'text-success'}">US$ <span class="jfb-profit-field">${this.roundNumber( this.calculateProfit(variant) ).toFixed(2)}</span></td> <!-- Profit -->
        <td>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">US$</span>
            </div>
            <input class="form-control jfb-compare-price-field" type="text" name="comparePrice_${variant.id}" value="${this.roundNumber(variant.comparePrice).toFixed(2)}" />
          </div>
        </td> <!-- Compared At Price -->
        <td>${variant.inventory}</td>
      </tr>
      `;
    });

    return content;
  }

  getSelectedVariants(){
    let ids = [];

    this.config.jQuery(this.config.table + " .main-checkbox:checked").each(function(){
      ids.push($(this).parent().parent().parent().attr('id').substr(8));
    });

    return ids;
  }

  updateDeleteButtonState(){
    if (this.getSelectedVariants().length > 0){
      this.config.jQuery(this.config.table + " .jfb-delete-button").removeAttr('disabled');
    } else {
      this.config.jQuery(this.config.table + " .jfb-delete-button").attr('disabled', true);
    }
  }

  roundNumber(num){
    num = parseFloat(num);
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  generateExportData(){
    this.updateOptionsUseCount();
    this.removeUnusedOptions();

    let exportData = {};

    exportData.options = this.$options;
    exportData.variants = this.$variants.map(v=>{
      return {
        variantImages: v.variantImages,
        SKUId: v.SKUId,
        typeID: v.typeID,
        variantName: v.variantName,
        fulfillName: JSON.stringify(v.fulfillName), // Stringify JSON
        skuPrice: v.skuPrice,
        skuSalePrice: v.skuSalePrice,
        inventory: v.inventory,
        shipsFrom: v.shipsFrom,
        
        // New Attributes
        price: v.price,
        comparePrice: v.comparePrice,
        shopSKU: v.shopSKU
      }
    });

    return JSON.stringify(exportData);
  }
}