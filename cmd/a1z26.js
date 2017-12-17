const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	str = params.slice(0).join(' ')
	strWords = str.split(" ")

	fullStr = ""

	strWords.forEach(function(e) {
		strLetters = e.split("-")
		strLetters.forEach(function(f) {
			fullStr += letterToNum(f)
		})

		fullStr += " "
	})

	a1z26 = new Discord.RichEmbed({
    	title: `__A1Z26 for "${str}"__`,
    	color: 5967640
  	})

  	a1z26.addField("Translation", fullStr)

  	msg.author.send("", {embed: a1z26})
  	if (msg.channel.type != "dm") {
  		bot.delReply(msg, "Sent a DM!")
  	}
}

function letterToNum(str) {
	a = parseInt(str)
	a = a + 64
	return String.fromCharCode(a)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["r"],
  category: "Cryptography"
};

exports.help = {
  name: "a1z26",
  description: "Returns a string of A1Z26 decrypted.",
  usage: "a1z26"
};
