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
    localStorage.setItem("playerStoredITE", JSON.stringify(player.data));
    var d = new Date();
    $scope.lastSave = d.toLocaleTimeString();
  };

  this.load = function () {
    try {
      player.data = JSON.parse(localStorage.getItem("playerStoredITE"));
    } catch (err) {
      alert("Error loading savegame, reset forced.");
      this.reset(false);
    }
  };

  this.reset = function (ask) {
    var confirmation = true;
    if(ask) {
      confirmation = confirm("Are you sure you want to reset? This will permanently erase your progress.");
    }

    if(confirmation === true) {
      localStorage.removeItem("playerStoredITE");
      $scope.init();
    }
  };
}]);