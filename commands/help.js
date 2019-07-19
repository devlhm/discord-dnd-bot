module.exports = {
	name: 'ajuda',
	execute (client, message) {
		const commands = client.commands.filter(cmd => cmd.name !== this.name);
		let messageToSend = '';
		commands.forEach(cmd => {
			console.log('cmd :', cmd);
			messageToSend += `**${cmd.name}** _${cmd.desc}_ \n`;
		});
		message.channel.send(messageToSend);
	}
};
