import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, Card, Headline, Paragraph, Text, Divider, Subheading, Title, Avatar, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            answers: [],
            activeQuestion: null,
        }
    }

    setActiveQuestion = (questionId) => {
        this.setState({activeQuestion: this.props.test.questions.find(question => question.id === questionId)});
    }

    handleYesAnswer = () => {
        this.setState({
            answers: [...this.state.answers, {id: this.state.activeQuestion.id, answer: 'yes'}],
            activeQuestion: this.props.test.questions.find(question => question.id === String(parseInt(this.state.activeQuestion.id, 10) + 1))});
    }

    handleNoAnswer = () => {
        this.setState({
            answers: [...this.state.answers, {id: this.state.activeQuestion.id, answer: 'no'}],
            activeQuestion: this.props.test.questions.find(question => question.id === String(parseInt(this.state.activeQuestion.id, 10) + 1))});
    }


    render() {
        return (
            <View style={styles.view}>
                <Card style={{ flex: 1 }}>
                    <Card.Title title={this.props.test.title} titleStyle={styles.title} subtitle={this.props.test.name} subtitleStyle={styles.label}/>
                    <Card.Content style={{ flex: 1 }}>
                        {this.state.activeQuestion && (
                            <Card style={styles.examination}>
                            <Card.Title
                                style={styles.titleNav}
                                title={'Pytanie ' + `${this.state.activeQuestion.id}`}
                                titleStyle={styles.examinationName}
                                left={() => <IconButton icon="arrow-back" size={25} />}
                                right={() => <IconButton icon="arrow-forward" size={25} />}
                            />
                            <Card.Content style={{ flex: 1 }}>
                                <View style={styles.labelValue}>
                                    <Text style={styles.label}>{this.state.activeQuestion.question}</Text>
                                </View>
                            </Card.Content>
                            <Card.Actions>
                            <Button
                                mode="contained"
                                style={styles.yesButton}
                                onPress={() => this.handleYesAnswer()}
                                dark={true}
                                color="green"
                            >
                                Tak
                            </Button>
                            <Button
                                mode="contained"
                                style={styles.noButton}
                                onPress={() => this.handleNoAnswer()}
                                dark={true}
                                color="brown"
                           >
                                Nie
                            </Button>
                            </Card.Actions>
                        </Card>
                        )}

                    </Card.Content>
                    <Card.Actions>
                        {!this.state.activeQuestion && (
                            <Button
                                mode="contained"
                                style={styles.finishButton}
                                onPress={() => this.setActiveQuestion("1")}
                                dark={true}
                            >
                                Rozpocznij test
                            </Button>
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
    })
};

const styles = StyleSheet.create({
    cardActions: {
        justifyContent: 'center'
    },
    examination: {
        display: 'flex',
        flex: 1,
    },
    titleNav: {
        paddingRight: 16,
    },
    examinationName: {
        textAlign: 'center',
    },
    value: {
        fontSize: 15,
    },
    view: {
        height: '100%'
    },
    title: {
        fontSize: 22,
        marginTop:10
    },
    logo: {
        flex: 1,
        // display: 'flex',
        flexDirection: 'row',

        // justifyContent: 'center'
    },
    cardTitleStyle: {
        textAlign: 'center'
    },
    card: {
        flex: 1,
        marginTop: 40,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
        // position: 'absolute',
        // margin: 16,
        // right: 10,
        // bottom: 10,
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
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
    },
    label: {
        marginTop: 5,
        marginBottom: 15,
        fontSize: 18,
        flexWrap: 'wrap'
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

export default Test;
