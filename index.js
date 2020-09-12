const {
    Client,
    RichEmbed
} = require('discord.js');
const Discord = require('discord.js');
const {
    red,
    green,
    blue,
    yellow,
    cyan
} = require('chalk');
const bot = new Client();
const geo = require('node-fetch');
const settings = require('./settings.json');
const prefix = 'Z.';
const hastebin = require('hastebin-gen');
var await = require('await')
const chancejs = require("chance");
const chance = new chancejs();
var portscanner = require('portscanner')

console.log(blue(`SELFBOTS ARE AGAINST TOS SO I AM NOT RESPONSIBLE FOR ANY BANS THAT OCCUR`));
console.log(red(`${settings.prefix}ping = displays ping`));
console.log(red(`${settings.prefix}purge = Deletes alot of msgs`));
console.log(red(`${settings.prefix}embed {msg} = embeds a msg`));
console.log(red(`${settings.prefix}restart = Restarts the bot`));
console.log(red(`${settings.prefix}spam {id} {msg} = Spam DMs`));
console.log(red(`${settings.prefix}eval {msg} = evals code`));
console.log(red(`${settings.prefix}dnslookup {host} = resolves dns`));
console.log(red(`${settings.prefix}sdomain {host} = finds subdomains for a host`));
console.log(red(`${settings.prefix}bse = black screen exploit`));
console.log(red(`${settings.prefix}courvix = displays courvix vpn info`));
console.log(red(`${settings.prefix}coinflip = flips a coin`));
console.log(red(`${settings.prefix}github = sends the github for the selfbot`));
console.log(blue(`                ┌─┐┌─┐┬─┐┌─┐  ┌─┐┌─┐┬  ┌─┐┌┐ ┌─┐┌┬┐
                ┌─┘├┤ ├┬┘│ │  └─┐├┤ │  ├┤ ├┴┐│ │ │ 
                └─┘└─┘┴└─└─┘  └─┘└─┘┴─┘└  └─┘└─┘ ┴ `));

