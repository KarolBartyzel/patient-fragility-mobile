import React from 'react';
import { StyleSheet, View, } from 'react-native';

import Home from './../components/Home';

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Home.Entry {...props} />
            <Home.History {...props} />
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },
});
