import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ActivityIndicator, List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import db from './../../firebase';
import testsDefinitions from './../../../assets/tests';

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onNavigateBack = this.props.addListener('willFocus', () => {
            this.setState({ lastTestResults: null }, this.loadTestResults);
        });
    }

    loadTestResults = async () => {
        const lastTestResults = await db.patients.getPatientLastResults(this.props.patientId);
        this.setState({
            lastTestResults
        });
    }

    componentDidMount() {
        this.loadTestResults();
    }

    componentWillUnmount() {
        this.onNavigateBack.remove();
    }

    render() {
        if (!this.state.lastTestResults) {
            return (
                <View style={styles.patientScreen}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.patientScreen}>
                <FlatList
                    keyExtractor={(testResult, index) => String(index)}
                    data={this.state.lastTestResults}
                    renderItem={({ item: testResult, index }) => {
                        const testDefinition = testsDefinitions[index];
                        return (
                            <List.Item
                                title={`${testDefinition.title} (${testResult ? testResult.count : 0})`}
                                description={testResult ? `${testResult.description}\n${moment(testResult.date).format("Do MMM YYYY")} (${testResult.score})`: 'Brak wyników'}
                                right={() => (
                                    <View style={styles.patientDetailsTestRight}>
                                        <IconButton icon={() => <MaterialCommunityIcons name="clipboard-text-outline" size={30} />} size={30} disabled={!testResult} onPress={() => { this.props.navigate('PatientTest', { patientId: this.props.patientId, testId: testDefinition.testId }); }} />
                                        <IconButton icon="add" size={30} onPress={() => { this.props.navigate('NewPatientTest', { patientId: this.props.patientId, testId: testDefinition.testId }); }} />
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
