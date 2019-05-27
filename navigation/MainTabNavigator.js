
import { createStackNavigator, } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import NewExaminationScreen from '../screens/NewExaminationScreen';
import ExaminationResultsScreen from '../screens/ExaminationResultsScreen';
import ExaminationScreen from '../screens/ExaminationScreen';

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        NewExamination: NewExaminationScreen,
        ExaminationResults: ExaminationResultsScreen,
        Examination: ExaminationScreen,
    },
    {
        initialRouteName: "Home"
    }
);

export default AppNavigator;
