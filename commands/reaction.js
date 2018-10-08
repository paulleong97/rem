const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  var ftCD = 2; //example of current skill cooldown
  var trCD = 3;

  //We can add reaction to Message but we cannot add reaction to RichEmbed.
  //I checked the Discord.js RichEmbed api documentation but seems like there's no such function.
  message.react("💩"); //check the ;reaction message to see how this works.
  message.react("👍");
  message.react("💩"); //also we can only add 1 speciic reaction 1 time. Trying to increase the number doesn't work.

  //example of an embed we display
  let endEmbed = new Discord.RichEmbed()
  .setDescription("Example of skill CD reaction")
  .setColor("#15f153")
  .addField("Player 1 hp",`〘 ████████  〙 73% hp left`, true)
  .addField("Player 2 hp",`〘 ██████  〙 55% hp left`, true)
  .addField("Skill Cooldown",`:wink: ${ftCD} 👍 ${trCD}`) //this can be used to emulate the effect of multiple reactions
   message.channel.send(endEmbed);

}
  module.exports.help = {
    name: "reaction"
  }
