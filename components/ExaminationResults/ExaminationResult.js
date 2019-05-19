import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

function ExaminationResult(props) {
    return (
        <Card style={styles.examination}>
            <Card.Title
                style={styles.titleNav}
                title={props.title}
                titleStyle={styles.examinationName}
                left={() => <IconButton icon="arrow-back" disabled={props.onClickLeftDisabled} size={25} onPress={props.onClickLeft} />}
                right={() => <IconButton icon="arrow-forward" disabled={props.onClickRightDisabled} size={25} onPress={props.onClickRight} />}
            />
            <Card.Content style={{ flex: 1 }}>
                <View style={styles.labelValue}>
                    <Text style={styles.label}>Wynik</Text>
                    <Text style={styles.value}>{props.score} / {props.maxScore}</Text>
                </View>
                <View style={styles.labelValue}>
                    <Text style={styles.label}>Opis</Text>
                    <Text style={styles.value}>{props.description}</Text>
                </View>
            </Card.Content>
        </Card>
    );
}

ExaminationResult.propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    maxScore: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    onClickLeft: PropTypes.func.isRequired,
    onClickLeftDisabled: PropTypes.bool.isRequired,
    onClickRight: PropTypes.func.isRequired,
    onClickRightDisabled: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
    examination: {
        display: 'flex',
        flex: 1,
    },
    titleNav: {
        paddingRight: 16,
    },
    examinationName: {
        textAlign: 'center',
    },
    labelValue: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
    },
    label: {
        width: 100,
        fontSize: 15,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 15,
    }
});

export default ExaminationResult;