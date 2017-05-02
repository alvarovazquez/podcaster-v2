const LOCAL_STORATE_STATE_KEY = 'state';

export const saveState = (state) => {
	try {
		const cachedState = JSON.stringify(state);

		localStorage.setItem(LOCAL_STORATE_STATE_KEY, cachedState);
	} catch (err) {
		console.error('ERROR saving store to cache', err);
	}
};

export const loadState = () => {
	try {
		const cachedState = localStorage.getItem(LOCAL_STORATE_STATE_KEY);

		if (cachedState !== null) {
			return JSON.parse(cachedState);
		}

		return undefined;
	} catch (err) {
		return undefined;
	}
};