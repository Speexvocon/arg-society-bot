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
  let infoList = jetpack.read('info.json', 'json');

  allInfo = [];
  for (let e in infoList) {
    allInfo.push({name: e, status: infoList[e].status});
  }

  while (allInfo.length > 0) {
    info = new Discord.RichEmbed({
      title: '__Info Commands from the ARGSociety Discord Server__',
      color: 5967640
    });

    let thisSlice = allInfo.slice(0,24);

    for (let i = 0; i < thisSlice.length; i++) {
      info.addField(`${thisSlice[i].name}`, `Status: ${thisSlice[i].staus}`, true);
    }

    allInfo.splice(0,25)

    msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {
      embed: info
    })
    .then(() => {
      if (allInfo.length == 0) {
        bot.delReply(msg, 'I have DMed you with the avaliable info in this server.');
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
  permLevel: 3,
  aliases: [],
  category: "Info"
};

exports.help = {
  name: "infolist",
  description: "Sends a DM with a list of info.",
  usage: "infolist"
};
