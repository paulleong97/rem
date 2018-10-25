const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const game = require("./player.js");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const ms = require("ms");

//Player Stats Array
var playerStatsDB = JSON.parse(fs.readFileSync("playerStats.json"));



/*bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err,files) =>{
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});*/

// Replacer Helper Function for 
function replacer(key, value) {
  var ignoredProperties = ["skillCooldowns", "effectiveAttributeStats", "currentResources", "effectiveMaxResourceStats", "effectiveDefenseStats", "effectiveResistanceStats", "effectiveAttackStats"]
  // Filtering out properties
  if (ignoredProperties.includes(key)) {
    return undefined;
  }
  return value;
}

// Update Local Player Stats DB
function updateLocalDB(){
  playerStatsDB = JSON.parse(fs.readFileSync("playerStats.json"));
}

// Store Player Stats in local DB array
function addPlayerToDB(player){
  console.log(typeof playerStatsDB);
  playerStatsDB.push(player);
}

// Update JSON DB
function updateJSON(){
  playerStatsDB = JSON.stringify(playerStatsDB, replacer, '\t');
      fs.writeFileSync("./playerStats.json", playerStatsDB, (err) => {
        if (err) console.log(err);
      });
      console.log("JSON update done")
}

// Lookup the playerStats json file to see if this ID exists
function lookUpPlayerStats(playerID){
  // Get content from file
  for( var i = playerStatsDB.length-1; i > -1; i--){ 
    if ( playerStatsDB[i].ID === playerID) {
      return playerStatsDB[i];
    }
  }
}

// Sleep function with promises
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Recursive Timer for ending turns if either of the players fail to input a skill in the reqired time 
async function turnTimer(message) {
  var initialTurn = turnBased.turn;
  await sleep(30000);
  //Check if the turn has not yet progressed from completed inputs
  if (turnBased.turn !== initialTurn){
    return;
  }
  //Check if the match is still running
  if (turnBased.gameState !== "Active Match") {
    return;
  }

  // Deal damage if either of the players input a skill
  if(turnBased.challengerActiveSkill !== undefined){
    turnBased.calculateSkillDamage(turnBased.challengerPlayer, turnBased.challengerActiveSkill);
  }
  if(turnBased.challengedActiveSkill !== undefined){
    turnBased.calculateSkillDamage(turnBased.challengedPlayer, turnBased.challengedActiveSkill);
  }

  // Send turnStatus embed
  var challengerPercentHP = (turnBased.challengerPlayer.currentResources.HP/turnBased.challengerPlayer.effectiveMaxResourceStats.HP*100).toFixed(0);
  var challengerHPBars = "█".repeat((challengerPercentHP/5).toFixed(0));
  var challengedPercentHP = (turnBased.challengedPlayer.currentResources.HP/turnBased.challengedPlayer.effectiveMaxResourceStats.HP*100).toFixed(0);
  var challengedHPBars = "█".repeat((challengedPercentHP/5).toFixed(0));
  let turnStatusEmbed = new Discord.RichEmbed()
  .setTitle(`Turn ${turnBased.turn} Status`)
  .setColor("#15f153")
  .addField(`${turnBased.challengerPlayer.username}`,`HP:〘 ${challengerHPBars} 〙${challengerPercentHP}%`)
  .addField(`${turnBased.challengedPlayer.username}`,`HP:〘 ${challengedHPBars} 〙${challengedPercentHP}%`)
  .addField(`${turnBased.challengerPlayer.username}`,`Active Skill: ${turnBased.challengerActiveSkill}`)
  .addField(`${turnBased.challengedPlayer.username}`,`Active Skill: ${turnBased.challengedActiveSkill}`)
  message.channel.send(turnStatusEmbed);

  // Go to the next turn since the turn timer has run out
  turnBased.nextTurn();

  // Recursively reset the turn timer
  turnTimer(message);
}

// Event Handling for when bot come online
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("The King's Avatar", {type: "WATCHING"});
});

// Event Handling for adding guild members
bot.on("guildMemberAdd", async member => {
  console.log(`${member} joined the server`);
  let logChannel = member.guild.channels.find(`name`, "log-channel");
  let gamerRole = member.guild.roles.find(`name`, "Glory Gamer");
      logChannel.send(`New member ${member} joined. Gave the ${gamerRole} role`);
      member.addRole(gamerRole.id);
});

