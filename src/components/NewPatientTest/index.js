import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Test from './Test';
import testsDefinitions from './../../../assets/tests';

class NewPatientTest extends React.Component {
    constructor(props) {
        super(props);
        this.testDefinition = testsDefinitions.find(testDefinition => testDefinition.testId === props.testId);
    }

    render() {
        return (
            <View>
                <Test replace={this.props.replace} test={this.testDefinition} patientId={this.props.patientId}/>
            </View>
        );
    }
}

NewPatientTest.propTypes = {
    replace: PropTypes.func.isRequired,
    testId: PropTypes.string.isRequired,
    patientId: PropTypes.string.isRequired
};

export default NewPatientTest;
