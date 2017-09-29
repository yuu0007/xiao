const { Command } = require('discord.js-commando');
const snekfetch = require('snekfetch');
const { shorten } = require('../../structures/Util');
const { GOV_KEY } = process.env;

module.exports = class APODCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'apod',
			aliases: ['nasa-apod', 'astronomy-picture-of-the-day', 'apod-image', 'nasa-apod-image'],
			group: 'random',
			memberName: 'apod',
			description: 'Responds with today\'s Astronomy Picture of the Day.',
			clientPermissions: ['ATTACH_FILES']
		});
	}

	async run(msg) {
		try {
			const { body } = await snekfetch
				.get('https://api.nasa.gov/planetary/apod')
				.query({ qpi_key: GOV_KEY });
			return msg.say(shorten(body.explanation), { files: [body.url] });
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
