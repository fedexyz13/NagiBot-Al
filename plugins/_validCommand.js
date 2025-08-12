export async function before(m, { conn }) {
  try {
    if (!m.text || !global.prefix || !global.prefix.test(m.text)) return;

    const Buffer = global.Buffer || ((...args) => new Uint8Array(...args));
    
    const channelRD = global.channelRD || { id: '120363417186717632@newsletter', name: 'N A G I - A I' };
    const metanombre = global.metanombre || 'ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ';

    if (!Array.prototype.getRandom) {
      Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
      };
    }

    global.fkontak = {
      key: {
        participant: `0@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: `status@broadcast` } : {})
      },
      message: {
        contactMessage: {
          displayName: metanombre,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${metanombre},;;;\nFN:${metanombre}\nitem1.TEL;waid=50231458537:50231458537\nitem1.X-ABLabel:Meta Ai\nitem2.TEL;waid=${m.sender ? m.sender.split('@')[0] : '0'}:${m.sender ? m.sender.split('@')[0] : '0'}\nitem2.X-ABLabel:Usuario\nEND:VCARD`,
          jpegThumbnail: null,
          thumbnail: null,
          sendEphemeral: true
        }
      }
    };

    global.fakeMetaMsg = {
      key: {
        remoteJid: '0@s.whatsapp.net',
        fromMe: false,
        id: 'FFAC1BC46FF49C35',
        participant: '0@s.whatsapp.net'
      },
      message: {
        contactMessage: {
          displayName: 'ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ\nORG:ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ\nTEL;type=CELL;type=VOICE;waid=50231458537:+502 3145 8537\nEND:VCARD`,
          jpegThumbnail: Buffer.from([]),
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true
          }
        }
      }
    };

    global.rcanal = {
      quoted: global.fakeMetaMsg,
      contextInfo: {
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          serverMessageId: 100,
          newsletterName: channelRD.name
        },
        externalAdReply: {
          title: 'ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
          body: 'N A G I - A I',
          mediaUrl: null,
          description: null,
          previewType: "PHOTO",
          thumbnailUrl: 'https://files.cloudkuimages.guru/images/7UhOMrIe.jpg',
          sourceUrl: 'https://www.instagram.com/xrljose/',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    };

    const usedPrefix = global.prefix.exec(m.text)[0];
    const command = m.text.slice(usedPrefix.length).trim().split(' ')[0].toLowerCase();

    if (!command) return;

    const validCommand = (command, plugins) => {
      if (!plugins) return false;
      return Object.values(plugins).some(plugin =>
        plugin && plugin.command && (Array.isArray(plugin.command) ? plugin.command : [plugin.command]).includes(command)
      );
    };

    if (command === "bot") return;

    if (validCommand(command, global.plugins)) {
      const chat = global.db.data.chats[m.chat];
      const user = global.db.data.users[m.sender];

      if (chat && chat.isBanned) {
        const adReplyMsgBanned = {
          text: `《✦》El bot *NagiBot-MD* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              title: 'ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
              body: 'N A G I - A I',
              thumbnailUrl: 'https://files.cloudkuimages.guru/images/QgARFDHi.jpg',
              sourceUrl: 'https://www.instagram.com/xrljose/',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          }
        };

        try {
          await conn.sendMessage(m.chat, adReplyMsgBanned, { quoted: global.fakeMetaMsg });
        } catch (e) {
          console.error("Error al enviar mensaje con formato:", e);
          await m.reply(`《✦》El bot *NagiBot-MD* está desactivado en este grupo.\n\n> ✦ Un *administrador* puede activarlo con el comando:\n> » *${usedPrefix}bot on*`);
        }
        return;
      }

      if (user) user.commands = (user.commands || 0) + 1;
    } else {
      const comando = m.text.trim().split(' ')[0];
      const adReplyMsgInvalidCommand = {
        text: `《✦》El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: 'ʙʀᴀʏᴀɴ - ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ',
            body: 'N A G I - A I',
            thumbnailUrl: 'https://files.cloudkuimages.guru/images/8bkuiWAR.jpg',
            sourceUrl: 'https://www.instagram.com/xrljose/',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      };

      try {
        await conn.sendMessage(m.chat, adReplyMsgInvalidCommand, { quoted: global.fakeMetaMsg });
      } catch (e) {
        console.error("Error al enviar mensaje con formato:", e);
        await m.reply(`《✦》El comando *${comando}* no existe.\nPara ver la lista de comandos usa:\n» *${usedPrefix}help*`);
      }
    }
  } catch (error) {
    console.error(`Error en _validCommand.js: ${error}`);
  }
}