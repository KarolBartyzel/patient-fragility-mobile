import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Test from './Test';
import testsDefinitions from './../../../assets/tests';

class NewPatientTest extends React.Component {
    constructor(props) {
        super(props);
        this.testDefinition = testsDefinitions.find(testDefinition => testDefinition.id === props.testId);
    }

    render() {
        return (
            <View>
                <Test test={this.testDefinition}/>
            </View>
        );
    }
}

NewPatientTest.propTypes = {
    testId: PropTypes.string.isRequired,
};

export default NewPatientTest;
