/* 🤖 MansxDev WA Base — rebranded. */

require("./system/global")
const func = require("./system/place")
const readline = require("readline")
const usePairingCode = true
const yargs = require("yargs")
const axios = require("axios")
const { Boom } = require('@hapi/boom')
const { load_Module } = require("./system/function.js")
const chalk = require('chalk')
const pino = require('pino')
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')
const makeInMemoryStore = global.makeInMemoryStore || require('./system/store')

const fs = require("fs")

global.status = 0
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => {
    return new Promise((resolve) => rl.question(text, resolve));
};
console.clear();
console.log(chalk.cyanBright(`
╔╗╔═╦══╦═╗─╔╦═══╗
║║║╔╩╣╠╣║╚╗║║╔══╝
║╚╝╝─║║║╔╗╚╝║╚══╗
║╔╗║─║║║║╚╗║║╔══╝
║║║╚╦╣╠╣║─║║║╚══╗
╚╝╚═╩══╩╝─╚═╩═══╝

⪻ 𝑴𝑨𝑵𝑺𝑿𝑫𝑬𝑽 ⪼

`));


    console.log(chalk.magenta.bold(`BASE WA MANSX`));
    console.log(chalk.yellow('------------------'));

   
    console.log(chalk.white.bold('Powered by ') + chalk.green.bold('MansxDev'));
    console.log(chalk.white('Contact me:'));
    console.log(chalk.green('WhatsApp: ') + chalk.blueBright.bold(`+${global.owner}`));
    console.log(chalk.green('GitHub: ') + chalk.yellowBright.bold('github.com/mansxdev'));

const DataBase = require('./system/database.js')
const database = new DataBase()

;(async () => {
    const loadData = await database.read()
    if (!loadData || Object.keys(loadData).length === 0) {
        global.db = {
            users: {},
            groups: {},
            database: {},
            settings: {},
        }
        await database.write(global.db)
    } else {
        global.db = loadData
    }
    setInterval(async () => {
        if (global.db) await database.write(global.db)
    }, 5000)
})()

async function startSesi() {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent' }) })
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)
    const { version } = await fetchLatestBaileysVersion()

    const connectionOptions = {
        version,
        browser: ['Ubuntu', 'Chrome', '110.0'],
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
                return msg?.message || undefined
            }
            return { conversation: 'Mansx Base' }
        },
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state
    }

    const sock = await func.makeWASocket(connectionOptions)

    if (usePairingCode && !sock.authState.creds.registered) {
        const phoneNumber = await question(chalk.red.bold('│ Masukkan Nomor WhatsApp (Contoh 628xxx)\n└─>'))
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const code = await sock.requestPairingCode(phoneNumber)
                console.log(`⪩ ${chalk.blue.bold('KODE PAIRING')} : ${chalk.green.bold(code)}`)
                break
            } catch (e) {
                console.log(chalk.red.bold(`└ Pairing gagal (${attempt}/3): ${e?.message || e}`))
                await sleep(6000)
            }
        }
        rl.close()
    }

    await store?.bind(sock.ev)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode
            console.log('Disconnected with reason:', reason)
            if (reason === DisconnectReason.badSession) {
                console.log(`Bad session, delete session and scan again.`)
                process.exit()
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(`Connection replaced. Another session opened.`)
                sock.logout()
            } else if (
                reason === DisconnectReason.connectionClosed ||
                reason === DisconnectReason.connectionLost ||
                reason === DisconnectReason.timedOut
            ) {
                console.log(`Reconnecting...`)
                startSesi()
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(`Device logged out, please scan again.`)
                sock.logout()
            } else {
                console.log(`Unknown disconnect reason, reconnecting...`)
                startSesi()
            }
        } else if (connection === 'open') {
            console.log(chalk.blue.bold('✅ BOT CONNECTED'))
            sock.sendMessage(sock.user.id.split(":")[0]+"@s.whatsapp.net", {
                text: `ʙᴏᴛ ʙᴇʀʜᴀsɪʟ ᴛᴇʀʜᴜʙᴜɴɢ

ᴀɴᴅᴀ sᴜᴅᴀʜ ᴛᴇʀʜᴜʙᴜɴɢ ᴅɪ ʙᴏᴛ ᴋᴀᴍɪ

ᴅᴇᴠᴇʟᴏᴘᴇʀ : MᴀɴsxDᴇᴠ`
            })
        }
    })

    sock.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            m = chatUpdate.messages[0]
            if (!m.message) return
            m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
            if (m.key && m.key.remoteJid === 'status@broadcast') return sock.readMessages([m.key])
            if (!sock.public && m.key.remoteJid !== global.owner+"@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') return
            if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
            if (global.autoread) sock.readMessages([m.key])

      await sleep(500);  // throttle biar tidak spam
      m = func.smsg(sock, m, store);
      require("./mansx.js")(sock, m, store);
      
        } catch (err) {
            console.log(err)
        }
    })

