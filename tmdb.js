
getMovies("https://api.themoviedb.org/3/search/movie?query=blade runner&api_key=3972673c7c2bf3c70fc1b5593e956b47");

function getMovies(url){
    fetch(url).then(res=> res.json()).then(data => {
        data.results.forEach(movie => {
            const movieId = movie.id;
            const movieName = movie.title;
            console.log(`Movie ID: ${movieId}, Movie Name: ${movieName}`);
        });
    })
}
