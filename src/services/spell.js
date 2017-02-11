angular
.module('incremental')
.service('spell',
['player',
Spell
])
.service('spellEnemy',
['enemy',
Spell
]);

function Spell(player) {
  var spells = {	  
	'Surge':{
		description: 'Increase production by 5%',
		price:100,
		duration: 60,
		cooldown: 300
	},
  };
  
  var keys = Object.keys(spells);

  this.getKeys = function(){
	return keys;
  };

  	// FIXME send a copy
  this.getSpells = function(){
	return spells;
  };
	
  this.activateSpell = function (name) {
    if(player.data.spells[name].active 
	   || player.data.spells[name].cooldown > 0
	   || (player.data.spells[name].charges && player.data.spells[name].charges <= 0)){
	  return false;
    }
    var price = spells[name].price;
    if(player.data.power >= price) {
      player.data.power -= price;
      player.data.spells[name].active = true;
	  if(spells[name].duration){
		player.data.spells[name].duration = spells[name].duration;
	  }
	  if(spells[name].cooldown){
        player.data.spells[name].cooldown = spells[name].cooldown;
	  }
	  if(spells[name].charges){
		if(!player.data.spells[name].charges){
          player.data.spells[name].charges = spells[name].charges;
		}else{
		  player.data.spells[name].charges--;
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