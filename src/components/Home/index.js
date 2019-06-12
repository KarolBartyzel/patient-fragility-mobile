import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import PropTypes from 'prop-types';

import NewPatient from './NewPatient';
import PatientSearch from './PatientSearch';
import PatientsList from './PatientsList';

import db from './../../firebase';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            patients: null,
            searchPatientQuery: '',
        };

        this.typingTimeout = 0;
        this.onNavigateBack = this.props.addListener('willFocus', () => {
            this.setState({ searchPatientQuery: '' }, this.onLoadMore);
        });
    }

    onLoadMore = async () => {
        const patients = await db.patients.getPatients(this.state.searchPatientQuery);
        this.setState({ patients });
    };

    setSearchPatientQuery = (searchPatientQuery) => {
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }

        this.typingTimeout = setTimeout(this.onLoadMore, 300)
        this.setState({
            searchPatientQuery: searchPatientQuery.trim().toLowerCase(),
        });
    }

    componentDidMount() {
        this.onLoadMore();
    }

    componentWillUnmount() {
        this.onNavigateBack.remove();
    }

    render() {
        return (
            <Card style={styles.homeCard}>
                <NewPatient navigate={this.props.navigate} />
                <PatientSearch searchPatientQuery={this.state.searchPatientQuery} setSearchPatientQuery={this.setSearchPatientQuery} />
                <PatientsList patients={this.state.patients} navigate={this.props.navigate} />
            </Card>
        );
    }
}

Home.propTypes = {
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    homeCard: {
        flex: 1
    }
});

export default Home;
