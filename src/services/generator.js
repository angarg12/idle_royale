angular
.module('incremental')
.service('generator',
['player',
function(player) {  
  var $scope;
  var generators = {
		'Tier 1':{
			price:15,
			power:1,
			priceIncrease:1.05
		},
		'Tier 2':{
			price:100,
			power:10,
			priceIncrease:1.05
		},
		'Tier 3':{
			price:1100,
			power:80,
			priceIncrease:1.05
		},
		'Tier 4':{
			price:12000,
			power:470,
			priceIncrease:1.05
		},
		'Tier 5':{
			price:130000,
			power:2600,
			priceIncrease:1.05
		},
		'Tier 6':{
			price:1400000,
			power:14000,
			priceIncrease:1.05
		},
		'Tier 7':{
			price:2000000,
			power:78000,
			priceIncrease:1.05
		},
		'Tier 8':{
			price:330000000,
			power:440000,
			priceIncrease:1.05
		},
		'Tier 9':{
			price:5100000000,
			power:2600000,
			priceIncrease:1.05
		},
		'Tier 10':{
			price:75000000000,
			power:16000000,
			priceIncrease:1.05
		}
	};

  var keys = Object.keys(generators);

  this.getKeys = function(){
	return keys;
  };
	
		// FIXME send a copy
  this.getGenerators = function(){
	return generators;
  };
	
  this.setScope = function (scope){
    $scope = scope;
  };

  this.generatorPrice = function (name) {
	if(!player.getPlayer()) return;
    var level = player.getPlayer().generators[name].level;
    var price = generators[name].price * Math.pow(generators[name].priceIncrease, level);
    return Math.ceil(price);
  };
  
  this.buyGenerators = function (name, number) {
    var price = this.generatorPrice(name);
    var i = 0;
    // we need a loop since we use the ceil operator
    while (i < number && player.getPlayer().power >= price) {
      player.getPlayer().power -= price;
      player.getPlayer().generators[name].level++;
      price = this.generatorPrice(name);
      i++;
    }
  };
  
  this.generatorProduction = function (name) {
	  if(!player.getPlayer()) return;
    var baseProduction = generators[name].power;
    return $scope.upgradedProduction(baseProduction, name);
  };

  this.tierProduction = function (name) {
	  if(!player.getPlayer()) return;
    var baseProduction = generators[name].power *
                         player.getPlayer().generators[name].level;
    return $scope.upgradedProduction(baseProduction, name);
  };
  
  this.totalProduction = function () {
    var total = 0;
    for(var tier in generators) {
      total += this.tierProduction(tier);
    }
    return total;
};
}]);