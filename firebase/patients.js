import firebase from 'firebase';

function getPatients(pageSize, startAt, searchPatientQuery) {
    return new Promise((resolve, reject) => {
        const ordered = firebase.database()
            .ref('patients')
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
            .ref('patients/')
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
        .ref('patients/')
        .push(newPatient);
}

export { getPatients, addPatient, checkIfPatientExists };