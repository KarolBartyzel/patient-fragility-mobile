import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Searchbar, } from 'react-native-paper';
import PropTypes from 'prop-types';

function PatientSearch(props) {
    return (
        <Card.Title
            style={styles.patientSearch}
            right={() => <Searchbar
                style={styles.patientSearchInput}
                placeholder="Szukaj pacjenta..."
                onChangeText={props.setSearchPatientQuery}
                value={props.searchPatientQuery}
            />}
        />
    );
}

const styles = StyleSheet.create({
    patientSearch: {
        paddingRight: 16,
        flexDirection: 'column',
        alignItems: 'center',
    },
    patientSearchTitle: {
        textAlign: 'center',
        flex: 1,
        margin: 10,
    },
    patientSearchInput: {
        height: 30,
        width: '90%',
        marginBottom: 10,
        marginTop: 10,
    },
});

PatientSearch.propTypes = {
    setSearchPatientQuery: PropTypes.func.isRequired,
    searchPatientQuery: PropTypes.string.isRequired,
};

export default PatientSearch;