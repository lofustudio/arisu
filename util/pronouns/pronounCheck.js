const convertPronouns = require('./convertPronouns');

module.exports = async (client, message) => {
	if (message.member.id == "845818120777236491") return;

	const fetch = require("node-fetch");
	const api_url = `https://pronoundb.org/api/v1/lookup?platform=discord&id=${message.member.id}`;

	async function getData() {
		const response = await fetch(api_url);
		const data = await response.json();
		if (data.error) return data.error;
		return data.pronouns;
	}

	let pronounID = await getData();
	let pronoun = await convertPronouns(pronounID);

	if (pronoun == "Unspecified" || "Avoid pronouns, use my name") return;
	if (pronoun == "Ask me my pronouns" || "Other pronouns") return message.member.setNickname(`${message.member.user.username} [Ask]`);
	if (pronoun == "Any pronouns") return message.member.setNickname(`${message.member.user.username} [Any]`);
    message.member.setNickname(`${message.member.user.username} [${pronoun}]`);
}