sock.ev.on('group-participants.update', async (anu) => {
if (!global.welcome) return
let botNumber = await sock.decodeJid(sock.user.id)
if (anu.participants.includes(botNumber)) return
await sleep(1000);
try {
let metadata = await sock.groupMetadata(anu.id)
let namagc = metadata.subject
let participants = anu.participants
for (let num of participants) {
let check = anu.author !== num && anu.author.length > 1
let tag = check ? [anu.author, num] : [num]
try {
ppuser = await sock.profilePictureUrl(num, 'image')
} catch {
ppuser = 'https://files.catbox.moe/4jlrw2.jpg'
}
if (anu.action == 'add') {
sock.sendMessage(anu.id, {text: check ? `@${anu.author.split("@")[0]} Telah Menambahkan @${num.split("@")[0]} Ke Dalam Grup Ini` : `Hallo Kak👋 @${num.split("@")[0]} Selamat Datang Di *${namagc}*`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Welcome Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
} 
if (anu.action == 'remove') { 
sock.sendMessage(anu.id, {text: check ? `@${anu.author.split("@")[0]} Telah Mengeluarkan @${num.split("@")[0]} Dari Grup Ini` : `@${num.split("@")[0]} Telah Keluar Dari Grup Ini`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Leaving Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
}
if (anu.action == "promote") {
sock.sendMessage(anu.id, {text: `@${anu.author.split("@")[0]} Telah Menjadikan @${num.split("@")[0]} Sebagai Admin Grup Ini`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Promote Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
}
if (anu.action == "demote") {
sock.sendMessage(anu.id, {text: `@${anu.author.split("@")[0]} Telah Memberhentikan @${num.split("@")[0]} Sebagai Admin Grup Ini`, 
contextInfo: {mentionedJid: [...tag], externalAdReply: { thumbnailUrl: ppuser, title: '© Demote Message', body: '', renderLargerThumbnail: true, sourceUrl: linkgc, mediaType: 1}}})
}
} 
} catch (err) {
console.log(err)
}})

sock.ev.on('call', async (user) => {
if (!global.anticall) return
let botNumber = await sock.decodeJid(sock.user.id)
for (let ff of user) {
if (ff.isGroup == false) {
if (ff.status == "offer") {
let sendcall = await sock.sendMessage(ff.from, {text: `@${ff.from.split("@")[0]} Maaf Kamu Akan Saya Block Karna Owner Bot Menyalakan Fitur *Anticall*\nJika Tidak Sengaja Segera Hubungi Owner Untuk Membuka Blokiran Ini.`, contextInfo: {mentionedJid: [ff.from], externalAdReply: {thumbnailUrl: "https://files.catbox.moe/4jlrw2.jpg", title: "｢ CALL DETECTED ｣", previewType: "PHOTO"}}}, {quoted: null})
sock.sendContact(ff.from, [global.owner], "Telfon Atau Vc = Block", sendcall)
await sleep(8000)
await sock.updateBlockStatus(ff.from, "block")
}}
}})

sock.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = sock.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

sock.ev.on('creds.update', saveCreds)
sock.public = true

return sock
}

startSesi()

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err)
})

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.cyan("File Update => "), chalk.cyan.bgBlue.bold(`${__filename}`))
    delete require.cache[file]
    require(file)
})