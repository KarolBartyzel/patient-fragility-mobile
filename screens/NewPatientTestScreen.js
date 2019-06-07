import React from 'react';
import { View } from 'react-native';

import NewPatientTest from './../components/NewPatientTest';

export default function NewPatientTestScreen(props) {
    return (
        <View>
            <NewPatientTest patientId={props.navigation.state.params.id} testId={props.navigation.state.params.testId} navigation={props.navigation} />
        </View>
    );
}

NewPatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.id}`,
    };
}
