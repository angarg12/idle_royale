angular
.module('incremental')
.service('generator',
['player',
'enemy',
Generator])
.service('generatorEnemy',
['enemy',
'player',
Generator]);

function Generator(actor, opponent) {
  var priceIncrease = 1.05;
	
  var generators = {
		'Tier 1':{
			price:15,
			power:1,
			upgrades: [
			  "Tier 1-1",
			  "Tier 1-2",
			  "Tier 1-3",
			  "Tier 1-4"
			]
		},
		'Tier 2':{
			price:100,
			power:10
		},
		'Tier 3':{
			price:1100,
			power:80
		},
		'Tier 4':{
			price:12000,
			power:470
		},
		'Tier 5':{
			price:130000,
			power:2600
		},
		'Tier 6':{
			price:1400000,
			power:14000
		},
		'Tier 7':{
			price:2000000,
			power:78000
		},
		'Tier 8':{
			price:330000000,
			power:440000
		}
	};

  var keys = Object.keys(generators);

  this.getKeys = function(){
	return keys;
  };
	
  var copy = angular.copy(generators);
  
  this.getGenerators = function(){
	return copy;
  };

  this.clear = function(){
	copy = angular.copy(generators);
  };
  
  this.generatorPrice = function (name) {
	if(!actor.data) return;
    var level = actor.data.generators[name].level;
    var price = generators[name].price * Math.pow(priceIncrease, level);
    return price;
  };
  
  this.maxBuy = function (name) {
	var level = actor.data.generators[name].level;
	  
    return Math.floor(Math.log(((actor.data.power*(priceIncrease-1))/(generators[name].price * Math.pow(priceIncrease, level)))+1)/Math.log(priceIncrease));
  };
  
  this.buyPrice = function (name, number) {
	var level = actor.data.generators[name].level;
	
	return generators[name].price*(Math.pow(priceIncrease, level)*(Math.pow(priceIncrease, number)-1))/(priceIncrease-1)
  };
  
  this.buyGenerators = function (name, number) {
	if(!Number.isInteger(number)){
	  return;
	}
	
    var price = this.generatorPrice(name);
    var i = 0;
	
	var price = this.buyPrice(name, number);
	if(price > actor.data.power){
		return false;
	}
	
    actor.data.power -= price;
    actor.data.generators[name].level+= number;
	
	return true;
  };
};