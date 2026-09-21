// Minimal in-memory message store — pengganti `makeInMemoryStore` (dihapus dari
// baileys 6.7.x+). Cove: bind(ev) + loadMessage(jid, id) — yang dipakai base wa.
// ponytail: kalau butuh full store (kontak/chat subscribe), backfill dari messages.set.
module.exports = function makeInMemoryStore() {
  const chats = new Map(); // jid -> Map(id -> WebMessageInfo)

  return {
    bind(ev) {
      ev.on("messages.upsert", ({ messages }) => {
        for (const m of messages || []) {
          const jid = m.key && m.key.remoteJid;
          if (!jid || !m.key.id) continue;
          if (!chats.has(jid)) chats.set(jid, new Map());
          chats.get(jid).set(m.key.id, m);
        }
      });
    },
    loadMessage(jid, id) {
      const map = jid && chats.get(jid);
      return (map && map.get(id)) || undefined;
    },
    contacts: {},
  };
};