import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Menu } from 'react-native-paper';
import firebase from 'firebase';

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
        this.props.navigation.navigate('Auth');
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

export {
    NavigationRightSide
};
