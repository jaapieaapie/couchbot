exports.run = (client, message, args) => {
    let guild = client.guilds.get("656486210814083111");
    
    guild.members.forEach(m => {
        if(m.premiumSinceTimestamp !== null) {
            guild.channels.get("663533034460413978").createInvite({maxUses: 1, unique: true})
            .then(invite => {
                m.send(`Thanks for boosting Couch because you boosted you are allowed in our special server: ${invite.url}\nThis invite can only be used once!`);
            }).catch(error => console.log(error));
        }
        
    })
        
        
    
}