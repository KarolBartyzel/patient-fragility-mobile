import React from 'react';
import { TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false,
        };
    }

    render() {
        return (
            <TextInput
                label='Patient Id'
                value={this.props.patientId}
                error={this.state.touched && !this.props.patientId}
                onChangeText={patientId => this.props.setPatientId(patientId)}
                onBlur={() => this.setState({ touched: true })}
            />
        );
    }
}

Patient.propTypes = {
    patientId: PropTypes.string.isRequired,
    setPatientId: PropTypes.func.isRequired,
};

export default Patient;
