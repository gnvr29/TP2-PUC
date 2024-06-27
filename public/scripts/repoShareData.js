const params = new URLSearchParams(location.search);
const id = params.get('id');
const reposURL = "https://api.github.com/users/gnvr29/repos";
const ownerName = document.getElementById('name-button');
const repoName = document.getElementById('repo-name');
const descriptionArea = document.getElementById('description');
const dateCreation = document.getElementById('date');
const stars = document.getElementById('stars');
const forks = document.getElementById('forks');
const languages = document.getElementById('languages');
const repoLink = document.getElementById('repoLink');
let topics = document.getElementById('topics');
let allReposJSON;
let repoJSON;

async function fetchSpecificRepoData(){
    try {
        let response = await fetch(reposURL);

        if(!response.ok){
            console.log("There was a problem fetching the data from the repositories");
        }

        allReposJSON = await response.json();

        repoJSON = allReposJSON.find((repo)=>{
            return repo.id == id;
        });

        if(repoJSON){
            displayRepoText();
            displayDate();
            displayTopics();
            displayLanguages();
            displayStarsAndForks();
        } else {
            console.log("Repository not found");
        }

    } catch (error) {
        console.log(error);
    }
}

async function displayRepoText(){
    let name = repoJSON.name;
    let description = repoJSON.description;
    let link = repoJSON.html_url;
    
    repoName.innerText = `Repositório: ${name}`;
    descriptionArea.innerText = description;
    repoLink.innerText = link;
    repoLink.setAttribute("href", link);

}

function displayDate(){
    let date = repoJSON.created_at;
    date = date.substring(0, 10);
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    dateCreation.innerText = `${day}/${month}/${year}`;
}

function displayTopics(){
    let tpc = repoJSON.topics;
    for(let i = 0; i < tpc.length; i++){
        topics.innerHTML += `<span class="badge rounded-pill text-bg-primary">${tpc[i]}</span>`;
    }
}

function displayStarsAndForks() {
    let starCount = repoJSON.stargazers_count;
    let forkCount = repoJSON.forks_count;

    stars.innerHTML = " " + starCount;
    forks.innerHTML = " " + forkCount;
}

async function displayLanguages(){
    try {
        let response = await fetch(`https://api.github.com/repos/gnvr29/${repoJSON.name}/languages`);
        if(!response.ok){
            console.log("There was an error fetching the languages data");
        }
        let languagesJSON = await response.json();
        let langs = Object.keys(languagesJSON);
        console.table(languagesJSON);
        if(langs.length != 0){
            for(let i = 0; i < langs.length; i++){
                if(i != 0 && i != (langs.length - 1)){
                    languages.innerText += `${langs[i]}/`;
                } else if(i == 0 && langs.length != 1){
                    languages.innerText += langs[i] + "/";
                } else {
                    languages.innerText += langs[i];
                }
            }
        } else {
            languages.innerText = "Nenhuma linguagem foi encontrada para este repositório";
        }
    } catch (error) {
        console.log(error);
    }
}

fetchSpecificRepoData();