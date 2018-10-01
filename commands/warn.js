const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
//  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can't do that.");
  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!wUser) return message.reply("Couldn't find user.");
  //if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They have manage message perms.");

  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .addField("Warned User", wUser.tag)
  .addField("Number of warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  message.channel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
      let muterole = message.guild.roles.find(`name`, "muted");

      let mutetime = "10s";
      if(!mutetime) return message.reply("You didn't specify a time");

      await(wUser.addRole(muterole.id));
      message.reply(`<@${wUser.id}> has been muted for ${ms(mutetime)}`);

      setTimeout(function(){
        wUser.removeRole(muterole.id);
        message.channel.send(`<@${wUser.id}> has been unmute`);
      }, ms(mutetime));
  }
  if(warns[wUser.id].warns == 3){
    //ban user
  }

}

module.exports.help = {
  name: "warn"
}
