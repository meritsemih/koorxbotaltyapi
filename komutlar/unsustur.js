const Discord = require("discord.js")
const ms = require("ms")
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

  if (!message.member.roles.has('KULLANACAK ROL ID')) return message.channel.send('Bu komutu kullanabilmek için yeterli yetkiye sahip olmalısın.');
    const mod = message.author;
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('BLACK').setAuthor("Hata").setDescription(`Kullanıcı Bulunamadı`))
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.roles.find(`name`, "Muted!")) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('BLACK').setTitle('Kişi Mutelenmemiş'))
    if (!reason) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('BLACK').setAuthor("Hata").setDescription(`Unmute Sebebini Yazmalısın`))
    let muterole = message.guild.roles.find(`name`, "Muted!");

    if (!muterole) {
        try {
           muterole = await message.guild.createRole({
                name: "Muted!",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
  


     await (user.removeRole(muterole.id));
    const muteembed = new Discord.RichEmbed()
            .setAuthor('Eylem: Unmute')
            .addField('Kullanıcı', `<@${user.id}>`)
            .addField('Sebep', `${reason}`)
            .addField('Moderatör', `${mod}`)
            .setColor('BLACK')
        message.channel.send(muteembed)
}


exports.conf = {
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "unmute",
    description: "Etiketlenen Kişinin Mutesini Geri Alır", // Koorx
    usage:  "unmute [kullanıcı] [sebep]",
}