angular
.module('incremental')
.service('upgrade',
['player',
'enemy',
Upgrade
])
.service('upgradeEnemy',
['enemy',
'player',
Upgrade
]);

function Upgrade(actor, opponent) {
  var upgrades = {
    "Tier 1-1": {
      "price" : 100,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 1-2": {
      "price" : 500,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 1-3": {
      "price" : 10000,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 1-4": {
      "price" : 100000,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 2-1": {
      "price" : 1000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 2-2": {
      "price" : 5000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 2-3": {
      "price" : 50000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 2-4": {
      "price" : 5000000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 3-1": {
      "price" : 10000,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 3-2": {
      "price" : 55000,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 3-3": {
      "price" : 550000,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 3-4": {
      "price" : 55000000,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 4-1": {
      "price" : 120000,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 4-2": {
      "price" : 600000,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 4-3": {
      "price" : 6000000,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 4-4": {
      "price" : 600000000,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 5-1": {
      "price" : 1300000,
      "description" : "Tier 5  production x2",
      "power" : 2
    },
    "Tier 5-2": {
      "price" : 6500000,
      "description" : "Tier 5  production x2",
      "power" : 2
    },
    "Tier 5-3": {
      "price" : 65000000,
      "description" : "Tier 5  production x2",
      "power" : 2
    },
    "Tier 6-1": {
      "price" : 14000000,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 6-2": {
      "price" : 70000000,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 6-3": {
      "price" : 700000000,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 7-1": {
      "price" : 200000000,
      "description" : "Tier 7  production x2",
      "power" : 2
    }
  };
    
  var keys = Object.keys(upgrades);

  this.getKeys = function(){
  if(!actor.data) return;
  if(actor.data.spells["Humility"].active 
    || opponent.data.spells["Humility"].active ){
		return [];
	}
	return keys;
  };
  
  var copy = angular.copy(upgrades);
  	// FIXME send a copy
  this.getUpgrades = function(){  if(actor.data.spells["Humility"].active 
    || opponent.data.spells["Humility"].active ){
		return {};
	}
	return copy;
  };

  this.clear = function(){
	copy = angular.copy(upgrades);
  };
	
  this.buyUpgrade = function (name) {
	if(actor.data.spells["Humility"].active 
    || opponent.data.spells["Humility"].active ){
		return false;
	}
    var price = upgrades[name].price;
    if(!actor.data.upgrades[name].bought && actor.data.power >= price) {
      actor.data.power -= price;
      actor.data.upgrades[name].bought = true;
	  return true;
    }
	return false;
  };
}