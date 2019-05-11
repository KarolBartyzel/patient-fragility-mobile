import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Text } from 'react-native-paper';

export default function ExaminationSummaryScreen(props) {
    const examinationId = props.navigation.getParam('id', null);

    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Szczegóły badania {examinationId}</Text>
        </View>
    );
}

ExaminationSummaryScreen.navigationOptions = {
    title: 'Szczegóły badania'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 30,
        color: 'rgba(96,100,109, 1)',
    },
});
