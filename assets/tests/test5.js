export default {
    "testId": "5",
    "title": "Wskaźnik kruchości Tilburga",
    "name": "Wskaźnik kruchości Tilburga",
    "questions": [
        {
            "id": "1",
            "question": "Czy czujesz się zdrowy fizycznie?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "2",
            "question": "Czy ostatnio straciłeś sporo na wadze, mimo że nie chciałeś?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "3",
            "question": "Czy na co dzień doświadczasz trudności z powodu trudności w chodzeniu?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "4",
            "question": "Czy na co dzień doświadczasz trudności z powodu trudności w utrzymaniu równowagi?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "5",
            "question": "Czy na co dzień doświadczasz trudności z powodu słabego słuchu?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "6",
            "question": "Czy na co dzień doświadczasz trudności z powodu słabego wzroku?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "7",
            "question": "Czy na co dzień doświadczasz trudności z powodu braku siły w dłoniach?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "8",
            "question": "Czy na co dzień doświadczasz trudności z powodu fizycznego zmęczenia?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "9",
            "question": "Czy masz problemy z pamięcią?",
            "questionType": "yes-sometimes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "10",
            "question": "Czy zdarzył Ci się spadek nastroju na przestrzeni ostatniego miesiąca?",
            "questionType": "yes-sometimes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "11",
            "question": "Czy odczuwałeś zdenerwowanie lub niepokój/napięcie na przestrzeni ostatniego miesiąca?",
            "questionType": "yes-sometimes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "12",
            "question": "Czy umiesz sobie dobrze radzić z problemami?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "13",
            "question": "Czy mieszkasz sam?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "14",
            "question": "Czy zdarza Ci się tęsknić za towarzystwem innych osób?",
            "questionType": "yes-sometimes-no",
            "maxPoints": null,
            "imagePath": null
        },
        {
            "id": "15",
            "question": "Czy otrzymujesz wystarczająco dużo wsparcia od innych?",
            "questionType": "yes-no",
            "maxPoints": null,
            "imagePath": null
        }
    ],
    "findScore": function findScore(answers, params) {
        const points = [
            ['no'],
            ['yes'],
            ['yes'],
            ['yes'],
            ['yes'],
            ['yes'],
            ['yes'],
            ['yes'],

            ['yes'],
            ['yes', 'sometimes'],
            ['yes', 'sometimes'],
            ['no'],

            ['yes'],
            ['yes', 'sometimes'],
            ['no'],
        ];

        return answers.filter((result, index) => points[index].includes(result.answer)).length;
    },
    "findDescription": function findDescription(score, params) {
        return score < 5 ? 'Brak kruchości'
            : score < 9 ? 'Łagodna kruchość'
            : score < 12 ? 'Umiarkowana kruchość'
            : 'Ciężka kruchość';
    },
    "maxScore": function maxScore(params) {
        return 20;
    }
}
