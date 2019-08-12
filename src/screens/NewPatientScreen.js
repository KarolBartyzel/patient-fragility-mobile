import React from 'react';
import PropTypes from 'prop-types';

import NewPatient from './../components/NewPatient';

export default function NewPatientScreen(props) {
    return (
        <NewPatient replace={props.navigation.replace} addListener={props.navigation.addListener} />
    );
}

NewPatientScreen.propTypes = {
    navigation: PropTypes.shape({
        replace: PropTypes.func.isRequired,
        addListener: PropTypes.func.isRequired
    }).isRequired
};

NewPatientScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Nowy Pacjent",
    };
}
