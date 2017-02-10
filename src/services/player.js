angular
.module('incremental')
.service('player',
[Player])
.service('enemy',
[Player]);

function Player() {  
  var $scope;
  this.data;
  
  var startPlayer = {
	power: 15,
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
		"Tier 1-1": {bought:false},
		"Tier 1-2": {bought:false},
		"Tier 1-3": {bought:false},
		"Tier 1-4": {bought:false},
		"Tier 2-1": {bought:false},
		"Tier 2-2": {bought:false},
		"Tier 2-3": {bought:false},
		"Tier 2-4": {bought:false},
		"Tier 3-1": {bought:false},
		"Tier 3-2": {bought:false},
		"Tier 3-3": {bought:false},
		"Tier 3-4": {bought:false},
		"Tier 4-1": {bought:false},
		"Tier 4-2": {bought:false},
		"Tier 4-3": {bought:false},
		"Tier 4-4": {bought:false},
		"Tier 5-1": {bought:false},
		"Tier 5-2": {bought:false},
		"Tier 5-3": {bought:false},
		"Tier 5-4": {bought:false},
		"Tier 6-1": {bought:false},
		"Tier 6-2": {bought:false},
		"Tier 6-3": {bought:false},
		"Tier 6-4": {bought:false},
		"Tier 7-1": {bought:false},
		"Tier 7-2": {bought:false},
		"Tier 7-3": {bought:false},
		"Tier 7-4": {bought:false},
		"Tier 8-1": {bought:false},
		"Tier 8-2": {bought:false},
		"Tier 8-3": {bought:false},
		"Tier 8-4": {bought:false},
		"Tier 9-1": {bought:false},
		"Tier 9-2": {bought:false},
		"Tier 9-3": {bought:false},
		"Tier 9-4": {bought:false},
		"Tier 10-1": {bought:false},
		"Tier 10-2": {bought:false},
		"Tier 10-3": {bought:false},
		"Tier 10-4": {bought:false}
	},
	script: ""
  };
  
  this.setScope = function (scope){
    $scope = scope;
    startPlayer.version = $scope.version;
  };

  this.populatePlayer = function () {
    this.data = angular.copy(startPlayer);
  };
}