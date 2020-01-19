const Discord = require("discord.js");

exports.run = (client, message, args) => {
    
    const embed = new Discord.RichEmbed()
        .setTitle("Help");
    client.commands.forEach(cmd => {
        if(cmd.desc) {
            embed.addField(client.prefix + cmd.name, cmd.desc);
        }
    });
    message.channel.send(embed);
}

exports.desc = "This command list"