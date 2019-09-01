const fetch = require("node-fetch")

const year = process.argv[2]

fetch(`http://numbersapi.com/${year}/year?json`)
    .then(res => res.json())
    .then(data => console.log(data.text))
    .catch(err => console.log("Error", err))
