const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  async function purge(){
    message.delete();
    const fetched = await message.channel.fetchMessages({limit: args[0]});
    console.log(fetched.size + `messsages found, deleting...`);

    message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error ${error}`));

  }
  purge();
}

  module.exports.help = {
    name: "purge"
  }
