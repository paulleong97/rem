
const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const ms = require("ms");
let pkRecord = JSON.parse(fs.readFileSync("./pkrecord.json", "utf8"));

//skill name and damage
var slash = 2;
var stab = 4;
var skyStrike = 5;
var dragonTooth = 7;
var doubleStab = 10;
var circleSwing = 15;
var draconicCrusher = 20;
var fallingFlowerPalm = 30;
var dragonBreaksTheRanks = 35;
var furiousDragonStrikesTheHeart = 40;
var risingDragonSoarsTheSky = 50;

var rAuthor;  //person who sends a message
var rUser;  //the person who is pinged

var playerOnehp = 1000; //playerOne current hp
var playerTwohp = 1000; //playerTwo current hp
var playerOneLife;  //contains the string of the health bar of player 1
var playerTwoLife;   //contains the string of the health bar of player 2
var playerOneLastUsedSkill;
var playerTwoLastUsedSkill;

// let pkchannel = channels.find(`name`, "arena");
// let playerOneChannel = channels.find(`name`, "player-one");
// let playerTwoChannel = channels.find(`name`, "player-two");

// let testEmbed = new Discord.RichEmbed();
// testEmbed.setTitle("hi");

bot.commands = new Discord.Collection();
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
});

//When bot is turn online
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("anime with pol", {type: "WATCHING"});
  //bot.user.setActivity("Flirting w/pol");
});

bot.on("guildMemberRemove", async member => {
    let logChannel = channel.guild.channels.find(`name`, "log-channel");
  logChannel.send(`${member} left this server`);
});

bot.on("channelCreate", async channel => {
  let logChannel = channel.guild.channels.find(`name`, "log-channel");
  logChannel.send(`Someone created the ${channel} channel`);
});

