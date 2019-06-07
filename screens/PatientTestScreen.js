import React from 'react';
import { View, Text } from 'react-native';

export default function PatientTestScreen(props) {
    return (
        <View>
            <Text>PatientTestScreen</Text>
        </View>
    );
}

PatientTestScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.id}`,
    };
}
