import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator, List, IconButton, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import moment from 'moment';

import db from './../../firebase';
import testsDefinitions from './../../../assets/tests';

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const patient = await db.patients.getPatient(this.props.patientId);

        const tests = patient.tests.map((test) => ({
            ...testsDefinitions.find(td => td.id === test.testId),
            results: test.results.sort((ft1, ft2) => ft1.date < ft2.date ? 1 : -1)
        }));

        this.setState({
            patient: {
                ...patient,
                tests
            }
        });
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
                    renderItem={({ item: test }) => {
                        const lastResult = test.results[0];
                        return (
                            <List.Item
                                title={test.title}
                                description={lastResult ? `${lastResult.description}\n${moment(lastResult.date).format("Do MMM YYYY")} (${lastResult.score} / ${test.maxScore})`: 'Brak wyników'}
                                right={() => (
                                    <View style={styles.patientDetailsTestRight}>
                                        <IconButton icon="info" size={30} disabled={!lastResult} onPress={() => { this.props.navigate('PatientTest', { patientId: this.props.patientId, testId: test.id }); }} />
                                        <IconButton icon="add" size={30} onPress={() => { this.props.navigate('NewPatientTest', { id: this.props.patientId, testId: test.id }); }} />
                                    </View>
                                )}
                            />
                        );
                    }}
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
    patientDetailsTestRight: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});

export default Patient;
