import React from 'react';
import PropTypes from 'prop-types';

import NewPatientTest from './../components/NewPatientTest';

export default function NewPatientTestScreen(props) {
    return (
        <NewPatientTest replace={props.navigation.replace} patientId={props.navigation.state.params.patientId} testId={props.navigation.state.params.testId} />
    );
}

NewPatientTestScreen.propTypes = {
    navigation: PropTypes.shape({
        replace: PropTypes.func.isRequired,
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
