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
    background: process.env.BACKGROUND_URL || "https://cdn.discordapp.com/attachments/1098969636306960465/1131203242668347463/lucyradio.png",
    titlemessagecolor: "#ffffff",
    welcomeDescription: "Welcome to the server! Let's play and chit chat together!!",
    farewellDescription: "Goodbye, We'll miss you!",
    descriptioncolor: "#c0ffee",
    bordercolor: "#2a2e35",
    avatarbordercolor: "#2a2e35",
    overlayopacity: 0.3,
  },

    Presence: {
        status: "idle", //Put your bot status here (online, idle, dnd, invisible)
        activity: "Made by Tragic", //Put your bot activity here (playing, streaming, listening, watching)
        type: "WATCHING", //Put your bot activity type here (PLAYING, STREAMING, LISTENING, WATCHING)
    },
}