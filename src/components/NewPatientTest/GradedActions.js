import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class GradedActions extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <> 
            {Array.from(Array(this.props.maxPoints + 1).keys()).map(Number.call, Number).map((grade) => (
                <Button
                    mode="contained"
                    style={styles.pointsButton}
                    onPress={() => this.props.handleGrade(grade)}
                    dark={true}
                    compact='true'
                >
                  {grade}
                </Button>
            ))}
            </>
        );
    }
}

GradedActions.propTypes = {
    handleGrade: PropTypes.func.isRequired,
    maxPoints: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
    pointsButton: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        marginLeft:3,
        marginRight:3,
    }
});

export default GradedActions;
