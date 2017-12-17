const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	str = params.slice(0).join(' ')
  strNew = str.split(' ')
	hex = new Discord.RichEmbed({
    	title: `__Hexidecimal decoded for "${str}"__`,
    	color: 5967640
  	})

  finalStr = ""

  strNew.forEach(function(letter) {
    finalStr = finalStr + String.fromCharCode(parseInt(letter,16).toString(10))
  })

	hex.addField("Translation", finalStr)

	msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {embed: hex})
  if (msg.channel.type != "dm") {
  	bot.delReply(msg, "Sent a DM!")
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["r"],
  category: "Conversion"
};

exports.help = {
  name: "hex",
  description: "Decodes a hexidecimal encoded string.",
  usage: "hex [string]"
};
