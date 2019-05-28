import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { Button, Card, Headline, Paragraph, Text, Divider, Subheading } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          yes: true
        }
      }

    render() {
        return (
            <View style={styles.view}>
                <View style={{flex: 6}}>
                    <Headline >Skala Katza (ADL)</Headline>
                    <Subheading style={{marginBottom: 15}}>Skala oceny podstawowych czynności w życiu codziennym.</Subheading>
                    <Divider/>
                    <Paragraph>Nr badania: 18</Paragraph>
                    <Paragraph>Nr pacjenta: 6</Paragraph>
                    <Paragraph>Data: 22.05.19r</Paragraph>
                </View>
                {/* <Card style={styles.card}> */}
                    {/* <Card.Actions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
                        <Button dark={true} style={styles.card} icon="arrow-forward" compact={true} mode="contained" onPress={() => props.navigation.navigate('NewExamination')}>Rozpocznij test</Button>
                    {/* </Card.Actions>  */}
                {/* </Card> */}

                {/* <Card.Title titleStyle={styles.cardTitleStyle} title="Skala Katza (ADL)" />

                <Card.Actions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button style={{margin: 'auto'}} icon="create" mode="contained" onPress={() => props.navigation.navigate('NewExamination')}>Nowe badanie</Button>
                </Card.Actions> */}
            </View>
        );
    }
}

Test.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    view: {
        justifyContent: 'space-between',
        flex: 1,
        margin: 7
    },
    logo: {
        flex: 1,
        // display: 'flex',
        flexDirection: 'row',
        
        // justifyContent: 'center'
    },
    cardTitleStyle: {
        textAlign: 'center'
    },
    card: {
        flex: 1, 
        marginTop: 40,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center'
        // position: 'absolute',
        // margin: 16,
        // right: 10,
        // bottom: 10,
    }
});

export default Test;