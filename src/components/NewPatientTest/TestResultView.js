import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline, Text } from 'react-native-paper';
import PropTypes from 'prop-types';

function TestResultView(props) {
    return (
        <View style={styles.view}>
            <View>
                <Headline
                    style={styles.title}
                >
                    Uzyskany wynik
                </Headline>
            </View>
            {props.maxScore && (
                <Text style={styles.label}>{`Uzyskane punkty: ${props.testScore}/${props.maxScore}`}</Text>
            )}
            <Text style={styles.label}>{`Diagnoza: ${props.testDescription}`}</Text>
        </View>
    );
}

TestResultView.propTypes = {
    testScore: PropTypes.number.isRequired,
    testDescription: PropTypes.string.isRequired,
    maxScore: PropTypes.number
};

const styles = StyleSheet.create({
    titleNav: {
        // paddingRight: 16,
    },
    value: {
        fontSize: 15,
    },
    view: {
        height: '100%',
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
});

export default TestResultView;
