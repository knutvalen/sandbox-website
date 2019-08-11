import React from 'react';
import { firebase, db } from './firebase';
import AuthUserContext from '../models/authUserContext';

const CLEAN_STATE = {
    user: null,
    error: null,
};

function withAuthentication(Component) {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ...CLEAN_STATE,
            };
        }

        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    db.onceGetUserWithId(authUser.uid)
                        .then(snapshot => {
                            const user = snapshot.val();

                            this.setState({
                                ...CLEAN_STATE,
                                user: user,
                            });
                        })
                        .catch(error => {
                            this.setState({
                                ...CLEAN_STATE,
                                error: error,
                            });
                        });
                } else {
                    this.setState({
                        ...CLEAN_STATE,
                    });
                }
            });
        }

        render() {
            const { user } = this.state;

            return (
                <AuthUserContext.Provider value={user}>
                    <Component/>
                </AuthUserContext.Provider>
            );
        }
    }

    return WithAuthentication;
}

export default withAuthentication;