# base-wa-mansx

WhatsApp bot base (Baileys **official**) by **MansxDev**. Case-switch style, no interactive buttons — WA doesn't render them on non-official API.

> Rebranded from the "Franki" base. Uses `@whiskeysockets/baileys@6.7.24` (official), not a fork.

## Features

- 🔑 Pairing code login (`usePairingCode = true`) with auto-retry (3×)
- 📦 Case-style command handler (`mansx.js`)
- 💬 Welcome / leave / promote / demote group messages
- 📵 Anticall auto-block
- 👁 Auto-read messages (`autoread`)
- 💾 JSON database (`system/database.js`) + premium/owner lists (`data/`)
- 🧩 smsg-serialized message object (`m.chat`, `m.sender`, `m.isGroup`, `m.quoted`, `m.reply`, …)
- 🛡 Owner-only commands (`addcase`, `getcase`, `delcase`)
- 🚫 **No buttons/interactive messages** — menus are sent as document attachment with caption (WA doesn't render interactive messages on the non-official API)

## Requirements

- Node.js ≥ 16 (tested on Node 26)
- npm (with `allow-git=all` in `.npmrc` — baileys 6.x has a git dependency)
- WhatsApp number with pairing enabled

## Quick Start

```bash
npm install
npm start
```

Enter your number in **international format** (e.g. `6281546543913`), then:

1. The terminal shows `KODE PAIRING : XXXXXXXX`
2. Open WhatsApp on your phone → **Linked Devices → Link a Device**
3. Paste the pairing code

A `session/` folder is created and reused on next start.

## Configuration

Edit `settings.js`:

| Key | Purpose |
| --- | --- |
| `global.owner` | Owner number (international, no `+`) |
| `global.botname` / `botname2` | Bot display name |
| `global.namaOwner` / `storename` | Creator / store branding |
| `global.linkgc` / `linkSaluran` / `idSaluran` | Group / channel links for previews |
| `global.dana` / `gopay` / `qris` | Payment info |
| `global.image` | Image URLs (menu thumb, logo, custom) |
| `global.msg` | Reply templates (`wait`, `owner`, `group`, `admin`, `botadmin`) |
| `data/owner.json` / `data/premium.json` | Owner & premium jid lists |

## Adding a Command

Open `mansx.js` and add a case inside the `switch`:

```js
case "halo": {
  m.reply(`Halo ${m.pushName}! 👋`)
}
break

case "ping": {
  m.reply(msg.wait) // optional "processing" reply
  await sleep(1000)
  m.reply(`Pong! ${Math.round(process.uptime()*1000)}ms`)
}
break
```

The `.menu` case sends the command list as a **document attachment with caption** — historical base style minus buttons:

```js
case "menu": {
const menu = `*INFORMATION BOT*
• User : ${m.sender.split("@")[0]}
• Creator : ${namaOwner}

*DAFTAR MENU*
• ${prefix}menu — Menu ini
• ${prefix}owner — Kontak owner
• ${prefix}dev — Info owner
`
await sock.sendMessage(m.chat, {
  footer: `© Base MansxDev`,
  headerType: 1,
  viewOnce: true,
  document: fs.readFileSync("./package.json"),
  fileName: `${namaOwner}`,
  mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  fileLength: 99999999,
  caption: menu,
  contextInfo: { isForwarded: true,
    mentionedJid: [m.sender, global.owner+"@s.whatsapp.net"],
    externalAdReply: { title: `${botname} - ${versi}`, thumbnailUrl: global.image.logo, mediaType: 1, renderLargerThumbnail: true } }
})
}
break
```

Owner-only: `if (!isOwner) return m.reply(msg.owner)`.

## Project Structure

```
├── main.js            — socket setup, pairing, reconnect, group/call events
├── settings.js        — all global config (owner, branding, links, msgs)
├── mansx.js           — case-switch command handler (add cases here)
├── system/
│   ├── global.js      — requires module + settings + exif
│   ├── module.js      — global helpers (fs, axios, chalk, baileys utils, …)
│   ├── place.js       — makeWASocket wrapper + smsg serializer
│   ├── database.js    — JSON database read/write
│   ├── function.js    — reusable functions (getBuffer, fetchJson, ucapan, …)
│   ├── converter.js   — media conversion helpers
│   ├── exif.js        — sticker exif
│   ├── store.js       — minimal in-memory store shim (replaces makeInMemoryStore)
│   ├── message.js / welcome.js / deposit.js — optional subsystems
├── data/              — JSON persistence (bot, database, owner, premium)
├── media/ src/        — assets (empty stubs)
└── session/           — baileys auth state (git-ignored)
```

## FAQ / Troubleshooting

**`Pairing gagal: Connection Closed` (401)**
- WA rate-limits pairing for a number with a recently-linked device, or too many failed attempts. Wait a few hours and retry — the base auto-retries 3×.
- If it keeps failing, the number already has the max linked devices. Unlink an old device or use another number.

**Interactive buttons don't show in chat**
- Correct — non-official API cannot render `buttons`/`nativeFlow`. This base only sends plain text + `externalAdReply` previews, which WA renders fine.

**`makeInMemoryStore` removed?**
- baileys ≥ 6.7 removed the in-memory store export. This base ships its own minimal shim in `system/store.js` with `bind()` + `loadMessage()`.

**Security note**
- You are responsible for this bot's config and usage. Owner commands (`addcase` with `=>`/`$` eval) execute arbitrary code — keep owner number private.

## License

MIT © MansxDev. The base was rebranded from the Franki base and rebuilt on official Baileys.