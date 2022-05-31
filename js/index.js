const url =
    'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=30&format=json&origin=*&srsearch=';

let search_btn = document.querySelector(".search_btn")
let search_input = document.querySelector(".search_input")
let form = document.querySelector("form")
let results = document.querySelector(".results")

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = search_input.value;
    fetchResults(value);
});
function fetchResults(value) {
    results.innerHTML = `<div class="loading">loading...</div>`
    fetch(`${url}${value}`).then(res => {
        let info = res.json()
        if (res.length < 0) { results.innerHTML = `<div class="error">please enter a valid search</div>` }
        console.log(info); return info
    })
        .then(res => { showResults(res) ;console.log(res)})
        .catch(err => {
            results.innerHTML = `<div class="error"> error when fetching data</div>`
            console.log(err)
        })

}

function showResults(data) {
    let final_results = data.query.search.map((item) => {

        return (`<div class="card ps-2">
       <a href="https://en.wikipedia.org/?curid=${item.pageid}" class=" fs-4 ">${item.title}</a>
       <a class="fs-6 text-success" href="https://en.wikipedia.org/?curid=${item.pageid}">https://en.wikipedia.org/?curid=${item.pageid}</a>
       <p class="content">${item.snippet}</p>
      </div>`)
    }).join('')
    results.innerHTML = `${final_results}`

}