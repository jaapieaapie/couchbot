const Discord = require("discord.js");
let raffle = require("../handlers/raffle");
var price = 2000;
exports.run = (client = Discord.Client, message = Discord.Message, args = Array) => {
    
    if(!args[0]) {
        const embed = new Discord.RichEmbed()
            .setTitle("Raffle ticket usage")
            .addField("To buy raffle tickets", `${client.prefix}raffle buy`)
            .addField("To see howmany tickets you have", `${client.prefix}raffle tickets`)
            .addField("To exchange your tickets", `${client.prefix}raffle exchange`);
        message.channel.send(embed);
    }

    if(args[0] === "buy") {

        require("../handlers/xp").get(message.author.id).then(xp => {
            if(xp < price) return message.channel.send("You don't have enough to buy a raffle ticket you need " + price + " xp");

            message.channel.send(`Are you sure you want to buy a raffle ticket, it will cost you ${price} xp\nReact ✅`).then(msg => {
                msg.react('✅');
                const filter = (r, u) => r.emoji.name === '✅' && u.id === message.author.id;
                msg.awaitReactions(filter, {time: 60000, max: 1}).then(collected => {
                    if(!collected.first()) return;
                    let c = collected.first();
                    require("../handlers/xp").remove(message.author.id, price);
                    require("../handlers/raffle").add(message.author.id);
                    msg.clearReactions();
                    msg.edit("Raffle ticket bought!");
                })
            })
        });
        
    }
    //656928876798410792

    if(args[0] === "exchange") {

        
        raffle.get(message.author.id).then(tickets => {
            if(tickets < 1) return message.channel.send("You don't have a ticket");
            raffle.remove(message.author.id);
            message.channel.send("Exchanged a raffle ticket");
            message.guild.channels.get(client.staff).send(`${message.member} exchanged a raffle ticket`)
        })
    }

    if(args[0] === "tickets") {

        raffle.get(message.author.id).then(tickets => {
            message.channel.send(`You have ${tickets} tickets`)
        })
    }
}

exports.desc = "Raffle commands"