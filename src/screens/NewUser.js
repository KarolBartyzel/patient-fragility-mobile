import React from 'react';
import PropTypes from 'prop-types';

import NewUser from './../components/NewUser';

export default function NewUserScreen(props) {
    return (
        <NewUser navigate={props.navigation.navigate} />
    );
}

NewUserScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Nowy użytkownik",
    };
}

NewUserScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired
};
