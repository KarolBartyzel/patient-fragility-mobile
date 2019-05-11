
import { createStackNavigator, } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import NewExaminationScreen from '../screens/NewExaminationScreen';
import ExaminationDetailsScreen from '../screens/ExaminationDetailsScreen';

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        NewExamination: NewExaminationScreen,
        ExaminationDetails: ExaminationDetailsScreen,
    },
    {
        initialRouteName: "Home"
    }
);

export default AppNavigator;
