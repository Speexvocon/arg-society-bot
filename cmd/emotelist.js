const jetpack = require('fs-jetpack')
const Discord = require('discord.js')

//exports.run = function(bot, msg, params) {
//	let emotelist = jetpack.read('emotes.json', 'json');
//
//  emotes = new Discord.RichEmbed({
//    title: '__Emotes from the ARGSociety Discord Server__',
//    color: 5967640
//  });
//
//  for (let emote in emotelist) {
//    emotes.addField(`.${emote}`, `Used: ${emotelist[emote].used} time(s)`, true)
//  }
//
//  msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {
//    embed: emotes
//  })
//  .then(() => bot.delReply(msg, 'I have DMed you with the avaliable emotes in this server.')).catch((err) => {
//    bot.log(bot.error(`Could not DM user: ${err}.`))
//    bot.delReply(`I could not DM you, please check your settings.`)
//  });
//}

exports.run = function(bot, msg, params) {
  let emotelist = jetpack.read('emotes.json', 'json');

  allEmotes = [];
  for (let e in emotelist) {
    allEmotes.push({name: e, used: emotelist[e].used});
  }

  while (allEmotes.length > 0) {
    emotes = new Discord.RichEmbed({
      title: '__Emotes from the ARGSociety Discord Server__',
      color: 5967640
    });

    let thisSlice = allEmotes.slice(0,24);

    for (let i = 0; i < thisSlice.length; i++) {
      emotes.addField(`.${thisSlice[i].name}`, `Used: ${thisSlice[i].used} time(s)`, true);
    }

    allEmotes.splice(0,25)
    
    msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {
      embed: emotes
    })
    .then(() => {
      if (allEmotes.length == 0) {
        bot.delReply(msg, 'I have DMed you with the avaliable emotes in this server.');
      }
    })
    .catch((err) => {
      bot.log(bot.error(`Could not DM user: ${err}.`));
      bot.delReply(`I could not DM you, please check your settings.`);
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: [],
  category: "Other"
};

exports.help = {
  name: "emotelist",
  description: "Sends a DM with a list of emotes.",
  usage: "emotelist"
};
