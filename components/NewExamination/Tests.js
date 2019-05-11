import React from 'react';
import { Text } from 'react-native-paper';
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
            <Text>Tests</Text>
        );
    }
}

Tests.propTypes = {
    activeTest: PropTypes.number,
    testResults: PropTypes.array.isRequired,
    setActiveTest: PropTypes.func.isRequired,
};

export default Tests;
