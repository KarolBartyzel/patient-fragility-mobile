import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Button, Card } from 'react-native-paper';
import firebase from 'firebase';
import { ADMIN_EMAIL } from 'react-native-dotenv';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    handleSendMail() {
        const { currentUser} = firebase.auth();
        const subject = "Prośba o autoryzację";
        const body = `Proszę o autoryzację aplikacji "Kalkulator Kruchości Pacjenta".\n\nPoniżej załączam dane.\n\nUżytkownik: ${currentUser.displayName}\nEmail: ${currentUser.email}\nDodatkowe dane: ...`;
        Linking.openURL(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`);
    }

    render() {
        return (
            <View style={styles.NewUserScreen}>
                <Card style={styles.newUserCard}>
                    <Card.Title
                        title="Skontaktuj się z Administratorem"
                        subtitle="aby rozpocząć korzystanie z aplikacji"
                    />

                    <Card.Actions>
                        <Button
                            mode="contained"
                            contentStyle={styles.sendMailButton}
                            onPress={this.handleSendMail}
                            dark={true}
                            icon="email"
                        >
                            Wyślij maila
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    NewUserScreen: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    newUserCard: {
        display: 'flex',
        alignItems: 'center',
        flex: 1
    },
    sendMailButton: {
        width: 300,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
});

export default NewUser;
