import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Card, Headline, Paragraph, Text, Divider, Subheading, Title, Avatar, IconButton, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import NumericInput from 'react-native-numeric-input';

class GradedTestQuestion extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    getActualIndex = () => {
        return this.props.questions.findIndex((question) => question.id === this.props.activeQuestion.id);
    }

    handleGoToPrevious = () => {
        const actualIndex = this.getActualIndex();
        this.props.setActiveQuestion(this.props.questions[actualIndex - 1]);
    }

    handleGoToNext = () => {
        const actualIndex = this.getActualIndex();
        this.props.setActiveQuestion(this.props.questions[actualIndex + 1]);
    }

    render() {
        return (
            <View style={styles.outerView}>
                <View style={styles.view}>
                <View style={styles.cardContentView}>
                    <IconButton icon="navigate-before" style={styles.navigateButton} disabled={this.getActualIndex() === 0} onPress={this.handleGoToPrevious} />
                    <Headline 
                    style={styles.title}>{'Pytanie ' + `${this.props.activeQuestion.id}`}
                    </Headline>
                    <IconButton icon="navigate-next" style={styles.navigateButton} disabled={this.getActualIndex() === this.props.questions.length - 1} onPress={this.handleGoToNext} />
                </View>
                <Text style={styles.label}>{this.props.activeQuestion.question}</Text>
                {this.props.activeQuestion.imagePath && (
                    <Image
                        style={{width: "70%", height: "40%", marginTop: 30}}
                        source={{uri: this.props.activeQuestion.imagePath}}
                        resizeMode='contain'
                    />
                )}
                </View>
                <View style={styles.inputView}>
                 <NumericInput 
                    value={this.props.grade}
                    onChange={newGrade => this.props.updateQuestionGrade(newGrade)} 
                    minValue={0}
                    maxValue={this.props.activeQuestion.maxPoints}
                    totalWidth={190} 
                    totalHeight={50} 
                    iconSize={25}
                    containerStyle={{borderRadius: 2}}
                    />
                </View>
            </View>
        );
    }
}

GradedTestQuestion.propTypes = {
    test: PropTypes.shape({
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
    }),
    updateQuestionGrade: PropTypes.func.isRequired,
    grade: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
    titleNav: {
        // paddingRight: 16,
    },
    value: {
        fontSize: 15,
    },
    outerView: {
        height: '100%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    view: {
        height: '85%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 25,
        marginTop:15,
        flexWrap: 'wrap'
    },
    label: {
        marginTop: 15,
        fontSize: 20,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    cardContentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    inputView: {
        height: '20%',
        width: '100%', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        height: '80%',
        width: '70%',
    }
});

export default GradedTestQuestion;
