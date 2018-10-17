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
  let muterole = message.guild.roles.find(`name`, "muted"); //to be used to implement mute later
  let rAuthor = message.guild.member(message.author);

  let gRole1 = message.guild.roles.find(`name`, "PlayerOne");
  if(!gRole1) return message.reply("Couldn't find that role.");

  //give PlayerTwo role to challenged user
  let gRole2 = message.guild.roles.find(`name`, "PlayerTwo");
  if(!gRole2) return message.reply("Couldn't find that role.");

  if(rAuthor.roles.has(gRole1.id)){
    message.channel.send("Player 1 striked.");
    //message.channel.send(`p1 ${playerOneUsedSkill}`);
    playerOneUsedSkill = true;
    if(playerOneUsedSkill === true && playerTwoUsedSkill === true){
      message.channel.send("Detected both players used skill. Next Round.")
      //***calculate and display damage/cc/cd here***

      //***end of calculate and display damage/cc/cd***
      playerOneUsedSkill = false;
      playerTwoUsedSKill = false;
      //***unmute player 1 and player 2 here***

      //***end of unmute player 1 and player 2 here***
    }
    else{
       message.channel.send("Player 1 used skill, awaiting player 2.")
      //mute player 1 here so that can't use more than 1 skill per round
    }
  }

  else if(rAuthor.roles.has(gRole2.id)){
    message.channel.send("Player 2 striked.");
      //mute player 2 here
    playerTwoUsedSkill = true;
    if((playerOneUsedSkill === true && playerTwoUsedSkill === true)){
      //***calculate and display damage/cc/cd here***

      //***end of calculate and display damage/cc/cd***
      message.channel.send("Detected both players used skill. Next Round.")
      playerOneUsedSkill = false;
      playerTwoUsedSKill = false;
      //***unmute player 1 and player 2 here***

      //***end of unmute player 1 and player 2 here***
    }
    else {
      message.channel.send("Player 2 used skill, awaiting player 1.")
        //mute player 2 here so that can't use more than 1 skill per round
    }
  }
}

  module.exports.help = {
    name: "turnbased"
  }
