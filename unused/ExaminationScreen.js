import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, Text, Card, Appbar } from 'react-native-paper';

import Examination from './Examination';

class ExaminationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testName: "",
            questionCategory: "",
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({title: 'Ala ma psa'})
        this.props.navigation.setParams({subtitle: 'Ala ma psa'})
        // console.log(this.props)
        // console.log(this.props.state.params.testName)
        // console.log(this.props.state.params.questionCategory)
        // this.setState({testName: this.props.state.params.testName,
        //      questionCategory: this.props.state.params.questionCategory})
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Appbar.Header dark={false} style={styles.appbarHeader}>
                    <Appbar.BackAction
                        onPress={() => this.props.navigation.navigate('NewExamination')}
                    />
                    <Appbar.Content
                        // title={this.props.state ? this.props.state.params.testName: ""}
                        title="Skala Katza"
                        titleStyle={{fontWeight: 'bold'}}
                        // subtitle={this.props.state ? this.props.state.params.questionCategory: ""}

                        subtitle="Ogolne samopoczucie"
                    />
                </Appbar.Header> */}
                <Examination.ExaminationSummary
                navigation={this.props.navigation}
                ></Examination.ExaminationSummary>
            </View>
        );
    }
}

ExaminationScreen.navigationOptions = ({navigation}) => ({
    title: ""//navigation.state.params ? navigation.state.params.title : 'Examination',
    // headerRight: (
    //     <Button
    //       onPress={() => alert('This is a button!')}
    //       title="Info"
    //       color="#fff"
    //     />
    //   ),
    // header: null
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 'auto',
    },
    appbarHeader: {
        backgroundColor: 'white',
        // shadowOffset: { width: 10, height: 10 },
        // shadowColor: 'black',
        // shadowOpacity: 1,
        // elevation: 3,
        // // background color must be set
        // backgroundColor : "#0000" // invisible color
    }
});

export default ExaminationScreen;
