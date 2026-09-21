/* 🤖 MansxDev WA Base — rebranded. */

const crypto = require("crypto")
const { fromBuffer } = require('file-type');

module.exports = async (sock, m, store) => {
try {
const body = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'interactiveResponseMessage') ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ""
	
const budy = (typeof m.text == 'string' ? m.text : '') 
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const cmd = prefix + command
const args = body.trim().split(/ +/).slice(1)
const makeid = crypto.randomBytes(3).toString('hex')
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const text = q = args.join(" ")
const botNumber = await sock.decodeJid(sock.user.id)
const isOwner = m.sender.split("@")[0] == global.owner ? true : m.fromMe ? true : false
const premium = JSON.parse(fs.readFileSync("./data/premium.json"))
const pushname = m.pushName || `${m.sender.split("@")[0]}`
const isBot = botNumber.includes(m.sender)
const isPremium = premium.includes(m.sender)
const { runtime, isUrl, getRandom, getTime, tanggal, toRupiah, telegraPh, pinterest, toHD, ucapan, generateProfilePicture, formatp, getBuffer, fetchJson, resize, sleep } = require('./system/function.js')

m.isGroup = m.chat.endsWith("g.us")
m.metadata = m.isGroup ? (await sock.groupMetadata(m.chat).catch(_ => {}) || {}) : {}
m.isAdmin = m.metadata && m.metadata.participants ? (m.metadata.participants.find(e => e.admin !== null && e.id == m.sender) || false) : false
m.isBotAdmin = m.metadata && m.metadata.participants ? (m.metadata.participants.find(e => e.admin !== null && e.id == botNumber) || false) : false

// >~~~~~~~~ Fake Quoted ~~~~~~~~~~< //

const qchannel = {key: {remoteJid: 'status@broadcast', fromMe: false, participant: '0@s.whatsapp.net'}, message: {
newsletterAdminInviteMessage: {newsletterJid: `@newsletter`, newsletterName: `Hore`, jpegThumbnail: "", caption: `Powered By ${namaOwner}`, inviteExpiration: 0 }}}

const qtxt = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${namaOwner} - Marketplace`}}}

const qtext2 = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `${namaOwner}`}}}

// >~~~~~~~~~~ Function ~~~~~~~~~~~< //

const example = async (teks) => {
const commander = ` *Contoh Command :*\n*${cmd}* ${teks}`
return m.reply(commander)
}

const capital = (string) => {
return string.charAt(0).toUpperCase() + string.slice(1);
}

if (isCmd) {
console.log(chalk.yellow.bgCyan.bold(botname), chalk.blue.bold(`[ PESAN ]`), chalk.blue.bold(`FROM`), chalk.blue.bold(`${m.sender.split("@")[0]}`), chalk.blue.bold(`Text :`), chalk.blue.bold(`${cmd}`))
}
// >~~~~~~~~~ Command ~~~~~~~~~~< //

switch (command) {

// KOSONGAN BUAT LU YANG MAU BELAJAR BIKIN SC!! 

case "menu": {
const menu = `*INFORMATION BOT*
• User : ${m.sender.split("@")[0]}
• Creator : ${namaOwner}
• Store : ${storename}
• Bot : ${botname} v${versi}

*DAFTAR MENU*
• ${prefix}menu — Menu ini
• ${prefix}owner / developerbot — Kontak owner
• ${prefix}dev / developer — Info owner
• ${prefix}addcase — Tambah case (owner)
• ${prefix}getcase <nama> — Ambil case (owner)
• ${prefix}delcase <nama> — Hapus case (owner)
• ${prefix}uji <teks> — Tes reply

*NOTE*
Bot ini pakai baileys ori — button/interactive nggak dirender WA, jadi semua menu pake teks.
`
await sock.sendMessage(m.chat, { text: menu, contextInfo: {
   mentionedJid: [m.sender],
   externalAdReply: {
     title: `${botname} - ${versi}`,
     thumbnailUrl: global.image.logo,
     mediaType: 1,
     renderLargerThumbnail: true,
   },
} })
}
break

case "developerbot": case "owner": {

await sock.sendContact(m.chat, [global.owner], m)

}

break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

case "developer": case "dev": {
  const ownerNumber = global.owner;
  const ownerName = global.namaOwner;

  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;waid=${ownerNumber}:${ownerNumber}
END:VCARD`;

  // Mengirim kontak owner
  await sock.sendMessage(m.chat, {
    contacts: {
      displayName: ownerName,
      contacts: [{ vcard: vCard }],
    },
  });

  await sock.sendMessage(m.chat, { text: `ʜᴇʟʟᴏ ᴋᴀᴋᴋ ɪɴɪ ᴀᴅᴀʟᴀʜ ᴘᴇᴍʙᴜᴀᴛ sᴄʀɪᴘᴛ ᴊᴀɴɢᴀɴ ᴅɪ sᴘᴀᴍ ʏᴀ !` }, { quoted: qchannel });
};
break

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

