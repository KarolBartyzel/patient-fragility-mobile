import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator, Card, List, IconButton } from 'react-native-paper';
import moment from 'moment';

import db from './../../firebase';
import testsDefinitions from './../../../assets/tests';

class PatientTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: {
                ...testsDefinitions.find(td => td.id === this.props.testId),
            }
        };
    }

    async componentDidMount() {
        const patient = await db.patients.getPatient(this.props.patientId);
        const test = patient.tests.find((t) => t.testId === this.props.testId);

        this.setState({
            patient: {
                patientId: patient.patientId,
                age: patient.age
            },
            test: {
                ...testsDefinitions.find(td =>  td.id === this.props.testId),
                ...test,
                results: test.results.sort((ft1, ft2) => ft1.date < ft2.date ? 1 : -1)
            }
        });
    }

    render() {
        const { test } = this.state;

        return (
            <Card style={styles.patientTestCard}>
                <Card.Title
                    title={`${test.title} - wyniki`}
                    right={(props) => <IconButton {...props} icon="add" size={30} onPress={() => { this.props.navigate('NewPatientTest', { id: this.props.patientId, testId: this.props.testId }); }} /> }
                />

                {!this.state.patient && (
                    <View style={styles.patientTestProgress}>
                        <ActivityIndicator />
                    </View>
                )}
                {this.state.patient && (
                    <View style={styles.patientTestsWrapper}>
                        <FlatList
                            style={styles.patientsListContent}
                            keyExtractor={(testResult) => String(testResult.testId)}
                            data={test.results}
                            renderItem={({ item: testResult }) => (
                                <List.Item
                                    title={testResult.description}
                                    description={`${moment(testResult.date).format("Do MMM YYYY")} (${testResult.score} / ${test.maxScore})\n${testResult.author}`}
                                />
                            )}
                        />
                    </View>
                )}
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    patientTestProgress: {
        justifyContent: 'center'
    },
    patientTestCard: {
        flex: 1
    },
    patientTestsWrapper: {
        flex: 1
    }
});

export default PatientTest;
