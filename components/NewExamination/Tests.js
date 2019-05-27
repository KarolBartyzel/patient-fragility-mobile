import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import PropTypes from 'prop-types';

class Tests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tests: [],
        };
    }

    render() {
        return (
            <View>
                <Text>Tests</Text>
               
                <Card.Actions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button style={{margin: 'auto'}}  mode="contained" onPress={() => this.props.navigation.navigate('Examination', {testName: 'Some test', questionCategory: 'Health and fitness level'})}>Test 1</Button>
                </Card.Actions>
          </View>
        );
    }
}

Tests.propTypes = {
    activeTest: PropTypes.number,
    testResults: PropTypes.array.isRequired,
    setActiveTest: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
};

export default Tests;
