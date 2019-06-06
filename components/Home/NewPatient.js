import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, } from 'react-native-paper';
import PropTypes from 'prop-types';

function NewPatient(props) {
    function onPress() {
        return props.navigation.navigate('NewPatient');
    }

    return (
        <View style={styles.newPatient}>
            <Button contentStyle={styles.newPatientButtonContent} icon="create" mode="contained" onPress={onPress}>
                Nowy Pacjent
            </Button>
            <Button contentStyle={styles.newExaminationButtonContent} icon="create" mode="contained" onPress={() => props.navigation.navigate("NewExamination")}>
                    Wykonaj badanie
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    newPatient: {
        marginBottom: -10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    newPatientButtonContent: {
        paddingTop: 5,
        paddingBottom: 5
    },
    newExaminationButtonContent: {
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 3
    }
});

NewPatient.propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

export default NewPatient;