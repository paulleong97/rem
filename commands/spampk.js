const Discord = require("discord.js");

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

//can be used to store skill CD in turn-basad
var skyStrikeCD = 0;
var dragonToothCD = 0;
var doubleStabCD = 0;
var circleSwingCD = 0;
var draconicCrusherCD = 0;
var fallingFlowerPalmCD = 0;
var dragonBreaksTheRanksCD = 0;
var furiousDragonStrikesTheHeartCD = 0;
var risingDragonSoarsTheSkyCD = 0;

var rAuthor;  //person who sends a message
var rUser;  //the person who is pinged

var playerOnehp = 1000; //playerOne current hp
var playerTwohp = 1000; //playerTwo current hp
var playerOneLife;  //contains the string of the health bar of player 1
var playerTwoLife;   //contains the string of the health bar of player 2
var playerOneLastUsedSkill;
var playerTwoLastUsedSkill;

var playerOne;
var playerTwo;

var playerOneUsedSkill = false;
var playerTwoUsedSkill = false;
var battleTurn = 0;

module.exports.run = async (bot, message, args) => {
  let pkRecord = JSON.parse(fs.readFileSync("./pkrecord.json", "utf8"));
    let time = "30000"; //30000
    let pktime = "60000" //60000
    playerOnehp = 1000;
    playerTwohp = 1000;
    playerOneLastUsedSkill="Standing still...";
    playerTwoLastUsedSkill="Standing still...";

    let battletime = (pktime/1000);
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

  //remove player1 excess roles
  if (rAuthor.roles.has(gRoleSkyStrike.id)) rAuthor.removeRole(gRoleSkyStrike.id);
  if (rAuthor.roles.has(gRoleDoubleStab.id)) rAuthor.removeRole(gRoleDoubleStab.id);
  if (rAuthor.roles.has(gRoleCircleSwing.id)) rAuthor.removeRole(gRoleCircleSwing.id);
  if (rAuthor.roles.has(gRoleDragonTooth.id)) rAuthor.removeRole(gRoleDragonTooth.id);
  if (rAuthor.roles.has(gRoleDraconicCrusher.id)) rAuthor.removeRole(gRoleDraconicCrusher.id);
  if (rAuthor.roles.has(gRoleFallingFlowerPalm.id)) rAuthor.removeRole(gRoleFallingFlowerPalm.id);
  if (rAuthor.roles.has(gRoleDragonBreaksTheRank.id)) rAuthor.removeRole(gRoleDragonBreaksTheRank.id);
  if (rAuthor.roles.has(gRoleRisingDragonSoarsTheSky.id)) rAuthor.removeRole(gRoleRisingDragonSoarsTheSky.id);
  if (rAuthor.roles.has(gRoleFuriousDragonStrikesTheHeart.id)) rAuthor.removeRole(gRoleFuriousDragonStrikesTheHeart.id);

  //remove player 2 excess roles
  if (rUser.roles.has(gRoleSkyStrike.id)) rUser.removeRole(gRoleSkyStrike.id);
  if (rUser.roles.has(gRoleDoubleStab.id)) rUser.removeRole(gRoleDoubleStab.id);
  if (rUser.roles.has(gRoleCircleSwing.id)) rUser.removeRole(gRoleCircleSwing.id);
  if (rUser.roles.has(gRoleDragonTooth.id)) rUser.removeRole(gRoleDragonTooth.id);
  if (rUser.roles.has(gRoleDraconicCrusher.id)) rUser.removeRole(gRoleDraconicCrusher.id);
  if (rUser.roles.has(gRoleFallingFlowerPalm.id)) rUser.removeRole(gRoleFallingFlowerPalm.id);
  if (rUser.roles.has(gRoleDragonBreaksTheRank.id)) rUser.removeRole(gRoleDragonBreaksTheRank.id);
  if (rUser.roles.has(gRoleRisingDragonSoarsTheSky.id)) rUser.removeRole(gRoleRisingDragonSoarsTheSky.id);
  if (rUser.roles.has(gRoleFuriousDragonStrikesTheHeart.id)) rUser.removeRole(gRoleFuriousDragonStrikesTheHeart.id);
  //---End of remove excess roles---

  //create winloss record if author/user do not have an existing entry in pkrecord.json
  if(!pkRecord[rAuthor.id]) pkRecord[rAuthor.id] = {
    wins: 0,
    loss: 0,
    elo: 1200
  };
  if(!pkRecord[rUser.id]) pkRecord[rUser.id] = {
    wins: 0,
    loss: 0,
    elo: 1200
  };
  // pkRecord = JSON.stringify(pkRecord, null, 2);
  // fs.writeFile("./pkrecord.json", pkRecord, (err) => {
  //   if (err) console.log(err);
  // });

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

      rAuthor.removeRole(gRole1.id);
      pkchannel.send(`<@${rAuthor.id}>'s PlayerOne role has been removed`);
      rUser.removeRole(gRole2.id);
      pkchannel.send(`<@${rUser.id}>'s PlayerTwo role has been removed`);

      //---Remove all the excess roles for player1 and player2 after the pk ends---


      pkchannel.send("Finalizing damage done. Result will be displayed in around 30secs...");

      setTimeout(function(){
      purge();

      //calculate Elo
      // function elo(winner, loser){
      //   // let playerOneWins = pkRecord[rAuthor.id].wins;
      //   // let playerOneLoss = pkRecord[rAuthor.id].loss;
      //   // let playerOneElo = pkRecord[rAuthor.id].elo;
      //   // let playerOneTotal = pkRecord[rAuthor.id].total;
      //   //
      //   // let playerTwoWins = pkRecord[rUser.id].wins;
      //   // let playerTwoLoss = pkRecord[rUser.id].loss;
      //   // let playerTwoElo = pkRecord[rUser.id].elo;
      //   // let playerTwoTotal = pkRecord[rUser.id].total;
      //   pkRecord[winner.id].wins++;
      //   pkRecord[loser.id].loss++
      //   pkRecord[winner.id].elo = (pkRecord[winner.id].elo + 25)
      //   pkRecord[loser.id].elo = (pkRecord[loser.id].elo - 25)
      // }
      function calculateElo(a, b){
        var Ra = pkRecord[a.id].elo;
        var Rb = pkRecord[b.id].elo;
        var k = 100;

        var Ea = 1/(1+Math.pow(10,((Rb-Ra)/400)));
        return Ea;
      }

      if(playerOnehp > playerTwohp){
        var winner = rAuthor;
        var loser = rUser;
        var testDamage;
        var playerOneInitialElo = pkRecord[rAuthor.id].elo;
        var playerTwoInitialElo = pkRecord[rUser.id].elo;
        var playerOneNewElo;
        var playerTwoNewElo;

        if(playerOnehp<900) testDamage = 0;

            if(testDamage === 0){
                pkRecord[rAuthor.id].wins++;
                pkRecord[rUser.id].loss++;
                var Ea = calculateElo(rAuthor, rUser);
                pkchannel.send(`Ea: ${Ea}`);
                playerOneNewElo = playerOneInitialElo+100*(1-calculateElo(rAuthor, rUser));
                playerTwoNewElo = playerTwoInitialElo+100*(0-calculateElo(rUser, rAuthor));

                pkRecord[rAuthor.id].elo = Math.ceil(playerOneNewElo);
                pkRecord[rUser.id].elo = Math.ceil(playerTwoNewElo);



              //  [CODE] add and reduce elo
                // pkRecord[rAuthor.id].elo = pkRecord[rAuthor.id].elo+25;
                // pkRecord[rUser.id].elo = pkRecord[rUser.id].elo-25;
             }

      }
      else if(playerTwohp > playerOnehp){
        var winner = rUser;
        var loser = rAuthor;
        var playerOneInitialElo = pkRecord[rAuthor.id].elo;
        var playerTwoInitialElo = pkRecord[rUser.id].elo;
        var playerOneNewElo;
        var playerTwoNewElo;

         if(playerTwohp<900) testDamage = 0;

         if(testDamage === 0){
           pkRecord[rUser.id].wins++;
           pkRecord[rAuthor.id].loss++;

           playerOneNewElo = playerOneInitialElo+100*(0-calculateElo(rAuthor, rUser));
           playerTwoNewElo = playerTwoInitialElo+100*(1-calculateElo(rUser, rAuthor));

           pkRecord[rAuthor.id].elo = Math.ceil(playerOneNewElo);
           pkRecord[rUser.id].elo = Math.ceil(playerTwoNewElo);
           //[CODE] add and reduce elo
           // pkRecord[rUser.id].elo = pkRecord[rUser.id].elo+25;
           // pkRecord[rAuthor.id].elo = pkRecord[rAuthor.id].elo-25;
        }

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
      if(playerOnehp === playerTwohp){
        let endEmbed = new Discord.RichEmbed()
        .setDescription("Battle ended")
        .setColor("#15f153")
        .addField("Winner","It's a Draw")
        .addField("Loser","It's a Draw")
        .addField(`Player One `, ` ${playerOneLife} ${playerOneHpPercent}% hp left`, true)
        .addField(`Player Two `, `${playerTwoLife} ${playerTwoHpPercent}% hp left `, true)
        pkchannel.send(endEmbed);
      }
      else if(playerOnehp>900 || playerTwohp>900){
        let endEmbed = new Discord.RichEmbed()
        .setDescription("Battle ended")
        .setColor("#15f153")
        .addField("``Match not counted. Both players need to deal more than 10% damage.``")
        .addField("Winner", ` <@${winner.id}>[${pkRecord[winner.id].wins} W, ${pkRecord[winner.id].loss} L]`)
        .addField("Loser", ` <@${loser.id}>[${pkRecord[loser.id].wins} W, ${pkRecord[loser.id].loss} L]`)
        .addField(`Player One `, ` ${playerOneLife} ${playerOneHpPercent}% hp left`, true)
        .addField(`Player Two `, `${playerTwoLife} ${playerTwoHpPercent}% hp left `, true)
        pkchannel.send(endEmbed);
      }
      else{
        let endEmbed = new Discord.RichEmbed()
        .setDescription("Battle ended")
        .setColor("#15f153")
        .addField("Winner", ` <@${winner.id}>[${pkRecord[winner.id].wins} W, ${pkRecord[winner.id].loss} L]`)
        .addField("Loser", ` <@${loser.id}>[${pkRecord[loser.id].wins} W, ${pkRecord[loser.id].loss} L]`)
        .addField(`Player One `, ` ${playerOneLife} ${playerOneHpPercent}% hp left`, true)
        .addField(`Player Two `, `${playerTwoLife} ${playerTwoHpPercent}% hp left `, true)
        pkchannel.send(endEmbed);
        //playerOneChannel.send(endEmbed);
        //playerTwoChannel.send(endEmbed);
      }



      pkRecord = JSON.stringify(pkRecord, null, 2);
      fs.writeFile("./pkrecord.json", pkRecord, (err) => {
        if (err) console.log(err);
      });

      playerOnehp = 1000;
      playerTwohp = 1000;
    }, ms(time));

  }, ms(pktime));

  //remove player1 excess roles
  if (rAuthor.roles.has(gRoleSkyStrike.id)) rAuthor.removeRole(gRoleSkyStrike.id);
  if (rAuthor.roles.has(gRoleDoubleStab.id)) rAuthor.removeRole(gRoleDoubleStab.id);
  if (rAuthor.roles.has(gRoleCircleSwing.id)) rAuthor.removeRole(gRoleCircleSwing.id);
  if (rAuthor.roles.has(gRoleDragonTooth.id)) rAuthor.removeRole(gRoleDragonTooth.id);
  if (rAuthor.roles.has(gRoleDraconicCrusher.id)) rAuthor.removeRole(gRoleDraconicCrusher.id);
  if (rAuthor.roles.has(gRoleFallingFlowerPalm.id)) rAuthor.removeRole(gRoleFallingFlowerPalm.id);
  if (rAuthor.roles.has(gRoleDragonBreaksTheRank.id)) rAuthor.removeRole(gRoleDragonBreaksTheRank.id);
  if (rAuthor.roles.has(gRoleRisingDragonSoarsTheSky.id)) rAuthor.removeRole(gRoleRisingDragonSoarsTheSky.id);
  if (rAuthor.roles.has(gRoleFuriousDragonStrikesTheHeart.id)) rAuthor.removeRole(gRoleFuriousDragonStrikesTheHeart.id);

  //remove player 2 excess roles
  if (rUser.roles.has(gRoleSkyStrike.id)) rUser.removeRole(gRoleSkyStrike.id);
  if (rUser.roles.has(gRoleDoubleStab.id)) rUser.removeRole(gRoleDoubleStab.id);
  if (rUser.roles.has(gRoleCircleSwing.id)) rUser.removeRole(gRoleCircleSwing.id);
  if (rUser.roles.has(gRoleDragonTooth.id)) rUser.removeRole(gRoleDragonTooth.id);
  if (rUser.roles.has(gRoleDraconicCrusher.id)) rUser.removeRole(gRoleDraconicCrusher.id);
  if (rUser.roles.has(gRoleFallingFlowerPalm.id)) rUser.removeRole(gRoleFallingFlowerPalm.id);
  if (rUser.roles.has(gRoleDragonBreaksTheRank.id)) rUser.removeRole(gRoleDragonBreaksTheRank.id);
  if (rUser.roles.has(gRoleRisingDragonSoarsTheSky.id)) rUser.removeRole(gRoleRisingDragonSoarsTheSky.id);
  if (rUser.roles.has(gRoleFuriousDragonStrikesTheHeart.id)) rUser.removeRole(gRoleFuriousDragonStrikesTheHeart.id);
  //---End of remove excess roles---

}

  module.exports.help = {
    name: "spampk"
  }
