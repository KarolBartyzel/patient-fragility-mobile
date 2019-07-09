

function calculateTestResult(testId, answers, params) {
    if (testId === "1") {
        return calculateTest1Result(answers, params);
    } else if (testId === "2") {
        return calculateTest2Result(answers, params);
    } else if (testId === "3") {
        return calculateTest3Result(answers, params);
    } else if (testId === "4") {
        return calculateTest4Result(answers, params);
    } else if (testId === "5") {
        return calculateTest5Result(answers, params);
    } 
}

function calculateTest1Result(answers) {
    const score = answers.filter(({ answer }) => answer === 'yes').length;
    const description = score <= 2 ? 'Osoby znacznie niesprawne' : score <=4 ? 'Osoby umiarkowanie niesprawne' : 'Osoby sprawne';

    return {
        score,
        description
    };
}

function calculateTest2Result(answers) {
    const selection = answers[0].id;
    var description = "";
    const score = null;
    if (selection === "1") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 0%';
    } else if (selection === "2") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 21.2%';
    } else if (selection === "3") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 42.4%';
    } else if (selection === "4") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 63.6%';
    } else if (selection === "5") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 84.8%';
    } else if (selection === "6") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 100%';
    } else if (selection === "7") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 100%';
    } else if (selection === "8") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 100%';
    } else if (selection === "9") {
        description = 'Ryzyko zgonu w ciągu 70 miesięcy: około 100%';
    } 

    return {
        score,
        description
    };
}

function calculateTest3Result(answers, params) {
    const { age, educationDuration } = params;

    const score = answers.map(({ answer }) => answer).reduce((sum, value) => sum + value, 0) - 
        Math.round(0.471 * (educationDuration - 12) + 0.31 * (70 - age));

    const description = score <= 10 ? 'Otępienie głębokie' 
        : score <= 18 ? 'Otępienie średniego stopnia' 
        : score <= 23 ? 'Otępienie lekkiego stopnia'
        : score <= 26 ? 'Zaburzenia poznawcze bez otępienia'
        : 'Wynik prawidłowy';

    return {
        score,
        description
    };
}

function calculateTest4Result(answers) {
    const score = answers.filter(({ answer }) => answer === 'yes').length;
    const description = score < 4 ? 'Wynik ujemny' : 'Wynik dodatni';

    return {
        score,
        description
    };
}

function calculateTest5Result(answers) {
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

    const score = answers.filter((result, index) => points[index].includes(result.answer)).length;
    const description = score < 5 ? 'Brak kruchości'
        : score < 9 ? 'Łagodna kruchość'
        : score < 12 ? 'Umiarkowana kruchość'
        : 'Ciężka kruchość';

    return {
        score,
        description
    };
}

export { calculateTestResult };