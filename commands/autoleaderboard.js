const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  let autopkRecord = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

// var a = autopkRecord.sort(function(obj1, obj2) {
// 	// Ascending: first age less than the previous
// 	return obj1.elo - obj2.elo;
// });

let wins = autopkRecord[0].wins;
console.log(`a: ${wins}`);

  // var a = autopkRecord.sort(function(obj1, obj2) {
	// // Ascending: first age less than the previous
	// return obj1.elo - obj2.elo;
  // });
  // message.channel.send(`${a[0]}`);

  // let endEmbed = new Discord.RichEmbed()
  // .setDescription("Leaderboard *BETA ver.*")
  // .setColor("#15f153")
  // .setThumbnail(bicon)
  //  message.channel.send(endEmbed);

}

  module.exports.help = {
    name: "autoleaderboard"
  }
