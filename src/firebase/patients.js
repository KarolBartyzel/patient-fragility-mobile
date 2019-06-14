import firebase from 'firebase';

import testsDefinitions from './../../assets/tests';
import { User, Patient, TestResult } from './models';

// Helpers
function getUserGroups() {
    const { currentUser } = firebase.auth();
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(User.COLLECTION)
            .orderByChild(User.GMAIL)
            .equalTo(currentUser.email)
            .once('value', (snapshot) => {
                const currentUserInfo = new User(Object.values(snapshot.val())[0]);
                resolve(currentUserInfo.groups);
            });
    });
}

// Exported
async function getPatients(patientId) {
    return new Promise((resolve, reject) => {
        const orderedQuery = firebase.database()
            .ref(Patient.COLLECTION)
            .orderByChild(Patient.ID);

        (patientId ? orderedQuery.startAt(patientId).endAt(`${patientId}\uf8ff`) : orderedQuery)
            .once('value', (snapshot) => {
                const value = snapshot.val();
                const patients = value ? Object.values(value).map((rawPatient) => new Patient(rawPatient)) : [];
                resolve(patients);
            });
    });
}

function checkIfPatientExists(searchPatientQuery) {
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(Patient.COLLECTION)
            .orderByChild(Patient.ID)
            .equalTo(searchPatientQuery)
            .once('value', (snapshot) => {
                resolve(snapshot.val() !== null);
            });
    });
}

async function addPatient(id, age) {
    const newPatient = new Patient({
        id,
        age: age ? Number(age) : null,
        createdAt: Date.now()
    });

    return firebase
        .database()
        .ref(`/${Patient.COLLECTION}/${id}`)
        .set(newPatient);
}

async function getPatientResults(patientId) {
    const userGroups = await getUserGroups();
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(TestResult.COLLECTION)
            .orderByChild(TestResult.PATIENT_ID)
            .equalTo(patientId)
            .once('value', (snapshot) => {
                const value = snapshot.val();
                const testResults = value ?  Object.values(value).filter(testResult => userGroups.includes(testResult.group)) : [];
                resolve(testResults);
            });
    });
}

async function getPatientLastResults(patientId) {
    const patientResults = await getPatientResults(patientId);
    const sortedPatientResults = patientResults.sort((ft1, ft2) => ft1.date < ft2.date ? 1 : -1);
    const patientLastResults = testsDefinitions.map((testDefinition) => sortedPatientResults.find((spr) => spr.testId === testDefinition.testId) || null);
    return patientLastResults;
}

async function getPatientTestResults(patientId, testId) {
    const patientResults = await getPatientResults(patientId);
    const patientTestResults = patientResults.filter((testResult) => testResult.testId === testId);
    return patientTestResults;
}

// Usage db.patients.addPatientTest(testId, patientId, "1", 15, 'Mała kruchość');
function addPatientTest(testId, patientId, group, score, description) {
    const { currentUser } = firebase.auth();

    const newTestResult = new TestResult({
        testId,
        userId: currentUser.uid,
        userName: `${currentUser.displayName} (${currentUser.email})`,
        patientId,
        group,
        score,
        description,
        date: Date.now()
    });

    return firebase.database()
        .ref(TestResult.COLLECTION)
        .push(newTestResult);
}

export { getPatients, getPatientLastResults, getPatientTestResults, addPatient, checkIfPatientExists, addPatientTest };
