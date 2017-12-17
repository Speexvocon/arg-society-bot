const jetpack = require('fs-jetpack')

exports.run = function(bot, msg, params) {
	let infoList = jetpack.read('info.json', 'json'),
		name = params[0],
		info = params.slice(1).join(' ')

  infoList[name] = {
    text: info
  }
  bot.delReply(msg, `Info for **${name}** has been added.`)
  jetpack.write('info.json', infoList)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 3,
  aliases: ["ai"],
  category: "Info"
};

exports.help = {
  name: "addinfo",
  description: "Adds an info blob to the server.",
  usage: "addinfo [name] [info]"
};
