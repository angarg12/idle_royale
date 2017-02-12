angular
.module('incremental')
.service('spell',
['player',
'enemy',
Spell
])
.service('spellEnemy',
['enemy',
'player',
Spell
]);

function Spell(actor, opponent) {
  var spells = {	  
	'Surge':{
		description: 'Increase production by 10%',
		price: 1e4,
		duration: 60,
		cooldown: 150
	}, 
	'Drain':{
		description: 'Decrease enemy production by 10%',
		price: 1e4,
		duration: 60,
		cooldown: 150
	}, 
	'Armageddon':{
		description: 'Destroy all generators for all players',
	    effect: function(){
			for(var generator in actor.data.generators){
			  actor.data.generators[generator].level = 0;
			}
			for(var generator in opponent.data.generators){
			  opponent.data.generators[generator].level = 0;
			}
			actor.data.generators['Tier 1'].level = 1;
			opponent.data.generators['Tier 1'].level = 1;
		},
		price: 1,
		charges: 1
	}, 
	'Humility':{
		description: 'Disable all upgrades for all players',
	    effect: function(){
			  actor.data.upgrades = {};
			  opponent.data.upgrades = {};
		},
		price: 2e6,
		duration: Infinity,
		charges: 1
	}, 
	'Weakness':{
		description: 'Set power to 0 for all players',
	    effect: function(){
			actor.data.power = 0; 
			opponent.data.power = 0;
		},
		price: 1.5e10,
		charges: 1
	}
  };
  
  var keys = Object.keys(spells);

  this.getKeys = function(){
	return keys;
  };

  var copy = angular.copy(spells);

  this.getSpells = function(){
	return copy;
  };

  this.clear = function(){
	copy = angular.copy(spells);
  };
	
  this.activateSpell = function (name) {
    if(actor.data.spells[name].active 
	   || actor.data.spells[name].cooldown > 0
	   || (actor.data.spells[name].charges <= 0)){
	  return false;
    }
    var price = spells[name].price;
    if(actor.data.power >= price) {
      actor.data.power -= price;
	  if(spells[name].duration){
        actor.data.spells[name].active = true;
		actor.data.spells[name].duration = spells[name].duration;
	  }
	  if(spells[name].cooldown){
        actor.data.spells[name].cooldown = spells[name].cooldown;
	  }
	  if(spells[name].charges){
		if(!actor.data.spells[name].charges){
          actor.data.spells[name].charges = spells[name].charges-1;
		}else{
		  actor.data.spells[name].charges--;
		}
	  }
	  
	  if(spells[name].effect){
	    spells[name].effect();
	  }
	  return true;
    }
	return false;
  };
}