export default {
    "testId": "3",
    "title": "Krótka Skala Oceny Stanu Psychicznego",
    "name": "Krótka Skala Oceny Stanu Psychicznego (MMSE)",
    "questions": [
        {
            "id": "1",
            "question": "Jaki jest teraz rok?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "2",
            "question": "Jaka jest teraz pora roku?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "3",
            "question": "Jaki jest teraz miesiąc?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "4",
            "question": "Jaka jest dzisiejsza data (którego dzisiaj mamy)?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "5",
            "question": "Jaki jest dzisiaj dzień tygodnia?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "6",
            "question": "W jakim kraju się znajdujemy?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "7",
            "question": "W jakim województwie się znajdujemy?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "8",
            "question": "W jakim mieście się teraz znajdujemy?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "9",
            "question": "Jak nazywa się miejsce, w którym się teraz znajdujemy?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "10",
            "question": "Na którym piętrze się obecnie znajdujemy?",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "11",
            "question": "Wymienię teraz trzy słowa. Kiedy skończę, proszę, aby je Pan/Pani powtórzył(a). Proszę je zapamiętać, bo zapytam o nie powtórnie za kilka minut. (KOZA, GROSZ, ŁAWKA)",
            "questionType": "graded",
            "maxPoints": 3,
            "imagePath": null
        },
        {
            "id": "12",
            "question": "Proszę odejmować kolejno od 100 po 7, aż powiem stop (93, 86, 79, 72, 65)",
            "questionType": "graded",
            "maxPoints": 5,
            "imagePath": null
        },
        {
            "id": "13",
            "question": "Proszę wymienić trzy słowa, które Pan(i) miał(a) wcześniej zapamiętać. (KOZA, GROSZ, ŁAWKA)",
            "questionType": "graded",
            "maxPoints": 3,
            "imagePath": null
        },
        {
            "id": "14",
            "question": "Prosimy o nazwanie dwóch przedmiotów, które kolejno pokazujemy badanemu (ołówek, zegarek).",
            "questionType": "graded",
            "maxPoints": 2,
            "imagePath": null
        },
        {
            "id": "15",
            "question": "Proszę dosłownie powtórzyć następujące zdanie: (bez jeżeli ani lub)",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "16",
            "question": "a) Proszę uważnie posłuchać treści całego polecenia, a następnie wykonać to polecenie. (1. proszę wziąć kartkę do lewej/prawej ręki 2. złożyć ją oburącz na połowę 3. i położyć ją na kolana)",
            "questionType": "graded",
            "maxPoints": 3,
            "imagePath": null
        },
        {
            "id": "17",
            "question": "b) Pokazujemy badanemu tekst polecenia zamieszczony na okładce: „Proszę zamknąć oczy”. Proszę przeczytać to polecenie i je wykonać",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "18",
            "question": "Dajemy osobie badanej czystą kartkę papieru i prosimy o napisanie dowolnego zdania. Proszę napisać na tej kartce jakieś dowolne zdanie",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": null
        },
        {
            "id": "19",
            "question": "Proszę przerysować ten rysunek tak dokładnie, jak tylko jest to możliwe",
            "questionType": "graded",
            "maxPoints": 1,
            "imagePath": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/InterlockingPentagons.svg/1200px-InterlockingPentagons.svg.png"
        }
    ],
    "findScore": function findScore(answers, params) {
        const { educationDuration, age } = params;
        return answers.map(({ answer }) => answer).reduce((sum, value) => sum + value, 0) - Math.round(0.471 * (educationDuration - 12) + 0.31 * (70 - age));
    },
    "findDescription": function findDescription(answers, score) {
        return score <= 10 ? 'Otępienie głębokie'
            : score <= 18 ? 'Otępienie średniego stopnia'
            : score <= 23 ? 'Otępienie lekkiego stopnia'
            : score <= 26 ? 'Zaburzenia poznawcze bez otępienia'
            : 'Wynik prawidłowy';
    },
    "maxScore": function maxScore(educationDuration, age) {
        return 30;
    }
}
