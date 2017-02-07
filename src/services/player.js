angular
.module('incremental')
.service('player',
[
function() {  
  var $scope;
  var player;

  var startPlayer = {
	power: 0,
	generators: {
		'Tier 1':{level:0},
		'Tier 2':{level:0},
		'Tier 3':{level:0},
		'Tier 4':{level:0},
		'Tier 5':{level:0},
		'Tier 6':{level:0},
		'Tier 7':{level:0},
		'Tier 8':{level:0},
		'Tier 9':{level:0},
		'Tier 10':{level:0},
	},
	upgrades: {
	}
  };
  
  this.setScope = function (scope){
    $scope = scope;
    startPlayer.version = $scope.version;
  };

  this.populatePlayer = function () {
    player = angular.copy(startPlayer);
  };
  
  this.getPlayer = function() {
	return angular.copy(player);
  }
}]);