const main = document.querySelector('.main');
const submitButton = document.querySelector('.submitButton');
const searchBar = document.querySelector('.nav-search');

const key ='81826c9d2ba10437312316d8fbbf0af5';

async function getTrendingMovies(){

    try{
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${key}`)
        const data = await res.json();
        const movies = data.results;
        createMovieCard(movies);

    } catch(err){
        console.log(err);
    }
}

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    const query = searchBar.value;
    getSearchMovies(query);
});


async function getSearchMovies(query){
    try{
        main.textContent = '';
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=%27${query}%27&page=1&include_adult=false`);
        const data = await res.json();
        const movies = data.results;
        createMovieCard(movies);
        searchBar.value = '';
    } catch(err){
        console.log(err);
    }
}

getTrendingMovies();

function createMovieCard(items){
    items.forEach(item => {
        const title = item.name  ? item.name : item.title;
        const score = item.vote_average;
        const imagePath = item.poster_path;
        const overview = item.overview;
        
        // Creating one movie car for each movie retrieved.
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie_box');
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie_box-image');
        movieImg.src = `https://image.tmdb.org/t/p/w400/${imagePath}`;
        movieCard.appendChild(movieImg);

       
        const movieDescription = document.createElement('div');
        movieDescription.classList.add('movie_box-description');
        movieCard.appendChild(movieDescription);

        const movieTitle = document.createElement('h2');
        movieTitle.classList.add('heading-2');
        movieTitle.textContent = title;
        movieDescription.appendChild(movieTitle);

        const movieScore = document.createElement('h3');
        movieScore.classList.add('score');
        
        movieScore.textContent = +score.toFixed(1);
        movieScore.style.color = checkScoreColor(+score.toFixed(1));

        movieDescription.appendChild(movieScore);

        const sinopseBox = document.createElement('div');
        sinopseBox.classList.add('movie_box-sinopse');
        
        const h2Title = document.createElement('h2');
        h2Title.classList.add('heading-2');
        h2Title.textContent = 'Description';
        sinopseBox.appendChild(h2Title);
        
        const sinopse = document.createElement('p');
        sinopse.classList.add('sinopse');
        sinopse.textContent = overview;
        sinopseBox.appendChild(sinopse);

        movieCard.appendChild(sinopseBox);

        main.appendChild(movieCard);

    });
}

function checkScoreColor(score){
    if (score < 5){
        return 'red';
    }
    if (score >= 5 & score < 8){
        return 'orange';
    } 
    if (score >= 8){
        return 'blue';
    }

}