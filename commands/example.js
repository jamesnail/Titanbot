// This is a sample command file to show you how to create your own command files based off a skeleton template!
module.exports =
{
    // These areas are the 'attributes' or 'properties' of this command.  You can add/remove as many as you want!
    // Unrequired fields are marked with an * in the comment.

    name: 'example',
    // The name of the command.

    description: 'An example command.',
    // *The command's description.

    example: 'example',
    // *An example of how to execute it.

    execute(message, args)
    // The actual code the command will perform.
    {
        return message.channel.send('This is a test command!');
        // message is the message object of your command.  message.channel is the channel in which the message was sent.
        // message.channel.send will send the following message to the channel in which the message was sent.
        // args is your arguments array from index.js.  If we used our test command, it would have been ['3d5'].
        // Because args is an array, you can pass any number of arguments!
        // The return keyword will end function execution, returning the value following it as its return value.
    },
};