const fetch = require("node-fetch")

const arg =
    process.argv[2] ||
    (console.log("Write something in format --{year, math, trivia}={number}") ||
        process.exit())
const equalSign = arg.search("=")

const number = arg.slice(equalSign + 1) || Math.floor(Math.random() * 2020)

let type = ""

if (number === "" || isNaN(Number(number))) {
    console.log("To nie jest liczba")
    process.exit()
}

if (equalSign === -1) console.log("You did not specified any number")

if (arg.indexOf("--year") === 0) {
    console.log("We are searching informations about given year...")
    type = "year"
} else if (arg.indexOf("--math") === 0) {
    console.log("We are searching some math fact about given number...")
    type = "math"
} else if (arg.indexOf("--trivia") === 0) {
    console.log("We are searching some trivia about given number...")
    type = "trivia"
}

fetch(`http://numbersapi.com/${number}/${type}?json`)
    .then(res => {
        if (res.ok) {
            return res.json()
        } else {
            throw new Error("Something went wrong:" + res.status)
        }
    })
    .then(data => console.log(data.text))
    .catch(err => console.log("Error", err))
