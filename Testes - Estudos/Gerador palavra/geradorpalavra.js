
const main = (params) => {
    let randomWord = '';
    let characters = 'abcdefghijklmnopqrstuvxyz';

    for (let i = 0; i < params; i++) {
        let rdmNumber = Math.floor(Math.random() * characters.length);
        randomWord += characters.substring(rdmNumber, rdmNumber + 1);

    }

    console.log(randomWord)
}

for (let i = 0; i < 1000; i++) {
    main(5)
}

