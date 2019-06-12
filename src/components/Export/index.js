import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button, IconButton, Text, Modal, Portal, TextInput, HelperText, RadioButton } from 'react-native-paper';
import firebase from 'firebase';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import db from './../../firebase';

class Export extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'xlsx',
            email: firebase.auth().currentUser.email,
            validationText: ''
        };

        this.currentUserEmail = firebase.auth().currentUser.email;
    }

    exportTests = async () => {
        if (!this.state.validationText) {
            db.firebaseFunctions.exportTests(this.state.type, this.props.patientId || '', this.state.email);
            this.setState({ modalVisible: false });
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
            <>
                <Portal>
                    <Modal
                        visible={this.state.modalVisible}
                        onDismiss={() => this.setState({ modalVisible: false })}
                    >
                        <Card style={styles.export}>
                            <Card.Title title='Wyślij dane na maila' />
                            <Card.Content>
                                <TextInput
                                    label='Mail odbiorcy'
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
                                            <RadioButton value="csv" color='lightblue' uncheckedColor='yellow' />
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            </Card.Content>
                            <Card.Actions style={styles.actions}>
                                <Button style={styles.sendToMailButton} contentStyle={styles.sendToMailButtonContent} icon="send" mode="contained" onPress={this.exportTests} disabled={!!this.state.validationText}>
                                    Wyślij
                                </Button>
                            </Card.Actions>
                        </Card>
                    </Modal>
                </Portal>
                <IconButton
                    icon={() => <MaterialCommunityIcons name="file-export" size={30} />}
                    size={30}
                    onPress={() => this.setState({ modalVisible: true })}
                />
            </>
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
    }
});

export default Export;
