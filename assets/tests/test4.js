export default {
    "testId": "4",
    "title": "Przesiewowy kwestionariusz oceny stanu zdrowia i autonomii",
    "name": "Przesiewowy kwestionariusz oceny stanu zdrowia i autonomii (PRISMA 7)",
    "questions": [
        {
            "id": "1",
            "question": "Czy ma pani/pan więcej niż 85 lat?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "2",
            "question": "Płeć męska?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "3",
            "question": "Ogólnie biorąc, czy problemy zdrowotne zmuszają panią/pana do ograniczania aktywności?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "4",
            "question": "Czy często potrzebuje pani/pan pomocy innych osób?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "5",
            "question": "Ogólnie biorąc, czy problemy zdrowotne zmuszają panią/pana do pozostania w domu?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "6",
            "question": "W razie potrzeby, czy może pani/pan liczyć na pomoc kogoś bliskiego?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "7",
            "question": "Czy często używa pani/pan laski, chodzika lub wózka inwalidzkiego do przemieszczania się?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        }
    ],
    "findScore": function findScore(answers, params) {
        return answers.filter(({ answer }) => answer === 'yes').length;
    },
    "findDescription": function findDescription(answers, score) {
        return score < 4 ? 'Wynik ujemny' : 'Wynik dodatni';
    },
    "maxScore": function maxScore(educationDuration, age) {
        return 7;
    }
}
