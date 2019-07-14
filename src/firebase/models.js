class User {
    static COLLECTION = 'users';

    static ID='id';
    static FIRST_NAME='firstName';
    static LAST_NAME='lastName';
    static GMAIL='gmail';
    static ACCESS_GROUPS='accessGroups';
    static PROFILE_PICTURE='profilePicture';
    static CREATED_AT='createdAt';
    static LAST_LOGGED_IN_AT='lastLoggedInAt';

    id;
    firstName;
    lastName;
    gmail;
    accessGroups;
    profilePicture;
    createdAt;
    lastLoggedInAt;

    constructor({ id, firstName, lastName, gmail, accessGroups, profilePicture, createdAt, lastLoggedInAt }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gmail = gmail;
        this.accessGroups =accessGroups;
        this.profilePicture = profilePicture;
        this.createdAt = createdAt;
        this.lastLoggedInAt = lastLoggedInAt;
    }
}

class Patient {
    static COLLECTION = 'patients';

    static ID='id';
    static GROUP='group';
    static AGE='age';
    static CREATED_AT='createdAt';

    id;
    group;
    age;
    createdAt;

    constructor({ id, group, age, createdAt }) {
        this.id = id;
        this.group = group;
        this.age = age;
        this.createdAt = createdAt;
    }
}

class TestResult {
    static COLLECTION = 'testResults';

    static TEST_ID='testId';
    static USER_ID='userId';
    static USER_NAME='userName';
    static PATIENT_ID='patientId';
    static GROUP='group';
    static SCORE='score';
    static DESCRIPTION='description';
    static DATE='date';

    testId;
    userId;
    userName;
    patientId;
    group;
    score;
    description;
    date;

    constructor({ testId, userId, userName, patientId, group, score, description, date }) {
        this.testId = testId;
        this.userId = userId;
        this.userName = userName;
        this.patientId = patientId;
        this.group = group;
        this.score = score;
        this.description = description;
        this.date = date;
    }
}

export { User, Patient, TestResult };
