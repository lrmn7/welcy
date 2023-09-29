require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  Botconfig: {
    token: process.env.BOT_TOKEN,
    clientid: process.env.CLIENT_ID,
    guildid: process.env.GUILD_ID,
    welcomeChannelID: process.env.WELLCOME_CHANNEL_ID,
    farewellChannelID: process.env.FAREWELL_CHANNEL_ID,
  },

  Image: {
    background: process.env.BACKGROUND_URL || "https://cdn.discordapp.com/attachments/1098969636306960465/1157152464320090212/madevytragic.png",
    titlemessagecolor: "#fff474",
    welcomeDescription: "Let's play and chit chat together!!",
    farewellDescription: "See you soon, We'll miss you!",
    descriptioncolor: "#ffffff",
    bordercolor: "#fd9a73",
    avatarbordercolor: "#1d1b1b",
   // overlayopacity: 0.3,
  },

    Presence: {
        status: "idle", //Put your bot status here (online, idle, dnd, invisible)
        activity: "Made by Tragic", //Put your bot activity here (playing, streaming, listening, watching)
        type: "WATCHING", //Put your bot activity type here (PLAYING, STREAMING, LISTENING, WATCHING)
    },
}