import firebase from 'firebase';
import { groupBy } from 'lodash';

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
                if (snapshot.exists()) {
                    const currentUserInfo = new User(Object.values(snapshot.val())[0]);
                    if (currentUserInfo.accessGroups) {
                        resolve(currentUserInfo.accessGroups.map(({ group, subgroup }) => ({ group: String(group), subgroup: String(subgroup) })));
                    }
                    else {
                        resolve(null);
                    }
                }
                else {
                    resolve(null);
                }
            });
    });
}

// Exported
async function getPatients(patientId) {
    return new Promise(async (resolve, reject) => {
        const userGroups = await getUserGroups();
        const orderedQuery = firebase.database()
            .ref(Patient.COLLECTION)
            .orderByChild(Patient.ID);

        (patientId ? orderedQuery.startAt(patientId).endAt(`${patientId}\uf8ff`) : orderedQuery)
            .once('value', (snapshot) => {
                const value = snapshot.val();
                const patients = value ? Object.values(value).map((rawPatient) => new Patient(rawPatient)) : [];
                const filteredPatients = patients.filter((patient) => userGroups.map((userGroup) => userGroup.group).includes(patient.group));
                resolve(filteredPatients);
            });
    });
}

async function isUserAuthorized() {
    const userGroups = await getUserGroups();
    return Boolean(userGroups);
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
                const testResults = value ?  Object.values(value).filter(testResult => userGroups.some((accessGroup) => accessGroup.group === testResult.accessGroup.group && accessGroup.subgroup === testResult.accessGroup.subgroup)) : [];
                resolve(testResults);
            });
    });
}

async function getPatientLastResults(patientId) {
    const patientResults = await getPatientResults(patientId);
    const sortedPatientResults = patientResults.sort((ft1, ft2) => ft1.date < ft2.date ? 1 : -1);
    const groupedByTestPatientResults = groupBy(sortedPatientResults, 'testId');
    const patientLastResults = testsDefinitions
        .map((testDefinition) => groupedByTestPatientResults[testDefinition.testId])
        .map((testsResults) => testsResults ? ({ count: testsResults.length, ... testsResults[0] }) : null);

    return patientLastResults;
}

async function getPatientTestResults(patientId, testId) {
    const patientResults = await getPatientResults(patientId);
    const patientTestResults = patientResults.filter((testResult) => testResult.testId === testId);
    return patientTestResults;
}

// Usage db.patients.addPatientTest(testId, patientId, "1", 15, 'Mała kruchość');
function addPatientTest(testId, patientId, accessGroup, score, description) {
    const { currentUser } = firebase.auth();

    const newTestResult = new TestResult({
        testId,
        userId: currentUser.uid,
        userName: `${currentUser.displayName} (${currentUser.email})`,
        patientId,
        accessGroup,
        score,
        description,
        date: Date.now()
    });

    return firebase.database()
        .ref(TestResult.COLLECTION)
        .push(newTestResult);
}

export { isUserAuthorized, getUserGroups, getPatients, getPatientLastResults, getPatientTestResults, addPatient, checkIfPatientExists, addPatientTest };
