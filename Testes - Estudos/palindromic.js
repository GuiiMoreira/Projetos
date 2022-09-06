let i = 1n;
let x = 3n * (10n ** 1000020n);
let pi = x;
while (x > 0) {
    x = x * i / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
}

pi = `${pi / (10n ** 20n)}`

let result
let inverse
let divider
let counter

for (let i = 0; i < (pi.length - 9); i++) {
    counter = 0
    result = pi.substring(i, i + 9);
    inverse = result.split("").reverse().join("");

    if (result === inverse) {
        result = parseInt(result)
        for (divider = 1; divider <= result; divider++) {
            if (result % divider === 0) {
                counter++
            }
        }
        console.log("palindromic : " + result, " is divisible by: " + counter + " numbers")
    }
}