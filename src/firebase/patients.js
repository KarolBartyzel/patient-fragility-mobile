import firebase from 'firebase';

const PATIENTS = 'patients';

function getPatients(pageSize, startAt, searchPatientQuery) {
    return new Promise((resolve, reject) => {
        const ordered = firebase.database()
            .ref(PATIENTS)
            .orderByChild('patientId');

        const filtered = searchPatientQuery
            ? ordered
                .startAt(searchPatientQuery)
                .endAt(`${searchPatientQuery}\uf8ff`)
            : ordered
                .startAt(startAt);

        filtered
            .limitToFirst(pageSize + 1)
            .once('value', (snapshot) => {
                const items = [];
                let newStartAt = null;
                let i = 0;
                snapshot.forEach((child) => {
                    if (i < pageSize) {
                        items.push(child.val());
                    }
                    else {
                        newStartAt = child.val().patientId;
                    }
                    i++;
                });
                resolve({ items, startAt: newStartAt });
            });
    });
}

function checkIfPatientExists(searchPatientQuery) {
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(PATIENTS)
            .orderByChild('patientId')
            .equalTo(searchPatientQuery.toLowerCase())
            .once('value', (snapshot) => {
                resolve(snapshot.val() !== null);
            });
    });
}

function addPatient(patient) {
    const newPatient = {
        patientId: patient.patientId,
        age: !patient.age ? null : Number(patient.age),
        createdAt: Date.now()
    };

    return firebase.database()
        .ref(PATIENTS)
        .push(newPatient);
}

function getPatient(patientId) {
    return new Promise((resolve, reject) => {
        firebase.database()
            .ref(PATIENTS)
            .orderByChild('patientId')
            .equalTo(patientId)
            .once('value', (snapshot) => {
                const [key, patient] = Object.entries(snapshot.val())[0];
                resolve({ ...patient, key });
            });
    });
}

// patients.addPatientTest(patient.key, { testId: 1, score: 10, description: 'Średnia kruchość', date: Date.now() });
// patients.addPatientTest(patient.key, { testId: 2, score: 15, description: 'Mała kruchość', date: Date.now() });
function addPatientTest(key, test) {
    const ref = firebase.database()
        .ref(PATIENTS)
        .child(key);

    return ref
        .once('value', (snapshot) => {
            let { tests } = snapshot.val();
            if (tests === undefined) {
                tests = [];
            }
            tests.push(test);
            ref.update({ tests });
        });
}

export { getPatients, getPatient, addPatient, checkIfPatientExists, addPatientTest };
