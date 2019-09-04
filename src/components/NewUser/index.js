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
        const body = `Proszę o autoryzację użytkownika w aplikacji "Kalkulator Kruchości Pacjenta".\n\nUżytkownik: ${currentUser.displayName}\nEmail: ${currentUser.email}\nSzpital: <SZPITAL>`;
        Linking.openURL(`mailto:${ADMIN_EMAIL}?subject=${subject}&body=${body}`);
    }

    handleRefresh = () => {
        this.props.navigate("Auth");
    }

    render() {
        return (
            <View style={styles.NewUserScreen}>
                <Card style={styles.newUserCard}>
                    <Card.Title
                        title="Skontaktuj się z Administratorem"
                        subtitle="aby rozpocząć korzystanie z aplikacji"
                    />

                    <Card.Actions style={styles.newUserCardActions}>
                        <Button
                            mode="contained"
                            contentStyle={styles.sendMailButtonContent}
                            onPress={this.handleSendMail}
                            dark={true}
                            icon="email"
                        >
                            Wyślij e-mail
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.refreshButton}
                            contentStyle={styles.refreshButtonContent}
                            onPress={this.handleRefresh}
                            dark={true}
                            icon="refresh"
                        >
                            Odśwież
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
    newUserCardActions: {
        flexDirection: 'column'
    },
    sendMailButtonContent: {
        width: 300,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    refreshButton: {
        marginTop: 10,
    },
    refreshButtonContent: {
        width: 200,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default NewUser;
