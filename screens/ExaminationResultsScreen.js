import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { ActivityIndicator, Card, } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import moment from 'moment';
import PropTypes from 'prop-types';
import { REACT_APP_SERVER_URL, } from 'react-native-dotenv';

import ExaminationResults from '../components/ExaminationResults';

class ExaminationResultsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.examinationId = props.navigation.getParam('id', null);
        this.gestureConfig = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        this.state = {
            examinationsResults: [],
            currentExaminationResult: 0,
        };
    }

    componentDidMount() {
        fetch(`${REACT_APP_SERVER_URL}/examination/${this.examinationId}`)
            .then(async (res) => {
                data = await res.json();
                const { patientId, date, examinationsResults } = data;
                this.setState({
                    patientId,
                    date: moment(date).format("Do MMM YYYY"),
                    examinationsResults,
                });
            });
    }

    onSwipeLeft = () => {
        const { currentExaminationResult, examinationsResults } = this.state;
        if (currentExaminationResult < examinationsResults.length - 1) {
            this.setState({ currentExaminationResult: currentExaminationResult + 1 });
        }
    }
     
    onSwipeRight = () => {
        const { currentExaminationResult } = this.state;
        if (currentExaminationResult > 0) {
            this.setState({ currentExaminationResult: currentExaminationResult - 1 });
        }
    }

    render() {
        if (!this.state.examinationsResults.length) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator animating={true} />
                </View>
            );
        }

        const currentExaminationResult = this.state.examinationsResults[this.state.currentExaminationResult];
        return (
            <View style={styles.container}>
                <Card style={styles.examination}>
                    <Card.Title
                        title={`Badanie nr ${this.examinationId} z dn. ${this.state.date}`}
                        subtitle={`Pacjent ${this.state.patientId}`}
                        subtitleStyle={styles.subtitle}
                    />
                    <Card.Content style={styles.examinationInfo}>
                        <GestureRecognizer
                            onSwipeLeft={this.onSwipeLeft}
                            onSwipeRight={this.onSwipeRight}
                            style={styles.examinationInfo}
                            config={this.gestureConfig}
                        >
                            <ExaminationResults.ExaminationResult
                                title={currentExaminationResult.title}
                                score={currentExaminationResult.score}
                                maxScore={currentExaminationResult.maxScore}
                                description={currentExaminationResult.description}
                                onClickLeft={this.onSwipeRight}
                                onClickLeftDisabled={this.state.currentExaminationResult === 0}
                                onClickRight={this.onSwipeLeft}
                                onClickRightDisabled={this.state.currentExaminationResult >= this.state.examinationsResults.length - 1}
                            />
                        </GestureRecognizer>
                    </Card.Content>
                </Card>
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
    examination: {
        display: 'flex',
        flex: 1,
    },
    subtitle: {
        fontSize: 16,
    },
    examinationInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
});

export default ExaminationResultsScreen;