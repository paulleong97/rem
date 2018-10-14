const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var ftCD = 2; //example of current skill cooldown
  var trCD = 3;

  const ayy = message.guild.emojis.find("name", "SkyStrike");
  const ayy2 = message.guild.emojis.find("name", "DragonTooth");
  const ayy3 = message.guild.emojis.find("name", "FallingFlowerPalm");
  const ayy4 = message.guild.emojis.find("name", "CircleSwing");
  const ayy5 = message.guild.emojis.find("name", "DoubleStab");
  const ayy6 = message.guild.emojis.find("name", "NeutralChaser");
  const ayy7 = message.guild.emojis.find("name", "WaterChaser");
  const ayy8 = message.guild.emojis.find("name", "FireChaser");
  const ayy9 = message.guild.emojis.find("name", "ShadowChaser");
  const ayy10 = message.guild.emojis.find("name", "LightChaser");


  //We can add reaction to Message but we cannot add reaction to RichEmbed.
  //I checked the Discord.js RichEmbed api documentation but seems like there's no such function.
  // message.react("💩"); //check the ;reaction message to see how this works.
  // message.react("👍");
//  message.channel.send(`${ayy}`); //also we can only add 1 speciic reaction 1 time. Trying to increase the number doesn't work.

  //example of an embed we display
  let endEmbed = new Discord.RichEmbed()
  .setDescription("Example of skill CD reaction")
  .setColor("#15f153")
  .addField("Player 1 hp",`〘 ████████  〙 73% hp left`, true)
  .addField("Player 2 hp",`〘 ██████  〙 55% hp left`, true)
  .addField("Level 1 Skills Cooldown",`${ayy}${trCD} ${ayy2}${ftCD} ${ayy3}${ftCD} ${ayy4}${trCD} ${ayy5}${ftCD}`) //this can be used to emulate the effect of multiple reactions
  .addField("Level 2 Skills Cooldown",`${ayy6}${trCD} ${ayy7}${ftCD} ${ayy8}${ftCD} ${ayy9}${trCD} ${ayy10}${ftCD}`)
  message.channel.send(endEmbed);

}
  module.exports.help = {
    name: "reaction"
  }
