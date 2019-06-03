import React from 'react';
import { StyleSheet, View, } from 'react-native';

import Home from './../components/Home';

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Home {...props} />
        </View>
    );
}

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Historia",
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

