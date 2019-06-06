import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import AuthScreen from './screens/AuthScreen';

import HomeScreen from './screens/HomeScreen';
import NewPatientScreen from './screens/NewPatientScreen';
import PatientScreen from './screens/PatientScreen';

import NewExaminationScreen from './screens/NewExaminationScreen';
import ExaminationResultsScreen from './screens/ExaminationResultsScreen';
import ExaminationScreen from './screens/ExaminationScreen';

import { NavigationRightSide } from './components/Navigation';

const AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        NewPatient: NewPatientScreen,
        Patient: PatientScreen,

        NewExamination: NewExaminationScreen,
        ExaminationResults: ExaminationResultsScreen,
        Examination: ExaminationScreen,
    },
    {
        initialRouteName: "Home",
        defaultNavigationOptions: ({ screenProps, navigation }) => {
            return {
                headerRight: <NavigationRightSide navigation={navigation} />
            };
        }
    }
);

export default createAppContainer(createSwitchNavigator(
    {
        Auth: AuthScreen,
        App: AppStack,
    },
    {
        initialRouteName: 'Auth',
    }
));
