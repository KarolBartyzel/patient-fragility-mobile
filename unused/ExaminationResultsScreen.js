import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { ActivityIndicator, } from 'react-native-paper';
import PropTypes from 'prop-types';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';

import ExaminationResults from '../components/ExaminationResults';

class ExaminationResultsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.examinationId = props.navigation.getParam('id', null);

        this.state = {
            examinationsResults: [],
        };
    }

    componentDidMount() {
        fetch(`${REACT_APP_SERVER_URL}/examination/${this.examinationId}`)
            .then(async (res) => {
                data = await res.json();
                const { patientId, date, examinationsResults } = data;
                this.setState({
                    patientId,
                    date,
                    examinationsResults,
                });
            });
    }

    render() {
        if (!this.state.examinationsResults.length) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ExaminationResults
                    examinationsResults={this.state.examinationsResults}
                    examinationId={this.examinationId}
                    patientId={this.state.patientId}
                    date={this.state.date}
                />
            </View>
        );
    }
}

ExaminationResultsScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

ExaminationResultsScreen.navigationOptions = {
    title: 'Szczegóły badania'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ExaminationResultsScreen;