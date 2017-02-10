angular
.module('incremental')
.controller('IncCtrl',
['$scope',
'$document',
'$interval',
'$sce',
'$filter',
'$timeout',
'util',
'savegame',
'player',
'generator',
'upgrade',
'script',
'enemy',
'generatorEnemy',
'upgradeEnemy',
'scriptEnemy',
function ($scope, $document, $interval, $sce, $filter, $timeout, util, savegame, player, generator, upgrade, script, enemy, generatorEnemy, upgradeEnemy, scriptEnemy) {
  $scope.version = '0.2.1';
  $scope.Math = window.Math;
  
  $scope.util = util;
  $scope.savegame = savegame;
  $scope.player = player;
  $scope.generator = generator;
  $scope.upgrade = upgrade;
  $scope.script = script;
  $scope.enemy = enemy;
  $scope.temp_script;
  var self = this;
  
  $scope.current_tab = "Game";

  player.setScope($scope);
  util.setScope($scope);
  savegame.setScope($scope);
  
  $scope.generatorProduction = function (name) {
	if(!player.data) return;
    var baseProduction = generator.getGenerators()[name].power;
    return $scope.upgradedProduction(baseProduction, name);
  };

  $scope.tierProduction = function (name) {
	if(!player.data) return;
    var baseProduction = generator.getGenerators()[name].power *
                         player.data.generators[name].level;
    return $scope.upgradedProduction(baseProduction, name);
  };
  
  $scope.totalProduction = function () {
    var total = 0;
    for(var tier in generator.getGenerators()) {
      total += this.tierProduction(tier);
    }
    return total;
  };
  
  $scope.upgradedProduction = function (production, name) {
	if(!player.data) return;
	var generators = generator.getGenerators()
    for(var upgrade in generators[name].upgrades) {
        if(player.data.upgrades[generators[name].upgrades[upgrade]].bought) {
          power = upgrades[generators[name].upgrades[upgrade]].power;
          production = $scope.upgradeApply(production, power);
        }
      }
      return production;
  };
  
  self.processProduction = function () {
	player.data.power += $scope.totalProduction();
  };  
  
  self.update = function () {
    self.processProduction();
	script.eval();
  };

  self.init = function () {
    $scope.current_tab = "Game";
    player.populatePlayer();
  };

  self.startup = function () {
    self.init();
	savegame.load();
    $interval(self.update, 100);
    $interval(savegame.save, 10000);
  };
  
  self.onload = $timeout(self.startup);  
}]);
