const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const game = require("./player.js");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const ms = require("ms");

/*bot.commands = new Discord.Collection();
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
});*/

// Event Handling for when bot come online
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
  bot.user.setActivity("The King's Avatar", {type: "WATCHING"});
});

// Event Handling for adding guild members
bot.on("guildMemberAdd", async member => {
  console.log(`${member} joined the server`);
  let logChannel = member.guild.channels.find(`name`, "log-channel");
  let gamerRole = member.guild.roles.find(`name`, "Glory Gamer");
      logChannel.send(`New member ${member} joined. Gave the ${gamerRole} role`);
      member.addRole(gamerRole.id);
});

// Event Handling for leaving guild members
bot.on("guildMemberRemove", async member => {
    console.log(`${member} left the server`);
    let logChannel = member.guild.channels.find(`name`, "log-channel");
  logChannel.send(`${member} left this server`);
});

// Event Handling for Channel Creation
bot.on("channelCreate", async channel => {
  let logChannel = channel.guild.channels.find(`name`, "log-channel");
  logChannel.send(`Someone created the ${channel} channel`);
});

var turnbased = new game.Game();
turnbased.initializeMatch();

// Event Handling for Message Posts
const prefix = botconfig.prefix;
bot.on("message", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if(message.channel.type === "dm") return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift()


  if (command === "pk"){
    let challenged = message.mentions.members.first();
    let challenger = message.guild.member(message.author);
    
    console.log(turnbased.challengerPlayer);

    
  }

/*  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);*/
});

bot.login(tokenfile.token);
