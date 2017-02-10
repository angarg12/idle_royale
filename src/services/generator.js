angular
.module('incremental')
.service('generator',
['player',
Generator])
.service('generatorEnemy',
['enemy',
Generator]);

function Generator(player) {
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

  this.generatorPrice = function (name) {
	if(!player.data) return;
    var level = player.data.generators[name].level;
    var price = generators[name].price * Math.pow(generators[name].priceIncrease, level);
    return price;
  };
  
  this.maxBuy = function (name) {
    
  };
  
  this.buyGenerators = function (name, number) {
    var price = this.generatorPrice(name);
    var i = 0;
    // we need a loop since we use the ceil operator
    while (i < number && player.data.power >= price) {
      player.data.power -= price;
      player.data.generators[name].level++;
      price = this.generatorPrice(name);
      i++;
    }
  };
};