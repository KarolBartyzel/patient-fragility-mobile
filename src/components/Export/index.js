import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button, IconButton, Text, Modal, Portal, TextInput, HelperText, RadioButton, ActivityIndicator } from 'react-native-paper';
import firebase from 'firebase';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import db from './../../firebase';

class Export extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'xlsx',
            email: firebase.auth().currentUser.email,
            validationText: '',
            isSending: false
        };

        this.currentUserEmail = firebase.auth().currentUser.email;
    }

    exportTests = async () => {
        if (!this.state.validationText) {
            this.setState({ isSending: true });
            db.firebaseFunctions.exportTests(this.state.type, this.props.patientId || '', this.state.email)
                .then(({ status }) => {
                    this.setState({ isSending: false, result: status === 200 ? `E-mail został wysłany` : `Nie udało się wysłać wiadomości e-mail`, })
                });
        }
    }

    onChangeEmail = (email) => {
        this.setState({ validationText: '', email });
        if (!email) {
            this.setState({ validationText: 'Email jest wymagany' });
        }
        else if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
            this.setState({ validationText: 'Email jest niepoprawny' });
        }
    } 

    render() {
        return (
            <View pointerEvents={this.state.isSending ? 'none' : 'auto'}>
                <Portal>
                    {this.state.modalVisible && (
                        <Modal
                            visible={this.state.modalVisible}
                            dismissable={!this.state.isSending}
                            onDismiss={() => {
                                this.setState({ modalVisible: false })
                            }}
                        >
                            <Card style={[styles.export, this.state.isSending ? styles.opacityBackground : null]}>
                                <Card.Title title={this.state.result || 'Wyślij dane na e-mail'} />
                                {!this.state.result && (
                                    <Card.Content>
                                        <TextInput
                                            label='E-mail odbiorcy'
                                            value={this.state.email}
                                            error={!!this.state.validationText}
                                            onChangeText={this.onChangeEmail}
                                            keyboardType='email-address'
                                        />
                                        <HelperText type="error" visible={!!this.state.validationText}>{this.state.validationText}</HelperText>

                                        <View
                                            style={styles.toggleType}
                                        >
                                            <RadioButton.Group
                                                onValueChange={type => this.setState({ type })}
                                                value={this.state.type}
                                            >
                                                <View style={styles.toggleTypeValue}>
                                                    <Text>Excel</Text>
                                                    <RadioButton value="xlsx" color='lightblue' />
                                                </View>
                                                <View style={styles.toggleTypeValue}>
                                                    <Text>CSV</Text>
                                                    <RadioButton value="csv" color='lightblue' />
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                    </Card.Content>
                                )}
                                <Card.Actions style={styles.actions}>
                                    {this.state.result && (
                                        <Button style={styles.sendToMailButton} contentStyle={styles.sendToMailButtonContent} icon="done" mode="contained" onPress={() => { this.setState({ modalVisible: false, result: null })}} disabled={!!this.state.validationText}>
                                            Ok
                                        </Button>
                                    )}
                                    {!this.state.result && (
                                        <Button style={styles.sendToMailButton} contentStyle={styles.sendToMailButtonContent} icon="send" mode="contained" onPress={this.exportTests} disabled={!!this.state.validationText}>
                                            Wyślij
                                        </Button>
                                    )}

                                </Card.Actions>
                                {this.state.isSending && (
                                    <View style={styles.sending}>
                                        <ActivityIndicator />
                                    </View>
                                )}
                            </Card>
                        </Modal>
                    )}
                </Portal>
                <IconButton
                    icon={() => <MaterialCommunityIcons name="file-export" size={30} />}
                    size={30}
                    onPress={() => this.setState({ modalVisible: true })}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    export: {
        display: 'flex',
        width: '80%',
        left: '10%'
    },
    toggleType: {
        flexDirection: 'row',
    },
    toggleTypeValue: {
        marginRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    exportButton: {
        paddingTop: 3,
        paddingBottom: 3
    },
    actions: {
        width: '100%',
        justifyContent: 'center'
    },
    sendToMailButton: {
        width: '95%',
    },
    sendToMailButtonContent: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    sending: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    opacityBackground: {
        backgroundColor: 'white',
        opacity: 0.5,
    },
    exportResult: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Export;
