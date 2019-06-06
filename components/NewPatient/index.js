import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, HelperText, Button, Card, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { patients } from './../../firebase';

class NewPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: '',
            validationText: '',
            age: '',
            isSaving: false,
        };
        this.debouncedValidatePatientId = debounce(this.validatePatientId, 300);
    }

    validatePatientId(patientId) {
        return new Promise(async (resolve, reject) => {
            if (!patientId) {
                this.setState({ validationText: 'Id pacjenta jest wymagane' }, () => resolve(false));
                ;
            }
            else {
                if (await patients.checkIfPatientExists(patientId)) {
                    this.setState({ validationText: 'Pacjent z podanym id już istnieje' }, () => resolve(false));
                }
                else {
                    resolve(true);
                }
            }
        });
    }

    onChangeId = (patientId) => {
        this.setState({ validationText: '', patientId: patientId.trim().toLowerCase() });
        this.debouncedValidatePatientId(patientId);
    }

    onChangeAge = (age) => {
        const ageNumber = Number(age);
        this.setState({ age: ageNumber === 0 ? '' : String(ageNumber > 120 ? Math.floor(ageNumber / 10) : ageNumber) });
    }

    createPatient = () => {
        this.debouncedValidatePatientId(this.state.patientId)
            .then((valid) => {
                if (valid) {
                    this.setState({ isSaving: true }, () => {
                        patients.addPatient({
                            patientId: this.state.patientId,
                            age: this.state.age,
                        })
                        .then((newPatient) => {
                            this.props.navigation.replace('Patient', { id: newPatient.patientId });
                        });
                    });
                }
            });
    }

    render() {
        if (this.state.isSaving) {
            return (
                <View style={styles.newPatient}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <Card style={styles.newPatient}>
                <Card.Content style={styles.newPatientContent}>
                    <TextInput
                        label='Id Pacjenta'
                        value={this.state.patientId}
                        error={!!this.state.validationText}
                        onChangeText={this.onChangeId}
                        style={styles.newPatientIdInput}
                    />
                    <HelperText type="error" visible={!!this.state.validationText}>{this.state.validationText}</HelperText>
                    <TextInput
                        label='Wiek pacjenta (opcjonalny)'
                        keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                        value={this.state.age}
                        onChangeText={this.onChangeAge}
                        style={styles.newPatientAgeInput}
                    />
                    <Button
                        mode="contained"
                        style={styles.newPatientButton}
                        contentStyle={styles.newPatientButtonText}
                        onPress={this.createPatient}
                        dark={true}
                        uppercase={false}
                    >
                        Stwórz pacjenta
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

NewPatient.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    newPatient: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    newPatientContent: {

    },
    newPatientIdInput: {
    },
    newPatientButton: {
        marginTop: 15
    },
    newPatientButtonText: {
        paddingTop: 5,
        paddingBottom: 5,
    }
});

export default NewPatient;
