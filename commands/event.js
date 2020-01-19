const Discord = require("discord.js");
exports.run = (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("HEY you need administrator perms for this");

    if(!args[0] || args[0] !== "win") {
        const embed = new Discord.RichEmbed()
            .setTitle("Usage error ya fucker")
            .addField("To register a win do", `-event win @member`);
        return message.channel.send(embed);
    }

    if(args[0] === "win") {

        let member = message.mentions.members.first();
        if(!member) {
            const embed = new Discord.RichEmbed()
                .setTitle("Usage error ya fucker")
                .addField("To register a win do", `-event win @member`);
            return message.channel.send(embed);
        }

        client.mysql.query(`SELECT * FROM events WHERE id=${member.id}`, function(err, rows) {
            if(rows[0]) {

                client.mysql.query(`UPDATE events SET wins=${rows[0].wins + 1} WHERE id=${member.id}`);
                message.channel.send(`${member.user.username} now has ${rows[0].wins + 1} wins`);
            } else {
                client.mysql.query(`INSERT INTO events (id, wins) VALUES (${member.id}, 1)`);
                message.channel.send(`${member.user.username} now has 1 win`);
            }
        })

    }
}