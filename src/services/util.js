angular
.module('incremental')
.service('util',
['$filter',
'$sce',
function($filter, $sce) {
  // Polyfill for some browsers
  Number.parseFloat = parseFloat;
  Number.isInteger = Number.isInteger || function (value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
  };
  
  var $scope;

  this.setScope = function (scope){
    $scope = scope;
  };

  this.updateCurrent = function (variable, new_value) {
    $scope[variable] = new_value;
  };

  this.prettifyNumber = function (number) {
    if(typeof number == 'undefined') {
      return;
    }
    if(number === "") {
      return "";
    }
    if(number == Infinity) {
      return "&infin;";
    }
    if(number > 1e6) {
      // Very ugly way to extract the mantisa and exponent from an exponential string
      var exponential = number.toPrecision(6).split("e");
      var exponent = parseFloat(exponential[1].split("+")[1]);
      // And it is displayed in with superscript
      return $filter('number')(exponential[0]) +
             " &#215; 10<sup>" +
             this.prettifyNumber(exponent) +
             "</sup>";
    }
    return $filter('number')(number);
  };
  
  this.trustHTML = function (html) {
    return $sce.trustAsHtml(html);
  };
}]);