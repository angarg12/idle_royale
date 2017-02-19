angular
.module('incremental')
.service('savegame',
['player',
function(player) {  
  var $scope;
  
  this.setScope = function (scope){
    $scope = scope;
  };

  this.save = function () {
    localStorage.setItem("IRscript", player.script);
	  localStorage.setItem("IRrounds", JSON.stringify(player.rounds));
  };

  this.load = function () {
    try {
      var script = localStorage.getItem("IRscript");
      var rounds = localStorage.getItem("IRrounds");
	  
	  if(script && rounds){
		player.script = script;
		player.rounds = JSON.parse(rounds);
	  }else{
        $scope.init();		  
	  }
    } catch (err) {
      alert("Error loading savegame, reset forced.");
      $scope.init();	
    }
  };
}]);