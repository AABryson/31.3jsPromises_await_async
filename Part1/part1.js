let baseURL = "http://numbersapi.com";
let favNum = 1;
//1.Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
async function favNumFact() {
    let response = await axios.get(`${baseURL}/${favNum}?json`)
    console.log(response)
}
favNumFact();
//2.Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let nums = [1, 5]
async function multNums() {
    let response = await axios.get(`${baseURL}/${nums}?json`)
    console.log(response)
}
multNums();
//3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
let fourPromises = []
let div = $('div')

async function multFacts() {
    for (let i = 0; i < 4; i++) {
        let response = await axios.get(`${baseURL}/${favNum}?json`);
        fourPromises.push(response);
    }
    console.log(fourPromises);
    let facts = await Promise.all(fourPromises);
    facts.forEach(function (fact) {
//################################################
        div.append(`${fact.data.text}`);
    });
};
multFacts();

