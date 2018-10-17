const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const ms = require("ms");

bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err,files) =>{
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

//When bot is turn online
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("The King's Avatar", {type: "WATCHING"});
});
bot.on("guildMemberAdd", async member => {
  console.log(`${member} joined the server`);
  let logChannel = member.guild.channels.find(`name`, "log-channel");
  let gamerRole = member.guild.roles.find(`name`, "Glory Gamer");
      logChannel.send(`New member ${member} joined. Gave the ${gamerRole} role`);
      member.addRole(gamerRole.id);
});
bot.on("guildMemberRemove", async member => {
    console.log(`${member} left the server`);
    let logChannel = member.guild.channels.find(`name`, "log-channel");
  logChannel.send(`${member} left this server`);
});
bot.on("channelCreate", async channel => {
  let logChannel = channel.guild.channels.find(`name`, "log-channel");
  logChannel.send(`Someone created the ${channel} channel`);
});

//this function detects specific message and execute the respective command
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);
});

bot.login(tokenfile.token);
