const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const config = require('./config.json');
const client = new Discord.Client({
  intents: 32767,
    allowedMentions: { parse: ['users'], repliedUser: true },
    fetchAllMembers: true
});
const servers = {
  'server': {
    connection: null,
    dispatcher: null
  }
}

client.on('ready', () => {
  console.log('online')
});

client.on('message', async (msg) => { 
  //responder -> msg.reply('dasdsadsa');
  if(msg.author.bot||!msg.guild||!msg.content.startsWith(config.prefix)) return;
  if (msg.author.bot) return;
  
  switch (msg.author.username){
    case 'Santiag0':
      //enviar
      msg.channel.send('salve monstro sagrado');
      break;
    case 'mayheusaj':
      msg.channel.send('eae baiano');
      break;
    default:
      msg.channel.send('fala viado');
      break;
  }

  let args = msg.content.split(" ")[1];

  switch (true){
    case msg.content.startsWith(config.prefix+'play'):
      let play = require(`./commands/play.js`);
      play(client, msg, args);
      break;
    case msg.content.startsWith(config.prefix+'stop'):
      let stop = require(`./commands/play.js`);
      stop(client, msg, 'stop');
      break;
  }

});               

client.login(config.token);