//this function detects specific message and execute the respective command
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  //use skill command
  if(cmd === `${prefix}l`){

    let rAuthor = message.guild.member(message.author);
    let gRole1 = message.guild.roles.find(`name`, "PlayerOne");
    if(!gRole1) return message.reply("Couldn't find that role.");
    let gRole2 = message.guild.roles.find(`name`, "PlayerTwo");
    if(!gRole2) return message.reply("Couldn't find that role.");

    let gRoleSkyStrike = message.guild.roles.find(`name`, "SkyStrike");
    if(!gRoleSkyStrike) return message.reply("Couldn't find that role");
    let gRoleDragonTooth = message.guild.roles.find(`name`, "DragonTooth");
    if(!gRoleDragonTooth) return message.reply("Couldn't find that role");
    let gRoleDoubleStab = message.guild.roles.find(`name`, "DoubleStab");
    if(!gRoleDoubleStab) return message.reply("Couldn't find that role");
    let gRoleFallingFlowerPalm = message.guild.roles.find(`name`, "FallingFlowerPalm");
    if(!gRoleFallingFlowerPalm) return message.reply("Couldn't find that role");
    let gRoleCircleSwing = message.guild.roles.find(`name`, "CircleSwing");
    if(!gRoleCircleSwing) return message.reply("Couldn't find that role");
    let gRoleDraconicCrusher = message.guild.roles.find(`name`, "DraconicCrusher");
    if(!gRoleDraconicCrusher) return message.reply("Couldn't find that role");
    let gRoleFuriousDragonStrikesTheHeart = message.guild.roles.find(`name`, "FuriousDragonStrikesTheHeart");
    if(!gRoleFuriousDragonStrikesTheHeart) return message.reply("Couldn't find that role");
    let gRoleDragonBreaksTheRank = message.guild.roles.find(`name`, "DragonBreaksTheRanks");
    if(!gRoleDragonBreaksTheRank) return message.reply("Couldn't find that role");
    let gRoleRisingDragonSoarsTheSky = message.guild.roles.find(`name`, "RisingDragonSoarsTheSky");
    if(!gRoleRisingDragonSoarsTheSky) return message.reply("Couldn't find that role");

    let pkchannel = message.guild.channels.find(`name`, "arena");
    let playerOneChannel = message.guild.channels.find(`name`, "player-one");
    let playerTwoChannel = message.guild.channels.find(`name`, "player-two");
    let lvlOneSkill = 15000;
    let lvlTwoSkill = 30000;

    // async function purge(){
    //   //message.delete();
    //   const fetchedArena = await pkchannel.fetchMessages({limit: 5});
    //  const fetchedPlayerOneChannel = await playerOneChannel.fetchMessages({limit: 5});
    //   const fetchedPlayerTwoChannel = await playerTwoChannel.fetchMessages({limit: 5});
    //   console.log(fetchedArena.size + `messsages found, deleting...`);
    //
    //   pkchannel.bulkDelete(fetchedArena).catch(error => message.channel.send(`Error ${error}`));
    //  playerOneChannel.bulkDelete(fetchedPlayerOneChannel).catch(error => message.channel.send(`Error ${error}`));
    //  playerTwoChannel.bulkDelete(fetchedPlayerTwoChannel).catch(error => message.channel.send(`Error ${error}`));
    //
    // }
    //   purge();

   let skill = args.join(" ").slice(0);
   var skillUsed;
   var skillDamage;
   var skillDamage2;
   var playerOneInitialHp = playerOnehp;
   var playerTwoInitialHp = playerTwohp;

    //Player One uses skill
    if(rAuthor.roles.has(gRole1.id)){
      if (skill === 'v') {
        playerTwohp = playerTwohp - stab;
        skillUsed = "Stab";
        skillDamage = stab;
      }
      else if (skill === 'C') {
         playerTwohp = playerTwohp - slash;
         skillUsed = "Slash";
         skillDamage = slash;
      }
      else if (skill === "r") {
        if(rAuthor.roles.has(gRoleSkyStrike.id)){
          message.channel.send("Sky Strike is on cd");
        }
        else {
          playerTwohp = playerTwohp - 5;
          skillUsed = "Sky Strike";
          skillDamage = skyStrike;
          await(rAuthor.addRole(gRoleSkyStrike.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let SkyStrikeTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleSkyStrike.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(SkyStrikeTime));
        }
      }
      else if (skill === "e") {
        if(rAuthor.roles.has(gRoleDragonTooth.id)){
          message.channel.send("Dragon Tooth is on cd");
        }
        else {
          playerTwohp = playerTwohp - 7;
          skillUsed = "Dragon Tooth";
          skillDamage = dragonTooth;
          await(rAuthor.addRole(gRoleDragonTooth.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DragonToothTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDragonTooth.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DragonToothTime));
        }
      }
      else if (skill === "vv") {
        if(rAuthor.roles.has(gRoleDoubleStab.id)){
          message.channel.send("Double Stab is on cd");
        }
        else {
          playerTwohp = playerTwohp - 10;
          skillUsed = "Double Stab";
          skillDamage = doubleStab;
          await(rAuthor.addRole(gRoleDoubleStab.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DoubleStabTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDoubleStab.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DoubleStabTime));
        }
      }
      else if (skill === "f") {
        if(rAuthor.roles.has(gRoleFallingFlowerPalm.id)){
          message.channel.send("Falling Flower Palm is on cd");
        }
        else {
          playerTwohp = playerTwohp - 30;
          skillUsed = "Falling Flower Palm";
          skillDamage = fallingFlowerPalm;
          await(rAuthor.addRole(gRoleFallingFlowerPalm.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let FallingFlowerPalmTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleFallingFlowerPalm.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(FallingFlowerPalmTime));
        }
      }
      else if (skill === "R") {
        if(rAuthor.roles.has(gRoleCircleSwing.id)){
          message.channel.send("Circle Swing is on cd");
        }
        else {
          playerTwohp = playerTwohp - 15;
          skillUsed = "Circle Swing";
          skillDamage = circleSwing;
          await(rAuthor.addRole(gRoleCircleSwing.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let CircleSwingTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleCircleSwing.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(CircleSwingTime));
        }
      }
      else if (skill === "ER") {
        if(rAuthor.roles.has(gRoleDraconicCrusher.id)){
          message.channel.send("Draconic Crusher is on cd");
        }
        else {
          playerTwohp = playerTwohp - 20;
          skillUsed = "Draconic Crusher";
          skillDamage = draconicCrusher;
          await(rAuthor.addRole(gRoleDraconicCrusher.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DraconicCrusherTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDraconicCrusher.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DraconicCrusherTime));
        }
      }
      else if (skill === "ft") {
        if(rAuthor.roles.has(gRoleFuriousDragonStrikesTheHeart.id)){
          message.channel.send("Furious Dragon Strikes The Heart is on cd");
        }
        else {
          playerTwohp = playerTwohp - 40;
          skillUsed = "Furious Dragon Strikes The Heart";
          skillDamage = furiousDragonStrikesTheHeart;
          await(rAuthor.addRole(gRoleFuriousDragonStrikesTheHeart.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let FuriousDragonStrikesTheHeartTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleFuriousDragonStrikesTheHeart.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(FuriousDragonStrikesTheHeartTime));
        }
      }
      else if (skill === "tr") {
        if(rAuthor.roles.has(gRoleDragonBreaksTheRank.id)){
          message.channel.send("Dragon Breaks The Rank is on cd");
        }
        else {
          playerTwohp = playerTwohp - 35;
          skillUsed = "Dragon Breaks The Rank";
          skillDamage = dragonBreaksTheRanks;
          await(rAuthor.addRole(gRoleDragonBreaksTheRank.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DragonBreaksTheRanksTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDragonBreaksTheRank.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DragonBreaksTheRanksTime));
        }
      }
      else if (skill === "fr") {
        if(rAuthor.roles.has(gRoleRisingDragonSoarsTheSky.id)){
          message.channel.send("HA CEL & LEMNI!!!! THAT SKILL YOU KEEP SPAMMING is on cd");
        }
        else {
          playerTwohp = playerTwohp - 50;
          skillUsed = "Rising Dragon Soars The Sky";
          skillDamage = risingDragonSoarsTheSky;
          await(rAuthor.addRole(gRoleRisingDragonSoarsTheSky.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let RisingDragonSoarsTheSkyTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleRisingDragonSoarsTheSky.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(RisingDragonSoarsTheSkyTime));
        }
      }
      else {
        playerTwohp = playerTwohp;
      }

      let playerOneHealthBar = Math.round(playerOnehp/200);
      let playerOneHpPercent = Math.round(playerOnehp/10);

      if(playerOneHealthBar === 5){
        playerOneLife = "〘 ██████████  〙";
      }
      else if(playerOneHealthBar === 4){
        playerOneLife = "〘 ████████  〙";
      }
      else if(playerOneHealthBar === 3){
        playerOneLife = "〘 ██████  〙";
      }
      else if(playerOneHealthBar === 2){
        playerOneLife = "〘 ████  〙";
      }
      else if(playerOneHealthBar === 1){
        playerOneLife = "〘 ██  〙";
      }
      else if(playerOneHealthBar === 0){
        playerOneLife = "〘   〙";
      }

      let playerTwoHealthBar = Math.round(playerTwohp/200);
      let playerTwoHpPercent = Math.round(playerTwohp/10);

      if(playerTwoHealthBar === 5){
        playerTwoLife = "〘 ██████████  〙";
      }
      else if(playerTwoHealthBar === 4){
        playerTwoLife = "〘 ████████  〙";
      }
      else if(playerTwoHealthBar === 3){
        playerTwoLife = "〘 ██████  〙";
      }
      else if(playerTwoHealthBar === 2){
        playerTwoLife = "〘 ████  〙";
      }
      else if(playerTwoHealthBar === 1){
        playerTwoLife = "〘 ██  〙";
      }
      else if(playerTwoHealthBar === 0){
        playerTwoLife = "〘   〙";
      }

      playerOneLastUsedSkill = skillUsed;
      function updateBattle(){
          let skillEmbed = new Discord.RichEmbed();
          skillEmbed.setDescription(`<@${rAuthor.id}> striked`)
          .setColor("#ff0000")
          .addField("Player 1 hp",`${playerOneLife} ${playerOneHpPercent}% hp left`, true)
          .addField("Player 2 hp",`${playerTwoLife} ${playerTwoHpPercent}% hp left`, true)
          .addBlankField()
          .addField("Player 1 last used skill", playerOneLastUsedSkill,true)
          .addField("Player 2 last used skill", playerTwoLastUsedSkill,true)
          .addBlankField()
          .addField(`Damage Done: ${skillDamage}`, `Player 2: ${playerTwoInitialHp}->${playerTwohp}`,true)
          .addField(`Damage Done: ${skillDamage2}`, `Player 1: ${playerOneInitialHp}->${playerOnehp}`,true);
          pkchannel.send(skillEmbed);
          playerOneChannel.send(skillEmbed);
          playerTwoChannel.send(skillEmbed);
      }
      updateBattle();

      //****Try update embed(didn't work)************
      // if(!skillEmbed){
      //   let skillEmbed = new Discord.RichEmbed()
      //   //.setDescription("PKPKPKPKPK")
      //   .setColor("#15f153")
      //   .addField("Action", `<@${rAuthor.id}> used ${skillUsed}`)
      //   .addField("Player 1 hp:", `${playerOnehp} hp left`)
      //   .addField("Player 2 hp:", `${playerTwohp} hp left`)
      //   message.channel.send(skillEmbed);
      // }
      //
      // else{
      //   skillEmbed.setColor("#15f153")
      //   .addField("Action", `<@${rAuthor.id}> used ${skillUsed}`)
      //   .addField("Player 1 hp:", `${playerOnehp} hp left`)
      //   .addField("Player 2 hp:", `${playerTwohp} hp left`)
      //   message.channel.send(skillEmbed);
      // }
      //****End of Try update embed(didn't work)************
    }
    //Player Two uses Skill
    else if(rAuthor.roles.has(gRole2.id)){
      if (skill === 'v') {
          playerOnehp = playerOnehp - stab;
          skillUsed = "Stab";
          skillDamage2 = stab;
      }
      else if (skill === 'C') {
         playerOnehp = playerOnehp - slash;
         skillUsed = "Slash";
         skillDamage2 = slash;
      }
      else if (skill === "r") {
        if(rAuthor.roles.has(gRoleSkyStrike.id)){
          message.channel.send("Sky Strike is on cd");
        }
        else {
          playerOnehp = playerOnehp - 5;
          skillUsed = "Sky Strike";
          skillDamage2 = skyStrike;
          await(rAuthor.addRole(gRoleSkyStrike.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let SkyStrikeTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleSkyStrike.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(SkyStrikeTime));
        }
      }
      else if (skill === "e") {
        if(rAuthor.roles.has(gRoleDragonTooth.id)){
          message.channel.send("Dragon Tooth is on cd");
        }
        else {
          playerOnehp = playerOnehp - 7;
          skillUsed = "Dragon Tooth";
          skillDamage2 = dragonTooth;
          await(rAuthor.addRole(gRoleDragonTooth.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DragonToothTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDragonTooth.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DragonToothTime));
        }
      }
      else if (skill === "vv") {
        if(rAuthor.roles.has(gRoleDoubleStab.id)){
          message.channel.send("Double Stab is on cd");
        }
        else {
          playerOnehp = playerOnehp - 10;
          skillUsed = "Double Stab";
          skillDamage2 = doubleStab;
          await(rAuthor.addRole(gRoleDoubleStab.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DoubleStabTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDoubleStab.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DoubleStabTime));
        }
      }
      else if (skill === "f") {
        if(rAuthor.roles.has(gRoleFallingFlowerPalm.id)){
          message.channel.send("Falling Flower Palm is on cd");
        }
        else {
          playerOnehp = playerOnehp - 30;
          skillUsed = "Falling Flower Palm";
          skillDamage2 = fallingFlowerPalm;
          await(rAuthor.addRole(gRoleFallingFlowerPalm.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let FallingFlowerPalmTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleFallingFlowerPalm.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(FallingFlowerPalmTime));
        }
      }
      else if (skill === "R") {
        if(rAuthor.roles.has(gRoleCircleSwing.id)){
          message.channel.send("Circle Swing is on cd");
        }
        else {
          playerOnehp = playerOnehp - 15;
          skillUsed = "Circle Swing";
          skillDamage2 = circleSwing;
          await(rAuthor.addRole(gRoleCircleSwing.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let CircleSwingTime = "10000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleCircleSwing.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(CircleSwingTime));
        }
      }
      else if (skill === "ER") {
        if(rAuthor.roles.has(gRoleDraconicCrusher.id)){
          message.channel.send("Draconic Crusher is on cd");
        }
        else {
          playerOnehp = playerOnehp - 20;
          skillUsed = "Draconic Crusher";
          skillDamage2 = draconicCrusher;
          await(rAuthor.addRole(gRoleDraconicCrusher.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DraconicCrusherTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDraconicCrusher.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DraconicCrusherTime));
        }
      }
      else if (skill === "ft") {
        if(rAuthor.roles.has(gRoleFuriousDragonStrikesTheHeart.id)){
          message.channel.send("Furious Dragon Strikes The Heart is on cd");
        }
        else {
          playerOnehp = playerOnehp - 40;
          skillUsed = "Furious Dragon Strikes The Heart";
          skillDamage2 = furiousDragonStrikesTheHeart;
          await(rAuthor.addRole(gRoleFuriousDragonStrikesTheHeart.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let FuriousDragonStrikesTheHeartTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleFuriousDragonStrikesTheHeart.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(FuriousDragonStrikesTheHeartTime));
        }
      }
      else if (skill === "tr") {
        if(rAuthor.roles.has(gRoleDragonBreaksTheRank.id)){
          message.channel.send("Dragon Breaks The Rank is on cd");
        }
        else {
          playerOnehp = playerOnehp - 35;
          skillUsed = "Dragon Breaks The Rank";
          skillDamage2 = dragonBreaksTheRanks;
          await(rAuthor.addRole(gRoleDragonBreaksTheRank.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let DragonBreaksTheRanksTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleDragonBreaksTheRank.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(DragonBreaksTheRanksTime));
        }
      }
      else if (skill === "fr") {
        if(rAuthor.roles.has(gRoleRisingDragonSoarsTheSky.id)){
          message.channel.send("HA CEL & LEMNI!!!! THAT SKILL YOU KEEP SPAMMING is on cd");
        }
        else {
          playerOnehp = playerOnehp - 50;
          skillUsed = "Rising Dragon Soars The Sky";
          skillDamage2 = risingDragonSoarsTheSky;
          await(rAuthor.addRole(gRoleRisingDragonSoarsTheSky.id));
          //message.reply(`<@${rAuthor.id}> dragon tooth is on cooldown for ${ms(mutetime)}`);
          let RisingDragonSoarsTheSkyTime = "20000";

              setTimeout(function(){
                rAuthor.removeRole(gRoleRisingDragonSoarsTheSky.id);
              //message.channel.send(`<@${rAuthor.id}> has been unmute`);
            }, ms(RisingDragonSoarsTheSkyTime));
        }
    }
    else{
      playerOnehp = playerOnehp;
    }

      //let total = 10;
      let playerOneHealthBar = Math.round(playerOnehp/200);
      let playerOneHpPercent = Math.round(playerOnehp/10);

      if(playerOneHealthBar === 5){
        playerOneLife = "〘 ██████████  〙";
      }
      else if(playerOneHealthBar === 4){
        playerOneLife = "〘 ████████  〙";
      }
      else if(playerOneHealthBar === 3){
        playerOneLife = "〘 ██████  〙";
      }
      else if(playerOneHealthBar === 2){
        playerOneLife = "〘 ████  〙";
      }
      else if(playerOneHealthBar === 1){
        playerOneLife = "〘 ██  〙";
      }
      else if(playerOneHealthBar === 0){
        playerOneLife = "〘   〙";
      }

      let playerTwoHealthBar = Math.round(playerTwohp/200);
      let playerTwoHpPercent = Math.round(playerTwohp/10);

      if(playerTwoHealthBar === 5){
        playerTwoLife = "〘 ██████████  〙";
      }
      else if(playerTwoHealthBar === 4){
        playerTwoLife = "〘 ████████  〙";
      }
      else if(playerTwoHealthBar === 3){
        playerTwoLife = "〘 ██████  〙";
      }
      else if(playerTwoHealthBar === 2){
        playerTwoLife = "〘 ████  〙";
      }
      else if(playerTwoHealthBar === 1){
        playerTwoLife = "〘 ██  〙";
      }
      else if(playerTwoHealthBar === 0){
        playerTwoLife = "〘   〙";
      }

      playerTwoLastUsedSkill = skillUsed;
      function updateBattle(){
        let skillEmbed = new Discord.RichEmbed();
        skillEmbed.setDescription(`<@${rAuthor.id}> striked`)
        .setColor("#0033cc")
        .addField("Player 1 hp",`${playerOneLife} ${playerOneHpPercent}% hp left`, true)
        .addField("Player 2 hp",`${playerTwoLife} ${playerTwoHpPercent}% hp left`, true)
        .addBlankField()
        .addField("Player 1 last used skill", playerOneLastUsedSkill,true)
        .addField("Player 2 last used skill", playerTwoLastUsedSkill,true)
        .addBlankField()
        .addField(`Damage Done: ${skillDamage}`, `Player 2: ${playerTwoInitialHp}->${playerTwohp}`,true)
        .addField(`Damage Done: ${skillDamage2}`, `Player 1: ${playerOneInitialHp}->${playerOnehp}`,true);
        pkchannel.send(skillEmbed);
        playerOneChannel.send(skillEmbed);
        playerTwoChannel.send(skillEmbed);

      }
      updateBattle();

    }
    //else message.channel.send("you don't have these roles pls don't interrupt");
    else message.delete().catch(O_o=>{});
  }

  if(cmd === `${prefix}pk`){
      let time = "60000";
      playerOnehp = 1000;
      playerTwohp = 1000;
      playerOneLastUsedSkill="Standing still...";
      playerTwoLastUsedSkill="Standing still...";

      let battletime = (time/1000);
      let pkchannel = message.guild.channels.find(`name`, "arena");
      //if(!pkchannel) return message.channel.send("Couldn't find pk channel.");
      let playerOneChannel = message.guild.channels.find(`name`, "player-one");
      let playerTwoChannel = message.guild.channels.find(`name`, "player-two");

      let gRoleSkyStrike = message.guild.roles.find(`name`, "SkyStrike");
      if(!gRoleSkyStrike) return message.reply("Couldn't find that role");
      let gRoleDragonTooth = message.guild.roles.find(`name`, "DragonTooth");
      if(!gRoleDragonTooth) return message.reply("Couldn't find that role");
      let gRoleDoubleStab = message.guild.roles.find(`name`, "DoubleStab");
      if(!gRoleDoubleStab) return message.reply("Couldn't find that role");
      let gRoleFallingFlowerPalm = message.guild.roles.find(`name`, "FallingFlowerPalm");
      if(!gRoleFallingFlowerPalm) return message.reply("Couldn't find that role");
      let gRoleCircleSwing = message.guild.roles.find(`name`, "CircleSwing");
      if(!gRoleCircleSwing) return message.reply("Couldn't find that role");
      let gRoleDraconicCrusher = message.guild.roles.find(`name`, "DraconicCrusher");
      if(!gRoleDraconicCrusher) return message.reply("Couldn't find that role");
      let gRoleFuriousDragonStrikesTheHeart = message.guild.roles.find(`name`, "FuriousDragonStrikesTheHeart");
      if(!gRoleFuriousDragonStrikesTheHeart) return message.reply("Couldn't find that role");
      let gRoleDragonBreaksTheRank = message.guild.roles.find(`name`, "DragonBreaksTheRanks");
      if(!gRoleDragonBreaksTheRank) return message.reply("Couldn't find that role");
      let gRoleRisingDragonSoarsTheSky = message.guild.roles.find(`name`, "RisingDragonSoarsTheSky");
      if(!gRoleRisingDragonSoarsTheSky) return message.reply("Couldn't find that role");

    //rUser is the pinged(challenged) user
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't pk user.");
    //rAuthor is the user who issue the pk command(the challenger)
    let rAuthor = message.guild.member(message.author);

    let gRole1 = message.guild.roles.find(`name`, "PlayerOne");
    if(!gRole1) return message.reply("Couldn't find that role.");
    if(rAuthor.roles.has(gRole1.id)) return message.reply("They already have that role.");
    await(rAuthor.addRole(gRole1.id));

    //give PlayerTwo role to challenged user
    let gRole2 = message.guild.roles.find(`name`, "PlayerTwo");
    if(!gRole2) return message.reply("Couldn't find that role.");
    if(rUser.roles.has(gRole2.id)) return message.reply("They already have that role.");
    await(rUser.addRole(gRole2.id));

    //create winloss record if author/user do not have an existing entry in pkrecord.json
    if(!pkRecord[rAuthor.id]) pkRecord[rAuthor.id] = {
      wins: 0,
      loss: 0
    };
    if(!pkRecord[rUser.id]) pkRecord[rUser.id] = {
      wins: 0,
      loss: 0
    };

    async function purge(){
      //message.delete();
      const fetchedArena = await pkchannel.fetchMessages({limit: 100});
      const fetchedPlayerOneChannel = await playerOneChannel.fetchMessages({limit: 100});
      const fetchedPlayerTwoChannel = await playerTwoChannel.fetchMessages({limit: 100});
      console.log(fetchedArena.size + `messsages found, deleting...`);
      console.log(fetchedPlayerOneChannel.size + `messsages found, deleting...`);
      console.log(fetchedPlayerTwoChannel.size + `messsages found, deleting...`);

      pkchannel.bulkDelete(fetchedArena).catch(error => message.channel.send(`Error ${error}`));
      playerOneChannel.bulkDelete(fetchedPlayerOneChannel).catch(error => message.channel.send(`Error ${error}`));
      playerTwoChannel.bulkDelete(fetchedPlayerTwoChannel).catch(error => message.channel.send(`Error ${error}`));

    }
    purge();

    pkchannel.send(`<@${rAuthor.id}> challenged <@${rUser.id}> on a duel!`);

    let pkEmbed = new Discord.RichEmbed()
    .setDescription("PKPKPKPKPK")
    .setColor("#15f153")
    .addField("Player One", `${rAuthor}`, true)
    .addField("Player Two", `${rUser}`, true)
    .addField("Channel", message.channel)
    .addField("Time", `${battletime} seconds`);
    pkchannel.send(pkEmbed);
    //if(!pkchannel) return message.channel.send("Couldn't find pk channel.");
    //message.delete().catch(O_o=>{}); //this command deletes the message
    setTimeout(function(){
      purge();
      if(playerOnehp > playerTwohp){
        var winner = rAuthor;
        pkRecord[rAuthor.id].wins++;
        pkRecord[rUser.id].loss++;
      }
      else if(playerTwohp > playerOnehp){
         var winner = rUser;
         pkRecord[rUser.id].wins++;
         pkRecord[rAuthor.id].loss++;
      }
      else{
        winner = "It's a draw."
      }

      let playerOneHealthBar = Math.round(playerOnehp/200);
      let playerOneHpPercent = Math.round(playerOnehp/10);

      if(playerOneHealthBar === 5){
        playerOneLife = "〘 ██████████  〙";
      }
      else if(playerOneHealthBar === 4){
        playerOneLife = "〘 ████████  〙";
      }
      else if(playerOneHealthBar === 3){
        playerOneLife = "〘 ██████  〙";
      }
      else if(playerOneHealthBar === 2){
        playerOneLife = "〘 ████  〙";
      }
      else if(playerOneHealthBar === 1){
        playerOneLife = "〘 ██  〙";
      }
      else if(playerOneHealthBar === 0){
        playerOneLife = "〘   〙";
      }

      let playerTwoHealthBar = Math.round(playerTwohp/200);
      let playerTwoHpPercent = Math.round(playerTwohp/10);

      if(playerTwoHealthBar === 5){
        playerTwoLife = "〘 ██████████  〙";
      }
      else if(playerTwoHealthBar === 4){
        playerTwoLife = "〘 ████████  〙";
      }
      else if(playerTwoHealthBar === 3){
        playerTwoLife = "〘 ██████  〙";
      }
      else if(playerTwoHealthBar === 2){
        playerTwoLife = "〘 ████  〙";
      }
      else if(playerTwoHealthBar === 1){
        playerTwoLife = "〘 ██  〙";
      }
      else if(playerTwoHealthBar === 0){
        playerTwoLife = "〘   〙";
      }

      //Show the pk result
      let endEmbed = new Discord.RichEmbed()
      .setDescription("Battle ended")
      .setColor("#15f153")
      .addField("Winner", `${winner}`)
      .addField(`Player One `, ` ${playerOneLife} ${playerOneHpPercent}% hp left <@${rAuthor.id}>[${pkRecord[rAuthor.id].wins} W, ${pkRecord[rAuthor.id].loss} L]`, true)
      .addField(`Player Two `, `${playerTwoLife} ${playerTwoHpPercent}% hp left <@${rUser.id}>[${pkRecord[rUser.id].wins} W, ${pkRecord[rUser.id].loss} L]`, true)
      pkchannel.send(endEmbed);
      playerOneChannel.send(endEmbed);
      playerTwoChannel.send(endEmbed);

      rAuthor.removeRole(gRole1.id);
      pkchannel.send(`<@${rAuthor.id}>'s PlayerOne role has been removed`);
      rUser.removeRole(gRole2.id);
      pkchannel.send(`<@${rUser.id}>'s PlayerTwo role has been removed`);

      //---Remove all the excess roles for player1 and player2 after the pk ends---
      //remove player1 excess roles
      rAuthor.removeRole(gRoleSkyStrike.id);
      rAuthor.removeRole(gRoleDoubleStab.id);
      rAuthor.removeRole(gRoleCircleSwing.id);
      rAuthor.removeRole(gRoleDragonTooth.id);
      rAuthor.removeRole(gRoleDraconicCrusher.id);
      rAuthor.removeRole(gRoleFallingFlowerPalm.id);
      rAuthor.removeRole(gRoleDragonBreaksTheRank.id);
      rAuthor.removeRole(gRoleRisingDragonSoarsTheSky.id);
      rAuthor.removeRole(gRoleFuriousDragonStrikesTheHeart.id);

      //remove player 2 excess roles
      rUser.removeRole(gRoleSkyStrike.id);
      rUser.removeRole(gRoleDoubleStab.id);
      rUser.removeRole(gRoleCircleSwing.id);
      rUser.removeRole(gRoleDragonTooth.id);
      rUser.removeRole(gRoleDraconicCrusher.id);
      rUser.removeRole(gRoleFallingFlowerPalm.id);
      rUser.removeRole(gRoleDragonBreaksTheRank.id);
      rUser.removeRole(gRoleRisingDragonSoarsTheSky.id);
      rUser.removeRole(gRoleFuriousDragonStrikesTheHeart.id);
      //---End of remove excess roles---

      fs.writeFile("./pkrecord.json", JSON.stringify(pkRecord), (err) => {
        if (err) console.log(err);
      });

      playerOnehp = 1000;
      playerTwohp = 1000;
    }, ms(time));
  }

  // if(cmd === `${prefix}wallofshame`){
  //   let endEmbed = new Discord.RichEmbed()
  //   .setDescription("leaderboard")
  //   .setColor("#15f153")
  //   .addField("No.1 - Cel for no reason.")
  //   .addField("No.2 - Neopolitan (0%) damage dealt.")
  //   .addField("No.3 - Neopolitan (6%) damage dealt.")
  //
  //   //message.channel.send(endEmbed);
  //    message.channel.send(endEmbed);
  //   //return message.channel.send(`(█    █    █    █    )`); 4 empty space equals 1 white space?
  // }

});

bot.login(tokenfile.token);
