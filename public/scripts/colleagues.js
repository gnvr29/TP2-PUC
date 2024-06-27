const colleaguesSection = document.getElementById("colleagues-html");
let colleaguesJSON;

async function fetchColleaguesData(){
    try {
        let response = await fetch("../../db/colleagues.json");
        if(!response.ok){
            console.log("Unable to fetch data from the colleagues's JSON");
        }
        colleaguesJSON = await response.json();
        displayColleagues();
    } catch (error) {
        console.log(error);
    }
}

function displayColleagues(){
    colleaguesJSON.forEach(col => {
        colleaguesSection.innerHTML += `<div class="col-12 mb-5 d-flex justify-content-center col-lg-6 col-xxl-3">
                                            <div class="card" style="width: 18rem;">
                                                <img src="${col.picture_url}" class="card-img-top" alt="...">
                                                <div class="card-body">
                                                    <p class="card-text text-center">${col.name}</p>
                                                    <a href="${col.github_url}"><p class="card-text text-center">Link do Github</p></a>
                                                </div>
                                            </div>
                                        </div>`;
    });
}

fetchColleaguesData();