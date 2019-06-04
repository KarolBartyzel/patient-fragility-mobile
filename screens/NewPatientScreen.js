import React from 'react';
import { StyleSheet, View, } from 'react-native';

import NewPatient from './../components/NewPatient';

export default function NewPatientScreen(props) {
    return (
        <View style={styles.container}>
            <NewPatient {...props} />
        </View>
    );
}

NewPatientScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Nowy Pacjent",
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

