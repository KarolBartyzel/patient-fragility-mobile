import firebase from 'firebase';

const PATIENTS = 'patients';
const USERS = 'users';

import testsDefinitions from './../../assets/tests';

// Helpers
function getUserGroups() {
    const { currentUser } = firebase.auth();
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(USERS)
            .orderByChild('gmail')
            .equalTo(currentUser.email)
            .once('value', (snapshot) => {
                const currentUserInfo = Object.values(snapshot.val())[0];
                resolve(currentUserInfo.groups);
            });
    });
}

// Exported
async function getPatients() {
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(PATIENTS)
            .once('value', (snapshot) => {
                const patients = Object.values(snapshot.val());
                resolve(patients);
            });
    });
}

function checkIfPatientExists(searchPatientQuery) {
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(PATIENTS)
            .orderByChild('patientId')
            .equalTo(searchPatientQuery)
            .once('value', (snapshot) => {
                resolve(snapshot.val() !== null);
            });
    });
}

function addPatient(patientId, age) {
    const patientsRef = firebase.database().ref(PATIENTS);
    return new Promise((resolve, reject) => {
        patientsRef
        .orderByChild('patientId')
        .equalTo(patientId)
        .once('value', (snapshot) => {
            if (snapshot.val()) {
                const [existingUserKey, existingUser] = Object.entries(snapshot.val())[0];
                snapshot.ref.child(existingUserKey)
                    .update({
                        age: age ? Number(age) : existingUser.age,
                        updatedAt: Date.now()
                    })
                    .then(resolve);
            }
            else {
                patientsRef
                    .push({
                        patientId,
                        age: age ? Number(age) : null,
                        tests: testsDefinitions.map((testDefinition) => ({
                            testId: testDefinition.id,
                            results: []
                        })),
                        createdAt: Date.now()
                    })
                    .then(resolve);
            }
        });
    });
}

async function getPatient(patientId) {
    const userGroups = await getUserGroups();
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(PATIENTS)
            .orderByChild('patientId')
            .equalTo(patientId)
            .once('value', (snapshot) => {
                const [key, patient] = Object.entries(snapshot.val())[0];

                resolve({
                    ...patient,
                    key,
                    tests: patient.tests.map((test) => ({
                        ...test,
                        results: test.results ? test.results.filter(testResult => userGroups.includes(testResult.group)) : [],
                    }))
                });
            });
    });
}

// Usage db.patients.addPatientTest(patient.key, "1", { testId: "1", score: 15, description: 'Mała kruchość' });
function addPatientTest(key, group, testResult) {
    const { currentUser } = firebase.auth();

    const ref = firebase.database()
        .ref(PATIENTS)
        .child(key);

    return ref
        .once('value', (snapshot) => {
            const { tests } = snapshot.val();
            const updatedTests = tests.map(test => test.testId === testResult.testId ? {
                ...test,
                results: [ ...(test.results || []), {
                    author: `${currentUser.displayName} (${currentUser.email})`,
                    group,
                    score: testResult.score,
                    description: testResult.description,
                    date: Date.now()
                } ]
            } : test);

            ref.update({ tests: updatedTests });
        });
}

export { getPatients, getPatient, addPatient, checkIfPatientExists, addPatientTest };