bot.on('ready', () => {
    console.log(cyan(`${bot.user.tag} logged in`));
    console.log(cyan(`prefix set: ${settings.prefix}`));

});
console.log(yellow(`===================================================`));
bot.on('message', async (msg) => {
    if (msg.author.id !== settings.ID) {
        return;
    }
    let cmd = msg.content.split(" ")[0]
    cmd = cmd.slice(settings.prefix.length);
    let args = msg.content.split(" ").slice(1);
    if (msg.content.startsWith(settings.prefix) && msg.author.id === settings.ID) {
        console.log(cyan(`[COMMAND RAN] :: ${msg.content}`));
    }

    if (cmd === 'ping') {
        msg.edit(`:ping_pong: pong! your ping is: *${bot.ping.toFixed()}ms*`);
    }
    if (cmd === 'purge') {
        msg.channel.fetchMessages({
            limit: 100
        }).then(msgs => msgs.filter(m => m.author.id === bot.user.id).map(r => r.delete()))
    }
    if (cmd === 'embed') {
        let eContent = args.slice(0).join(" ");
        msg.edit(" ", {
            embed: new RichEmbed().setColor(`${settings.color}`).setDescription(eContent).setFooter('Z-ERO#9181 is daddy')
        });
    }
    if (cmd === 'restart') {
        msg.delete();
        process.exit();
    }
    if (cmd === 'spam') {
        let user = (args[0]);
        let mContent = args.slice(1).join(" ");
        bot.setInterval(() => {
            bot.users.get(user).send(mContent);
        }, 1500);
        console.log(red(`[CMD INFOMATION] :: YOU MUST RESTART THE BOT IN ORDER TO STOP THE SPAM`));
    }
    if (cmd === 'github') {
        msg.edit("https://github.com/zerodevstuff/zero-selfbot")
    }
    if (cmd === 'dnslookup') {
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        const geo = require('node-fetch');
        (async () => {
            const response = await geo('https://api.hackertarget.com/dnslookup/?q=' + args.join(" "));
            const body = await response.text();

            msg.edit("```" + body + "```");
        })();
    }
    if (cmd === 'sdomain') {
        (async () => {
            const response = await geo('https://api.hackertarget.com/hostsearch/?q=' + args.join(" "));
            const body = await response.text();

            msg.channel.send("```" + body + "```");
        })();
    }
    if (cmd === 'eval') {
        let res;
        try {
            res = eval(args.join(" "))
        } catch (e) {
            return msg.edit("", {
                embed: new RichEmbed().setTitle("Results").setColor("#FF0000").setDescription(":desktop: **Input**: ```" + args.join(" ") + "```:eyes: **Error**: ```" + err + "```").setFooter("Eval")
            })
        }
        msg.edit("", {
            embed: new RichEmbed().setTitle("Results").setColor("#46FF00").setDescription(":desktop: **Input**: ```" + args.join(" ") + "```:white_check_mark: **Output**: ```" + res + "```").setFooter("Eval")
        })
    }
    if (cmd === 'bse') {
        msg.edit("<ms-cxh-full://0>");
    }
    if (cmd === 'coinflip') {
        msg.edit("" + chance.pickone(["**heads**!", "**tails**!"]))
    }
    if (cmd === 'test') {
        msg.delete();
    }
    if (cmd === 'isitopen') {
        const commandBody = msg.content.slice(prefix.length);
        const args = commandBody.split(' ');
        portscanner.checkPortStatus((args[1]), "args[2])", function(error, status) {
            // Status is 'open' if currently in use or 'closed' if available
            msg.channel.send("port is: " + status)
        })
    }
    if (cmd === 'courvix') {
        msg.channel.send({
            embed: {
                color: 3447003,
                title: "Courvix vpn servers",
                url: "https://courvix.com",
                description: "full credit to courvix",
                fields: [{
                        name: "Dallas (NFO)",
                        value: "[Dallas](https://courvix.com/vpn/configs/dallasNFO.ovpn) Server is hosted with Nuclearfallout Enterprises (NFO) and uses their in-house system and edge filtering for DDoS protection."
                    },
                    {
                        name: "Chicago 1 (NFO)",
                        value: "[Chicago 1](https://courvix.com/vpn/configs/nfoChicago.ovpn) Server is hosted with Nuclearfallout Enterprises (NFO) and uses their in-house system and edge filtering for DDoS protection."
                    },
                    {
                        name: "Chicago 2 (NFO)",
                        value: "[Chicago 2](https://courvix.com/vpn/configs/chicago2.ovpn) Server is hosted with Nuclearfallout Enterprises (NFO) and uses their in-house system and edge filtering for DDoS protection."
                    },
                    {
                        name: "Seattle (NFO)",
                        value: "[Seattle](https://courvix.com/vpn/configs/seattle1.ovpn) Server is hosted with Nuclearfallout Enterprises (NFO) and uses their in-house system and edge filtering for DDoS protection."
                    },
                    {
                        name: "Los Angeles (NFO)",
                        value: "[Los Angeles](https://courvix.com/vpn/configs/nfoLA.ovpn) Server is hosted with Nuclearfallout Enterprises (NFO) and uses their in-house system and edge filtering for DDoS protection."
                    },
                    {
                        name: "Atlanta (NFO)",
                        value: "[Atlanta](https://courvix.com/vpn/configs/atlanta.ovpn) Server is hosted with Nuclearfallout Enterprises (NFO) and uses their in-house system and edge filtering for DDoS protection."
                    },
                    {
                        name: "Amsterdam 2 (OVH)",
                        value: "[Amsterdam 2](https://courvix.com/vpn/configs/amsterdam2.ovpn) Server is hosted with RoyaleHosting and uses a combination of their own infrastructure and Serverius for DDoS protection."
                    },
                    {
                        name: "France (OVH)",
                        value: "[France](https://courvix.com/vpn/configs/OVHAntiDDoSBeta.ovpnm) Server is hosted with OVH in France using their new and improved GAME firewall which is in closed beta."
                    }
                ],
                footer: {
                    text: "Zero selfbot v2"
                }
            }
        });
    }
});

bot.login(settings.token);
