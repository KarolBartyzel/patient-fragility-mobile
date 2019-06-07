import React from 'react';
import PropTypes from 'prop-types';

import NewPatientTest from './../components/NewPatientTest';

export default function NewPatientTestScreen(props) {
    return (
        <NewPatientTest patientId={props.navigation.state.params.id} testId={props.navigation.state.params.testId} />
    );
}

NewPatientTestScreen.propTypes = {
    navigation: PropTypes.shape({
        state: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.string.isRequired,
                testId: PropTypes.string.isRequired
            })
        })
    }).isRequired
};

NewPatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.id}`,
    };
}
