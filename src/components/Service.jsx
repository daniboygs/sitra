import axios from 'axios';

//import { BookModel } from '../../models/BookModel';

//const base_api_url = 'http://172.16.68.96:8000/api/';
//const base_api_url = 'http://127.0.0.1:8000/api/';

const base_api_url = 'http://172.16.2.27:8080/GASD951006/sitra-api/';

export function getCarpets(request){
    return axios.post(base_api_url + 'carpeta.php', request);
}

export function getVictims(request){
    return axios.post(base_api_url + 'victima.php', request);
}

export function getImputeds(request){
    return axios.post(base_api_url + 'imputado.php', request);
}

/*________________________Catalogs________________________*/

export function getFiscalias(){
    return axios.get(base_api_url + 'catalogs/fiscalia.php');
}

export function getCities(){
    return axios.get(base_api_url + 'catalogs/municipio.php');
}

export function getCrimes(){
    return axios.get(base_api_url + 'catalogs/delito.php');
}

export function getStatus(){
    return axios.get(base_api_url + 'catalogs/estatus');
}

export function getWeapons(){
    return axios.get(base_api_url + 'catalogs/arma');
}

export function getProfessions(){
    return axios.get(base_api_url + 'catalogs/profesion');
}

export function getNationalities(){
    return axios.get(base_api_url + 'catalogs/nacionalidad');
}

export function getScholarships(){
    return axios.get(base_api_url + 'catalogs/escolaridad');
}

export function getRelationships(){
    return axios.get(base_api_url + 'catalogs/parentesco');
}

export function getYears(){
    return axios.get(base_api_url + 'catalogs/anio.php');
}

/*________________________________________________________*/

export function getQueryList(request){
    return axios.post(base_api_url + 'query', request);
}

export function getBinnacle(startDate, finishDate){
    return axios.post(base_api_url + 'binnacle', {startDate:startDate, finishDate:finishDate});
}

export function getQueryBinnacle(id){
    return axios.post(base_api_url + 'binnacle/getQueryBinnacle/'+id);
}

export function getDetailBinnacle(binnacleID){
    return axios.post(base_api_url + 'binnacle/getDetailBinnacle', {binnacleID:binnacleID});
}

export function setQueryBinnacle(query, device, attributes, binnacle, type, section, geoplugin){
    console.log("ip", geoplugin)
    return axios.post(base_api_url + 'binnacle/setQueryBinnacle/'+type, {query:query, device:device, attributes:attributes, binnacle:binnacle, section:section, geoplugin:geoplugin});
}

/*________________________Chatbot________________________*/

export function getCrimeSinonim(){
    return axios.get(base_api_url + 'chatbot/sinonim');
}

export function getCarpetCrime(request){
    return axios.post(base_api_url + 'chatbot/carpet-crime', request);
}

export function getCarpetCrimeYear(request){
    return axios.post(base_api_url + 'chatbot/carpet-crime-year', request);
}

export function getCarpetCrimePeriodYear(request){
    return axios.post(base_api_url + 'chatbot/carpet-crime-period-year', request);
}

export function getCarpetCrimeYearAndYear(request){
    return axios.post(base_api_url + 'chatbot/carpet-crime-year-and-year', request);
}


/*________________________________________________________*/

export function getIP(){
    return axios.get('http://www.geoplugin.net/json.gp');
}

/*fetch('https://geoip-db.com/json')
.then(res => res.json())
.then(json => this.setState({data: json.IPv4}))*/