import React from 'react';
import { View, StyleSheet, Picker, Platform } from 'react-native';
import { Button, Card, Text, TextInput, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

import db from './../../firebase';
import testsDefinitions from './../../../assets/tests';

import Actions from './Actions';

import TestQuestion from './TestQuestion';
import TestResultView from './TestResultView';

class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            userGroups: null,
            userGroup: null,
            answers: {},
            activeQuestion: null,
            testCompleted: false,
            gradeForQuestion: 0,
            testScore: 0,
            testDescription: null,
            maxScore: 0,
            age: '',
            educationDuration: ''
        }
    }

    setActiveQuestion = (questionId) => {
        this.setState({activeQuestion: this.props.test.questions.find(question => question.id === questionId)});
    }

    discardResult = () => {
        this.props.replace('PatientTest', { patientId: this.props.patientId, testId: this.props.test.testId });
    }

    saveResult = () => {
        db.patients
            .addPatientTest(this.props.test.testId, this.props.patientId, this.state.userGroup, this.state.testScore, this.state.testDescription)
            .then(() => {
                this.props.replace('PatientTest', { patientId: this.props.patientId, testId: this.props.test.testId });
            });
    }

    addAnswer = (answer) => {
        const { id } = this.state.activeQuestion;
        const newAnswers = {
            ...this.state.answers,
            [id]: {
                id,
                answer
            }
        }

        if (!Object.keys(newAnswers).includes(String(parseInt(this.state.activeQuestion.id, 10) + 1))) {
            this.setState({
                answers: newAnswers,
                activeQuestion: this.props.test.questions.find(question => question.id === String(parseInt(this.state.activeQuestion.id, 10) + 1)),
            }, () => this.checkAnswers());
        } else {
            this.setState({
                answers: newAnswers,
                activeQuestion: null
            }, () => this.checkAnswers());
        }
    }

    handleConfirm = () => {
        this.addAnswer(this.state.gradeForQuestion);
    }

    checkAnswers = () => {
        if (Object.keys(this.state.answers).length === this.props.test.questions.length || this.props.test.questions['1'].questionType === 'select') {
            const { findScore, findDescription, maxScore } = testsDefinitions.find(({ testId }) => testId === this.props.test.testId);
            const score = findScore(Object.values(this.state.answers), this.props.test.testId === '3' ? { age: this.state.age, educationDuration: this.state.educationDuration } : null);
            const description = findDescription(Object.values(this.state.answers), score);
            const maximumScore = maxScore(this.state.educationDuration, this.state.age);
            this.setState({
                testCompleted: true,
                testScore: score,
                testDescription: description,
                maxScore: maximumScore,
                activeQuestion: null
            });
        } else if (!this.state.activeQuestion) {
            this.activateNextSkippedQuestion();
        }
        this.updateQuestionGrade('0');
    }

    activateNextSkippedQuestion = () => {
        const skippedQuestionsIds = this.props.test.questions.map((question) => question.id).filter((questionId) => !Object.keys(this.state.answers).includes(questionId)).sort();
        this.setState({activeQuestion: this.props.test.questions.find(question => question.id === skippedQuestionsIds[0])});
    }

    updateQuestionGrade = (newGrade) => {
        const newGradeNumber = Number(newGrade);
        if (this.state.activeQuestion) {
            this.setState((prevState) => ({
                gradeForQuestion: newGradeNumber >= 0 && newGradeNumber <= this.state.activeQuestion.maxPoints ? newGradeNumber : prevState.gradeForQuestion
            }))
        } else {
            this.setState((prevState) => ({
                gradeForQuestion: newGradeNumber
            }))
        }
    }

    onChangeAge = (age) => {
        const ageNumber = Number(age);
        this.setState({ age: ageNumber === 0 ? '' : String(ageNumber > 120 ? Math.floor(ageNumber / 10) : ageNumber) });
        this.setState((prevState) => ({ age: ageNumber === 0 ? '' : String(ageNumber > 120 ? prevState.age : ageNumber) }));
    }

    onChangeEducationDuration = (educationDuration) => {
        const educationDurationNumber = Number(educationDuration);
        this.setState((prevState) => ({ educationDuration: educationDurationNumber === 0 ? '' : String(educationDurationNumber > 20 ? prevState.educationDuration : educationDurationNumber) }));
    }

    async componentDidMount() {
        const userGroups = await db.patients.getUserGroups();
        this.setState({ userGroups, userGroup: userGroups[0] });
    }

    render() {
        return (
            <View style={styles.view}>
                <Card style={{ flex: 1 }}>
                    <Card.Content style={styles.cardContent}>
                        <View style ={styles.titleView}>
                            <Title style={styles.title}>
                                {this.props.test.title}
                            </Title>
                        </View>
                        {!this.state.activeQuestion && this.state.userGroups && !this.state.testCompleted && (
                            <View style={styles.groupPickerWrapper}>
                                {this.props.test.testId === '3' && (
                                    <>
                                    <TextInput
                                        label='Wiek pacjenta'
                                        keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                                        value={this.state.age}
                                        onChangeText={this.onChangeAge}
                                        style={styles.numberInput}
                                        returnKeyType='done'
                                    />
                                    <TextInput
                                        label='Długość edukacji (lata)'
                                        keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                                        value={this.state.educationDuration}
                                        onChangeText={this.onChangeEducationDuration}
                                        style={styles.numberInput}
                                        returnKeyType='done'
                                    />
                                    </>
                                )}
                                <Text style={styles.groupPickerLabel}>Wybierz grupę dostępu</Text>
                                <Picker
                                    selectedValue={this.state.userGroup}
                                    style={styles.groupPicker}
                                    onValueChange={(userGroup) => this.setState({ userGroup })}
                                >
                                    {this.state.userGroups.map((userGroup) => {
                                        const label = `${userGroup.subgroup} (${userGroup.group})`;
                                        return <Picker.Item key={label} label={label} value={userGroup} />;
                                    })}
                                </Picker>
                                {this.props.test.testId === '2' && (
                                    <Text style={{fontSize: 17, textAlign: 'center'}}>Aby wypełnić test, wybierz jeden, najbardziej pasujący opis pacjenta</Text>
                                )}
                            </View>
                        )}
                        {this.state.activeQuestion && (
                            <View style={styles.outerView}>
                                <TestQuestion
                                    questions={this.props.test.questions}
                                    activeQuestion={this.state.activeQuestion}
                                    setActiveQuestion={(activeQuestion) => { this.setState({ activeQuestion }); this.updateQuestionGrade('0'); }}
                                />
                                {this.state.activeQuestion.questionType === "graded" && (
                                    <View style={styles.inputView}>
                                        <Text style={{fontSize: 17, textAlign: 'center'}}>
                                            Przyznaj punkty za odpowiedź:
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                         {!this.state.activeQuestion && this.state.testCompleted && (
                            <TestResultView
                                testScore={this.state.testScore}
                                maxScore={this.state.maxScore}
                                testDescription={this.state.testDescription}
                            />
                         )}
                    </Card.Content>
                    <Card.Actions>
                        {!this.state.activeQuestion && !this.state.testCompleted && (
                            <Button
                                mode="contained"
                                disabled={this.props.test.testId === '3' && (!this.state.age || !this.state.educationDuration)}
                                style={styles.button}
                                contentStyle={styles.buttonContent}
                                onPress={() => this.setActiveQuestion("1")}
                                dark={true}
                            >
                                Wykonaj test
                            </Button>
                        )}
                        {!this.state.activeQuestion && this.state.testCompleted && (
                        <>
                            <Button
                                mode="contained"
                                style={styles.button}
                                contentStyle={styles.buttonContent}
                                onPress={() => this.discardResult()}
                                dark={true}
                            >
                                Odrzuć wynik
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.button}
                                contentStyle={styles.buttonContent}
                                onPress={() => this.saveResult()}
                                dark={true}
                            >
                                Zapisz wynik
                            </Button>
                        </>
                        )}
                        <Actions
                            activeQuestion={this.state.activeQuestion}
                            addAnswer={this.addAnswer}
                        />
                    </Card.Actions>
                </Card>
            </View>
        );
    }
}

Test.propTypes = {
    test: PropTypes.shape({
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
    }),
    patientId: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    view: {
        height: '100%'
    },
    titleView: {
        width: '100%',
        alignItems: 'flex-start'
    },
    title: {
        marginBottom: 15,
        flexWrap: 'wrap',
        fontSize: 22
    },
    cardContent: {
        flex: 1,
        alignItems: "center"
    },
    button: {
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
    },
    buttonContent: {
        padding: 5
    },
    navigateButton: {
        width: '5%',
        margin: 0,
        padding: 0
    },
    groupPicker: {
        height: 200,
        width: '80%'
    },
    groupPickerLabel: {
        marginTop: 10,
        fontSize: 20,
    },
    groupPickerWrapper: {
        marginTop: 20,
        width: '100%',
        height: 400,
        textAlign: 'left',
        alignItems: 'center'
    },
    numberInput: {
        width: '80%',
        marginTop: 10
    },
    outerView: {
        height: '85%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputView: {
        height: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Test;
