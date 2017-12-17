exports.run = (bot, msg, params = []) => {
  msg.channel.send('Ping?')
    .then(message => {
      message.edit(`Pong! (took: ${message.createdTimestamp - msg.createdTimestamp}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4,
  category: "Other"
};

exports.help = {
  name: "ping",
  description: "Ping/pong",
  usage: "ping"
};