const jetpack = require('fs-jetpack')
const Discord = require('discord.js')

exports.run = function(bot, msg, params) {
	let infoList = jetpack.read('info.json', 'json'),
		name = params[0],
		status = params.slice(1).join(' ')

  if (infoList[name] != null) {
  infoList[name].status = status

  bot.delReply(msg, `Status added for info **${name}** has been added.`)
  jetpack.write('info.json', infoList)
  if (infoList[name].editableID != null) {
    msg.channel.fetchMessage(infoList[name].editableID)
      .then(message => {
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

        message.edit("", {embed: info})
      })
  }
} else {
  bot.delReply(msg, `Could not find info **${name}**.`)
}
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 3,
  aliases: ["ai"],
  category: "Info"
};

exports.help = {
  name: "setstatus",
  description: "Adds an info blob to the server.",
  usage: "setstatus [name] [url]"
};
