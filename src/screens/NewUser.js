import React from 'react';

import NewUser from './../components/NewUser';

export default function NewUserScreen(props) {
    return (
        <NewUser />
    );
}

NewUserScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "Nowy użytkownik",
    };
}
