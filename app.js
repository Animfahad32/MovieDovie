// TMDB 

const  apiKey= 'api_key=c72e68c56f03f9191d5f365ad374d94d';
const baseUrl = 'https://api.themoviedb.org/3';
const apiUrl = baseUrl+'/discover/movie?sort_by=popularity.desc&'+apiKey ;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = baseUrl+'/search/movie?'+apiKey ;
const main = document.getElementById('movieList');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(apiUrl);
function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
      
        showMovies(data.results);
    })
}



function showMovies(data){
    
    data.forEach(movie => {
        const {title, poster_path,release_date, vote_average } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('col-md-3');
        movieElement.innerHTML = `
       
       
      
      
       
        <div class="card movie_card shadow-sm">
        <img src="${imgUrl+poster_path}" class="card-img-top" alt="${title}">
        <div class="card-body">
            <i class="fas fa-play play_button" data-toggle="tooltip" data-placement="bottom" title="Play Trailer">
            </i>
          <h5 class="card-title">${title}</h5>
                 <span class="movie_info">${release_date}</span>
                 <span class="movie-rating movie_info float-right ${getColor(vote_average)}">${vote_average}/10</span>
        </div>
        </div>
        
        `
        main.appendChild(movieElement);
    })

}

function getColor(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
   
    if(searchTerm){
        getMovies(searchUrl+'&query='+searchTerm);
        main.innerHTML = '';
   
       
    }else{
        getMovies(apiUrl)
    }
})




