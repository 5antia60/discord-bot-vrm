const ytdl = require('ytdl-core');
const { joinVoiceChannel } = require('@discordjs/voice');
const { getVoiceConnection } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const{ createAudioResource } = require('@discordjs/voice');
const{ NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = async function (client, message, args) {

  const voiceChannel = message.member.voice.channel;

  const conn = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: message.channel.guild.voiceAdapterCreator,
  });

   const conn1 = getVoiceConnection(voiceChannel.guild.id);

  if (message.member.voice.channel) {
    //tocar musica
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    const sub = conn.subscribe(player);
    
    const resource = createAudioResource(ytdl(args, {filter: 'audioonly'}));

    if(args!='stop'){
      message.reply("Vou tocar musica");
      player.play(resource);
    } else
      setTimeout(() => sub.unsubscribe());

  } else message.reply("Erro ao se conectar...");
};
