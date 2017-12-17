const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	str = params[0]
	base64 = new Discord.RichEmbed({
    	title: `__Base64 decoded for "${str}"__`,
    	color: 5967640
  	})

	base64.addField("Translation", Buffer.from(str, 'base64').toString())

	msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {embed: base64})
  	bot.delReply(msg, "Sent a DM!")
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["r"],
  category: "Conversion"
};

exports.help = {
  name: "base64",
  description: "Decodes a Base 64 encoded string.",
  usage: "base64 [string]"
};
