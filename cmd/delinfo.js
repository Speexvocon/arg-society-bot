const jetpack = require('fs-jetpack')

exports.run = function(bot, msg, params) {
	let infoList = jetpack.read('info.json', 'json'),
		name = params[0]

	if (infoList[name] != null) {

  	delete infoList[name]

  	bot.delReply(msg, `Info for **${name}** has been deleted.`)
  	jetpack.write('info.json', infoList)
	} else {
		bot.delReply(msg, `Could not find info **${name}**.`)
	}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 3,
  aliases: ["di"],
  category: "Info"
};

exports.help = {
  name: "delinfo",
  description: "Deletes an info blob to the server.",
  usage: "delinfo [name]"
};
