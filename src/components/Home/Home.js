import React from 'react';
import {IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from "../../config";
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import './Home.css';

import { useFetchMovies } from './customHook';

const Home = () => {
   
    const[{ state, isLoading }, fetchMovies, createEndpoint, updateState] = useFetchMovies();

    const updateItems = (loadMore, searchTerm) => {
        updateState(loadMore, searchTerm);
        var thisSearch = !state.searchTerm ? searchTerm : state.searchTerm;
        fetchMovies(
            !thisSearch ?
            createEndpoint("movie/popular", loadMore, "") :
            createEndpoint("search/movie", loadMore, thisSearch)
        )
    }

    return (
            <div className="rmdb-home">
                {state.heroImage && !state.searchTerm ?
                    <div>
                        <HeroImage
                            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                            title={state.heroImage.original_title}
                            text={state.heroImage.overview}
                        />
                       
                    </div> : null }
                <SearchBar callback={updateItems} />
                <div className="rmdb-home-grid">
                    <FourColGrid
                        header={state.searchTerm ? 'Search Result' : 'Popular Movies'}
                        loading={isLoading}
                        >
                        {state.movies.map((element, i) => {
                            return <MovieThumb
                                    key={i}
                                    clickable={true}
                                    image={element.poster_path ? 
                                        `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}` : 
                                        './images/no_image.jpg'}
                                    movieId={element.id}
                                    movieName={element.original_title}
                            />
                        })}

                    </FourColGrid>
                    {isLoading ? <Spinner/> : null }
                    {(state.currentPage < state.totalPages && !isLoading) ?
                        <LoadMoreBtn text="Load More" onClick={updateItems} /> : null }
                </div>
            </div>
        );
}

export default Home;