import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, Card, } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

function Entry(props) {
    return (
        <Card style={{ width: '100%' }}>
            <View style={styles.logo}>
                <Ionicons name="md-medkit" size={32} />
            </View>
            <Card.Title titleStyle={styles.cardTitleStyle} title="Kalkulator stanu pacjenta" />

            <Card.Actions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button style={{margin: 'auto'}} icon="create" mode="contained" onPress={() => props.navigation.navigate('NewExamination')}>Nowe badanie</Button>
            </Card.Actions>
        </Card>
    );
}

Entry.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardTitleStyle: {
        textAlign: 'center'
    },
});

export default Entry;