angular
.module('incremental')
.service('script',
['generator',
'upgrade',
'spell',
Script])
.service('scriptEnemy',
['generatorEnemy',
'upgradeEnemy',
'spellEnemy',
Script]);

function Script(generator, upgrade, spell) {
  this.script;
  var cache = {};

  this.clearCache = function(){
	cache = {};
  };
  
  this.eval = function(actor, goal, turn, production){
	  try{
	    eval(this.script);
	  }catch(error){
	    return error;
	  }
  };
};