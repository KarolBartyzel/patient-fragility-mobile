import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator, Card, List, IconButton } from 'react-native-paper';
import moment from 'moment';

import db from './../../firebase';
import testsDefinitions from './../../../assets/tests';

class PatientTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    async componentDidMount() {
        const testResults = await db.patients.getPatientTestResults(this.props.patientId, this.props.testId);

        this.setState({
            testResults
        });
    }

    render() {
        const testDefinition = testsDefinitions.find((testDefinition) => testDefinition.testId === this.props.testId);
        const { testResults } = this.state;

        return (
            <Card style={styles.patientTestCard}>
                <Card.Title
                    title={`${testDefinition.title} - wyniki`}
                    right={(props) => <IconButton {...props} icon="add" size={30} onPress={() => { this.props.navigate('NewPatientTest', { patientId: this.props.patientId, testId: this.props.testId }); }} /> }
                />

                {!testResults && (
                    <View style={styles.patientTestProgress}>
                        <ActivityIndicator />
                    </View>
                )}
                {!!testResults && (
                    <View style={styles.patientTestsWrapper}>
                        <FlatList
                            style={styles.patientsListContent}
                            keyExtractor={(testResult, index) => String(index)}
                            data={testResults}
                            renderItem={({ item: testResult }) => (
                                <List.Item
                                    title={testResult.description}
                                    description={`${moment(testResult.date).format("Do MMM YYYY")} (${testResult.score} / ${testDefinition
                                        .maxScore})\n${testResult.userName}`}
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
