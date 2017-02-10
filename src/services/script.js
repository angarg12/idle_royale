angular
.module('incremental')
.service('script',
['generator',
'upgrade',
Script])
.service('scriptEnemy',
['generatorEnemy',
'upgradeEnemy',
Script]);

function Script(generator, upgrade) {
  this.script;

  this.eval = function(){
	  eval(this.script);
  };
};