import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Headline, Text, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

function TestQuestion(props) {
    return (
        <View style={[ styles.view, props.activeQuestion.questionType === 'graded' ? styles.viewHeightShort : styles.viewHeightTall ]}>
            <View style={styles.cardContentView}>
                <IconButton
                    icon="navigate-before"
                    style={styles.navigateButton}
                    disabled={props.getActualIndex() === 0}
                    onPress={props.handleGoToPrevious}
                />
                <Headline
                    style={styles.title}
                >
                    {`Pytanie ${props.activeQuestion.id}`}
                </Headline>
                <IconButton
                    icon="navigate-next"
                    style={styles.navigateButton}
                    disabled={props.getActualIndex() === props.questions.length - 1}
                    onPress={props.handleGoToNext}
                />
            </View>
            <Text
                style={[ styles.label,  ]}
                adjustsFontSizeToFit={true}
            >
                {props.activeQuestion.question}
            </Text>
            {props.activeQuestion.imagePath && (
                <Image
                    style={{ width: "70%", height: "45%", marginTop: 5 }}
                    source={{ uri: props.activeQuestion.imagePath }}
                    resizeMode='contain'
                />
            )}
        </View>
    );
}

TestQuestion.propTypes = {
    test: PropTypes.shape({
        title: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        questions: PropTypes.array.isRequired,
    })
};

const styles = StyleSheet.create({
    value: {
        fontSize: 15,
    },
    view: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    viewHeightShort: {
        height: '60%',
    },
    viewHeightTall: {
        height: '60%',
    },
    title: {
        fontSize: 25,
        marginTop:15,
        flexWrap: 'wrap'
    },
    label: {
        marginTop: 15,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    labelSmallFont: {
        fontSize: 17
    },
    labelBigFont: {
        fontSize: 20
    },
    cardContentView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    }
});

export default TestQuestion;
