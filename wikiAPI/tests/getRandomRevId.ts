export function getRandomRevId() {
    function generateRandomDigit() {
        return Math.floor(Math.random() * 10);
    }

    let id = "";
    for (let i = 1; i <= 10; i++) {
        id += generateRandomDigit();
    }

    return parseInt(id);
}

