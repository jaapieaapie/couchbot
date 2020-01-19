module.exports = (client, member) => {
    let guild = member.guild;
    if(guild.id !== "618896877252771880") return;

    guild.channels.get("656957721840713735").send(`Some poopy head called **${member.user.username}** just left this epic server`)
}