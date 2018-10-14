const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let endEmbed = new Discord.RichEmbed()
  .setDescription("CSS can be scripted in")
  .setColor("#15f153")
  .addField("css", "```css\nWe can make text green\n████████████████████████```")
  .addField("prolog", "```prolog\nFirst letter█████████████████████████```")
  .addField("yaml","```yaml\nNo.3 - Neopolitan (6%) damage dealt.```")
   message.channel.send(endEmbed);
}
  module.exports.help = {
    name: "color"
  }
