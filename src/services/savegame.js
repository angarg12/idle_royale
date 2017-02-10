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
    localStorage.setItem("playerStoredIR", $scope.temp_script);
  };

  this.load = function () {
    try {
      var save = localStorage.getItem("playerStoredIR");
	  if(save){
		$scope.temp_script = save;
	  }
    } catch (err) {
      alert("Error loading savegame, reset forced.");
      this.reset(false);
    }
  };
}]);