import {useState, useEffect, useCallback} from 'react';
import {API_URL, API_KEY} from "../../config";

export const useFetchMovies = () => {
    const[state, setState] = useState({ movies: [] });
    const[isLoading, setIsLoading] = useState(false);

    const fetchMovies = async endpoint => {
        setIsLoading(true);

        //We can use URLSearchParams to get URL params.
        const params = new URLSearchParams(endpoint);
        if(!params.get('page')) {
            setState(prev => ({
                ...prev,
                movies: [],
                searchTerm: params.get('query'),
            }));
        }

        try{
            const result = await (await fetch(endpoint)).json();
            setState(prev => ({
                ...prev,
                movies : [...prev.movies, ...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage : result.page,
                totalPages: result.total_pages
            }))
        }catch (error){
            console.log(error);
        }
        setIsLoading(false);
    };
    
    const createEndpoint = useCallback(
        (type, loadMore, searchTerm) => {
            var thisPage = !state.currentPage || !loadMore ? 0 : state.currentPage;
            return `${API_URL}${type}?api_key=${API_KEY}&page=${thisPage + 1}&query=${searchTerm}`;
        },
        [state.currentPage],
    );
    
    const updateState = (loadMore, searchTerm) => {
        setState(prev => ({
            ...prev,
            movies: loadMore ? [...state.movies] : [],
            searchTerm: loadMore ? state.searchTerm : searchTerm,
        }));
    }

    useEffect (() => {
        if(sessionStorage.getItem('HomeState')){
            const persistedState = JSON.parse(sessionStorage.getItem('HomeState'));
            setState({...persistedState});
        }else{
            var endpoint = createEndpoint("movie/popular",false, "");
            fetchMovies(endpoint);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect (() => {
        if(!state.searchTerm){
            sessionStorage.setItem('HomeState', JSON.stringify(state));
        }
    },[state]);

    return [{ state, isLoading }, fetchMovies, createEndpoint, updateState];
}