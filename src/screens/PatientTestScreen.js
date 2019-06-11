import React from 'react';
import PropTypes from 'prop-types';

import PatientTest from './../components/PatientTest';

export default function PatientTestScreen(props) {
    return (
        <PatientTest navigate={props.navigation.navigate} patientId={props.navigation.state.params.patientId} testId={props.navigation.state.params.testId} />
    );
}

PatientTestScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                patientId: PropTypes.string.isRequired,
                testId: PropTypes.string.isRequired,
            })
        })
    }).isRequired
};

PatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.patientId}`,
    };
}
