import React from 'react';
import { Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Menu } from 'react-native-paper';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import firebase from 'firebase';
import PropTypes from 'prop-types';

import AuthScreen from './screens/AuthScreen';

import NewUserScreen from './screens/NewUser';

import HomeScreen from './screens/HomeScreen';
import NewPatientScreen from './screens/NewPatientScreen';
import PatientScreen from './screens/PatientScreen';
import PatientTestScreen from './screens/PatientTestScreen';
import NewPatientTestScreen from './screens/NewPatientTestScreen';

class NavigationRightSide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        };
    }

    openMenu = () => this.setState({ menuOpen: true });

    closeMenu = () => this.setState({ menuOpen: false });

    logout = async () => {
        firebase.auth().signOut();
        this.props.navigate('Auth');
    }

    openPrivacyPolicy() {
        Linking.openURL('https://kalkulator-kruchosci.flycricket.io/privacy.html');
    }

    render() {
        const { currentUser} = firebase.auth();
        if (!currentUser) {
            return null;
        }

        return (
            <Menu
                visible={this.state.menuOpen}
                onDismiss={this.closeMenu}
                anchor={
                    <TouchableOpacity style={styles.avatar} onPress={this.openMenu}>
                        <Avatar.Image size={35} source={{ uri: currentUser.photoURL }} />
                    </TouchableOpacity>
                }
            >
                <Menu.Item onPress={this.openPrivacyPolicy} title="Polityka prywatności" />
                <Menu.Item onPress={this.logout} title="Wyloguj" />
            </Menu>
        );
    }
}

NavigationRightSide.propTypes = {
    navigate: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    avatar: {
        marginRight: 10,
    }
});

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        NewPatient: NewPatientScreen,
        Patient: PatientScreen,
        PatientTest: PatientTestScreen,
        NewPatientTest: NewPatientTestScreen,
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerRight: <NavigationRightSide navigate={navigation.navigate} />
            };
        }
    }
);

const NewUserStack = createStackNavigator(
    {
        NewUser: NewUserScreen,
    },
    {
        initialRouteName: 'NewUser',
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerRight: <NavigationRightSide navigate={navigation.navigate} />
            };
        }
    }
)

export default createAppContainer(createSwitchNavigator(
    {
        Auth: AuthScreen,
        NewUser: NewUserStack,
        App: AppStack,
    },
    {
        initialRouteName: 'Auth'
    }
));
