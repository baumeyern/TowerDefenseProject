
/**
 * Tests if two objects are colliding/overlapping. Used primarily to test if mouse is over a map tile.
 * @param {object} box1 First object to test is there is collision
 * @param {object} box2 Second object to test if there is collision
 * @returns {boolean} true if the objects are colliding, false otherwise
 */
export function collision(box1, box2) {
    if (box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y) {
        return true;
    }
    else {
        return false;
    }
}

export let numerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
};

/**
 * Converts number into Roman Numeral form
 * @param {number} num Number to be converted
 * @returns {string} Converted Roman Numeral
 */
export const convertToRoman = (num) => {
    let newNumeral = "";

    for (let i in numerals) {
        while (num >= numerals[i]) {
            newNumeral += i;
            num -= numerals[i];
        }
    }

    return newNumeral;
};
