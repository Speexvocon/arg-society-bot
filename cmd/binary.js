const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	str = params.slice(0).join(' ')
  str = str.replace(/ /g,'')
	binary = new Discord.RichEmbed({
    	title: `__Binary decoded for "${str}"__`,
    	color: 5967640
  	})

  binaryLetters = str.match(/.{1,8}/g)

  finalStr = ""

  binaryLetters.forEach(function(letter) {
    finalStr = finalStr + String.fromCharCode(parseInt(letter,2).toString(10))
  })

	binary.addField("Translation", finalStr)

	msg.author.send('', {embed: binary})
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
  name: "binary",
  description: "Decodes a binary encoded string.",
  usage: "binary [string]"
};
