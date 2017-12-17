const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	str = params.slice(0).join(' ')
  strNew = str.split(' ')
	octal = new Discord.RichEmbed({
    	title: `__Octal decoded for "${str}"__`,
    	color: 5967640
  	})

  finalStr = ""

  strNew.forEach(function(letter) {
    finalStr = finalStr + String.fromCharCode(parseInt(letter,8).toString(10))
  })

	octal.addField("Translation", finalStr)


	msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {embed: octal})
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
  name: "octal",
  description: "Decodes a octal encoded string.",
  usage: "octal [string]"
};
