import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Text, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';

class YesNoQuestion extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          yes: true
        }
      }

      componentDidMount() {
          
      }
      
      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
      }
      
      render () {
        const buttons = ['Tak', 'Nie']
        const { selectedIndex } = this.state
      
        return (
            <Card>
                <Card.Title title="Test1" subtitle="Health and fitness" />
                <Card.Content>
                <Title>Do you feel well lately?</Title>
                <Paragraph>Card content</Paragraph>
                </Card.Content>
                <Card.Actions style={styles.card}>
                <Button color="green" mode="outlined" style={styles.button}>Yes</Button>
                <Button color="red" mode="outlined" style={styles.button}>No</Button>
                </Card.Actions>
            </Card>
            // <Card.Actions style={styles.card}>
            //     <Button style={styles.button} mode="contained" compact={true} dark={!this.state.yes} onPress={() => this.setState({ yes: true })}>
            //         Yes
            //     </Button>
            //     <Button style={styles.button} mode="contained" compact={true} dark={this.state.yes} onPress={() => this.setState({ yes: false })}>
            //         No
            //     </Button>
            // </Card.Actions>
        )
      }
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'  
        
    },
    button: {
        margin: 10,
        width: 60
    }
});


// Test.propTypes = {
//     testId: PropTypes.number.isRequired,
//     testResults: PropTypes.array.isRequired,
//     setTestResults: PropTypes.func.isRequired,
// };

export default YesNoQuestion;
