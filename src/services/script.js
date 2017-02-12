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
		  var message = error.name+" "+error.message;
		  if(error.fileName){
			  message += "<br> File: "+error.fileName;
		  }
		  if(error.lineNumber){
			  message += "<br> Line number: "+error.lineNumber;
		  }
		  if(error.columnNumber){
			  message += "<br> Column: "+error.columnNumber;
		  }
		  if(error.stack){
			  message += "<br> Stack: "+error.stack;
		  }
		  if(error.description){
			  message += "<br> Description: "+error.description;			  
		  }
		  if(error.number){
			  message += "<br> Number: "+error.number;
		  }
	    return message;
	  }
  };
};