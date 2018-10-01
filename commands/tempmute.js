const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) =>{
  let tomute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!tomute) return message.reply("Couldn't find user");
//  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Cant't mute them");
  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole= await message.guild.createRole({
      name: "muted",
      color: "000000",
      permissions:[]
    })
    message.guild.channels.forEach(async (channel, id) =>{
      await channel.overwritePermission(muterole, {
        SEND_MESSAGE: false,
        ADD_REACHTION: false
      });
    });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role

  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(mutetime)}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmute`);
  }, ms(mutetime));

  //end of module
}

module.exports.help = {
  name: "tempmute"
}
