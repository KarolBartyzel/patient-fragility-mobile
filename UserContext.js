import React from 'react';

const UserContext = React.createContext({ user: null, accessToken: null });

export function withUser(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <UserContext.Consumer>
                    { (value) => <WrappedComponent {...this.props} user={value && value.user} accessToken={value && value.accessToken} /> }
                </UserContext.Consumer>
            );
        }
    };
}

export default UserContext;