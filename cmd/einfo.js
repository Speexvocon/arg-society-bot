const jetpack = require('fs-jetpack')

exports.run = function(bot, msg, params) {
  let infoList = jetpack.read('info.json', 'json'),
    name = params[0],
		id = params[1]

  if (infoList[name] != null) {
    infoList[name].editableID = id
    bot.delReply(msg, `Added editable ID to that message.`)
    jetpack.write('info.json', infoList)
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
  name: "einfo",
  description: "Creates an editable message for an info blob.",
  usage: "einfo [name] [message id]"
};
