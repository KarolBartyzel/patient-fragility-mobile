import React from 'react';
import { Text, } from 'react-native-paper';
import PropTypes from 'prop-types';

class Test extends React.Component {
    render() {
        return (
            <Text>Test nr {this.props.testId}</Text>
        );
    }
}

Test.propTypes = {
    testId: PropTypes.number.isRequired,
    testResults: PropTypes.array.isRequired,
    setTestResults: PropTypes.func.isRequired,
};

export default Test;
