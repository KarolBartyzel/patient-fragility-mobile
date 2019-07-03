import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class GradedActions extends React.Component {
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
                style={styles.confirmButton}
                onPress={() => this.props.handleConfirm()}
                dark={true}
            >
                Zatwierdź
            </Button>
            </>
        );
    }
}

GradedActions.propTypes = {
    handleConfirm: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    confirmButton: {
        flex: 1,
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 5
    }
});

export default GradedActions;
