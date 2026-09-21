/* 🤖 MansxDev WA Base — rebranded. */

require("./system/module.js")
const { version } = require("./package.json")

// >~~~~~~ Setting Bot & Owner  ~~~~~~~< //
global.owner = '6281546543913'
global.versi = "1.3"
global.storename = "MANSXDEV"
global.namaOwner = "MansxDev"
global.packname = 'MansxDev'
global.botname = 'Base Wa Mansx'
global.botname2 = 'Mansx Base'

// Settings Channel / Saluran
global.linkgc = "https://chat.whatsapp.com/FMbIi6sjFZcIrqpJcLBCge"
global.linkSaluran = "https://whatsapp.com/channel/0029VaeRxEf0wajqtfKA1o1J"
global.idSaluran = "120363299117018597@newsletter"
global.namaSaluran = "MANSXDEV CHANNEL"
global.website = "https://github.com/mansxdev"

// Settings Payment
global.dana = "-"
global.gopay = "-"
global.qris = "https://files.catbox.moe/mjdmod.jpg"

// Settings Image Url
global.image = {
menu: "https://i.supa.codes/AbWC3z", 
mp4: "https://i.supa.codes/iVhzmw", 
reply: "https://i.supa.codes/AbWC3z", 
logo: "https://i.supa.codes/AbWC3z",
mansx: "https://i.supa.codes/AbWC3z",
}

// >~~~~~~~~ Setting Message ~~~~~~~~~< //
global.msg = {
wait: `┏ ➫ _*📢 PROSES...*_ 
┃     *ᴛᴜɴɢɢᴜ sᴇʙᴇɴᴛᴀʀ ʏᴀ...*
┗━━━━━━━━⪩ *MᴀɴsxDᴇᴠ*`,
owner: `┏ ➫ _*📢 KHUSUS OWNER*_ 
┃     *ғɪᴛᴜʀ ɪɴɪ ᴋʜᴜsᴜs ᴏᴡɴᴇʀ*
┗━━━━━━━━⪩ *MᴀɴsxDᴇᴠ*`, 
group: `┏ ➫ _*📢 KHUSUS GROUP*_ 
┃     *ғɪᴛᴜʀ ɪɴɪ ʜᴀɴʏᴀ ʙɪsᴀ ᴅɪ ɢʀᴏᴜᴘ*
┗━━━━━━━━⪩ *MᴀɴsxDᴇᴠ*`, 
admin: `┏ ➫ _*📢 KHUSUS ADMIN*_ 
┃     *ғɪᴛᴜʀ ɪɴɪ ᴋʜᴜsᴜs ᴀᴅᴍɪɴ*
┗━━━━━━━━⪩ *MᴀɴsxDᴇᴠ*`, 
botadmin: `┏ ➫ _*📢 BOT HARUS ADMIN*_ 
┃     *ʜᴀɴʏᴀ ʙɪsᴀ ᴊɪᴋᴀ ʙᴏᴛ ᴀᴅᴍɪɴ*
┗━━━━━━━━⪩ *MᴀɴsxDᴇᴠ*`, 
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan("File Update => "), chalk.cyan.bgBlue.bold(`${__filename}`))
delete require.cache[file]
require(file)
})