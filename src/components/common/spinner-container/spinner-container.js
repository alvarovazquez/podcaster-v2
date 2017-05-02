import { connect } from 'react-redux';

import Spinner from '../spinner/spinner';

const isLoading = (state) => {
	if (state.UI.loading === true) {
		return true;
	}

	return false;
};

const mapStateToProps = (state) => {
	return {
		loading: isLoading(state)
	};
};

const SpinnerContainer = connect(
	mapStateToProps
)(Spinner);

export default SpinnerContainer;