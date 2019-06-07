import React from 'react';
import { View, Text } from 'react-native';

export default function NewPatientTestScreen(props) {
    return (
        <View>
            <Text>NewPatientTestScreen</Text>
        </View>
    );
}

NewPatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.id}`,
    };
}
