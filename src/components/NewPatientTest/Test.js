import React from 'react';
import { View, StyleSheet, Picker, Platform } from 'react-native';
import { Button, Card, Headline, Paragraph, Text, Divider, Subheading, Title, Avatar, IconButton, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import TestQuestion from './TestQuestion';
import YesNoActions from './YesNoActions';
import YesSometimesNoActions from './YesSometimesNoActions';
import db from './../../firebase';
import GradedActions from './GradedActions';
import { calculateTestResult } from './functions';
import TestResultView from './TestResultView';
import NumericInput from 'react-native-numeric-input';

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
            scoreDescription: null,
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
            .addPatientTest(this.props.test.testId, this.props.patientId, this.state.userGroup, this.state.testScore, this.state.scoreDescription)
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

    handleYesAnswer = () => {
        this.addAnswer('yes');
    }

    handleSometimesAnswer = () => {
        this.addAnswer('sometimes');
    }

    handleNoAnswer = () => {
        this.addAnswer('no');
    }

    handleConfirm = () => {
        this.addAnswer(this.state.gradeForQuestion);
    }

    checkAnswers = () => {
        console.log("CHECK ANS")
        if (Object.keys(this.state.answers).length === this.props.test.questions.length) {
            const { score, description } = calculateTestResult(this.props.test.testId, Object.values(this.state.answers), this.props.test.testId === '3' ? { age: this.state.age, educationDuration: this.state.educationDuration } : null);
            this.setState({
                testCompleted: true,
                testScore: score,
                scoreDescription: description
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
                    <Card.Title title={this.props.test.title} titleStyle={styles.title} subtitle={this.props.test.name} subtitleStyle={styles.label}/>
                    <Card.Content style={styles.cardContent}>
                        {!this.state.activeQuestion && this.state.userGroups && !this.state.testCompleted && (
                            <View style={styles.groupPickerWrapper}>
                                <Text style={styles.groupPickerLabel}>Wybierz grupę dostępu</Text>
                                <Picker
                                    selectedValue={this.state.userGroup}
                                    style={styles.groupPicker}
                                    onValueChange={(userGroup) => this.setState({ userGroup })}
                                >
                                    {this.state.userGroups.map((userGroup) => (
                                        <Picker.Item key={userGroup} label={userGroup} value={userGroup} />
                                    ))}
                                </Picker>
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
                            </View>
                        )}
                        {this.state.activeQuestion && (
                            <View style={styles.outerView}>
                                <TestQuestion
                                    questions={this.props.test.questions}
                                    activeQuestion={this.state.activeQuestion}
                                    setActiveQuestion={(activeQuestion) => this.setState({ activeQuestion })}
                                />
                                {this.state.activeQuestion && this.state.activeQuestion.questionType === "qraded" && (
                                    <View style={styles.inputView}>    
                                        <TextInput
                                            label={'Punkty za odpowiedź (0 - ' + `${this.state.activeQuestion.maxPoints}` + ')'}
                                            keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                                            value={this.state.gradeForQuestion.toString()}
                                            onChangeText={newGrade => this.updateQuestionGrade(newGrade)}
                                            style={styles.numberInput}
                                            returnKeyType='done'
                                        />
                                    </View>
                                )}
                            </View>
                        )}
                         {!this.state.activeQuestion && this.state.testCompleted && (
                            <TestResultView
                                testScore={this.state.testScore}
                                maxScore={this.props.test.maxScore}
                                testDescription={this.state.scoreDescription}
                            />
                         )}
                    </Card.Content>
                    <Card.Actions>
                        {!this.state.activeQuestion && !this.state.testCompleted && (
                            <Button
                                mode="contained"
                                disabled={this.props.test.testId === '3' && (!this.state.age || !this.state.educationDuration)}
                                style={styles.finishButton}
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
                                style={styles.yesButton}
                                onPress={() => this.discardResult()}
                                dark={true}
                            >
                                Odrzuć wynik
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.noButton}
                                onPress={() => this.saveResult()}
                                dark={true}
                            >
                                Zapisz wynik
                            </Button>
                        </>
                        )}
                        {this.state.activeQuestion && this.state.activeQuestion.questionType === "yes-no" && (
                            <YesNoActions
                            handleYesAnswer={this.handleYesAnswer}
                            handleNoAnswer={this.handleNoAnswer}
                            />
                        )}
                        {this.state.activeQuestion && this.state.activeQuestion.questionType === "yes-sometimes-no" && (
                            <YesSometimesNoActions
                            handleYesAnswer={this.handleYesAnswer}
                            handleSometimesAnswer={this.handleSometimesAnswer}
                            handleNoAnswer={this.handleNoAnswer}
                            />
                        )}
                        {this.state.activeQuestion && this.state.activeQuestion.questionType === "qraded" && (
                            <GradedActions
                            handleConfirm={this.handleConfirm}
                            />
                        )}
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
    titleNav: {
        paddingRight: 16,
    },
    title: {
        fontSize: 22,
        marginTop:10
    },
    cardContent: {
        flex: 1,
        alignItems: "center"
    },
    yesButton: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        marginRight:3,
    },
    noButton: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        marginLeft: 3,
    },
    finishButton: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
    },
    label: {
        marginTop: 5,
        marginBottom: 15,
        fontSize: 17,
        flexWrap: 'wrap'
    },
    navigateButton: {
        width: '5%',
        margin: 0,
        padding: 0
    },
    groupPicker: {
        height: 200,
        width: '80%',
        // fontSize: 16
    },
    groupPickerLabel: {
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
        height: '100%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputView: {
        height: '20%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Test;
