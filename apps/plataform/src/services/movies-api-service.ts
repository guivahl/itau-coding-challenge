import { AxiosStatic } from 'axios'
import { MOVIE_API_KEY } from '../config/environment'

interface RatingsAPIResponse {
    Source: string
    Value: string 
}

export interface OmbdAPIResponse {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: Array<RatingsAPIResponse>
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}

export class MovieAPI {
    private request
    private API_KEY = MOVIE_API_KEY

    constructor(request: AxiosStatic) { 
        this.request = request
    }

    async fetchMovieByName(title: string): Promise<OmbdAPIResponse> {
        const response = await this.request.get<OmbdAPIResponse>(`http://www.omdbapi.com/?apikey=${this.API_KEY}&t=${title}`)

        return response.data
    }
}