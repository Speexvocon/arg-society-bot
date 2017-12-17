const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	str = params.slice(0).join(' ')
	rots = new Discord.RichEmbed({
    	title: `__Rotations for "${str}"__`,
    	color: 5967640
  	})

	for (i = 1; i <= 25; i++) {
		rots.addField(`ROT${i}`, caesarShift(str, i), true)
	}

	msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {embed: rots})
	if (msg.channel.type != "dm") {
  		bot.delReply(msg, "Sent a DM!")
  	}
}

function caesarShift(str, amount) {
	// Wrap the amount
	if (amount < 0)
		return caesarShift(str, amount + 26);
	// Make an output variable
	var output = '';
	// Go through each character
	for (var i = 0; i < str.length; i ++) {
		// Get the character we'll be appending
		var c = str[i];
		// If it's a letter...
		if (c.match(/[a-z]/i)) {
			// Get its code
			var code = str.charCodeAt(i);
			// Uppercase letters
			if ((code >= 65) && (code <= 90))
				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
			// Lowercase letters
			else if ((code >= 97) && (code <= 122))
				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
		}
		output += c;
	}
	return output;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["r"],
  category: "Cryptography"
};

exports.help = {
  name: "rot",
  description: "Returns a string in ROT1-25.",
  usage: "rot [string]"
};
