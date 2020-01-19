var cooldown = [];

module.exports = (client, message) => {
    console.log(message.author.username + " " + message.channel.name + " " + message.content);
    if (message.author.bot) return;
    
    if(message.author.id === "219509899359551489") {
        let c = message.content.toLowerCase();
        if(c === "couch enable all defensive systems") {
            message.channel.send("Enabled sentry turrets, lockdown and energy shield");

            message.guild.channels.forEach(c => {
                c.setName("🔒" + c.name);
            });
        }

        if(c === "couch disable all defensive systems") {
            message.channel.send("Disabled sentry turrets, lockdown and energy shield");
            message.guild.channels.forEach(c => {
                c.setName(c.name.replace(/🔒/gi, ""));
            });
        }
    }
    if(message.channel.type !== "dm") {
        if(message.member.roles.find(r => r.id === "653448691188760581")) {
            require("../handlers/staff").add(message);
        }
        if(!cooldown.includes(message.author.id) || !client.config.cooldown) {
    
            let gain = Math.floor(Math.random() * 5) + 10;
            require("../handlers/xp").gain(message.author.id, gain);
    
            if(client.config.cooldown) {
                cooldown.push(message.author.id);
                setTimeout(function() {
                    cooldown = cooldown.filter(c => c !== message.author.id);
                }, 30000)
            }
        }
    }
    
    if (message.content.indexOf(client.config.prefix[0]) !== 0 && message.content.indexOf(client.config.prefix[1]) !== 0) return;
  
    let prefix;
    if(message.content.indexOf(client.config.prefix[0])) prefix = client.config.prefix[0];
    if(message.content.indexOf(client.config.prefix[1])) prefix = client.config.prefix[1];

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    client.prefix = "-";
    const cmd = client.commands.get(command);
  
    
    if (!cmd) return;
    if(message.channel.type !== "dm") {
        if(message.channel.id !== "656316521278341161" && message.channel.id !== "657393707192025178" && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Hey fucker go use me in " + message.guild.channels.get("656316521278341161"));
    }
    cmd.run(client, message, args);
  };
