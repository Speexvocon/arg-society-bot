const jetpack = require('fs-jetpack')

exports.run = (bot, msg, params) => {
  let emotelist = jetpack.read('emotes.json', 'json')
  let emoteData = emotelist[params]
  if (emoteData) {
      msg.channel.send('', {file: `./emotes/${emoteData.file}`})
      emotelist[params].used++
      jetpack.write('emotes.json', emotelist)
   }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: [],
  category: "Emote"
};

exports.help = {
  name: "emote",
  description: "Sends a custom emote.",
  usage: "emote"
};