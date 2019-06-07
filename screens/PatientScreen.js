import React from 'react';
import { StyleSheet, View, } from 'react-native';

import Patient from './../components/Patient';

export default function PatientScreen(props) {
    return (
        <View style={styles.container}>
            <Patient patientId={props.navigation.state.params.id} navigation={props.navigation} />
        </View>
    );
}

PatientScreen.navigationOptions = ({ navigation }) => {
    return {
        title: `Pacjent ${navigation.state.params.id}`,
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
