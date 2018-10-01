const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rAuthor = message.guild.member(message.author);

  let gRole1 = message.guild.roles.find(`name`, "pol");
  if(!gRole1) return message.reply("Couldn't find that role.");
  if(rAuthor.roles.has(gRole1.id))   {return message.channel.send("pol you tried your best but your teammates were simply too noob. Cheer up!");
    await(rAuthor.addRole(gRole1.id));
  }
  else{
    message.channel.send("You're not pol. I only act upon pol's command.")
  }
}
  module.exports.help = {
    name: "iTried"
  }
