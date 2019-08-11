import { db } from './firebase';

export const doCreateUser = (id, fullName, email, role) =>
    db.ref(`users/${id}`).set({
        fullName,
        email,
        role,
    });

export const onceGetUserWithId = (id) =>
    db.ref(`users/${id}`).once('value');

export const onceGetUsers = () =>
    db.ref('users').once('value');

export const doUpdateUserRole = (users, role) => {
    let promises = [];
    for (let id in users) {
        if (users.hasOwnProperty(id)) {
            promises.push(db.ref(`users/${id}`).update({role}));
        }
    }

    return Promise.all(promises);
};
