const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const canvafy = require("canvafy");
const config = require('./config');
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const commands = [{
  name: 'ping',
  description: 'Check the bot\'s ping',
}];

const rest = new REST({ version: '9' }).setToken(config.Botconfig.token);

client.once('ready', () => {
  console.clear();
  console.log('\x1b[34m%s\x1b[0m', `Logged in as ${client.user.tag}`);

  // Register the slash commands
  (async () => {
    try {
      await rest.put(
        Routes.applicationGuildCommands(config.Botconfig.clientid, config.Botconfig.guildid),
        { body: commands },
      );
      console.log('\x1b[36m%s\x1b[0m', 'Slash commands registered successfully!');
      console.log('\x1b[31m%s\x1b[0m', `A discord welcome bot by`);
      console.log('\x1b[31m%s\x1b[0m', `
      🅻 🆁🅼🅽
      
      `);
    } catch (error) {
      console.error(error);
    }
  })();
  
  // Set the bot's presence
  client.user.setPresence({
    activities: [{ name: config.Presence.activity, type: config.Presence.type }],
    status: config.Presence.status.toLowerCase(),
  });

  // Start the Express server for web view
  const app = express();
  app.get('/', (req, res) => {
    res.send('<h1>Bot is Online!</h1>'); // Ganti dengan konten yang ingin Anda tampilkan di web view
  });

  app.listen(3000, () => {
    console.log('Web view is running on http://localhost:3000');
  });
});

client.on("guildMemberAdd", async member => {
  try {
    const guild = member.guild;
    const channel = await guild.channels.fetch(config.Botconfig.welcomeChannelID);
    if (!channel) {
      console.error("Welcome channel not found.");
      return;
    }

    const welcome = await new canvafy.WelcomeLeave()
      .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", config.Image.background)
      .setTitle("Welcome!", config.Image.titleMessageColor)
      .setDescription(config.Image.welcomeDescription, config.Image.descriptionColor)
      .setBorder(config.Image.bordercolor)
      .setAvatarBorder(config.Image.avatarbordercolor)
      .build();

    const guildname = guild.name;
    const welcomeMessage = `🎗️ Welcome to ${guildname}, <@${member.id}>! 

    We're excited to have you join our community! Before you begin, please follow these steps:

    ➣ **Read the Rules**: Familiarize yourself with our community guidelines and regulations here <#1088032924869349409> .
    ➣ **Choose Your Role**: To access all server features, including exclusive channels and events, select your role in the <#1091200958337396737> .
    ➣ **Say Hi**: Introduce yourself in the <#1088037928091009095> . We'd love to get to know you better!
  
    By following these steps, you'll have a smooth start in our community and can fully enjoy your time with us. 🚀`;

    const developerbutton = new ButtonBuilder()
      .setLabel('Oh!BOTLiST')
      .setURL('https://ohbotlist.hop.sh/')
      .setStyle(ButtonStyle.Link);

    // Create an action row containing the button
    const actionRow = new ActionRowBuilder().addComponents(developerbutton);

    // Send the welcome message with the button
    channel.send({
      content: welcomeMessage,
      files: [{
        attachment: welcome,
        name: `welcome-${member.id}.png`
      }],
      components: [actionRow] // Add the action row with the button
    });
  } catch (error) {
    console.error(error);
  }
});

client.on("guildMemberRemove", async member => {
  const farewell = await new canvafy.WelcomeLeave()
    .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", config.Image.background)
    .setTitle("Goodbye!", config.Image.titleMessageColor) // Fix the method call
    .setDescription(config.Image.farewellDescription, config.Image.descriptionColor)
    .setBorder(config.Image.bordercolor)
    .setAvatarBorder(config.Image.avatarbordercolor)
    // .setOverlayOpacity(config.Image.overlayopacity)
    .build();

  const guildname = member.guild.name;
  const farewellMessage = `${member.user.tag} has left ${guildname}. Goodbye!`;
  member.guild.channels.cache.get(config.Botconfig.farewellChannelID).send({
    content: farewellMessage,
    files: [{
      attachment: farewell,
      name: `farewell-${member.id}.png`
    }]
  })
  .catch(console.error);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'ping') {
    const ping = client.ws.ping;
    const uptime = formatUptime(client.uptime);
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const numServers = client.guilds.cache.size;
    const numUsers = client.users.cache.size;
    const apiLatency = client.ws.ping;
    const discordJSVersion = require('discord.js').version;
    const nodeVersion = process.version;
    const version = require('./package.json').version;

    const sponsorbutton = new ButtonBuilder()
      .setLabel('Sponsor')
      .setURL('https://lrmn.is-a.dev/sponsor')
      .setStyle(ButtonStyle.Link);

    const developerbutton = new ButtonBuilder()
      .setLabel('Developer')
      .setURL('https://lrmn.is-a.dev/')
      .setStyle(ButtonStyle.Link);

    const pingembed = {
      color: 0x0099ff,
      author: {
        name: client.user.username + ' Stats',
        icon_url: client.user.avatarURL(),
        url: 'https://discord.gg/WFfjrQxnfH',
      },
      fields: [
        {
          name: ':ping_pong: Ping',
          value: `┕ ${ping} ms`,
          inline: true,
        },
        {
          name: ':clock1: Uptime',
          value: '┕ ' + uptime,
          inline: true,
        },
        {
          name: ':file_cabinet: Memory',
          value: `┕ ${Math.round(memoryUsage * 100) / 100} MB`,
          inline: true,
        },
        {
          name: ':desktop: Servers',
          value: `┕ ${numServers}`,
          inline: true,
        },
        {
          name: ':busts_in_silhouette: Users',
          value: `┕ ${numUsers}`,
          inline: true,
        },
        {
          name: ':satellite: API Latency',
          value: `┕ ${apiLatency} ms`,
          inline: true,
        },
        {
          name: ':robot: Version',
          value: `┕ v${version}`,
          inline: true,
        },
        {
          name: ':blue_book: Discord.js',
          value: `┕ v${discordJSVersion}`,
          inline: true,
        },
        {
          name: ':green_book: Node.js',
          value: `┕ ${nodeVersion}`,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Requested by " + interaction.user.tag,
        icon_url: interaction.user.avatarURL(),
      },
    };

    interaction.reply({ embeds: [pingembed], components: [new ActionRowBuilder().addComponents(sponsorbutton).addComponents(developerbutton) ] });

  }
});




// Login to the bot
if (!config.Botconfig.token) {
  console.log("\x1b[31m%s\x1b[0m", "Please provide a bot token in the .env file");
  process.exit(1);
} else {
  client.login(config.Botconfig.token);
}

function formatUptime(uptime) {
  const totalSeconds = Math.floor(uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
  const seconds = Math.floor(((totalSeconds % 86400) % 3600) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}