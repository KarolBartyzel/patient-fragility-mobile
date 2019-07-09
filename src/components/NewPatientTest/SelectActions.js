import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class SelectActions extends React.Component {
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
                onPress={() => this.props.handleSelect()}
                dark={true}
            >
                Wybierz
            </Button>
            </>
        );
    }
}

SelectActions.propTypes = {
    handleSelect: PropTypes.func.isRequired
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

export default SelectActions;
