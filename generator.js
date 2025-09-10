function generateLuhnChecksum(number) {
    function luhnChecksum(cardNum) {
        const digits = cardNum.toString().split('').map(Number);
        const oddDigits = digits.slice().reverse().filter((_, i) => i % 2 === 0);
        const evenDigits = digits.slice().reverse().filter((_, i) => i % 2 === 1);
        let checksum = oddDigits.reduce((sum, digit) => sum + digit, 0);
        checksum += evenDigits.reduce((sum, digit) => {
            const doubled = digit * 2;
            const doubledDigits = doubled.toString().split('').map(Number);
            return sum + doubledDigits.reduce((s, d) => s + d, 0);
        }, 0);
        return checksum % 10;
    }
    
    for (let i = 0; i < 10; i++) {
        const testNumber = number + i;
        if (luhnChecksum(testNumber) === 0) {
            return i.toString();
        }
    }
    return '0';
}

function generateCardNumber(binPrefix, length = 16) {
    const cleanBin = binPrefix.replace(/x/g, '');
    const remainingLength = length - cleanBin.length - 1;
    
    let middleDigits = '';
    for (let i = 0; i < remainingLength; i++) {
        middleDigits += Math.floor(Math.random() * 10);
    }
    
    const partialNumber = cleanBin + middleDigits;
    const checksum = generateLuhnChecksum(partialNumber);
    
    return partialNumber + checksum;
}

function generateExpirationDate() {
    const month = Math.floor(Math.random() * 12) + 1;
    const year = Math.floor(Math.random() * 5) + 2026; // 2026-2030
    return { month, year };
}

function generateCVV() {
    return Math.floor(Math.random() * 900) + 100;
}

function generateCards(quantity = 10) {
    const cards = [];
    for (let i = 0; i < quantity; i++) {
        const cardNumber = generateCardNumber('559888039xxxxxxxx');
        const { month, year } = generateExpirationDate();
        const cvv = generateCVV();
        
        cards.push({
            number: cardNumber,
            month: month.toString().padStart(2, '0'),
            year: year.toString(),
            cvv: cvv.toString()
        });
    }
    return cards;
}

function generateMoroccanName() {
    const firstNames = [
        'Ahmed', 'Mohammed', 'Hassan', 'Omar', 'Youssef', 'Karim', 'Rachid', 'Said', 'Abdel', 'Mustapha',
        'Fatima', 'Aicha', 'Khadija', 'Zineb', 'Naima', 'Hakima', 'Malika', 'Samira', 'Latifa', 'Zakia',
        'Ibrahim', 'Ali', 'Abdellah', 'Hamid', 'Tarik', 'Nabil', 'Reda', 'Yassine', 'Anas', 'Mehdi',
        'Amina', 'Sara', 'Layla', 'Nour', 'Salma', 'Ines', 'Rania', 'Hiba', 'Dounia', 'Yasmina'
    ];
    
    const lastNames = [
        'Alami', 'Benjelloun', 'Chraibi', 'Daoudi', 'El Fassi', 'Fassi', 'Gharbi', 'Hassani', 'Idrissi', 'Jabri',
        'Kabbaj', 'Lahlou', 'Mansouri', 'Naciri', 'Ouazzani', 'Rahmani', 'Saadi', 'Tazi', 'Zerouali', 'Bennani',
        'Cherkaoui', 'Dahmani', 'El Alaoui', 'Fassi', 'Guerrouj', 'Hajji', 'Ibn', 'Jabri', 'Kettani', 'Lahlou',
        'Mansouri', 'Naciri', 'Ouazzani', 'Rahmani', 'Saadi', 'Tazi', 'Zerouali', 'Bennani', 'Cherkaoui', 'Dahmani'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}
