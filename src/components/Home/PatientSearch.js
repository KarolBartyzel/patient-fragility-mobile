import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, } from 'react-native-paper';
import PropTypes from 'prop-types';

import Export from './../Export';

function PatientSearch(props) {
    return (
        <View
            style={styles.patientSearch}
        >
            <Searchbar
                style={styles.patientSearchInput}
                placeholder="Szukaj pacjenta..."
                onChangeText={props.setSearchPatientQuery}
                value={props.searchPatientQuery}
            />
            <Export />
        </View>
    );
}

const styles = StyleSheet.create({
    patientSearch: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    patientSearchInput: {
        height: 30,
        flex: 1,
    },
});

PatientSearch.propTypes = {
    setSearchPatientQuery: PropTypes.func.isRequired,
    searchPatientQuery: PropTypes.string.isRequired,
};

export default PatientSearch;
