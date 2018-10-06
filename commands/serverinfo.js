const Discord = require("discord.js");
const myModule = require("./botinfo.js");
const animal = require("./animal.js");

module.exports.run = async (bot, message, args) =>{

var animal = new animal(3, 3);

message.channel.send(`Animal name: ${animal.getName}`);

// let val = myModule.a; // val is "Hello"
// message.channel.reply(`val = ${val}`);
  // let sicon = message.guild.iconURL;
  //    let serverembed = new Discord.RichEmbed()
  //    .setDescription("Server Information")
  //    .setColor("#15f153")
  //    .setThumbnail(sicon)
  //    .addField("Server Name", message.guild.name)
  //    .addField("Created On", message.guild.createdAt)
  //    .addField("You Joined", message.guild.joinedAt)
  //    .addField("Total Members", message.guild.memberCount);
  //
  //    message.channel.send(serverembed);
}

module.exports.help = {
  name: "serverinfo"
}
