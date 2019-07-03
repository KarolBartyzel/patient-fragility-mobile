import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, Card, Headline, Paragraph, Text, Divider, Subheading, Title, Avatar, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class YesSometimesNoActions extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            // answers: [],
            // activeQuestion: null,
        }
    }

    render() {
        return (
            <>
                <Button
                    mode="contained"
                    style={styles.yesButton}
                    onPress={() => this.props.handleYesAnswer()}
                    dark={true}
                    color="green"
                >
                    Tak
                </Button>
                <Button
                    mode="contained"
                    style={styles.sometimesButton}
                    onPress={() => this.props.handleSometimesAnswer()}
                    dark={true}
                    color="silver"
                >
                    Czasami
                </Button>
                <Button
                    mode="contained"
                    style={styles.noButton}
                    onPress={() => this.props.handleNoAnswer()}
                    dark={true}
                    color="brown"
                >
                    Nie
                </Button>
                </>
        );
    }
}

YesSometimesNoActions.propTypes = {
    handleYesAnswer: PropTypes.func.isRequired,
    handleSometimesAnswer: PropTypes.func.isRequired,
    handleNoAnswer: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    yesButton: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        marginRight:3,
    },
    sometimesButton: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        marginLeft:3,
        marginRight:3,
    },
    noButton: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        marginLeft: 3,
    }
});

export default YesSometimesNoActions;
