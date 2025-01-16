async function fetchData(leagueVal) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd529d55796msh6121da346c2f555p174182jsn49c74ade16ed',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?league=${leagueVal}&season=2024`,options);
    const data = await response.json();
    return data.response;
}

async function fetchTeam(clubName) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd529d55796msh6121da346c2f555p174182jsn49c74ade16ed',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?name=${clubName.replace(/ /g, "%20")}`,options);
    const data = await response.json();
    return data.response[0];
}

async function renderClubsByName(event) {

    
    
    if(event.keyCode == 13){
        const clubList = document.body.querySelector(".results__list");
        clubList.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;
        let value = document.querySelector(".nav__input").value;
        let data  = await fetchTeam(value);
        clubHTML(data);
    }
    
    
}

async function renderClubs() {
    let leagueVal = document.body.querySelector('#team-select').value;

    const clubList = document.body.querySelector(".results__list");
    clubList.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;

    let data = await fetchData(leagueVal);
    const league = data[0].league.name
    data = data[0].league.standings[0];

    if(document.body.querySelector('.options__view').value === "false"){
        console.log("here");
        data = data.slice(0,6);
    }
    
    clubsHTML(data,league);
    
}

const clubHTML = (data) =>{
    const searchResult = document.querySelector(".searchInputHere");
    searchResult.innerHTML = `<h1>${data.team.name}</h1>`;
    const clubList = document.body.querySelector(".results__list");
    clubList.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;

    document.body.querySelector('#team-select').value = "";

    clubList.innerHTML = `<div class="result">
                            <figure class="result__image__wrapper">
                                <img class="result__image" src="${data.team.logo}" alt="">
                            </figure>
                            <div class="result__info">
                                <div class="result__info__name">${data.team.name}</div>
                                <div class="result__info__league">${data.team.code}</div>
                            </div>
                            <div class="result__info__hover">
                                <div class="result__info__hover__stats">
                                    <div class="result__info__hover__league-points">${data.team.code}</div>
                                    <div class="result__info__hover__stat">Venue: ${data.venue.name}</div>
                                    <div class="result__info__hover__stat">Capacity: ${data.venue.capacity}</div>
                                </div>
                                <div class="result__info__hover__game">Founded: <span class="nextgame">${data.team.founded}</span></div>
                            </div>
                            <div class="result__info__hover__country">${data.team.country}</div>
                        </div>`;

    
}

const clubsHTML = (data, league) =>{
    
    const clubList = document.body.querySelector(".results__list");

    const searchResult = document.querySelector(".searchInputHere");
    searchResult.innerHTML = `<h1></h1>`;

    const clubsHTML = data.map((data) => {
        return `<div class="result">
                            <figure class="result__image__wrapper">
                                <img class="result__image" src="${data.team.logo}" alt="">
                            </figure>
                            <div class="result__info">
                                <div class="result__info__name">${data.team.name}</div>
                                <div class="result__info__league">${league}</div>
                            </div>
                            <div class="result__info__hover">
                                <div class="result__info__hover__stats">
                                    <div class="result__info__hover__league-points">Points: ${data.points}</div>
                                    <div class="result__info__hover__stat">W:${data.all.win} D:${data.all.draw} L:${data.all.lose}</div>
                                    <div class="result__info__hover__stat">GF:${data.all.goals.for} GA:${data.all.goals.against} GD:${data.goalsDiff}</div>
                                </div>
                                <div class="result__info__hover__game">Form: <span class="nextgame">${data.form}</span></div>
                            </div>
                            <div class="result__info__hover__rank">Rank: ${data.rank}</div>
                        </div>`
    }).join("");

    clubList.innerHTML = clubsHTML;
}

const searchBarClick = async () =>{
    const value = document.querySelector(".nav__input").value;
    if(value != ""){
        let data  = await fetchTeam(value);
        clubHTML(data);
    }
}


renderClubs();

