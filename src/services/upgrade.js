angular
.module('incremental')
.service('upgrade',
['player',
'generator',
Upgrade
])
.service('upgradeEnemy',
['enemy',
'generator',
Upgrade
]);

function Upgrade(player, generator) {
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
    "Tier 5-4": {
      "price" : 6500000000,
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
    "Tier 6-4": {
      "price" : 70000000000,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 7-1": {
      "price" : 200000000,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 7-2": {
      "price" : 1000000000,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 7-3": {
      "price" : 10000000000,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 7-4": {
      "price" : 1000000000000,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 8-1": {
      "price" : 3300000000,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 8-2": {
      "price" : 16500000000,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 8-3": {
      "price" : 165000000000,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 8-4": {
      "price" : 16500000000000,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 9-1": {
      "price" : 51000000000,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 9-2": {
      "price" : 255000000000,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 9-3": {
      "price" : 2550000000000,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 9-4": {
      "price" : 2.55e+14,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 10-1": {
      "price" : 750000000000,
      "description" : "Tier 10  production x2",
       
      "power" : 2
    },
    "Tier 10-2": {
      "price" : 3750000000000,
      "description" : "Tier 10  production x2",
      "power" : 2
    },
    "Tier 10-3": {
      "price" : 37500000000000,
      "description" : "Tier 10  production x2",
      "power" : 2
    },
    "Tier 10-4": {
      "price" : 3.75e+15,
      "description" : "Tier 10  production x2",
      "power" : 2
    }
  };
    
  var keys = Object.keys(upgrades);

  this.getKeys = function(){
	return keys;
  };

  	// FIXME send a copy
  this.getUpgrades = function(){
	return upgrades;
  };
	
  this.buyUpgrade = function (name) {
    var price = upgrades[name].price;
    if(!player.data.upgrades[name].bought && player.data.power >= price) {
      player.data.power -= price;
      player.data.upgrades[name].bought = true;
	  return true;
    }
	return false;
  };
}