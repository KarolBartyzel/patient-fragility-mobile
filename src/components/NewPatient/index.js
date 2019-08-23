import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';

import { TextInput, Text, HelperText, Button, Card, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import db from './../../firebase';

class NewPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: '',
            validationText: '',
            isSaving: false,
            userGroups: null,
            patientGroup: null,
            existingPatientsIds: {}
        };
        this.debouncedValidatePatientId = debounce(this.validatePatientId, 300);
        this.onNavigateBack = this.props.addListener('willFocus', this.reload);
    }

    validatePatientId() {
        return new Promise((resolve, reject) => {
            if (!this.state.patientId) {
                this.setState({ validationText: 'Id pacjenta jest wymagane' }, () => resolve(false));
            }
            else {
                const existingIdsForGroup = this.state.existingPatientsIds[this.state.patientGroup];
                const existingIdsForGroupCaseInsensitive = existingIdsForGroup ? existingIdsForGroup.map((group) => group.toLowerCase()) : [];
                if (existingIdsForGroupCaseInsensitive.includes(this.state.patientId.trim().toLowerCase())) {
                    this.setState({ validationText: 'Pacjent z podanym id już istnieje' }, () => resolve(false));
                }
                else {
                    this.setState({ validationText: '' }, () => resolve(true));
                }
            }
        });
    }

    onChangeId = (patientId) => {
        this.setState({ validationText: '', patientId: patientId }, this.debouncedValidatePatientId);
    }

    onGroupPickerChange = (patientGroup) => {
        this.setState({ patientGroup }, this.validatePatientId);
    }

    createPatient = () => {
        this.validatePatientId()
            .then((valid) => {
                const patientId = this.state.patientId.trim();
                if (valid) {
                    this.setState({ isSaving: true }, () => {
                        db.patients
                            .addPatient(patientId, this.state.patientGroup)
                            .then(() => {
                                this.props.replace('Patient', { patientId });
                            });
                    });
                }
            });
    }

    reload = async () => {
        const userGroups = (await db.patients.getUserGroups()).map(({ group }) => group);
        const patients = await db.patients.getPatients();
        if (patients) {
            const existingPatientsIds = patients.reduce((dict, patient) => {
                patient.groups.forEach((patientGroup) => {
                    if (dict[patientGroup]) {
                        dict[patientGroup].push(patient.id);
                    }
                    else {
                        dict[patientGroup] = [patient.id];
                    }
                });
                return dict;
            }, {});
            this.setState({ existingPatientsIds });
        }
        this.setState({ userGroups, patientGroup: userGroups[0] });
    }
    
    componentDidMount() {
        this.reload();
    }

    componentWillUnmount() {
        this.onNavigateBack.remove();
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
                    <Text style={styles.groupPickerLabel}>Wybierz grupę dostępu</Text>
                    {this.state.userGroups && (
                        <Picker
                            selectedValue={this.state.patientGroup}
                            onValueChange={this.onGroupPickerChange}
                        >
                            {this.state.userGroups.map((group) => {
                                return <Picker.Item key={group} label={group} value={group} />;
                            })}
                        </Picker>
                    )}
                    {!this.state.userGroups && (
                        <ActivityIndicator />
                    )}
                    <Button
                        mode="contained"
                        style={styles.newPatientButton}
                        contentStyle={styles.newPatientButtonText}
                        onPress={this.createPatient}
                        dark={true}
                        uppercase={false}
                        disabled={!this.state.userGroups || !!this.state.validationText}
                    >
                        Stwórz pacjenta
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

NewPatient.propTypes = {
    replace: PropTypes.func.isRequired,
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
