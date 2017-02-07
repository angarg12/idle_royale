angular
.module('incremental')
.service('upgrade',
['player',
'generator',
function(player, generator) {
  var $scope;
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
    "Tier 1-5": {
      "price" : 10000000,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 1-6": {
      "price" : 100000000,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 1-7": {
      "price" : 1000000000,
      "description" : "Tier 1 production x2",
      "power" : 2
    },
    "Tier 1-8": {
      "price" : 10000000000,
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
    "Tier 2-5": {
      "price" : 500000000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 2-6": {
      "price" : 50000000000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 2-7": {
      "price" : 50000000000000,
      "description" : "Tier 2  production x2",
      "power" : 2
    },
    "Tier 2-8": {
      "price" : 5.0e+16,
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
    "Tier 3-5": {
      "price" : 5500000000,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 3-6": {
      "price" : 550000000000,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 3-7": {
      "price" : 5.5e+14,
      "description" : "Tier 3  production x2",
      "power" : 2
    },
    "Tier 3-8": {
      "price" : 5.5e+17,
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
    "Tier 4-5": {
      "price" : 60000000000,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 4-6": {
      "price" : 6000000000000,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 4-7": {
      "price" : 6.0e+15,
      "description" : "Tier 4  production x2",
      "power" : 2
    },
    "Tier 4-8": {
      "price" : 6.0e+18,
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
    "Tier 5-5": {
      "price" : 650000000000,
      "description" : "Tier 5  production x2",
      "power" : 2
    },
    "Tier 5-6": {
      "price" : 65000000000000,
      "description" : "Tier 5  production x2",
      "power" : 2
    },
    "Tier 5-7": {
      "price" : 6.5e+16,
      "description" : "Tier 5  production x2",
      "power" : 2
    },
    "Tier 5-8": {
      "price" : 6.5e+19,
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
    "Tier 6-5": {
      "price" : 7000000000000,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 6-6": {
      "price" : 7.0e+14,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 6-7": {
      "price" : 7.0e+17,
      "description" : "Tier 6  production x2",
      "power" : 2
    },
    "Tier 6-8": {
      "price" : 7.0e+20,
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
    "Tier 7-5": {
      "price" : 1.0e+14,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 7-6": {
      "price" : 1.0e+16,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 7-7": {
      "price" : 1.0e+19,
      "description" : "Tier 7  production x2",
      "power" : 2
    },
    "Tier 7-8": {
      "price" : 1.0e+22,
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
    "Tier 8-5": {
      "price" : 1.65e+15,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 8-6": {
      "price" : 1.65e+17,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 8-7": {
      "price" : 1.65e+20,
      "description" : "Tier 8  production x2",
      "power" : 2
    },
    "Tier 8-8": {
      "price" : 1.65e+23,
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
    "Tier 9-5": {
      "price" : 2.55e+16,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 9-6": {
      "price" : 2.55e+18,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 9-7": {
      "price" : 2.55e+21,
      "description" : "Tier 9  production x2",
      "power" : 2
    },
    "Tier 9-8": {
      "price" : 2.55e+24,
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
    },
    "Tier 10-5": {
      "price" : 3.75e+17,
      "description" : "Tier 10  production x2",
      "power" : 2
    },
    "Tier 10-6": {
      "price" : 3.75e+19,
      "description" : "Tier 10  production x2",
      "power" : 2
    },
    "Tier 10-7": {
      "price" : 3.75e+22,
      "description" : "Tier 10  production x2",
      "power" : 2
    },
    "Tier 10-8": {
      "price" : 3.75e+25,
      "description" : "Tier 10  production x2",
      "power" : 2
    }
  };
    
  var keys = Object.keys(upgrades);

  this.getKeys = function(){
	return keys;
  };
  
  this.setScope = function (scope){
    $scope = scope;
	$scope.upgradedProduction = this.upgradedProduction;
  };
	
  	// FIXME send a copy
  this.getUpgrades = function(){
	return upgrades;
  };
	
  this.buyUpgrade = function (name) {
    if(player.data.upgrades[name].bought) {
      return;
    }
    var price = upgrades[name].price;
    if(player.data.power >= price) {
      player.data.power -= price;
      player.data.upgrades[name].bought = true;
    }
  };
  
  this.lastUpgradeTierPrice = function (tier) {
	var generators = generator.getGenerators()
    for(var upgrade in generators[tier].upgrades) {
      if(!player.data.upgrades[generators[tier].upgrades[upgrade]].bought) {
        return upgrades[generators[tier].upgrades[upgrade]].price;
      }
    }
    return null;
  };
  

  this.upgradedProduction = function (production, name) {
	if(!player.getPlayer()) return;
	var generators = generator.getGenerators()
    for(var upgrade in generators[name].upgrades) {
        if(player.getPlayer().upgrades[generators[name].upgrades[upgrade]].bought) {
          power = upgrades[generators[name].upgrades[upgrade]].power;
          production = $scope.upgradeApply(production, power);
        }
      }
      return production;
  };
}]);