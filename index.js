const Discord = require('discord.js');
const bot = new Discord.Client({ disableEveryone: true});
const prefix = ";";

bot.on('ready', () => {
  console.log('BOT CONNECTE!');
});



bot.on('message', message => {
  if (message.content === prefix + 'ping') {
  message.channel.send('***Loading data***').then (async (msg) =>{
    msg.delete()
    message.channel.send(`***🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.***`);
  })
  }  
});

bot.on('message', message => {
  if (message.content === prefix + 'help') {
    message.channel.send(`***
    > ___Divert___
    > ;ping : pour avoir le ping du bot
    > ;info : pour avoir des information sur le bot 
    > ;raconte : pour répondre tu me raconte ta vie
    > ___Modération___
    > ;ban : pour bannire un membre
    > ;kick : pour kick un membre
    > ;clear : pour suprimé des message***`);
  }
});

bot.on('message', message => {
  if (message.content === prefix + 'info') {
    message.channel.send(`***Ce bot n'est pas encore terminé !!! Il est déve par !'Witrold'! #2021 , j'ai commencé a le déve le 09/03/2021.***`);
  }
});

bot.on('message', message => {
  if (message.content === prefix + 'raconte') {
    message.channel.send(`***Je reconait tu me raconte ta vie ??***`);
  }
});


bot.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type == "dm") return;
  
  if(message.member.hasPermission("ADMINISTRATOR")){
    if(message.content.startsWith(prefix + "ban")){
      let mention = message.mentions.members.first();
      
      if(mention == undefined){
         message.reply("Membre non donné")
      }
      else{
        if(mention.bannable){
             mention.ban();
             message.channel.send(mention.displayName + " a été banni avec succé");
        }
        else {
          message.reply("Imposible de bannir ce membre")
        }

      }
    
    }
    else if(message.content.startsWith(prefix + "kick")){
      let mention = message.mentions.members.first();

      if(mention == undefined){
        message.reply("Membre non donné");
      }
      else{
        if(mention.kickable){
          mention.kick();
          message.channel.send(mention.displayName + " a été kick avec succés");
        }
        else {
            message.reply("Impossible de kick ce membre")
          }
        }
      }
    }
  }
);

bot.on("message", message => {
  if (message.content.indexOf(prefix) !== 0) {return false};

  const arguments = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = arguments.shift().toLowerCase();

  if (command == "clear") {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'est pas autorisé a utilisé cette commande.");
      if (!arguments[0]) return message.channel.send("Donné un nombre entre 2 et 100.")
      if (arguments[0] < 2 || arguments[0] > 100) return message.channel.send("Donné un nombre entre 2 et 100.")

      message.channel.bulkDelete(arguments[0]).then(messages => {
          message.channel.send(`Suprimé ${messages.size} messages.`);
      }).catch(e => console.log(e));
  };
});

bot.once('ready', () => { bot.user.setActivity(';help', { type: "WATCHING" }); });

bot.login("ODE5NjUyMzI2NzEyNDEwMTEy.YEputw.N4NkamdCsc9nT7BE94-l6LuVs7I");
