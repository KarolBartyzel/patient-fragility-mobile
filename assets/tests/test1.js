export default {
    "testId": "1",
    "title": "Skala Katza",
    "name": "Skala Katza (ADL)",
    "questions": [
        {
            "id": "1",
            "question": "Samodzielność w kąpaniu się.",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "2",
            "question": "Samodzielność w ubieraniu i rozbieraniu się.",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "3",
            "question": "Samodzielność w korzystaniu z toalety.",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "4",
            "question": "Samodzielność we wstawaniu z łóżka i przemieszczaniu się na fotel.",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "5",
            "question": "Samodzielność w jedzeniu.",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "6",
            "question": "Kontrolowane wydalanie moczu i stolca.",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        }
    ],
    "findScore": function findScore(answers, params) {
        return answers.filter(({ answer }) => answer === 'yes').length;
    },
    "findDescription": function findDescription(score, params) {
        return score <= 2 ? 'Osoby znacznie niesprawne' : score <= 4 ? 'Osoby umiarkowanie niesprawne' : 'Osoby sprawne';
    },
    "maxScore": function maxScore(params) {
        return 6;
    }
}