// Event Handling for leaving guild members
bot.on("guildMemberRemove", async member => {
    console.log(`${member} left the server`);
    let logChannel = member.guild.channels.find(`name`, "log-channel");
  logChannel.send(`${member} left this server`);
});

// Event Handling for Channel Creation
bot.on("channelCreate", async channel => {
  let logChannel = channel.guild.channels.find(`name`, "log-channel");
  logChannel.send(`Someone created the ${channel} channel`);
});



// Initialize Game
var turnBased = new game.Game();

// Event Handling for Message Posts
const prefix = botconfig.prefix;
bot.on("message", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if(message.channel.type === "dm") return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();

  // Initialize Arena Match Command
  if (command === "pk"){

    // Update the local DB with JSON Values
    updateLocalDB();

    // Get the two players who will be fighting
    var challenged = message.mentions.members.first() || message.guild.members.get(args[0]);
    var challenger = message.guild.member(message.author);
    var newPlayer = false;
    console.log(`${challenger.id} has challenged ${challenged.id}`);


    // Check if challenger player id are already in DB
    var challengerPlayer = lookUpPlayerStats(challenger.id);
    if (challengerPlayer === undefined){
      console.log("Challenger is Missing!");
      turnBased.initializeChallengerPlayer(challenger.id, challenger.user.username);
      addPlayerToDB(turnBased.challengerPlayer);
      newPlayer = true;
    } else {
      console.log("Challenger Found!");
      turnBased.setChallengerPlayer(challengerPlayer);
    }

    // Check if challenged player id are already in DB
    var challengedPlayer = lookUpPlayerStats(challenged.id);
    if (challengedPlayer === undefined){
      console.log("Challenged is Missing!");
      turnBased.initializeChallengedPlayer(challenged.id, challenged.user.username);
      addPlayerToDB(turnBased.challengedPlayer);
      newPlayer = true;
    } else {
      console.log("Challenged Found!");
      turnBased.setChallengedPlayer(challengedPlayer);
    }
    
    // Prints the number of players in local DB
    console.log(playerStatsDB.length);

    //Print challenge message
    message.channel.send(`${challenger.user.username} has challenged ${challenged.user.username}`);

    //Set Turn to 1 and clear active Skills
    turnBased.initializeMatch();
    turnBased.gameState = "Active Match";
    turnTimer(message);

    // Update Player Stats at end of game
    if (newPlayer === true){
      updateJSON();
    }

    await sleep(300000);
    turnBased.calculateResults();
    updateJSON();
    console.log(turnBased.challengerPlayer.matchRecord);
    console.log(turnBased.challengedPlayer.matchRecord);
    message.channel.send(`Game Over`);
    turnBased.gameState = "No Match";
  }


  // Command to accept a pk
  if (command === "accept"){

  }

  // Command for leaderboard
  if (command === "leaderboard"){
    playerStatsDB.sort(function(a, b){return b - a});
    var rankString = [];
    var usernameString = [];
    var eloString = [];
    for (var i = 0; i < playerStatsDB.length; i++) {
      rankString.push(i+1);
      usernameString.push(playerStatsDB[i].username);
      eloString.push(playerStatsDB[i].matchRecord.elo.toFixed(0));
    }
    rankString.join('\n');
    usernameString.join('\n');
    eloString.join('\n');
    console.log(rankString);
    let leaderboardEmbed = new Discord.RichEmbed()
    .setTitle(`Leaderboard`)
    .setColor("#15f153")
    .addField("Rank", rankString, true)
    .addField("Player", usernameString, true)
    .addField("Elo", eloString, true)
    return message.channel.send(leaderboardEmbed);
  }

  // Command to get skill input
  if (command === "skill"){
    if (args[0] === undefined) return;
    var skillInput = args[0];
    var skillUsed = ""

    // Check which skill is used based on key input
    if (skillInput === 'v') {
      skillUsed = "Stab";
    } else if (skillInput === 'C'){
      skillUsed = "Slash";
    } else if (skillInput === "r"){
      skillUsed = "Sky Strike";
    } else if (skillInput === "e"){
      skillUsed = "Dragon Tooth";
    } else if (skillInput === "vv"){
      skillUsed = "Double Stab";
    } else if (skillInput === "f"){
      skillUsed = "Falling Flower Palm";
    } else if (skillInput === "R"){
      skillUsed = "Circle Swing";
    } else if (skillInput === "ER"){
      skillUsed = "Draconic Crusher";
    } else if (skillInput === "ft"){
      skillUsed = "Furious Dragon Strikes The Heart";
    } else if (skillInput === "tr"){
      skillUsed = "Dragon Breaks The Ranks";
    } else if (skillInput === "fr"){
      skillUsed = "Rising Dragon Soars The Sky";
    }

    // Find if challenger or challenged is inputting skill and set Active Skill for that player
    var inputtingMember = message.guild.member(message.author);
    if (inputtingMember.id === turnBased.challengerPlayer.ID){
      turnBased.challengerActiveSkill = skillUsed;
    } else if (inputtingMember.id === turnBased.challengedPlayer.ID){
      turnBased.challengedActiveSkill = skillUsed;
    }

    // If there is an active skill for both players, deal damage and go to next turn
    if((turnBased.challengerActiveSkill !== undefined) && (turnBased.challengedActiveSkill !== undefined)){
      turnBased.calculateSkillDamage(turnBased.challengerPlayer, turnBased.challengerActiveSkill);
      turnBased.calculateSkillDamage(turnBased.challengedPlayer, turnBased.challengedActiveSkill);
      var challengerPercentHP = (turnBased.challengerPlayer.currentResources.HP/turnBased.challengerPlayer.effectiveMaxResourceStats.HP*100).toFixed(0);
      var challengerHPBars = "█".repeat((challengerPercentHP/5).toFixed(0));
      var challengedPercentHP = (turnBased.challengedPlayer.currentResources.HP/turnBased.challengedPlayer.effectiveMaxResourceStats.HP*100).toFixed(0);
      var challengedHPBars = "█".repeat((challengedPercentHP/5).toFixed(0));

      let turnStatusEmbed = new Discord.RichEmbed()
      .setTitle(`Turn ${turnBased.turn} Status`)
      .setColor("#15f153")
      .addField(`${turnBased.challengerPlayer.username}`,`HP:〘 ${challengerHPBars} 〙${challengerPercentHP}%`)
      .addField(`${turnBased.challengedPlayer.username}`,`HP:〘 ${challengedHPBars} 〙${challengedPercentHP}%`)
      .addField(`${turnBased.challengerPlayer.username}`,`Active Skill: ${turnBased.challengerActiveSkill}`)
      .addField(`${turnBased.challengedPlayer.username}`,`Active Skill: ${turnBased.challengedActiveSkill}`)
      /*.addField("Attributes", `Strength: ${lookUpResult.baseAttributeStats.strength.toFixed(0)} \n Intelligence: ${lookUpResult.baseAttributeStats.intelligence.toFixed(0)} \n Vitality: ${lookUpResult.baseAttributeStats.vitality.toFixed(0)} \n Spirit: ${lookUpResult.baseAttributeStats.spirit.toFixed(0)}`)
      .addField("Attack", `Physical: ${lookUpResult.baseAttackStats.physicalAttack.toFixed(0)} \n Magic: ${lookUpResult.baseAttackStats.magicAttack.toFixed(0)}`, true)
      .addField("Defense", `Physical: ${lookUpResult.baseDefenseStats.physicalDefense.toFixed(0)} \n Magic: ${lookUpResult.baseDefenseStats.magicDefense.toFixed(0)}`, true)
      .addField("Resistance", `Physical: ${(lookUpResult.baseResistanceStats.physicalDamageReduction*100).toFixed(2)}% \n Magic: ${(lookUpResult.baseResistanceStats.magicDamageReduction*100).toFixed(2)}%`, true)
      .addField("Weapon", `Physical Damage: ${lookUpResult.weaponStats.physicalWeaponDamage.toFixed(0)} \n Magic Damage: ${lookUpResult.weaponStats.magicWeaponDamage.toFixed(0)} \n Strength Bonus: ${lookUpResult.weaponStats.strengthWeaponBonus.toFixed(0)} \n Intelligence Bonus: ${lookUpResult.weaponStats.intelligenceWeaponBonus.toFixed(0)} \n Vitality Bonus: ${lookUpResult.weaponStats.vitalityWeaponBonus.toFixed(0)} \n Spirit Bonus: ${lookUpResult.weaponStats.spiritWeaponBonus.toFixed(0)}`, true)
      .addField("Armor", `Physical Armor: ${lookUpResult.armorStats.physicalArmor.toFixed(0)} \n Magic Armor: ${lookUpResult.armorStats.magicArmor.toFixed(0)} \n Strength Bonus: ${lookUpResult.armorStats.strengthArmorBonus.toFixed(0)} \n Intelligence Bonus: ${lookUpResult.armorStats.intelligenceArmorBonus.toFixed(0)} \n Vitality Bonus: ${lookUpResult.armorStats.vitalityArmorBonus.toFixed(0)} \n Spirit Bonus: ${lookUpResult.armorStats.spiritArmorBonus.toFixed(0)}`, true)
      .addField("Skill Levels",`${skyStrikeIcon}${lookUpResult.skillLevels.skyStrikeLevel} ${dragonToothIcon}${lookUpResult.skillLevels.dragonToothLevel} ${doubleStabIcon}${lookUpResult.skillLevels.doubleStabLevel} ${fallingFlowerPalmIcon}${lookUpResult.skillLevels.fallingFlowerPalmLevel} ${circleSwingIcon}${lookUpResult.skillLevels.circleSwingLevel}`) //this can be used to emulate the effect of multiple reactions
      .addField("Chaser Levels",`${lightChaserIcon}${lookUpResult.skillLevels.skyStrikeLevel} ${neutralChaserIcon}${lookUpResult.skillLevels.dragonToothLevel} ${iceChaserIcon}${lookUpResult.skillLevels.doubleStabLevel} ${fireChaserIcon}${lookUpResult.skillLevels.fallingFlowerPalmLevel} ${shadowChaserIcon}${lookUpResult.skillLevels.circleSwingLevel}`)
      */
      message.channel.send(turnStatusEmbed);
      turnBased.nextTurn();
      turnTimer(message);
    }
  }

  // Command to manually update JSON
  if (command === "updateJSON"){
    updateJSON();
  }

  // Command to let your check your stats
  if (command === "stats"){
    //Define Skill Icon Emojies
    const skyStrikeIcon = bot.emojis.find(emoji => emoji.name === "SkyStrike")
    const dragonToothIcon = bot.emojis.find(emoji => emoji.name === "DragonTooth")
    const fallingFlowerPalmIcon = bot.emojis.find(emoji => emoji.name === "FallingFlowerPalm")
    const circleSwingIcon = bot.emojis.find(emoji => emoji.name === "CircleSwing")
    const doubleStabIcon = bot.emojis.find(emoji => emoji.name === "DoubleStab")
    const neutralChaserIcon = bot.emojis.find(emoji => emoji.name === "NeutralChaser")
    const iceChaserIcon = bot.emojis.find(emoji => emoji.name === "IceChaser")
    const fireChaserIcon = bot.emojis.find(emoji => emoji.name === "FireChaser")
    const shadowChaserIcon = bot.emojis.find(emoji => emoji.name === "ShadowChaser")
    const lightChaserIcon = bot.emojis.find(emoji => emoji.name === "LightChaser")

    // Update the local DB
    updateLocalDB();
    
    // Check to see if sender is in the DB
    var mentioned = message.mentions.members.first() || message.guild.members.get(args[0]);
    var sender = message.guild.member(message.author);
    var lookUpResult = {};
    var target = {};
    if (mentioned === undefined){
      target = sender;
    } else {
      target = mentioned;
    }
    lookUpResult = lookUpPlayerStats(target.id);
    if (lookUpResult === undefined){
      // Post not found in DB info
      message.channel.send(`${lookUpResult.username} has no match history. Please play a match to check your stats.`);
    } else {
      // Display playerStatsEmbed if command sender is in DB
      let playerStatsEmbed = new Discord.RichEmbed()
      .setTitle(`${lookUpResult.username} Stats`)
      .setColor("#15f153")
      .addField("Resources", `Max HP: ${lookUpResult.baseMaxResourceStats.HP.toFixed(0)} \n Max MP: ${lookUpResult.baseMaxResourceStats.MP.toFixed(0)} \n Max Stamina: ${lookUpResult.baseMaxResourceStats.Stamina.toFixed(0)}`)
      .addField("Attributes", `Strength: ${lookUpResult.baseAttributeStats.strength.toFixed(0)} \n Intelligence: ${lookUpResult.baseAttributeStats.intelligence.toFixed(0)} \n Vitality: ${lookUpResult.baseAttributeStats.vitality.toFixed(0)} \n Spirit: ${lookUpResult.baseAttributeStats.spirit.toFixed(0)}`)
      .addField("Attack", `Physical: ${lookUpResult.baseAttackStats.physicalAttack.toFixed(0)} \n Magic: ${lookUpResult.baseAttackStats.magicAttack.toFixed(0)}`, true)
      .addField("Defense", `Physical: ${lookUpResult.baseDefenseStats.physicalDefense.toFixed(0)} \n Magic: ${lookUpResult.baseDefenseStats.magicDefense.toFixed(0)}`, true)
      .addField("Resistance", `Physical: ${(lookUpResult.baseResistanceStats.physicalDamageReduction*100).toFixed(2)}% \n Magic: ${(lookUpResult.baseResistanceStats.magicDamageReduction*100).toFixed(2)}%`, true)
      .addField("Weapon", `Physical Damage: ${lookUpResult.weaponStats.physicalWeaponDamage.toFixed(0)} \n Magic Damage: ${lookUpResult.weaponStats.magicWeaponDamage.toFixed(0)} \n Strength Bonus: ${lookUpResult.weaponStats.strengthWeaponBonus.toFixed(0)} \n Intelligence Bonus: ${lookUpResult.weaponStats.intelligenceWeaponBonus.toFixed(0)} \n Vitality Bonus: ${lookUpResult.weaponStats.vitalityWeaponBonus.toFixed(0)} \n Spirit Bonus: ${lookUpResult.weaponStats.spiritWeaponBonus.toFixed(0)}`, true)
      .addField("Armor", `Physical Armor: ${lookUpResult.armorStats.physicalArmor.toFixed(0)} \n Magic Armor: ${lookUpResult.armorStats.magicArmor.toFixed(0)} \n Strength Bonus: ${lookUpResult.armorStats.strengthArmorBonus.toFixed(0)} \n Intelligence Bonus: ${lookUpResult.armorStats.intelligenceArmorBonus.toFixed(0)} \n Vitality Bonus: ${lookUpResult.armorStats.vitalityArmorBonus.toFixed(0)} \n Spirit Bonus: ${lookUpResult.armorStats.spiritArmorBonus.toFixed(0)}`, true)
      .addField("Skill Levels",`${skyStrikeIcon}${lookUpResult.skillLevels.skyStrikeLevel} ${dragonToothIcon}${lookUpResult.skillLevels.dragonToothLevel} ${doubleStabIcon}${lookUpResult.skillLevels.doubleStabLevel} ${fallingFlowerPalmIcon}${lookUpResult.skillLevels.fallingFlowerPalmLevel} ${circleSwingIcon}${lookUpResult.skillLevels.circleSwingLevel}`) //this can be used to emulate the effect of multiple reactions
      .addField("Chaser Levels",`${lightChaserIcon}${lookUpResult.skillLevels.skyStrikeLevel} ${neutralChaserIcon}${lookUpResult.skillLevels.dragonToothLevel} ${iceChaserIcon}${lookUpResult.skillLevels.doubleStabLevel} ${fireChaserIcon}${lookUpResult.skillLevels.fallingFlowerPalmLevel} ${shadowChaserIcon}${lookUpResult.skillLevels.circleSwingLevel}`)
      .addField("Match Record",`ELO: ${lookUpResult.matchRecord.elo.toFixed(0)} \n Wins: ${lookUpResult.matchRecord.wins} \n Losses: ${lookUpResult.matchRecord.losses}`)
      return message.channel.send(playerStatsEmbed);
    }
  }



  // Debug Command to See the status of the players during a turn
  if (command === "turnStatus"){
    // Set Turn 1
    //turnBased.initializeMatch();
    // Turn Embed
    var challengerPercentHP = (turnBased.challengerPlayer.currentResources.HP/turnBased.challengerPlayer.effectiveMaxResourceStats.HP*100).toFixed(0);
    var challengerHPBars = "█".repeat((challengerPercentHP/2.5).toFixed(0));
    var challengedPercentHP = (turnBased.challengedPlayer.currentResources.HP/turnBased.challengedPlayer.effectiveMaxResourceStats.HP*100).toFixed(0);
    var challengedHPBars = "█".repeat((challengedPercentHP/2.5).toFixed(0));

    let turnStatusEmbed = new Discord.RichEmbed()
    .setTitle(`Turn ${turnBased.turn} Status`)
    .setColor("#15f153")
    .addField(`${turnBased.challengerPlayer.username}`,`HP:〘 ${challengerHPBars} 〙${challengerPercentHP}%`)
    .addField(`${turnBased.challengedPlayer.username}`,`HP:〘 ${challengedHPBars} 〙${challengedPercentHP}%`)
    /*.addField("Attributes", `Strength: ${lookUpResult.baseAttributeStats.strength.toFixed(0)} \n Intelligence: ${lookUpResult.baseAttributeStats.intelligence.toFixed(0)} \n Vitality: ${lookUpResult.baseAttributeStats.vitality.toFixed(0)} \n Spirit: ${lookUpResult.baseAttributeStats.spirit.toFixed(0)}`)
    .addField("Attack", `Physical: ${lookUpResult.baseAttackStats.physicalAttack.toFixed(0)} \n Magic: ${lookUpResult.baseAttackStats.magicAttack.toFixed(0)}`, true)
    .addField("Defense", `Physical: ${lookUpResult.baseDefenseStats.physicalDefense.toFixed(0)} \n Magic: ${lookUpResult.baseDefenseStats.magicDefense.toFixed(0)}`, true)
    .addField("Resistance", `Physical: ${(lookUpResult.baseResistanceStats.physicalDamageReduction*100).toFixed(2)}% \n Magic: ${(lookUpResult.baseResistanceStats.magicDamageReduction*100).toFixed(2)}%`, true)
    .addField("Weapon", `Physical Damage: ${lookUpResult.weaponStats.physicalWeaponDamage.toFixed(0)} \n Magic Damage: ${lookUpResult.weaponStats.magicWeaponDamage.toFixed(0)} \n Strength Bonus: ${lookUpResult.weaponStats.strengthWeaponBonus.toFixed(0)} \n Intelligence Bonus: ${lookUpResult.weaponStats.intelligenceWeaponBonus.toFixed(0)} \n Vitality Bonus: ${lookUpResult.weaponStats.vitalityWeaponBonus.toFixed(0)} \n Spirit Bonus: ${lookUpResult.weaponStats.spiritWeaponBonus.toFixed(0)}`, true)
    .addField("Armor", `Physical Armor: ${lookUpResult.armorStats.physicalArmor.toFixed(0)} \n Magic Armor: ${lookUpResult.armorStats.magicArmor.toFixed(0)} \n Strength Bonus: ${lookUpResult.armorStats.strengthArmorBonus.toFixed(0)} \n Intelligence Bonus: ${lookUpResult.armorStats.intelligenceArmorBonus.toFixed(0)} \n Vitality Bonus: ${lookUpResult.armorStats.vitalityArmorBonus.toFixed(0)} \n Spirit Bonus: ${lookUpResult.armorStats.spiritArmorBonus.toFixed(0)}`, true)
    .addField("Skill Levels",`${skyStrikeIcon}${lookUpResult.skillLevels.skyStrikeLevel} ${dragonToothIcon}${lookUpResult.skillLevels.dragonToothLevel} ${doubleStabIcon}${lookUpResult.skillLevels.doubleStabLevel} ${fallingFlowerPalmIcon}${lookUpResult.skillLevels.fallingFlowerPalmLevel} ${circleSwingIcon}${lookUpResult.skillLevels.circleSwingLevel}`) //this can be used to emulate the effect of multiple reactions
    .addField("Chaser Levels",`${lightChaserIcon}${lookUpResult.skillLevels.skyStrikeLevel} ${neutralChaserIcon}${lookUpResult.skillLevels.dragonToothLevel} ${iceChaserIcon}${lookUpResult.skillLevels.doubleStabLevel} ${fireChaserIcon}${lookUpResult.skillLevels.fallingFlowerPalmLevel} ${shadowChaserIcon}${lookUpResult.skillLevels.circleSwingLevel}`)
    */return message.channel.send(turnStatusEmbed);
  }
/*  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);*/
});

bot.login(tokenfile.token);
