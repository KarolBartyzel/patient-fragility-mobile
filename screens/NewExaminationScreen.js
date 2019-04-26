import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text } from 'react-native-paper';

import NewExamination from './../components/NewExamination';

class NewExaminationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: '',
            activeTest: null,
            testResults: [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.activeTest && (
                    <NewExamination.Test 
                        testId={this.state.activeTest} 
                        testResults={this.state.testResults[this.state.activeTest]} 
                        setTestResults={(newTestResults) => this.setState((prevState) => {
                            const { testResults } = prevState;
                            testResults[this.state.activeTest] = newTestResults;
                            this.setState({ testResults });
                        })} 
                    />
                )}
                {!this.state.activeTest && (
                    <>
                        <NewExamination.Patient
                            patientId={this.state.patientId}
                            setPatientId={(patientId) => this.setState({ patientId })}
                        />
                        <Text>Wybierz test</Text>
                        <NewExamination.Tests
                            activeTest={this.state.activeTest}
                            testResults={this.state.testResults}
                            setActiveTest={(activeTest) => this.setState({ activeTest })} 
                        />
                    </>
                )}
               
            </View>
        );
    }
}

NewExaminationScreen.navigationOptions = {
    title: 'Nowe badanie'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default NewExaminationScreen;
