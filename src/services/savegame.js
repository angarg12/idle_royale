angular
.module('incremental')
.service('savegame',
['player',
'data',
function(player, data) {
  var $scope;

  this.setScope = function (scope){
    $scope = scope;
  };

  this.init = function() {
    data.save = angular.copy(data.start_save);
  };

  this.store = function () {
    localStorage.setItem("saveIR", JSON.stringify(data.save));
  };

  this.load = function () {
    try {
      var storage = localStorage.getItem("saveIR");

      if(storage){
        data.save = JSON.parse(storage);
      }else{
        this.init();
      }
      this.versionControl();
    } catch (err) {
      alert("Error loading savegame, reset forced.");
      $scope.init();
    }
  };

  this.versionControl = function() {
    for(var enemy in data.script_stats){
      if(data.save.rounds[enemy] === undefined){
        data.save.rounds[enemy] = {
          wins: 0,
          record: undefined
        };
      }
    }
  };
}]);
