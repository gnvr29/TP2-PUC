const repoArea = document.getElementById("repo-area");
const apiLink = "https://api.github.com/users/gnvr29/";
const apiRepos = apiLink + "repos";
const reposArea = document.getElementById('repo-area');
const reposNum = document.getElementById('numRepos');
let reposJSON;

async function fetchReposData() {
    try {
        let response = await fetch(apiRepos);
        if(!response.ok){
            throw new Error("Unable to fetch the repos");
        }
        reposJSON = await response.json();
        displayRepos();
        displayNumberRepos();
    } catch(error) {
        console.error(error);
    }
}

function displayRepos(){
    reposJSON.forEach(repo => {
        reposArea.innerHTML += 
        `<div class="col d-flex justify-content-center col-lg-6 col-xxl-3">
                <div class="card mb-4" style="width: 18rem;">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-center">${repo.name}</h5>
                    <p class="card-text text-start">${repo.description}</p>
                    <div class="mt-auto d-flex flex-column">
                      <div class="d-flex flex-row justify-content-evenly mb-4">
                        <i class="fa-regular fa-star"> 0</i>
                        <i class="fa-regular fa-user"> 0</i>
                      </div>
                      <a href="${repo.html_url}" class="btn btn-primary">Ler mais</a>
                    </div>
                  </div>
                </div>
        </div>`;
    })
}

function displayNumberRepos(){
    reposNum.innerText = `Repositórios(${reposJSON.length})`;
}

fetchReposData();
