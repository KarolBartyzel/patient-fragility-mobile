import firebase from 'firebase';
import { FIREBASE_FUNCTIONS_URL } from 'react-native-dotenv';

function sendWithToken(callback) {
    firebase.auth().currentUser.getIdToken().then(callback);
}

function exportTests(type, patientId, address) {
    return new Promise((resolve, reject) => {
        sendWithToken((token) => {
            firebase.auth().currentUser.getIdToken().then(token => {
                return fetch(`${FIREBASE_FUNCTIONS_URL}/export?type=${type}&address=${address}&patientId=${patientId}`, { method: 'get',  headers: new Headers({ 'Authorization': `Bearer ${token}` }) });
            })
            .then(resolve)
            .catch(reject);
        });
    });
}

export { exportTests };