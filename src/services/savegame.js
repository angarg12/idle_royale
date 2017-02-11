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
    localStorage.setItem("playerStoredIR", player.data.script);
  };

  this.load = function () {
    try {
      var save = localStorage.getItem("playerStoredIR");
	  if(save){
		player.data.script = save;
	  }
    } catch (err) {
	  alert(err)
      alert("Error loading savegame, reset forced.");
      $scope.init();
    }
  };
}]);