!function(o){var e={};function t(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return o[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=o,t.c=e,t.d=function(o,e,r){t.o(o,e)||Object.defineProperty(o,e,{enumerable:!0,get:r})},t.r=function(o){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})},t.t=function(o,e){if(1&e&&(o=t(o)),8&e)return o;if(4&e&&"object"==typeof o&&o&&o.__esModule)return o;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:o}),2&e&&"string"!=typeof o)for(var n in o)t.d(r,n,function(e){return o[e]}.bind(null,n));return r},t.n=function(o){var e=o&&o.__esModule?function(){return o.default}:function(){return o};return t.d(e,"a",e),e},t.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},t.p="/",t(t.s=4)}({4:function(o,e,t){o.exports=t(5)},5:function(o,e){var t=window.jQuery;t(document).ready((function(){t((function(){t('[data-toggle="tooltip"]').tooltip()})),$RegisterLink="#RegisterLink",$LoginLink="#LoginLink",$GuestLink="#GuestLink",$ForgotLink="#ForgotLink",$Register_form=".register-form",$Login_form=".login-form",$Guest_form=".guest-form",$Forgot_form=".forgot-form",t(document).on("click",$RegisterLink,(function(o){t($Login_form).hide(),t($Guest_form).hide(),t($Forgot_form).hide(),t($Register_form).show()})),t(document).on("click",$LoginLink,(function(o){t($Register_form).hide(),t($Guest_form).hide(),t($Forgot_form).hide(),t($Login_form).show()})),t(document).on("click",$GuestLink,(function(o){t($Register_form).hide(),t($Login_form).hide(),t($Forgot_form).hide(),t($Guest_form).show()})),t(document).on("click",$ForgotLink,(function(o){t($Register_form).hide(),t($Login_form).hide(),t($Guest_form).hide(),t($Forgot_form).show()}))}))}});
//# sourceMappingURL=login-script.js.map