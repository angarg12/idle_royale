angular
.module('incremental')
.service('data',
[
function() {
  this.save;

  this.start_save = {
    scripts: {
      1:"for (var genName in generator.getKeys()){\n\
  generator.buyGenerators(generator.getKeys()[genName],1);\n\
}",
      2:"",
      3:"",
      4:"",
      5:""
    },
    rounds: {
      'IblobTouch': {
        wins: 0,
        record: undefined
      },
      'Bot': {
        wins: 0,
        record: undefined
      },
      'pinkiedash417': {
        wins: 0,
        record: undefined
      },
      'mgronbach': {
        wins: 0,
        record: undefined
      },
      'Ascendental': {
        wins: 0,
        record: undefined
      },
    }
  };

  this.player_script = "generator.buyGenerators('Tier 1',1);";

  this.enemy_scripts = {
    "IblobTouch":"if(!cache.currTier){" +
        "    cache.currTier = 0;" +
        "}" +
        "" +
        "var gens = generator.getKeys();" +
        "var nameCurrGen = gens[cache.currTier];" +
        "var currGen = generator.getGenerators()[gens[cache.currTier]];" +
        "" +
        "" +
        "if (production <= goal / 100) {" +
        "    generator.buyGenerators(nameCurrGen, generator.maxBuy(nameCurrGen));" +
        "}" +
        "" +
        "if (cache.currTier < 7) {" +
        "    if (generator.buyPrice(gens[cache.currTier], 1) >= generator.buyPrice(gens[cache.currTier + 1], 1) / (generator.getGenerators()[gens[cache.currTier + 1]].power / generator.getGenerators()[gens[cache.currTier]].power)) {" +
        "        if ((production * 10) + actor.power >= generator.buyPrice(gens[cache.currTier + 1], 1)) {" +
        "                cache.currTier += 1;" +
        "        }" +
        "    }" +
        "}" +
        "spell.activateSpell('Surge');" +
        "spell.activateSpell('Drain');" +
        "spell.activateSpell('Humility')",
    "Bot":"if(actor.power < 0.004*goal){" +
        "var gens = generator.getKeys();" +
        "for(var i = gens.length; i > 0; i--){" +
        "  var number = generator.maxBuy(gens[i-1]);" +
        "  generator.buyGenerators(gens[i-1],number);" +
        "}" +
        "var ups = upgrade.getKeys();" +
        "for(var i = ups .length; i > 0; i--){" +
        "  upgrade.buyUpgrade(ups[i-1]);" +
        "}" +
        "}" +
        "if(production > 167){" +
        "  spell.activateSpell('Surge');" +
        "}" +
        "if(production > 334){" +
        "  spell.activateSpell('Drain');" +
        "}",
    "pinkiedash417": "upgrade.buyUpgrade('Tier 7-1');" +
        "upgrade.buyUpgrade('Tier 6-1');" +
        "upgrade.buyUpgrade('Tier 6-2');" +
        "upgrade.buyUpgrade('Tier 6-3');" +
        "upgrade.buyUpgrade('Tier 5-1');" +
        "upgrade.buyUpgrade('Tier 5-2');" +
        "upgrade.buyUpgrade('Tier 5-3');" +
        "upgrade.buyUpgrade('Tier 4-1');" +
        "upgrade.buyUpgrade('Tier 4-2');" +
        "upgrade.buyUpgrade('Tier 4-3');" +
        "upgrade.buyUpgrade('Tier 4-4');" +
        "upgrade.buyUpgrade('Tier 3-1');" +
        "upgrade.buyUpgrade('Tier 3-2');" +
        "upgrade.buyUpgrade('Tier 3-3');" +
        "upgrade.buyUpgrade('Tier 3-4');" +
        "upgrade.buyUpgrade('Tier 2-1');" +
        "upgrade.buyUpgrade('Tier 2-2');" +
        "upgrade.buyUpgrade('Tier 2-3');" +
        "upgrade.buyUpgrade('Tier 2-4');" +
        "upgrade.buyUpgrade('Tier 1-1');" +
        "upgrade.buyUpgrade('Tier 1-2');" +
        "upgrade.buyUpgrade('Tier 1-3');" +
        "upgrade.buyUpgrade('Tier 1-4');" +
        "var ticksToGoal = Math.min((goal-actor.power)/production, 2066-turn);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 8'].power >= generator.buyPrice('Tier 8',1))" +
        "    generator.buyGenerators('Tier 8',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 7'].power >= generator.buyPrice('Tier 7',1))" +
        "    generator.buyGenerators('Tier 7',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 6'].power >= generator.buyPrice('Tier 6',1))" +
        "    generator.buyGenerators('Tier 6',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 5'].power >= generator.buyPrice('Tier 5',1))" +
        "    generator.buyGenerators('Tier 5',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 4'].power >= generator.buyPrice('Tier 4',1))" +
        "    generator.buyGenerators('Tier 4',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 3'].power >= generator.buyPrice('Tier 3',1))" +
        "    generator.buyGenerators('Tier 3',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 2'].power >= generator.buyPrice('Tier 2',1))" +
        "    generator.buyGenerators('Tier 2',1);" +
        "if(ticksToGoal*generator.getGenerators()['Tier 1'].power >= generator.buyPrice('Tier 1',1))" +
        "    generator.buyGenerators('Tier 1',1);" +
        "spell.activateSpell('Surge');" +
        "spell.activateSpell('Drain');",
    "mgronbach":"if (production == 0) {" +
        "  generator.buyGenerators('Tier 1', 1);" +
        "}" +
        " " +
        "truePower = function(generators) {" +
        "  const upgrades = upgrade.getUpgrades();" +
        "  for (let g of generator.getKeys()) {" +
        "    let factor = 1.0;" +
        "    if (generators[g].upgrades) {" +
        "      for (let upgrade of generators[g].upgrades) {" +
        "        if (actor.upgrades[upgrade].bought) {" +
        "          factor *= upgrades[upgrade].power;" +
        "        }" +
        "      }" +
        "    }" +
        "    generators[g].truePower = generators[g].power * factor;" +
        "    generators[g].totalPower = generators[g].truePower * actor.generators[g].level;" +
        "  }" +
        "};" +
        " " +
        "calcRoi = function(generators, priceLimit) {" +
        "  let maxRoi = 0;" +
        "  let maxGen = '';" +
        "  let maxPrice = 0;" +
        "  for (let g of generator.getKeys()) {" +
        "    price = generator.buyPrice(g, 1);" +
        "    roi = generators[g].truePower / price;" +
        "    generators[g].roi = roi;" +
        "    if (roi > maxRoi && price < priceLimit) {" +
        "      maxRoi = roi;" +
        "      maxGen = g;" +
        "      maxPrice = price;" +
        "    }" +
        "  }" +
        "  return [maxRoi, maxGen, maxPrice];" +
        "};" +
        " " +
        "calcUpgradeRoi = function(generators, priceLimit) {" +
        "  let upgrades = upgrade.getUpgrades();" +
        "  let maxUpgRoi = 0;" +
        "  let maxUpg = '';" +
        "  let maxUpgPrice = 0;" +
        "  for (let g of generator.getKeys()) {" +
        "    generators[g].upgradeRoi = 0;" +
        "    if (generators[g].upgrades) {" +
        "      for (let u of generators[g].upgrades) {" +
        "        if (!actor.upgrades[u].bought) {" +
        "          roi = generators[g].totalPower * (upgrades[u].power - 1) / upgrades[u].price;" +
        "          generators[g].upgradeRoi = roi;" +
        "          if (roi > maxUpgRoi && upgrades[u].price < priceLimit) {" +
        "            maxUpgRoi = roi;" +
        "            maxUpg = u;" +
        "            maxUpgPrice = upgrades[u].price;" +
        "            break;" +
        "          }" +
        "        }" +
        "      }" +
        "    }" +
        "  }" +
        "  return [maxUpgRoi, maxUpg, maxUpgPrice];" +
        "};" +
        " " +
        "timediff = function(price, roi) {" +
        "  ticksUntilGoal = (goal - actor.power) / production;" +
        "  ticksUntilGoalWithUpgrade = (goal - actor.power + price) / (production + price * roi);" +
        "  return ticksUntilGoal - ticksUntilGoalWithUpgrade;" +
        "};" +
        " " +
        "generators = generator.getGenerators();" +
        "truePower(generators);" +
        "maxUpgRoi = calcUpgradeRoi(generators, actor.power + production * 10);" +
        "maxRoi = calcRoi(generators, actor.power + production * 10);" +
        "if (maxUpgRoi[0] > maxRoi[0]) {" +
        "  if (timediff(maxUpgRoi[2], maxUpgRoi[0]) > 0) {" +
        "    upgrade.buyUpgrade(maxUpgRoi[1]);" +
        "  }" +
        "} else {" +
        "  if (timediff(maxRoi[2], maxRoi[0]) > 0) {" +
        "    generator.buyGenerators(maxRoi[1], 1);" +
        "  }" +
        "}" +
        " " +
        "spell.activateSpell('Surge');" +
        " " +
        "console.log((goal - actor.power) / production);",
    "Ascendental":"var upgradedGeneration = function(genName, player) {" +
        "    var gen = generator.getGenerators()[genName];" +
        "    var income = gen.power;" +
        "    for (upNum in gen.upgrades) {" +
        "        var upName = gen.upgrades[upNum];" +
        "        if (player.upgrades[upName] && player.upgrades[upName].bought) {" +
        "            income *= upgrade.getUpgrades()[upName].power;" +
        "        }" +
        "    }" +
        "    return income;" +
        "};" +
        " " +
        "var currentGeneration = function(genName, player) {" +
        "    return upgradedGeneration(genName, player) * player.generators[genName].level;" +
        "};" +
        " " +
        "var calculateIncome = function(player, enemy) {" +
        "    var income = 0;" +
        "    var generators = generator.getGenerators();" +
        "    for (var genName in generators) {" +
        "        income += currentGeneration(genName, player);" +
        "    }" +
        "    if (player.spells['Surge'].active) {" +
        "        income *= 1.1;  " +
        "    }" +
        "    if (enemy.spells['Drain'].active) {" +
        "        income *= 0.9;" +
        "    }" +
        "    return income;" +
        "};" +
        " " +
        "var possibleActions = function(income) {" +
        "    var actions = [];" +
        "    var actionsIndex = 0;" +
        "    /* Generators */" +
        "    var generators = generator.getGenerators();" +
        "    var upgrades = upgrade.getUpgrades();" +
        "    for (genName in generators) {" +
        "        var gen = generator.getGenerators()[genName];" +
        "        var gain = upgradedGeneration(genName, actor);" +
        "        var count = 0;" +
        "        while (count++ < 10) {" +
        "            var totalCost = generator.buyPrice(genName, count);" +
        "            var cost = totalCost - generator.buyPrice(genName, count - 1);" +
        "            actions[actionsIndex++] = ['G', genName, cost, gain];" +
        "            if (totalCost > actor.power) {" +
        "                break;" +
        "            }" +
        "        }" +
        "        var currentGain = currentGeneration(genName, actor);" +
        "        if (currentGain > 0) {" +
        "            for (upNum in gen.upgrades) {" +
        "                upName = gen.upgrades[upNum];" +
        "                if (actor.upgrades[upName] && !actor.upgrades[upName].bought) {" +
        "                    var up = upgrades[upName];" +
        "                    var gain = currentGain * (up.power - 1);" +
        "                    var cost = up.price;" +
        "                    actions[actionsIndex++] = ['U', upName, cost, gain];" +
        "                }" +
        "            }" +
        "        }" +
        "    }" +
        "    if (!actor.spells['Surge'].active) {" +
        "        actions[actionsIndex++] = ['S', 'Surge', spell.getSpells()['Surge'].price, income / 10];" +
        "    }" +
        "    if (!actor.spells['Drain'].active) {" +
        "        actions[actionsIndex++] = ['S', 'Drain', spell.getSpells()['Drain'].price, income / 100];" +
        "    }" +
        "    /* Pretend the target is a high-power upgrade! */" +
        "    actions[actionsIndex++] = ['T', 'Target', goal, goal * 10];" +
        "   " +
        "    /* Sort the actions */" +
        "    for (i in actions) {" +
        "        a = actions[i];" +
        "        /* a[4] is time taken to buy */" +
        "        a[a.length] = a[2] / income;" +
        "        /* a[5] is total income after buying */" +
        "        a[a.length] = a[3] + income;" +
        "    }" +
        "    actions.sort(function(a,b){return (a[4] + (b[2] / a[5])) - (b[4] + (a[2] / b[5]))});" +
        "    return actions;" +
        "};" +
        " " +
        "var executeAction = function(action) {" +
        "    if (action[0] == 'S') {" +
        "        spell.activateSpell(action[1]);" +
        "        return true;" +
        "    } else if (action[0] == 'G') {" +
        "        return generator.buyGenerators(action[1],1);" +
        "    } else if (action[0] == 'U') {" +
        "        return upgrade.buyUpgrade(action[1]);" +
        "    } else if (action[0] == 'T') {" +
        "        /* Do nothing - we are just aiming for the target power now! */" +
        "        return false;" +
        "    } else {" +
        "        alert('Unrecognised action to execute: ' + action);" +
        "        return false;" +
        "    }" +
        "};" +
        " " +
        "var main = function() {" +
        "    /* Assume the first generator in the list is the one used to start... */" +
        "    var firstGenName = generator.getKeys()[0];" +
        "    if (actor.generators[firstGenName].level == 0) {" +
        "        if (turn == 1) {" +
        "            spell.activateSpell('Armageddon');" +
        "            generator.buyGenerators(firstGenName, 1);" +
        "        }" +
        "    } else {" +
        "        var income = calculateIncome(actor, opponent);" +
        "        var actions = possibleActions(income);" +
        "        for (i in actions) {" +
        "            if (!executeAction(actions[i])) {" +
        "                break;" +
        "            }" +
        "        }" +
        "    }" +
        "};" +
        "main();"
  };

this.script_stats = {
  "IblobTouch":{
    dry_run: 13548,
    statements: 14,
    complexity: 6
  },
  "Bot":{
    dry_run: 4001,
    statements: 12,
    complexity: 6
  },
  "pinkiedash417":{
    dry_run: 2004,
    statements: 34,
    complexity: 9
  },
  "mgronbach":{
    dry_run: 1668,
    statements: 58,
    complexity: 20
  },
  "Ascendental":{
    dry_run: 1491,
    statements: 69,
    complexity: 28
  }
};
}]);
