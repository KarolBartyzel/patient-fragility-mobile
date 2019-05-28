import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, } from 'react-native-paper';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';

import NewExamination from './../components/NewExamination';
import ExaminationResults from './../components/ExaminationResults';

class NewExaminationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: '',
            activeTest: null,
            tests: [],

            examinationId: null,
            date: null
        };
    }
    
    componentDidMount() {
        fetch(`${REACT_APP_SERVER_URL}/tests`)
            .then(async (res) => {
                const tests = await res.json();
                this.setState({ tests: tests.map((test) => ({
                    filledQuestions: [],
                    ...test,
                })) });
            });
    }

    onBackToMenuPress = () => {
        this.props.navigation.push('Home');
    }

    onNewExaminationPress = () => {
        this.props.navigation.replace('NewExamination');
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.examinationId && !this.state.activeTest && (
                    <NewExamination.Choose
                        patientId={this.state.patientId}
                        setPatientId={(patientId) => this.setState({ patientId })}
                        tests={this.state.tests}
                        setActiveTest={(activeTest) => this.setState({ activeTest })}
                        finishTest={(examinationId, date) => this.setState({ examinationId, date })}
                    />
                )}
                {!this.state.examinationId && this.state.activeTest && (
                    <NewExamination.Test
                        test={this.state.tests.find(test => test.id === this.state.activeTest)}
                        // addTestResult={() => {}} TODO
                    />
                )}
                {this.state.examinationId && (
                    <>
                    <ExaminationResults
                        examinationsResults={this.state.tests.filter(test => test.filledQuestions.length === test.questions.length)}
                        examinationId={this.state.examinationId}
                        patientId={this.state.patientId}
                        date={this.state.date}
                    />
                    <View style={styles.summaryButtons}>
                        <Button
                            mode="contained"
                            onPress={this.onNewExaminationPress}
                            dark={true}
                            style={styles.summaryButton}
                        >
                            Nowe badanie
                        </Button>
                        <Button
                            mode="contained"
                            onPress={this.onBackToMenuPress}
                            dark={true}
                            style={styles.summaryButton}
                        >
                            Wróć do menu
                        </Button>
                    </View>
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
    summaryButtons: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    summaryButton: {
        margin: 5,
        padding: 3
    }
});

export default NewExaminationScreen;
