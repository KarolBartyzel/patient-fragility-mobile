import React from 'react';
import { View, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { Button, TextInput, Text, Card, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';

class Choose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false,
        };
    }

    onPress = (testId) => {
        this.props.setActiveTest(testId);
    }

    render() {
        return (
            <View style={styles.choose}>
                <TextInput
                    label='Id Pacjenta'
                    value={this.props.patientId}
                    error={this.state.touched && !this.props.patientId}
                    onChangeText={(patientId) => this.props.setPatientId(patientId)}
                    onBlur={() => this.setState({ touched: true })}
                    style={styles.input}
                />
                <Card style={{ flex: 1 }}>
                    <Card.Title title="Dostępne testy" />
                    <Card.Content style={{ flex: 1 }}>
                        {this.props.tests.length === 0 && (
                            <ActivityIndicator animating={true} />
                        )}
                        {this.props.tests.map((test) => (
                            <Button
                                key={test.id}
                                mode="contained"
                                style={styles.listEntry}
                                contentStyle={styles.listEntryText}
                                onPress={() => this.onPress(test.id)}
                                dark={true}
                                disabled={this.props.testsResults.find(testResult => testResult.testId === test.id)}
                                uppercase={false}
                            >
                                {test.shortname}
                            </Button>
                        ))}
                    </Card.Content>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    choose: {
        height: '100%'
    },
    input: {
        margin: 10,
        marginTop: -10,
    },
    listContent: {
        flex: 1,
    },
    listEntry: {
        margin: 5,
    },
    listEntryText: {
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        justifyContent: 'flex-start'
    }
});

Choose.propTypes = {
    patientId: PropTypes.string.isRequired,
    setPatientId: PropTypes.func.isRequired,
    setActiveTest: PropTypes.func.isRequired,
};

export default Choose;
