import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, TextInput, Card, ActivityIndicator } from 'react-native-paper';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';
import PropTypes from 'prop-types';

class Choose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false,
        };
    }

    onPress = (testId) => {
        this.props.setActiveTest(testId);
    }

    onFinish = () => {
        const date = Date.now();
        const data = JSON.stringify({
            patientId: this.props.patientId,
            date,
            examinationsResults: this.props.tests.filter(test => test.filledQuestions.length === test.questions.length).map((test) => {
                return {
                    title: test.name,
                    score: test.score,
                    maxScore: test.maxScore,
                    description: test.description,
                };
            })
        });
        fetch(`${REACT_APP_SERVER_URL}/examination`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json', },
            body: data
        })
        .then(async (response) => {
            const newExamination = (await response.json());
            this.props.finishTest(newExamination._id, newExamination.date);
        });
    }

    render() {
        return (
            <View style={styles.choose}>
                <TextInput
                    label='Id Pacjenta'
                    value={this.props.patientId}
                    error={this.state.touched && !this.props.patientId}
                    onChangeText={(patientId) => this.props.setPatientId(patientId)}
                    onBlur={() => this.setState({ touched: true })}
                    style={styles.input}
                />
                <Card style={{ flex: 1 }}>
                    <Card.Title title="Dostępne testy" />
                    <Card.Content style={{ flex: 1 }}>
                        {this.props.tests.length === 0 && (
                            <ActivityIndicator animating={true} />
                        )}
                        {this.props.tests.map((test) => (
                            <Button
                                key={test.id}
                                mode="contained"
                                style={styles.listEntry}
                                contentStyle={styles.listEntryText}
                                onPress={() => this.onPress(test.id)}
                                dark={true}
                                color={test.filledQuestions.length === test.questions.length ? 'green' : test.filledQuestions.length > 0 ? 'orange' : 'brown'}
                                uppercase={false}
                            >
                                {test.title} {test.filledQuestions.length} / {test.questions.length}
                            </Button>
                        ))}
                    </Card.Content>
                    <Card.Actions>
                        <Button
                            mode="contained"
                            style={styles.finishButton}
                            onPress={this.onFinish}
                            dark={true}
                            disabled={this.props.tests.filter(test => test.filledQuestions.length === test.questions.length) === 0 || !this.props.patientId}
                        >
                            Zakończ badanie
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    choose: {
        height: '100%'
    },
    input: {
        margin: 10,
        marginTop: 10,
    },
    listContent: {
        flex: 1,
    },
    listEntry: {
        margin: 5,
    },
    listEntryText: {
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'flex-start'
    },
    finishButton: {
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
    }
});

Choose.propTypes = {
    patientId: PropTypes.string.isRequired,
    setPatientId: PropTypes.func.isRequired,
    setActiveTest: PropTypes.func.isRequired,
};

export default Choose;
