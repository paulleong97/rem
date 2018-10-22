const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const game = require("./player.js");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const ms = require("ms");

//Player Stats Array
var playerStatsDB = JSON.parse(fs.readFileSync("playerStats.json"));

// Replacer Helper Function for 
function replacer(key, value) {
  var ignoredProperties = ["activeSkill", "effectiveAttributeStats", "currentResources", "effectiveMaxResourceStats", "effectiveDefenseStats", "effectiveResistanceStats", "effectiveAttackStats"]
  // Filtering out properties
  if (ignoredProperties.includes(key)) {
    return undefined;
  }
  return value;
}

// Update Local Player Stats DB
function updateLocalDB(){
  playerStatsDB = JSON.parse(fs.readFileSync("playerStats.json"));
}

// Store Player Stats in local DB array
function addPlayerToDB(player){
  console.log(typeof playerStatsDB);
  playerStatsDB.push(player);
}

// Update JSON DB
function updateJSON(){
  playerStatsDB = JSON.stringify(playerStatsDB, replacer, '\t');
      fs.writeFileSync("./playerStats.json", playerStatsDB, (err) => {
        if (err) console.log(err);
      });
      console.log("JSON update done")
}

// Lookup the playerStats json file to see if this ID exists
function lookupPlayerStats(playerID){
  // Get content from file
  for( var i = 0; i < playerStatsDB.length-1; i++){ 
    if ( playerStatsDB[i].ID === playerID) {
      return playerStatsDB[i];
    }
  }
}

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



// Initialize Game
var turnBased = new game.Game();

// Event Handling for Message Posts
const prefix = botconfig.prefix;
bot.on("message", async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if(message.channel.type === "dm") return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();

  // Initialize Arena Match Command
  if (command === "pk"){

    // Update the local DB with JSON Values
    updateLocalDB();

    // Get the two players who will be fighting
    var challenged = message.mentions.members.first();
    var challenger = message.guild.member(message.author);
    var newPlayer = false;
    console.log(`${challenger.id} has challenged ${challenged.id}`)


    // Check if challenger player id are already in DB
    var challengerPlayer = lookupPlayerStats(challenger.id);
    if (challengerPlayer === undefined){
      console.log("Challenger is Missing!");
      turnBased.initializeChallengerPlayer(challenger.id);
      addPlayerToDB(turnBased.challengerPlayer);
      newPlayer = true;
    } else {
      console.log("Challenger Found!");
      turnBased.setChallengerPlayer(challengerPlayer);
    }

    // Check if challenged player id are already in DB
    var challengedPlayer = lookupPlayerStats(challenged.id);
    if (challengedPlayer === undefined){
      console.log("Challenged is Missing!");
      turnBased.initializeChallengedPlayer(challenged.id);
      addPlayerToDB(turnBased.challengedPlayer);
      newPlayer = true;
    } else {
      console.log("Challenged Found!");
      turnBased.setChallengedPlayer(challengedPlayer);
    }
    
    console.log(playerStatsDB.length);

    if (newPlayer === true){
      updateJSON();
    }
    
 /*   var jsonData = JSON.stringify(jsonArray, replacer, '\t');
    fs.writeFile("playerStats.json", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });
*/
    
  }

  if (command === "update"){
    updateJSON();
  }

/*  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);*/
});

bot.login(tokenfile.token);
