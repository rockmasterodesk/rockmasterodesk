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

    // Store the data in formatted way
    this.$options = this.JsonData.options;
    this.$variants = [];
    this.JsonData.variants.forEach((v,i)=>{
      this.$variants.push({
        id: i,
        ...v
      });
    });

    // Configuration Options
    this.config = {};
    this.config.table = undefined !== options.table ? options.table : ".jfb-table";

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
    this.config.price_multiplier = options.price_multiplier;
    this.config.price_multiplier_mode = options.price_multiplier_mode;
    this.config.compare_multiplier = options.compare_multiplier;
    this.config.compare_multiplier_mode = options.compare_multiplier_mode;

    // Build the form from Data
    this.buildForm();

    return this;
  }

  buildForm(){
    let content = '';

    this.$variants.forEach((variant, index)=>{
      let fulfillNameJson = JSON.parse(variant.fulfillName);
      let cost = undefined !== variant.skuSalePrice ? variant.skuSalePrice : skuPrice;
      let SKU =   (10000000 + Math.floor(Math.random() * 90000000)) // Random Digits
                + "-"
                + variant.variantName.replace(/[^A-Za-z0-9.]+/g, "-"); // The String
      let price = "multiply" === this.config.price_multiplier_mode ? (cost * this.config.price_multiplier) : (cost + this.config.price_multiplier);
      let comparedAtPrice = "multiply" === this.config.compare_multiplier_mode ? (cost * this.config.compare_multiplier) : (cost + this.config.compare_multiplier);
      let shipping = 0;
      
      content += `
      <tr id="${variant.id}">
        <th scope="row"><input type="checkbox" name="checkbox[]" /></th>
        <td class="jfb-img-td"><img src="${variant.variantImages}" alt=""></td>
        <td><input class="form-control" type="text" name="" value="${SKU}" /></td>
        <td><input class="form-control" type="text" name="" value="${this.$options.Color[fulfillNameJson.Color-1]}" /></td>
        <td><input class="form-control" type="text" name="" value="${this.$options.Width[fulfillNameJson.Width-1]}" /></td>
        <td><input class="form-control" type="text" name="" value="${this.$options.Length[fulfillNameJson.Length-1]}" /></td>
        <td><input class="form-control" type="text" name="" value="${variant.shipsFrom}" /></td>
        <td>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">USD$</span>
            </div>
            <input class="form-control" type="text" name="" value="${cost}" />
          </div>
        </td>
        <td>--</td> <!-- Shipping -->
        <td>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">USD$</span>
            </div>
            <input class="form-control" type="text" name="" value="${price}" />
          </div>
        </td> <!-- Price -->
        <td>${price-cost-shipping}</td> <!-- Profit -->
        <td>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">USD$</span>
            </div>
            <input class="form-control" type="text" name="" value="${comparedAtPrice}" />
          </div>
        </td> <!-- Compared At Price -->
        <td>${variant.inventory}</td>
      </tr>
      `;
    });
    
    // console.log(content);

    // Now inject the contents in the table
    window.jQuery(this.config.table).find('tbody').html(content);
  }
}