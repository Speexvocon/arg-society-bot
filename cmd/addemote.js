const jetpack = require('fs-jetpack'),
	request = require('request')

exports.run = function(bot, msg, params) {
	let emotelist = jetpack.read('emotes.json', 'json'),
		name = params[0]
		url = params[1]
	if (params.length < 2) return bot.delReply(msg, 'Invalid syntax', 3000)
	switch (url.split('.').slice(-1)[0]) {
    case 'png':
      ext = '.png'
      break
    case 'gif':
      ext = '.gif'
      break
    case 'jpg':
      ext = '.jpg'
      break
    default:
      return bot.delReply('This link is not png, jpg or gif.')
  }
  let filename = name + ext
  var stream = request(url).on('response', function (response) {
    if (response.statusCode !== 200) {
      bot.delReply(`That link is invalid - Status Code: ${response.statusCode}.`)
    } else if (!response.headers['content-type'].match(/image\/(png|gif|jpg|jpeg)/)) {
      bot.delReply(msg, `Invalid content-type: \`\`\`${response.headers['content-type']}\`\`\``)
    } else if (response.headers['content-length'] / (2048 * 2048) > 1) {
      bot.delReply(msg, `That file is too big (${Number(response.headers['content-length'] / (2048*2048)).toPrecision(3)} MB)!`)
    } else {
      stream.pipe(jetpack.createWriteStream(`/home/argbot/arg-society-bot-private/emotes/${filename}`)).on('finish', function () {
        emotelist[name] = {
          file: filename,
          used: 0
        }
        msg.reply(`Emote .${name} has been added.`)
        jetpack.write('emotes.json', emotelist)
      })
    }
  }).on('error', function (err) {
    console.error(err)
    msg.channel.send('', {code: err.message})
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 3,
  aliases: ["a"],
  category: "Other"
};

exports.help = {
  name: "addemote",
  description: "Adds an emote to the server.",
  usage: "addemote [name] [link]"
};
