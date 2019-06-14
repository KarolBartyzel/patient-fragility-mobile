import React from 'react';
import PropTypes from 'prop-types';

import NewPatientTest from './../components/NewPatientTest';

export default function NewPatientTestScreen(props) {
    return (
        <NewPatientTest patientId={props.navigation.state.params.patientId} testId={props.navigation.state.params.testId} />
    );
}

NewPatientTestScreen.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                patientId: PropTypes.string.isRequired,
                testId: PropTypes.string.isRequired
            })
        })
    }).isRequired
};

NewPatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.patientId}`,
    };
}
