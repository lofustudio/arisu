module.exports = (pronounID) => {
	if (pronounID == 404) {
		return 'Not Linked';
	}

	switch (pronounID) {
	case 'unspecified':
		return 'Unspecified';

	case 'hh':
		return 'he/him';

	case 'hi':
		return 'he/it';

	case 'hs':
		return 'he/she';

	case 'ht':
		return 'he/they';

	case 'ih':
		return 'it/him';

	case 'ii':
		return 'it/its';

	case 'is':
		return 'it/she';

	case 'it':
		return 'it/they';

	case 'shh':
		return 'she/he';

	case 'sh':
		return 'she/her';

	case 'si':
		return 'she/it';

	case 'st':
		return 'she/they';

	case 'th':
		return 'they/he';

	case 'ti':
		return 'they/it';

	case 'ts':
		return 'they/she';

	case 'tt':
		return 'they/them';

	case 'any':
		return 'Any pronouns';

	case 'other':
		return 'Other pronouns';

	case 'ask':
		return 'Ask me my pronouns';

	case 'avoid':
		return 'Avoid pronouns, use my name';
	}
};