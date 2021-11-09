import 'jest-preset-angular/setup-jest';

import failOnConsole from 'jest-fail-on-console';

const whitelistedMessages = [/Could not find Angular Material core theme/];
failOnConsole({
	silenceMessage: (message) => {
		if (whitelistedMessages.some((regex) => regex.test(message))) {
			return true;
		}

		return false;
	},
});
