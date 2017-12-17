const Discord = require("discord.js")

exports.run = function(bot, msg, params) {
  let commands = bot.commands,
    spec = params[0] || null,
    help = new Discord.RichEmbed({
      color: 5967640
    }),
    hidden = 0,
    cmdData,
    dm



  if (!spec) {
    help.setTitle('__Commands in the ARGSociety Discord Server__')
    commands.map(function(c) {
      if (bot.elevation(msg) >= c.conf.permLevel) {
        if (c.conf.category == "Conversion") {
         help.addField(c.help.name, c.help.description)
        }
      } else {
        hidden++
      }
    });
    if (hidden > 0) help.setFooter(`${hidden} commands were not shown due to your permission level.`)
    
    msg.author.send('If you do not see anything, enable **Settings** -> **Text & Images** -> **Link Preview**', {
      embed: help
    }).then(() => bot.delReply(msg, 'I have DMed you with the avaliable commands in this server.')).catch((err) => {
      bot.delReply(msg, `I could not DM you, please check your settings.`)
    })
  } else {
    if (!bot.commands.has(spec)) return bot.delReply(msg, 'The specified command does not exist.')
    cmdData = bot.commands.get(spec).help
    if (bot.elevation(msg) < cmdData.permissions) return bot.delReply(msg, 'You do not have permissions to view this command.')
    help.setTitle(`__${cmdData['name']} Command__`)
    help.addField('Name', cmdData.name, true)
    help.addField('Description', cmdData.description, true)
    help.addField('Syntax', cmdData.usage, true)
    msg.reply('', {embed: help})
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["h"],
  category: "Other"
};

exports.help = {
  name: "conversionlist",
  description: "DM's the user the conversion commands.",
  usage: "conversionlist <commandname/optional>"
};