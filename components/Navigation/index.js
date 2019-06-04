import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Menu } from 'react-native-paper';
import { withUser } from '../../UserContext';
import { AsyncStorage } from 'react-native';
import { STORAGE_KEY, CLIENT_ID } from 'react-native-dotenv';

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
        this.props.navigation.navigate('Auth');
        Expo.Google.logOutAsync({ accessToken: this.props.accessToken, clientId: CLIENT_ID });
        this.props.signOutUser();
        await AsyncStorage.removeItem(STORAGE_KEY);
    }

    render() {
        if (!this.props.user) {
            return null;
        }

        return (
            <Menu
                visible={this.state.menuOpen}
                onDismiss={this.closeMenu}
                anchor={
                    <TouchableOpacity style={styles.avatar} onPress={this.openMenu}>
                        <Avatar.Image size={35} source={{ uri: this.props.user.photoUrl }} />
                    </TouchableOpacity>
                }
            >
                <Menu.Item onPress={this.logout} title="Wyloguj" />
            </Menu>
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        marginRight: 10,
    }
});

const UserNavigationRightSide = withUser(NavigationRightSide);

export {
    UserNavigationRightSide as NavigationRightSide
};
