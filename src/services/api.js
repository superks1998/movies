import axios from "axios";
import * as moment from "moment";

function addDate(date, days) {
    let result = new Date(date);
    console.log();
    result.setDate(result.getDate() + days);
    return result;
}

export const getDataMoviesHomePage = async (page) => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=ce66fa34d0483e4c37a37df936c2f51a&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}`;

    const response = await axios.get(url);
    const results = (await response.status) === 200 ? response.data : [];

    return results;
};

export const getUpcomingMovies = async (page) => {
    let date = new Date();
    let d = date.getDate();
    d = d < 10 ? `0${d}` : d;
    let m = date.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;
    let y = date.getFullYear();
    y = y < 10 ? `0${y}` : y;
    let today = `${y}-${m}-${d}`;
    let nextTime = addDate(today, 300);
    nextTime = moment(nextTime).utc().format("YYYY-MM-DD");

    console.log();

    console.log(today);

    console.log(nextTime);

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=ce66fa34d0483e4c37a37df936c2f51a&language=en-US&region=US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&release_date.gte=${today}&release_date.lte=${nextTime}`;

    const response = await axios.get(url);
    const results = (await response.status) === 200 ? response.data : [];

    return results;
};

export const getDataFilmById = async (id = 0) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=ce66fa34d0483e4c37a37df936c2f51a&language=vi&append_to_response=videos,images&include_image_language=en`;

    const response = await axios.get(url);
    const results = (await response.status) === 200 ? response.data : [];

    return results;
};

export const searchMovieByKeyword = async (keyword, page = 1) => {
    const url = `https://api.themoviedb.org/3/search/movie/?query=${keyword}&api_key=ce66fa34d0483e4c37a37df936c2f51a&page=${page}`;

    const response = await axios.get(url);
    const results = (await response.status) === 200 ? response.data : [];

    return results;
};
