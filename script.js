const main = document.querySelector('.main');

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

getTrendingMovies();

function createMovieCard(items){
    items.forEach(item => {
        const title = item.name;
        const score = item.vote_average;
        const imagePath = item.backdrop_path;
        
        // Creating one movie car for each movie retrieved.
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie_box');
        
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie_box-image');
        movieImg.src = imagePath;
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
        movieScore.textContent = score;
        movieDescription.appendChild(movieScore);

        main.appendChild(movieCard);

    });
}