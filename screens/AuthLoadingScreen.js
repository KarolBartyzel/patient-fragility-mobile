import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { STORAGE_KEY, CLIENT_ID } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

const CONFIG = {
    issuer: 'https://accounts.google.com',
    clientId: CLIENT_ID,
    scopes: ["profile", "email"]
};

class AuthLoadingScreen extends React.Component {
    async tryPreviousAuthState() {
        const authState = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
        if (authState) {
            if (new Date(authState.accessTokenExpirationDate) < new Date()) {
                return Expo.AppAuth.refreshAsync(CONFIG, authState.refreshToken).then(async (newAuthState) => {
                    newAuthState.user = authState.user;
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState));
                    return newAuthState;
                })
                .catch(() => {
                    return authState;
                });
                
            }
            else {
                return authState;
            }
        }
        return null;
    }

    async componentDidMount() {
        const prevAuthState = await this.tryPreviousAuthState();

        if (prevAuthState) {
            const { user, accessToken } = prevAuthState;
            this.props.screenProps.setAuth({ user, accessToken });
            this.props.navigation.navigate('Home');
        }
        else {
            this.props.navigation.navigate('Auth');
        }
    }

    render() {
        return (
            <View style={styles.authLoadingScreen}>
                <ActivityIndicator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    authLoadingScreen: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
});


export default AuthLoadingScreen;
