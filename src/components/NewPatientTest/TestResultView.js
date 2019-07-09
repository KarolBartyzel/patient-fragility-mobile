import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Card, Headline, Paragraph, Text, Divider, Subheading, Title, Avatar, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class TestResultView extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.cardContentView}>
                    <Headline 
                    style={styles.title}>{'Uzyskany wynik'}
                    </Headline>
                </View>
                {this.props.maxScore && (
                    <Text style={styles.label}>{'Uzyskane punkty: ' + `${this.props.testScore}` + '/'+ `${this.props.maxScore}`}</Text> 
                )}
                <Text style={styles.label}>{'Diagnoza: '+ `${this.props.testDescription}`}</Text>
            </View>
        );
    }
}

TestResultView.propTypes = {
    testScore: PropTypes.number.isRequired,
    testDescription: PropTypes.string.isRequired,
    maxScore: PropTypes.number.isRequired
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
    cardContentView: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // width: '100%',
        // alignItems: 'center'
    }
});

export default TestResultView;
