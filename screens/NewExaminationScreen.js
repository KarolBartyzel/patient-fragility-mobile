import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';

import NewExamination from './../components/NewExamination';

class NewExaminationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: '',
            activeTest: null,
            tests: [],
            testsResults: [],
        };
    }
    
    componentDidMount() {
        fetch(`${REACT_APP_SERVER_URL}/tests`)
            .then(async (res) => {
                const tests = await res.json();
                this.setState({ tests });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.activeTest && (
                    <NewExamination.Choose
                        patientId={this.state.patientId}
                        setPatientId={(patientId) => this.setState({ patientId })}
                        tests={this.state.tests}
                        testsResults={this.state.testsResults}
                        setActiveTest={(activeTest) => this.setState({ activeTest })}
                    />
                )}
                {this.state.activeTest && (
                    <NewExamination.Test
                        test={this.state.tests.find(test => test.id === this.state.activeTest)}
                        // addTestResult={() => {}} TODO
                    />
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
        paddingTop: 30,
    },
});

export default NewExaminationScreen;
