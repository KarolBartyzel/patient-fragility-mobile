import React from 'react';
import { View, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';

import NoPatients from './NoPatients';

function PatientsList(props) {
    return (
        <Card.Content style={{ flex: 1 }}>
            <View style={styles.patientsListHeader}>
                <Text style={styles.patientsListHeaderPart}>Id pacjenta</Text>
                <Text style={styles.patientsListHeaderPart}>Grupy dostępu</Text>
            </View>
            {!props.patients && (
                <ActivityIndicator animating={true} />
            )}
            {props.patients && (
                <FlatList
                    style={styles.patientsListContent}
                    keyExtractor={(patient) => String(patient.id)}
                    data={props.patients}
                    renderItem={({ item: patient }) => (
                        <TouchableHighlight onPress={() => { props.navigate('Patient', { patientId: patient.id }); }}>
                            <View style={styles.patientsListEntry}>
                                <Text style={styles.patientsListEntryPart}>{patient.id}</Text>
                                <Text style={styles.patientsListEntryPart}>{`[${patient.groups.map((group) => `"${group}"`).join(', ')}]`}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    ListEmptyComponent={<NoPatients />}
                />
            )}
        </Card.Content>
    );
}

PatientsList.propTypes = {
    patients: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired, age: PropTypes.number })),
    navigate: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    patientsListHeader: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    patientsListHeaderPart: {
        flex: 1,
        textAlign: 'center',
    },
    patientsListContent: {
        width: '100%',
    },
    patientsListEntry: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: 'black',
        borderWidth: 1,
    },
    patientsListEntryPart: {
        textAlign: 'center',
        flex: 1,
    },
});

export default PatientsList;
