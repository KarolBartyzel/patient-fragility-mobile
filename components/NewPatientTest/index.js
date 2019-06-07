import React from 'react';
import { View } from 'react-native';

import Test from './Test';
import testsDefinitions from './../../tests';

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

export default NewPatientTest;