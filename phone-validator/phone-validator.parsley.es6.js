var rules = {
	"default" : {
		minLength: 5,
		maxLength: 16,
		ErrorMessage: "Please enter a number between 5 and 16 digits"
	},
	"BR" : {
		minLength : 8,
		maxLength : 16,
		ErrorMessage: "Please enter a number between 8 and 16 digits"
	},
	"FR" : {
		minLength : 10,
		maxLength : 10,
		startsWith: ["06","07"],
		ErrorMessage: "Please enter a 10-digit number that starts with 06 or 07"
	},
	"IL" : {
		minLength: 9,
		maxLength: 10,
		customFunction: function(number){
			if (
				(number.substr(0,1) === "5" && number.length === 9) ||
				(number.substr(0,1) === "0" && number.length === 10)
				){
				return true;
			}
			return false;
		},
		ErrorMessage: "Please enter 9 digits number start with 5 or 10 digits number start with 0."
	},
	"KR" : {
		minLength : 11,
		maxLength : 11,
		startsWith: "01",
		ErrorMessage: "Please enter 01+ phone numbers (9 digits)." // 01 + 9 digits
	},
	"SA" : {
		minLength : 9,
		maxLength : 9,
		startsWith: "5",
		ErrorMessage: "9-digit number starts with 5" 
	},
	"AE" : {
		minLength : 9,
		maxLength : 9,
		startsWith: "5",
		ErrorMessage: "9-digit number starts with 5" 
	}
};



class PhoneValidator {
  constructor(options = {}){
    if (undefined !== options.countryInput){
      window.phone_validator_countryInput = options.countryInput; 
    }
	
	if (undefined !== options.rules){
		window.phone_validator_rules = options.rules; 
	} else {
		window.phone_validator_rules = window.rules;
	}

    window.phone_validator_getSelectedCountry = function(){
		var c = $(window.phone_validator_countryInput);
		
		if (undefined === c){
			console.error("Wrong countryInput. Please specify a valid jQuery Selector");
		} else {
			c = c.val();
		}

		if (undefined === c || null === c || "" === c || undefined === phone_validator_rules[c]){
			return "default";
		}
		return c;
    }
       
  	window.Parsley
        .addValidator('validPhone', {
			requirementType: 'string',
			validateString: function(value, requirement) {
				var user_country = window.phone_validator_getSelectedCountry();
				var user_rule = window.phone_validator_rules[user_country];
				
				// Minimum Length
				if (undefined !== user_rule.minLength){
					if (value.length < user_rule.minLength){
						window.Parsley.addMessage('en', 'validPhone',user_rule.ErrorMessage);
						return false;
					}
				}
				// Maximum Length
				if (undefined !== user_rule.maxLength){
					if (value.length > user_rule.maxLength){
						window.Parsley.addMessage('en', 'validPhone',user_rule.ErrorMessage);
						return false;
					}
				}
				// Number Should Start with Something Specified
				if (undefined !== user_rule.startsWith){
					if ("string" === typeof user_rule.startsWith){
						if (value.substr(0,user_rule.startsWith.length) !== user_rule.startsWith){
							window.Parsley.addMessage('en', 'validPhone',user_rule.ErrorMessage);
							return false;
						}
					}
					else if (Array.isArray(user_rule.startsWith)){
						var matched = false;
						for(var i=0; i<user_rule.startsWith.length; i++){
							if (value.substr(0,user_rule.startsWith[i].length) === user_rule.startsWith[i]){
								matched = true;
							}
						}
						if (!matched){
							window.Parsley.addMessage('en', 'validPhone',user_rule.ErrorMessage);
							return false;
						}
					}
				}
				// A complex check should be applied, we must use a custom function for that
				if (undefined !== user_rule.customFunction && "function" === typeof user_rule.customFunction){
					if (!user_rule.customFunction(value)){
						window.Parsley.addMessage('en', 'validPhone',user_rule.ErrorMessage);
						return false;
					}
				}

				return true;
			}
		});
    }
}