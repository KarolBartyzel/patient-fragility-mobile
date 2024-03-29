export default {
    "testId": "2",
    "title": "Kliniczna skala kruchości",
    "name": "Kliniczna skala kruchości",
    "questions": [
        {
            "id": "1",
            "question": "Bardzo sprawni - wytrzymali, aktywni, energiczni i zmotywowani. Regularna aktywność fizyczna. Są bardzo sprawni w porównaniu do większości rówieśników",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/94/8f/f5/948ff52f6b9768db0773ea5fd1f8092e.jpg"
        },
        {
            "id": "2",
            "question": "Sprawni – brak objawów aktywnej choroby mniej sprawni niż kategoria 1. Często aktywni fizycznie lub okresowo bardzo aktywni np. sezonowo",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/e2/cd/d3/e2cdd31f032aa2396f0ec5516422705b.jpg"
        },
        {
            "id": "3",
            "question": "Radzący sobie - problemy zdrowotne są dobrze kontrolowane, brak regularnej aktywności fizycznej poza codziennym chodzeniem",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/d3/14/20/d314204ded23cd978a26acafa0ca2de0.jpg"
        },
        {
            "id": "4",
            "question": "Osłabiony/Podatny na chorobę - są niezależni od innych osób w codziennych obowiązkach, objawy chorobowe często ograniczają aktywność. Często skarżą się na „ociężałość/spowolnienie” i/lub zmęczenie w ciągu dnia",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/7f/8d/43/7f8d4329fb644db434beef46516cb63d.jpg"
        },
        {
            "id": "5",
            "question": "Łagodna kruchość – wyraźne spowolnienie ruchowe, potrzebują pomocy w codziennych aktywnościach (finanse, transport, prace domowe, leki). Zazwyczaj łagodna kruchość stopniowo upośledza samodzielność w robieniu zakupów, poruszaniu się, przygotowywaniu posiłków i pracach domowych",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/31/bb/14/31bb140947d9b3b7be9ad6b407b80b50.jpg"
        },
        {
            "id": "6",
            "question": "Umiarkowana kruchość - potrzebują pomocy we wszystkich aktywnościach i prowadzeniu domu. Często mają problemy z poruszaniem się po schodach, myciu się, mogą potrzebować minimalnej pomocy w ubieraniu się",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/07/81/b3/0781b3805ae495c0390bc3f22b94f406.jpg"
        },
        {
            "id": "7",
            "question": "Ciężka kruchość - całkowicie uzależnieni od pomocy innych osób bez względu na przyczynę upośledzenia stanu zdrowia (fizyczna lub mentalna). Mimo to, stan stabilny, nie ma dużego ryzyko zgonu w ciągu najbliższych 6 miesięcy",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/a7/6c/08/a76c08599cb456214a46f95217401584.jpg"
        },
        {
            "id": "8",
            "question": "Bardzo nasilona kruchość - stan ciężki, całkowicie zależni od pomocy innych osób, zbliżają się do końca życia. Nawet niewielkie nasilenie objawów chorobowych lub typowo niegroźne nowe choroby mogą zagrażać życiu",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/bf/36/16/bf3616d54f04ca5f44fee4b94501ca85.jpg"
        },
        {
            "id": "9",
            "question": "Śmiertelnie chory – stan krytyczny, schyłkowy etap choroby/życia. Ta kategoria odnosi się do osób o średniej przewidywanej długości życia <6 miesięcy, chorzy w inny sposób nie wykazują ewidentnych cech kruchości",
            "questionType": "select",
            "maxPoints": null,
            "imagePath": "https://i.pinimg.com/564x/2c/2b/c2/2c2bc25c95924f6a491b4b2738d03795.jpg"
        }
    ],
    "findScore": function findScore(answers, params) {
        return 9 - (parseInt(answers[0].id, 10) - 1);
    },
    "findDescription": function findDescription(score, params) {
        return score === 9 ? 'Bardzo sprawni'
        : score === 8 ? 'Sprawni'
        : score === 7 ? 'Radzący sobie'
        : score === 6 ? 'Osłabiony/Podatny na chorobę'
        : score === 5 ? 'Łagodna kruchość'
        : score === 4 ? 'Umiarkowana kruchość'
        : score === 3 ? 'Ciężka kruchość'
        : score === 2 ? 'Bardzo nasilona kruchość'
        : 'Śmiertelnie chory';
    },
    "maxScore": function maxScore(params) {
        return 9;
    }
}
