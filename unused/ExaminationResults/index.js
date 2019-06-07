import React from 'react';
import { StyleSheet, } from 'react-native';
import { Card, } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import PropTypes from 'prop-types';
import moment from 'moment';

import ExaminationResult from './ExaminationResult';

const gestureConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
};

class ExaminationResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentExaminationResult: 0
        };
    }
    
    onSwipeLeft = () => {
        this.setState((prevState) => ({ currentExaminationResult: prevState.currentExaminationResult < this.props.examinationsResults.length - 1 ? prevState.currentExaminationResult + 1 : prevState.currentExaminationResult }));
    }
     
    onSwipeRight = () => {
        this.setState((prevState) => ({ currentExaminationResult: prevState.currentExaminationResult > 0 ? prevState.currentExaminationResult - 1 : prevState.currentExaminationResult }));
    }

    render() {
        const currentExaminationResult = this.props.examinationsResults[this.state.currentExaminationResult];

        return (
            <Card style={styles.examination}>
                <Card.Title
                    title={`Badanie nr ${this.props.examinationId} z dn. ${moment(this.props.date).format("Do MMM YYYY")}`}
                    subtitle={`Pacjent ${this.props.patientId}`}
                    subtitleStyle={styles.subtitle}
                />
                <Card.Content style={styles.examinationInfo}>
                    <GestureRecognizer
                        onSwipeLeft={this.onSwipeLeft}
                        onSwipeRight={this.onSwipeRight}
                        style={styles.examinationInfo}
                        config={gestureConfig}
                    >
                        <ExaminationResult
                            title={currentExaminationResult.title}
                            score={currentExaminationResult.score}
                            maxScore={currentExaminationResult.maxScore}
                            description={currentExaminationResult.description}
                            onClickLeft={this.onSwipeRight}
                            onClickLeftDisabled={this.state.currentExaminationResult === 0}
                            onClickRight={this.onSwipeLeft}
                            onClickRightDisabled={this.state.currentExaminationResult >= this.props.examinationsResults.length - 1}
                        />
                    </GestureRecognizer>
                </Card.Content>
            </Card>
        );
    }
}

ExaminationResults.propTypes = {
    examinationsResults: PropTypes.array.isRequired,
    examinationId: PropTypes.number.isRequired,
    patientId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
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

export default ExaminationResults;