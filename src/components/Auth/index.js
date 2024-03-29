import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { Button, Card, List, ActivityIndicator, Text } from 'react-native-paper';
import { CLIENT_ID } from 'react-native-dotenv';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import PropTypes from 'prop-types';

import db from './../../firebase';

const CONFIG = {
    issuer: 'https://accounts.google.com',
    clientId: CLIENT_ID,
    behavior: 'web',
    scopes: ["profile", "email"]
};

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    onSignIn = async () => {
        this.setState({ isLoading: true });
        try {
            const googleUser = await Google.logInAsync(CONFIG);
            if (googleUser.type === "success") {
                const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
                    unsubscribe();
                    const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken, googleUser.accessToken);
                    firebase.auth().signInWithCredential(credential)
                        .then(( { user, additionalUserInfo }) => {
                            if (additionalUserInfo.isNewUser) {
                                const newUser = new db.models.User({
                                    id: user.uid,
                                    firstName: additionalUserInfo.profile.given_name,
                                    lastName: additionalUserInfo.profile.family_name,
                                    gmail: user.email,
                                    profilePicture: additionalUserInfo.profile.picture,
                                    createdAt: Date.now(),
                                    lastLoggedInAt: Date.now(),
                                    accessGroups: []
                                });
                                return firebase
                                    .database()
                                    .ref(`/${db.models.User.COLLECTION}/${user.uid}`)
                                    .set(newUser);
                            }
                            else {
                                return firebase
                                    .database()
                                    .ref(`/users/${user.uid}`)
                                    .update({
                                        lastLoggedInAt: Date.now()
                                    });
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            return { cancelled: true };
                        });
                });
                return googleUser.accessToken;
            }
            else {
                return { cancelled: true };
            }
        }
        catch (e) {
            return { error: true };
        }
    }

    componentDidMount() {
        this.firebaseAuthStateChangeUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const isUserAuthorized = await db.patients.isUserAuthorized();
                if (isUserAuthorized) {
                    this.props.navigate('Home');
                }
                else {
                    this.props.navigate('NewUser');
                }
            }
            else {
                this.setState({ isLoading: false });
            }
        });
    }

    componentWillUnmount() {
        this.firebaseAuthStateChangeUnsubscribe();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.AuthScreen}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.AuthScreen}>
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
                        title="Wyślij dane w Excelu na e-mail"
                        left={props => <List.Icon {...props} icon="email" />}
                    />

                    <Card.Actions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            mode="contained"
                            style={styles.loginButton}
                            contentStyle={styles.loginButtonContent}
                            onPress={this.onSignIn}
                            dark={true}
                            uppercase={false}
                            icon={{ uri: 'https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png' }}
                        >
                            Zaloguj się z Google
                        </Button>
                    </Card.Actions>

                    <View style={styles.authors}>
                        <Text>Karol Bartyzel, Julia Sypień</Text>
                        <Text>Kraków 2019</Text>
                    </View>
                </Card>
            </View>
        );
    }
}

Auth.propTypes = {
    navigate: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    AuthScreen: {
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
    authors: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center'
    }
});

export default Auth;
