const request = require("request")

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
    console.log(body)
})
