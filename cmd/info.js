const jetpack = require('fs-jetpack')
const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	let infoList = jetpack.read('info.json', 'json'),
		name = params[0]

  if (infoList[name] != null) {
    info = new Discord.RichEmbed({
      	title: `__${name}__`,
      	color: 5967640
    	})

    if (infoList[name].url != null) {
      info.setURL(infoList[name].url)
    }

    if (infoList[name].imageURL != null) {
      info.setThumbnail(infoList[name].imageURL)
    }

    info.addField('**__Info__**', infoList[name].text)

		if (infoList[name].status != null) {
			info.addField('**__Status__**', infoList[name].status)
		}

    msg.channel.send("", {embed: info})
  } else {
    bot.delReply(msg, `Could not find **${name}**.`)
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
  name: "info",
  description: "Returns an info blob to the server.",
  usage: "info [name]"
};
