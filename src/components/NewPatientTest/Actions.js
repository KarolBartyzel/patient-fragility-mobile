import React from 'react';
import { StyleSheet, } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

function GradedActions(props) {
    return [...Array(props.maxPoints + 1).keys()].map((grade) => (
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={() => props.handleGrade(grade)}
            dark={true}
            compact="true"
        >
          {grade}
        </Button>
    ));
}

GradedActions.propTypes = {
    handleGrade: PropTypes.func.isRequired,
    maxPoints: PropTypes.number.isRequired
};

function SelectActions(props) {
    return (
        <>
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={props.handleSelect}
            dark={true}
        >
            Wybierz
        </Button>
        </>
    );
}

SelectActions.propTypes = {
    handleSelect: PropTypes.func.isRequired
};

function YesNoActions(props) {
    return (
        <>
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={props.handleYesAnswer}
            dark={true}
            color="green"
        >
            Tak
        </Button>
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={props.handleNoAnswer}
            dark={true}
            color="brown"
        >
            Nie
        </Button>
        </>
    );
}

YesNoActions.propTypes = {
    handleYesAnswer: PropTypes.func.isRequired,
    handleNoAnswer: PropTypes.func.isRequired
};

function YesSometimesNoActions(props) {
    return (
        <>
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={props.handleYesAnswer}
            dark={true}
            color="green"
        >
            Tak
        </Button>
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={props.handleSometimesAnswer}
            dark={true}
            color="silver"
        >
            Czasami
        </Button>
        <Button
            mode="contained"
            style={styles.button}
            contentStyle={styles.buttonContent}
            onPress={props.handleNoAnswer}
            dark={true}
            color="brown"
        >
            Nie
        </Button>
        </>
    );
}

YesSometimesNoActions.propTypes = {
    handleYesAnswer: PropTypes.func.isRequired,
    handleSometimesAnswer: PropTypes.func.isRequired,
    handleNoAnswer: PropTypes.func.isRequired
};

function Actions(props) {
    if (!props.activeQuestion) {
        return null;
    }

    function handleYesAnswer() {
        props.addAnswer('yes');
    }

    function handleSometimesAnswer() {
        props.addAnswer('sometimes');
    }

    function handleNoAnswer() {
        props.addAnswer('no');
    }

    function handleGrade(grade) {
        props.addAnswer(grade);
    }

    function handleSelect() {
        props.addAnswer(props.activeQuestion.id);
    }

    switch (props.activeQuestion.questionType) {
        case 'yes-no': return (
            <YesNoActions
                handleYesAnswer={handleYesAnswer}
                handleNoAnswer={handleNoAnswer}
            />
        );
        case 'yes-sometimes-no': return (
            <YesSometimesNoActions
                handleYesAnswer={handleYesAnswer}
                handleSometimesAnswer={handleSometimesAnswer}
                handleNoAnswer={handleNoAnswer}
            />
        );
        case 'graded': return (
            <GradedActions
                handleGrade={handleGrade}
                maxPoints={props.activeQuestion.maxPoints}
            />
        );
        case 'select': return (
            <SelectActions
                handleSelect={handleSelect}
            />
        );
        default: return null;
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        marginLeft: 3,
        marginRight: 3,
    },
    buttonContent: {
        padding: 5,
    },
});

export default Actions;
