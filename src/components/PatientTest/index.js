import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';


class PatientTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.state.patient) {
            return (
                <View style={styles.patientTestScreen}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.patientTestScreen}>
                <Text>PatientTest</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    patientTestScreen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
});

export default PatientTest;
