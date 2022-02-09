function MathChallenge(num) {

    while (num > 2) {
        num = num / 2
    }


    if (num % 2 === 0) {
        num = true
    } else {
        num = false
    }

    console.log(num)
    return num;
}

MathChallenge(124)