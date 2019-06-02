import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import { NavigationRightSide } from './components/Navigation';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import LoginScreen from './screens/LoginScreen';

import HomeScreen from './screens/HomeScreen';
import NewExaminationScreen from './screens/NewExaminationScreen';
import ExaminationResultsScreen from './screens/ExaminationResultsScreen';
import ExaminationScreen from './screens/ExaminationScreen';

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        NewExamination: NewExaminationScreen,
        ExaminationResults: ExaminationResultsScreen,
        Examination: ExaminationScreen,
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({ screenProps, navigation }) => {
            return {
                headerRight: <NavigationRightSide navigation={navigation} signOutUser={() => screenProps.setAuth(null)} />
            };
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: LoginScreen,
        App: AppStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));
