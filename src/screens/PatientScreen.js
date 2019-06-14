import React from 'react';
import PropTypes from 'prop-types';

import Patient from './../components/Patient';

export default function PatientScreen(props) {
    return (
        <Patient navigate={props.navigation.navigate} patientId={props.navigation.state.params.patientId} />
    );
}

PatientScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        state: PropTypes.shape({
            params: PropTypes.shape({
                patientId: PropTypes.string.isRequired
            })
        })
    }).isRequired
};

PatientScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.patientId}`,
    };
}
