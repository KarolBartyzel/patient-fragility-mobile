import React from 'react';
import PropTypes from 'prop-types';

import PatientTest from './../components/PatientTest';

export default function PatientTestScreen(props) {
    return (
        <PatientTest patientId={props.navigation.state.params.id} />
    );
}

PatientTestScreen.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string.isRequired
            })
        })
    }).isRequired
};

PatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.id}`,
    };
}