/* TEMPAT ADD CASE */
case '19rujxl1e': {
console.log('.')
}
break
case 'uji': {
console.log(args[0])
// ponytail: `appendResponseMessage` cuma ada di fork baileys custom (bukan ori).
// Baileys ori gak punya method ini → dihapus. Kalau perlu, wire ke reply manual.
m.reply(args[0] || 'uji ok')
}
break

case 'addcase': {
if (!isOwner) return m.reply(msg.owner)
if (!text && !text.startsWith('case')) return m.reply('Masukkan Casenya!')
fs.readFile('mansx.js', 'utf8', (err, data) => {
if (err) {
console.error('Terjadi kesalahan saat membaca file:', err);
return;
}
const posisi = data.indexOf("case '19rujxl1e':");
if (posisi !== -1) {
const codeBaru = data.slice(0, posisi) + '\n' + `${text}` + '\n' + data.slice(posisi);
fs.writeFile('mansx.js', codeBaru, 'utf8', (err) => {
if (err) {
m.reply('Terjadi kesalahan saat menulis file: ', err);
} else m.reply('Case berhasil ditambahkan');
});
} else m.reply('Gagal Menambahkan case!');
});
}
break
case 'getcase': {
if (!isOwner) return m.reply(msg.owner)
if (!text) return m.reply('Masukkan Nama Casenya!')
try {
const getCase = (cases) => {
return "mansx"+`'${cases}'`+fs.readFileSync("mansx.js").toString().split('case \''+cases+'\'')[1].split("break")[0]+"break"
}
m.reply(`${getCase(text)}`)
} catch (e) {
m.reply(`case ${text} tidak ditemukan!`)
}
}
break
case 'delcase': {
if (!isOwner) return m.reply(msg.owner)
if (!text) return m.reply('Masukkan Nama Casenya!')
fs.readFile('mansx.js', 'utf8', (err, data) => {
if (err) {
console.error('Terjadi kesalahan saat membaca file:', err);
return;
}
const regex = new RegExp(`case\\s+'${text.toLowerCase()}':[\\s\\S]*?break`, 'g');
const modifiedData = data.replace(regex, '');
fs.writeFile('mansx.js', modifiedData, 'utf8', (err) => {
if (err) {
m.reply('Terjadi kesalahan saat menulis file: ', err);
} else m.reply('Case berhasil dihapus dari file');
});
});
}
break

default:
if ((m.text).startsWith('$')) {
if (!isOwner) return
exec(budy.slice(2), (err, stdout) => {
if(err) return sock.sendMessage(m.chat, {text: err.toString()}, {quoted: m})
if (stdout) return sock.sendMessage(m.chat, {text: util.format(stdout)}, {quoted: m})
})}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

if ((m.text).startsWith("=>")) {
if (!isOwner) return
try {
const evaling = await eval(`;(async () => { ${text} })();`);
return sock.sendMessage(m.chat, {text: util.format(evaling)}, {quoted: m})
} catch (e) {
return sock.sendMessage(m.chat, {text: util.format(e)}, {quoted: m})
}}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

if ((m.text).startsWith(">")) {
if (!isOwner) return
try {
let evaled = await eval(text)
if (typeof evaled !== 'string') evaled = util.inspect(evaled)
sock.sendMessage(m.chat, {text: util.format(evaled)}, {quoted: m})
} catch (e) {
sock.sendMessage(m.chat, {text: util.format(e)}, {quoted: m})
}}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

}} catch (e) {
console.log(e)
sock.sendMessage(`${owner}@s.whatsapp.net`, {text:`${util.format(e)}`}, {quoted: m})
}}

// >~~~~~~~~~~~~~~~~~~~~~~~~~~~~< //

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyan("File Update => "),
chalk.cyan.bgBlue.bold(`${__filename}`))
delete require.cache[file]
require(file)
})