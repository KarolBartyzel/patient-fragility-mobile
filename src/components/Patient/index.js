import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator, List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

import { patients } from './../../firebase';
import testsDefinitions from './../../../assets/tests';

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const patient = await patients.getPatient(this.props.patientId);
        const { tests: filledPatientTests } = patient;
        patient.tests = testsDefinitions.map(testDefinition => {
            return {
                ...filledPatientTests.filter(filledTest => String(filledTest.testId) === testDefinition.id).sort((ft1, ft2) => ft1.date < ft2.date ? 1 : -1)[0],
                ...testDefinition
            };
        })
        this.setState({ patient });
    }

    render() {
        if (!this.state.patient) {
            return (
                <View style={styles.patientScreen}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.patientScreen}>
                <FlatList
                    keyExtractor={(test) => String(test.id)}
                    data={this.state.patient.tests}
                    renderItem={({ item: test }) => (
                        <List.Item
                            title={test.title}
                            description={test.score ? `${test.description} (${test.score} / ${test.maxScore})`: 'Brak'}
                            right={() => (
                                <View style={styles.patientDetailsTestButtons}>
                                    <IconButton icon="info" size={25} onPress={() => { this.props.navigate('PatientTest', { id: this.props.patientId, testId: test.id }); }} />
                                    <IconButton icon="add" size={25} onPress={() => { this.props.navigate('NewPatientTest', { id: this.props.patientId, testId: test.id }); }} />
                                </View>
                            )}
                        />
                    )}
                />
            </View>
        );
    }
}

Patient.propTypes = {
    navigate: PropTypes.func.isRequired,
    patientId: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    patientScreen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    patientDetailsTestButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Patient;
