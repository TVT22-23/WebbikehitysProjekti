
/* Different queries:
    Get trending movies by week: https://api.themoviedb.org/3/trending/movie/week?api_key={api_key}   
    Get details of a specific movie by id: https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}  
    Search movie by it's name: https://api.themoviedb.org/3/search/movie?query={movie_name}&api_key={api_key}
    Get list of streaming providers for a specific movie by id: https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key={api_key}
*/


// Get movies returns movieId, movieName, overview and poster_path from tmdb.
function getMovies(url){
    fetch(url).then(res=> res.json()).then(data => {
        data.results.forEach(movie => {
            const movieId = movie.id;
            const movieName = movie.title;
            const overview = movie.overview;
            const poster_path = movie.poster_path;
            console.log(`Movie ID: ${movieId}, Movie Name: ${movieName}, Synopsis: ${overview}, poster_path: ${poster_path}`);
        });
    })
}

// Get providers returns different providers of a movie based on movie id. In this code it only returns providers in Finland.
function getProviders(url){
    fetch(url).then(res=>res.json()).then(data=> {
        if ("FI" in data.results){
            const fiData = data.results.FI;
            console.log(fiData);
        }
        else{
            console.log("no data awailable");
        }

    })
}

// Get details of a specific movie using it's id.
function getDetails(url){
    fetch(url).then(res=>res.json()).then(data=> {
    console.log(data);
    
})
}

// Get trending movies of the week
function getTrending(url){
    fetch(url).then(res=>res.json()).then(data=> {
        console.log(data);
        
    })
}

//getMovies("https://api.themoviedb.org/3/search/movie?query=blade runner&api_key=3972673c7c2bf3c70fc1b5593e956b47");
//getProviders("https://api.themoviedb.org/3/movie/78/watch/providers?api_key=3972673c7c2bf3c70fc1b5593e956b47");
//getDetails("https://api.themoviedb.org/3/movie/78?api_key=3972673c7c2bf3c70fc1b5593e956b47");
//getTrending("https://api.themoviedb.org/3/trending/movie/week?api_key=3972673c7c2bf3c70fc1b5593e956b47");


module.exports = {getMovies, getDetails, getProviders, getTrending};

