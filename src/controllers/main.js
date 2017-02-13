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
'spell',
'script',
'enemy',
'generatorEnemy',
'upgradeEnemy',
'spellEnemy',
'scriptEnemy',
function ($scope, $document, $interval, $sce, $filter, $timeout, util, savegame, player, generator, upgrade, spell, script, enemy, generatorEnemy, upgradeEnemy, spellEnemy, scriptEnemy) {
  $scope.version = '0.8.1';
  $scope.Math = window.Math;
  
  $scope.util = util;
  $scope.savegame = savegame;
  $scope.player = player;
  $scope.generator = generator;
  $scope.upgrade = upgrade;
  $scope.spell = spell;
  $scope.script = script;
  $scope.enemy = enemy;
  $scope.generatorEnemy = generatorEnemy;
  $scope.upgradeEnemy = upgradeEnemy;
  $scope.spellEnemy = spellEnemy;
  var self = this;

  var player_script = "generator.buyGenerators('Tier 1',1);";
  var enemy_script = "if(actor.power < 0.004*goal){\
var gens = generator.getKeys();\
for(var i = gens.length; i > 0; i--){\
  var number = generator.maxBuy(gens[i-1]);\
  generator.buyGenerators(gens[i-1],number);\
}\
var ups = upgrade.getKeys();\
for(var i = ups .length; i > 0; i--){\
  upgrade.buyUpgrade(ups[i-1]);\
}\
}\
if(production > 167){\
  spell.activateSpell('Surge');\
}\
if(production > 334){\
  spell.activateSpell('Drain');\
}";
  
  player.setScope($scope);
  enemy.setScope($scope);
  util.setScope($scope);
  savegame.setScope($scope);

  $scope.tierProduction = function (actor, opponent, generator, upgrade, name) {
	if(!actor.data) return;
    var baseProduction = generator.getGenerators()[name].power *
                         actor.data.generators[name].level;
    return $scope.upgradedProduction(actor, opponent, generator, upgrade, baseProduction, name);
  };
  
  $scope.totalProduction = function (actor, opponent, generator, upgrade) {
	if(!actor.data) return;
    var total = 0;
    for(var tier in generator.getGenerators()) {
      total += this.tierProduction(actor, opponent, generator, upgrade, tier);
    }
	if(actor.data.spells["Surge"].active){
	  total *= 1.1;
	}
	if(opponent.data.spells["Drain"].active){
	  total *= 0.9;
	}
    return total;
  };
  
  $scope.upgradedProduction = function (actor, opponent, generator, upgrade, production, name) {
	if(actor.data.spells["Humility"].active 
    || opponent.data.spells["Humility"].active ){
		return production;
	}
	var generators = generator.getGenerators();
	var upgrades = upgrade.getUpgrades();
    for(var upgrade in generators[name].upgrades) {
        if(actor.data.upgrades[generators[name].upgrades[upgrade]].bought) {
          power = upgrades[generators[name].upgrades[upgrade]].power;
          production = production * power;
        }
      }
      return production;
  };
  
  self.processSpells = function(actor) {
    for(var spell in actor.data.spells){
	  if(actor.data.spells[spell].active){
	    actor.data.spells[spell].duration--;
	  }else if(actor.data.spells[spell].cooldown > 0){
		actor.data.spells[spell].cooldown--;
	  }
	  if(actor.data.spells[spell].duration <= 0){
	    actor.data.spells[spell].active = false;
	  }
	}
  };
  
  self.processProduction = function (actor, opponent, generator, upgrade) {
	actor.data.power += $scope.totalProduction(actor, opponent, generator, upgrade);
  };  
  
  self.update = function () {
	if(!$scope.status){		
		self.processProduction(player, enemy, generator, upgrade);
		self.processProduction(enemy, player, generatorEnemy, upgradeEnemy);
		
		if(player.data.power >= $scope.goal 
		  && enemy.data.power >= $scope.goal){
		  $scope.status = "tie";
		  return;
		}else if(player.data.power >= $scope.goal){
		  $scope.status = "win";
		  player.rounds[$scope.current_enemy].wins++;
		  if(!player.rounds[$scope.current_enemy].record 
		    || $scope.turn < player.rounds[$scope.current_enemy].record){
		    player.rounds[$scope.current_enemy].record = $scope.turn;
		  }
		  return;
		}else if(enemy.data.power >= $scope.goal){
		  $scope.status = "lose";
		  return;
		}
		
		self.processSpells(player);
		self.processSpells(enemy);
		var opponent = angular.copy(enemy.data);
		opponent.script = undefined;
		$scope.error_msg = script.eval(angular.copy(player.data), opponent, $scope.goal, $scope.turn, $scope.totalProduction(player, enemy, generator, upgrade));
		var opponent = angular.copy(player.data);
		opponent.script = undefined;
		scriptEnemy.eval(angular.copy(enemy.data), opponent, $scope.goal, $scope.turn, $scope.totalProduction(enemy, player, generator, upgrade));
		generator.clear();
		upgrade.clear();
		spell.clear();
		$scope.turn++;
	}
  };
  
  $scope.init = function () {
    player.populatePlayer();
    enemy.populatePlayer();
    $scope.current_tab = "Game";
    $scope.turn = 0;
    $scope.goal = 2e10;
    $scope.error_msg = "";
    // win, lose, tie
    $scope.status = "";
	$scope.current_enemy = "Bot";
	script.clearCache();
	player.script = player_script;
	enemy.script = enemy_script;
	scriptEnemy.script = enemy_script;
	scriptEnemy.clearCache();
  };

  $scope.restart = function() {
	var answer = confirm("Do you want to restart the round?");
	if(answer){
		$scope.init();
	}
  };
  
  self.startup = function () {
	$scope.init();
	savegame.load();
    $interval(self.update, 1);
    $interval(savegame.save, 10000);
  };
  
  self.onload = $timeout(self.startup);  
}]);
