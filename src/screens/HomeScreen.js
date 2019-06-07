import React from 'react';
import PropTypes from 'prop-types';

import Home from './../components/Home';

export default function HomeScreen(props) {
    return (
        <Home navigate={props.navigation.navigate} addListener={props.navigation.addListener} />
    );
}

HomeScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        addListener: PropTypes.func.isRequired
    }).isRequired
};

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Pacjenci",
    };
}
