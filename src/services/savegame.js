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
    var d = new Date();
    $scope.lastSave = d.toLocaleTimeString();
  };

  this.load = function () {
    try {
      $scope.temp_script = JSON.parse(localStorage.getItem("playerStoredIR"));
    } catch (err) {
      alert("Error loading savegame, reset forced.");
      this.reset(false);
    }
  };
}]);