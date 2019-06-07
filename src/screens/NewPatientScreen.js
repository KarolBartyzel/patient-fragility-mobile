import React from 'react';
import PropTypes from 'prop-types';

import NewPatient from './../components/NewPatient';

export default function NewPatientScreen(props) {
    return (
        <NewPatient replace={props.navigation.replace} />
    );
}

NewPatientScreen.propTypes = {
    navigation: PropTypes.shape({
        replace: PropTypes.func.isRequired,
    }).isRequired
};

NewPatientScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Nowy Pacjent",
    };
}
