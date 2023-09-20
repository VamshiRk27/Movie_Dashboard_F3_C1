function searchMovies(){
    const apiKey=document.getElementById("apiKey").value;
    // ddd876f
    const movieTitle=document.getElementById("movieTitle").value;
    if(!apiKey || !movieTitle){
        showError("Both fields are required");
        return;
    }
    const url=`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;
    document.getElementById("loader").style.display="block";
    fetch(url)
    .then((response) =>response.json())
    .then((data) => {
        document.getElementById("loader").style.display="none";
        if(data.Error){
            showError(data.Error);
        }
        else if(data.Search.length>0){
            renderData(data.Search);
            showError("");
        }
    });
}

function showError(message){
    // displays error in #error-message
    document.getElementById("error-message").innerText=message;
}

const button=document.getElementById("search-btn");
button.addEventListener("click",searchMovies);

function renderData(movies){
    const resultContainer=document.getElementById("results");
    resultContainer.innerHTML="";
    movies.forEach((item,index) => {
        const card=document.createElement("div");
        card.className="card";
        card.innerHTML=`
        <img id="cardimg" src="${item.Poster}" alt="${item.Title}">
        <div class="row-1">
            <h1>${index+1}</h1>
            <h2>${item.Title}</h2>
        </div>
        <div class="row-2">
            <p>${item.Year}</p>
            <p>${item.imdbID}</p>
        </div>
        `;
        resultContainer.appendChild(card);
    });
}