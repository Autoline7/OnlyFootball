async function fetchData() {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd529d55796msh6121da346c2f555p174182jsn49c74ade16ed',
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/standings?league=39&season=2024',options);
    const data = await response.json();
    //console.log(data.response[0].team.name); //getting a club name
    return data.response;
}



async function renderClubs() {
    const clubList = document.body.querySelector(".results__list");
    //clubList.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;

    const leagueVal = document.body.querySelector('#team-select').value;

    let data = await fetchData();

    const league = data[0].league.name
    data = data[0].league.standings[0];

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

renderClubs();

