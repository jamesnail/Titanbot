const fs = require('fs')
// fs stands for file system.  This lets us read and write files from disk (IMPORTANT FOR COMMANDS)!

const Discord = require('discord.js')
// This is the Discord client.  It allows us to interact with Discord!

const client = new Discord.Client();
// Instantiante a new Discord client.  Right now, it's not logged into anything, it's just a proverbial fresh Discord login screen.

const { token, prefix } = require('./config.json')
// This imports the token and prefix variables from config.json.  This way, if our bot token/prefix changes, we only have to
// change config.json instead of every single instance of it!

client.commands = new Discord.Collection();
// This creates a new Discord Collection called commands for us to populate with our command files.

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// This reads all our command files ending with .js inside our commands folder.

for (const file of commandFiles)
{
    // Set a new item in our Collection with its name as the command's name attribute
    // and the value of the command as the command's execute() method.
    // Do this for each file in our list of command files!
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.login(token);
// This is used to log our bot in using its token.  Bots use tokens, we use passwords.

client.on('ready', () => {
    // This is how events are handled, called the "event-listener" method.  The above code "listens" for the "ready" event.
    // The "ready" event triggers when the bot is successfully logged in and ready to go.  Once ready, it will say in your
    // console "Titanbot is ready!".
    console.log('Titanbot is ready!');
});

client.on('message', msg => {
    // This is what happens whenever a message is sent in any channel the bot can see (by default, it is all channels).

    // First, if message content does not start with our prefix OR the message sender is a bot, exit immediately.
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    // Second, create an array of arguments provided.
    // Example: If you typed the command >dice 3d5, it would split it up into the following array, removing the prefix:
    // args = ['dice', '3d5']
    const args = msg.content
    // First, get the message content.
        .slice(prefix.length)
    // Next, slice out the prefix so it just leaves the command and arguments.
        .split(/ +/);
    // And finally, split it up by spaces.  This is technically a slightly more advanced
    // directive method thingy, so don't worry too much about it.
    // You could write all this on one line by doing:
    // const args = msg.content.slice(prefix.length).split(/ +/)
    // But this is hard to read, so I split it up into multiple lines for easy (easier?) understanding.

    // Now that we have our command and its constituent arguments in an array, grab the actual command and remove it from the arguments array.
    const commandName = args
    // First, get our args array (currently ['dice', '3d5'])
        .shift()
    // The shift() method removes the first element from the array and returns it as a value (in this case, removing 'dice').
    // Be aware that .shift() changes the original array!!! (args is now ['3d5'])
        .toLowerCase();
    // Change our pulled-out thing to lower case. (in our example, changing 'dice' to lower case.)

    if (!client.commands.has(commandName)) return
    // Next, if this command the user tried to run doesn't exist, exit.

    const command = client.commands.get(commandName)
    // Now that we know our command exists (we wouldn't have gotten this far if it didn't), fetch it from our Discord Collection we created earlier.

    // The below code is a try-catch block.  This makes it where if a command fails, it won't just wreck everything.
    // If it fails the try statement, it will execute the catch statement,
    // which will log the error in console for you to look at closer and try to see what went wrong!
    try
    {
        command.execute(msg, args); // Execute the command from our Discord Collection, passing in our array of arguments (as well as the message object).
    }
    catch (error)
    {
        console.error(error);
    }

    // Now we are done executing our command and we leave the 'on message' loop, awaiting another message!
});