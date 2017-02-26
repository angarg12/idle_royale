angular
.module('incremental')
.controller('IncCtrl', ['$scope',
'$document',
'$interval',
'$sce',
'$filter',
'$timeout',
'data',
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
function($scope, $document, $interval, $sce, $filter, $timeout, data, util, savegame, player, generator, upgrade, spell, script, enemy, generatorEnemy, upgradeEnemy, spellEnemy, scriptEnemy) {
    $scope.version = '0.8.5';
    $scope.Math = window.Math;

    $scope.data = data;
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

    player.setScope($scope);
    enemy.setScope($scope);
    util.setScope($scope);
    savegame.setScope($scope);

    $scope.tierProduction = function(actor, opponent, generator, upgrade, name) {
        if (!actor.data) return;
        var baseProduction = generator.getGenerators()[name].power *
            actor.data.generators[name].level;
        return $scope.upgradedProduction(actor, opponent, generator, upgrade, baseProduction, name);
    };

    $scope.totalProduction = function(actor, opponent, generator, upgrade) {
        if (!actor.data) return;
        var total = 0;
        for (var tier in generator.getGenerators()) {
            total += this.tierProduction(actor, opponent, generator, upgrade, tier);
        }
        if (actor.data.spells["Surge"].active) {
            total *= 1.1;
        }
        if (opponent.data.spells["Drain"].active) {
            total *= 0.9;
        }
        return total;
    };

    $scope.upgradedProduction = function(actor, opponent, generator, upgrade, production, name) {
        if (actor.data.spells["Humility"].active ||
            opponent.data.spells["Humility"].active) {
            return production;
        }
        var generators = generator.getGenerators();
        var upgrades = upgrade.getUpgrades();
        for (var up in generators[name].upgrades) {
            if (actor.data.upgrades[generators[name].upgrades[up]].bought) {
                power = upgrades[generators[name].upgrades[up]].power;
                production = production * power;
            }
        }
        return production;
    };

    self.processSpells = function(actor) {
        for (var spell in actor.data.spells) {
            if (actor.data.spells[spell].active) {
                actor.data.spells[spell].duration--;
            } else if (actor.data.spells[spell].cooldown > 0) {
                actor.data.spells[spell].cooldown--;
            }
            if (actor.data.spells[spell].duration <= 0) {
                actor.data.spells[spell].active = false;
            }
        }
    };

    self.processProduction = function(actor, opponent, generator, upgrade) {
        actor.data.power += $scope.totalProduction(actor, opponent, generator, upgrade);
    };

    self.update = function() {
        data.save.scripts[$scope.current_slot] = self.code.getValue();

        if ($scope.status === "restart") {
            $scope.init();
            this.main_loop = $interval(self.update, $scope.game_speed, 1);
            return;
        }

        if ($scope.status === 'play' || $scope.status === 'fast') {
            self.processProduction(player, enemy, generator, upgrade);
            self.processProduction(enemy, player, generatorEnemy, upgradeEnemy);

            self.processSpells(player);
            self.processSpells(enemy);
            var opponent = angular.copy(enemy.data);
            opponent.script = undefined;
            $scope.error_msg = script.eval(angular.copy(player.data), opponent, $scope.goal, $scope.turn, $scope.totalProduction(player, enemy, generator, upgrade));
            generator.clear();
            upgrade.clear();
            spell.clear();
            opponent = angular.copy(player.data);
            opponent.script = undefined;
            scriptEnemy.eval(angular.copy(enemy.data), opponent, $scope.goal, $scope.turn, $scope.totalProduction(enemy, player, generator, upgrade));
            generator.clear();
            upgrade.clear();
            spell.clear();
            $scope.turn++;

            if (player.data.power >= $scope.goal &&
                enemy.data.power >= $scope.goal) {
                $scope.result = "tie";
                $scope.status = "finish";
            } else if (player.data.power >= $scope.goal) {
                $scope.result = "win";
                $scope.status = "finish";
                data.save.rounds[$scope.current_enemy].wins++;
                if (!data.save.rounds[$scope.current_enemy].record ||
                    $scope.turn < data.save.rounds[$scope.current_enemy].record) {
                    data.save.rounds[$scope.current_enemy].record = $scope.turn;
                }
            } else if (enemy.data.power >= $scope.goal) {
                $scope.result = "lose";
                $scope.status = "finish";
            }
        }

        this.main_loop = $interval(self.update, $scope.game_speed, 1);
    };

    $scope.run = function() {
        if ($scope.status === "stop") {
            if ($scope.error_msg) {
                return;
            }
            $scope.status = "play";
        }
    };

    $scope.toggleFast = function() {
        if ($scope.status === "play") {
            $scope.status = "fast";
            $scope.game_speed = 1;
        } else if ($scope.status === "fast") {
            $scope.status = "play";
            $scope.game_speed = 1000;
        }
    };

    $scope.loadScript = function() {
        script.clearCache();
        script.script = self.code.getValue();

        self.codeoutput.setValue(script.script);
        setTimeout(function() {
            self.codeoutput.refresh();
        }, 1);
        var opponent = angular.copy(enemy.data);
        opponent.script = undefined;
        $scope.error_msg = script.eval(angular.copy(player.data), opponent, $scope.goal, $scope.turn, $scope.totalProduction(player, enemy, generator, upgrade));
    };

    $scope.changeSlot = function() {
        self.code.setValue(data.save.scripts[$scope.current_slot]);
        setTimeout(function() {
            self.code.refresh();
        }, 1);
    };

    $scope.changeEnemy = function() {
      enemy.script = data.enemy_scripts[$scope.current_enemy];
      scriptEnemy.script = enemy.script;
      scriptEnemy.clearCache();
    };

    $scope.init = function() {
        player.populatePlayer();
        enemy.populatePlayer();
        $scope.current_tab = "Game";
        $scope.current_slot = 1;
        $scope.changeSlot();
        $scope.turn = 0;
        $scope.goal = 2e10;
        $scope.game_speed = 1000;
        $scope.error_msg = "";
        // win, lose, tie
        $scope.result = "";
        // stop, play, fast, finish, restart
        $scope.status = "stop";
        script.clearCache();
        enemy.script = data.enemy_scripts[$scope.current_enemy];
        scriptEnemy.script = enemy.script;
        scriptEnemy.clearCache();
    };

    $scope.restart = function() {
        var answer = confirm("Do you want to restart the round?");
        if (answer) {
          $scope.status = "restart";
        }
    };

    self.startup = function() {
        savegame.init();
        data.save.scripts[$scope.current_slot] = data.player_script;

        self.code = CodeMirror.fromTextArea(document.getElementById('code'), {
            lineNumbers: true
        });
        self.codeoutput = CodeMirror.fromTextArea(document.getElementById('codeoutput'), {
            lineNumbers: true,
            readOnly: true,
            theme: 'codemirror_readonly'
        });

        $scope.current_enemy = "IblobTouch";
        $scope.init();
        savegame.load();

        self.code.setValue(data.save.scripts[$scope.current_slot]);
        setTimeout(function() {
            self.code.refresh();
        }, 1);

        self.codeoutput.setValue("");
        setTimeout(function() {
            self.codeoutput.refresh();
        }, 1);
        this.main_loop = $interval(self.update, $scope.game_speed, 1);
        $interval(savegame.store, 10000);
    };

    self.onload = $timeout(self.startup);
}
]);
