const Discord = require('discord.js');
const morse = require('morse');

exports.run = function(bot, msg, params) {
  str = params.slice(0).join(' ');
  converted = new Discord.RichEmbed({
    title: `__Morse decoded for "${str}"__`,
    color: 5967640
  });

  result = morse.decode(str);

  converted.addField("Translation", result);

  msg.author.send('', {embed: converted});
  if (msg.channel.type != "dm") {
    bot.delReply(msg, "Sent a DM!");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["m"],
  category: "Conversion"
};

exports.help = {
  name: "morse",
  description: "Decodes a morse code statement (with only . and / used).",
  usage: "morse [string]"
};
