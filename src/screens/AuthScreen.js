import React from 'react';
import PropTypes from 'prop-types';

import Auth from './../components/Auth';

export default function AuthScreen(props) {
    return (
        <Auth navigate={props.navigation.navigate} />
    );
}

AuthScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};
