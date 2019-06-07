import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, } from 'react-native-paper';

function NoPatients(props) {
    return (
        <View style={styles.noPatients}>
            <Text>Brak pacjentów</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    noPatients: {
        alignItems: 'center',
    },
});

export default NoPatients;