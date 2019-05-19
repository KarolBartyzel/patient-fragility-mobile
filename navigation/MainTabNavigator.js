
import { createStackNavigator, } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import NewExaminationScreen from '../screens/NewExaminationScreen';
import ExaminationResultsScreen from '../screens/ExaminationResultsScreen';

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        NewExamination: NewExaminationScreen,
        ExaminationResults: ExaminationResultsScreen,
    },
    {
        initialRouteName: "Home"
    }
);

export default AppNavigator;
