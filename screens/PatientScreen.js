import React from 'react';
import { StyleSheet, View, } from 'react-native';

import Patient from './../components/Patient';

export default function PatientScreen(props) {
    return (
        <View style={styles.container}>
            <Patient {...props} />
        </View>
    );
}

PatientScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Pacjent",
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

