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

  this.eval = function(){
	  try{
	    eval(this.script);
	  }catch(error){
	    return error;
	  }
  };
};