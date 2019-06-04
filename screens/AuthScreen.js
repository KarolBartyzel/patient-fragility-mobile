import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Button, Card, List, ActivityIndicator } from 'react-native-paper';
import { STORAGE_KEY, CLIENT_ID } from 'react-native-dotenv';
import { Ionicons } from '@expo/vector-icons';

const CONFIG = {
    issuer: 'https://accounts.google.com',
    clientId: CLIENT_ID,
    scopes: ["profile", "email"]
};

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Zaloguj się by kontynuować',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.tryPreviousAuthState().then((prevAuthState) => {
            if (prevAuthState) {
                const { user, accessToken } = prevAuthState;
                this.props.screenProps.setAuth({ user, accessToken });
                this.props.navigation.navigate('Home');
            }
            else {
                this.setState({ isLoading: false });
            }
        });
    }

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

    async signInAsync() {
        const authState = await Expo.Google.logInAsync(CONFIG);
        if (authState.type === "success") {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
            return authState;
        }
        return null;
    }

    signIn = async () => {
        this.setState({ isLoading: true });
        const authState = await this.signInAsync();
        const { accessToken, user } = authState;
        this.props.screenProps.setAuth({ user, accessToken });
        this.props.navigation.navigate('Home', { accessToken, user });
    };

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loginScreen}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.loginScreen}>
                <Card style={styles.loginCard}>
                    <View style={styles.logo}>
                        <Ionicons name="md-medkit" size={32} />
                    </View>

                    <Card.Title titleStyle={styles.cardTitleStyle} title="Kalkulator stanu pacjenta" />

                    <List.Item
                        title="Twórz badania"
                        left={props => <List.Icon {...props} icon="assignment" />}
                    />
                    <List.Item
                        title="Zobacz historię badań pacjenta"
                        left={props => <List.Icon {...props} icon="history" />}
                    />
                    <List.Item
                        title="Wyślij dane w Excelu na maila"
                        left={props => <List.Icon {...props} icon="email" />}
                    />

                    <Card.Actions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            mode="contained"
                            style={styles.loginButton}
                            contentStyle={styles.loginButtonContent}
                            onPress={this.signIn}
                            dark={true}
                            uppercase={false}
                            icon={{ uri: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png' }}
                        >
                            Zaloguj się z Google
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginScreen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        marginTop: '10%',
    },
    loginButton: {
        width: '90%',
    },
    loginButtonContent: {
        padding: 10
    },
    loginCard: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardTitleStyle: {
        textAlign: 'center'
    },
});

export default LoginScreen;
