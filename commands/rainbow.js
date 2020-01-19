var red = 0xFF0000;
var orange = 0xFF7F00;
var yellow = 0xFFFF00;
var green = 0x00FF00;
var blue = 0x0000FF;
var indigo = 0x2E2B5F;
var violet = 0x8B00FF;


exports.run = (client, message, args) => {
    
    var roles = [];
    let guild = message.guild;
    console.log(guild.me.highestRole.position)
    guild.createRole(
        {
            name: "red",
            color: red,
            position: guild.me.highestRole.position + 1,
            hoist: false
        }
    ).then(redRole => {
        roles.push(redRole);

        guild.createRole(
            {
                name: "orange",
                color: orange,
                position: guild.me.highestRole.position + 1,
                hoist: false
            }
        ).then(orangeRole => {
            roles.push(orangeRole);

            guild.createRole(
                {
                    name: "yellow",
                    color: yellow,
                    position: guild.me.highestRole.position + 1,
                    hoist: false
                }
            ).then(yellowRole => {
                roles.push(yellowRole)

                guild.createRole(
                    {
                        name: "green",
                        color: green,
                        position: guild.me.highestRole.position + 1,
                        hoist: false
                    }
                ).then(greenRole => {
                    roles.push(greenRole);

                    guild.createRole(
                        {
                            name: "blue",
                            color: blue,
                            position: guild.me.highestRole.position + 1,
                            hoist: false
                        }
                    ).then(blueRole => {
                        roles.push(blueRole);

                        guild.createRole(
                            {
                                name: "indigo",
                                color: indigo,
                                position: guild.me.highestRole.position + 1,
                                hoist: false
                            }
                        ).then(indigoRole => {
                            roles.push(indigoRole);

                            guild.createRole(
                                {
                                    name: "violet",
                                    color: violet,
                                    position: guild.me.highestRole.position + 1,
                                    hoist: false
                                }
                            ).then(violetRole => {
                                roles.push(violetRole);

                                let rI = 0;

                                guild.members.filter(m => m.presence.status === "online").sort(function(a, b) {
                                    if(!a.nickname) a.nickname = a.user.username;
                                    if(!b.nickname) b.nickname = b.user.username;
                                    if(a.nickname > b.nickname) {
                                        return -1;
                                    }
                                    if(b.nickname > a.nickname) {
                                        return 1;
                                    }
                                    return 0;
                                }).forEach(async m => {
                                    try {
                                        await m.addRole(roles[rI].id);

                                        rI++;
                                        if(rI === roles.length) rI = 0;
                                    } catch(error) {}
                                    

                                    
                                })
                            })
                        })
                    })
                })
            })
        })

    })
}