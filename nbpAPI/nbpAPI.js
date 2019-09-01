const request = require("request")
const colors = require("colors")
const fs = require("fs")

const validCodes = ["usd", "eur", "gbp", "chf"]

const code = process.argv[2]

const isCodeValid = validCodes.find(currency => currency === code)
    ? true
    : false
if (!isCodeValid) {
    console.log("Code is not valid try usd, eur, gbp or chf")
    process.exit()
}

const url = `http://api.nbp.pl/api/exchangerates/rates/a/${code}/?format=json`

request(url, { json: true }, (err, res, body) => {
    if (err) console.log("Error: ", err)

    if (res.statusCode !== 200) {
        console.log("Something went wrong, status code is: ", res.statusCode)
        process.exit()
    }

    const message = `Average price of ${body.code} in ${
        body.rates[0].effectiveDate
    } is ${String(body.rates[0].mid.toFixed(2))} PLN`

    fs.appendFile("./text_files/currencies.txt", "> " + message + "\n", err => {
        if (err) {
            return console.log("Failed to append data")
        }
        console.log("Data appended to currencies.txt")
    })

    body.code === "USD"
        ? console.log(message.america)
        : console.log(message.cyan.bold)
})
