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
'player',
'savegame',
'generator',
'upgrade',
'script',
function ($scope, $document, $interval, $sce, $filter, $timeout, util, player, savegame, generator, upgrade, script) {
  $scope.version = '0.0.3';
  $scope.Math = window.Math;
  
  $scope.player = player;
  $scope.util = util;
  $scope.savegame = savegame;
  $scope.generator = generator;
  $scope.upgrade = upgrade;
  $scope.script = script;
  $scope.temp_script;
  var self = this;
  
  $scope.current_tab = "Game";

  player.setScope($scope);
  util.setScope($scope);
  savegame.setScope($scope);
  generator.setScope($scope);
  upgrade.setScope($scope);
  
  self.update = function () {    

  };

  self.init = function () {
    $scope.current_tab = "Game";
    player.populatePlayer();
  };

  self.startup = function () {
    self.init();
    $interval(self.update, 1000);
    //$interval(savegame.save, 10000);
  };
  
  self.onload = $timeout(self.startup);  
}]);
