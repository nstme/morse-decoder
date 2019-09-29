const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    //convert input string code to array where each array element has 2 symbols
    let codeArray = expr.match(/.{1,2}/g);

    //create new array with decoded values
    function decodeDotDash(array) {
        let newArray = [];
        for (let entry of array) {
            if (entry === '00') {
                newArray.push('$');
            } else if (entry === '10') {
                newArray.push('.');
            } else if (entry === '11') {
                newArray.push('-');
            } else {
                newArray.push('*');
            }
        }
        return newArray;
    }

    //decode and create new array where each array element has 5 symbols 

    let noDotDashArray = decodeDotDash(codeArray).join('').match(/.{1,5}/g);

    function removeDollar(array) {
        newArray = [];
        for (entry of array) {
            let newEntry = entry.replace(/\$+/, '');
            newArray.push(newEntry);
        }
        return newArray;
    }

    let noDollarArray = removeDollar(noDotDashArray);

    //decode using matching key-value pairs in MORSE_TABLE
    MORSE_TABLE['*****'] = ' ';
    
    function decodeToString(array) {
        let decoded = '';

        for (let i = 0; i <= array.length; i++) {
            for (let key in MORSE_TABLE) {
                if (array[i] === key) {
                    decoded = decoded.concat(MORSE_TABLE[key]);
                }
            }
        }
        return decoded;
    };

    let decodedString = decodeToString(noDollarArray);

    return decodedString;

}

module.exports = {
    decode
}
