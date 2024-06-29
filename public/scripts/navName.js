const nameButton = document.getElementById("name-button");
let userJSON;

async function fetchUserData(){
    try {
        let response = await fetch("https://api.github.com/users/gnvr29");
        if(!response.ok){
            console.log("There was an error fetching the data from https://api.github.com/users/gnvr29");
        }
        userJSON = await response.json();
        displayNavName();
    } catch (error) {
        console.log(error);
    }
}

function displayNavName(){
    let name = userJSON.name;
    nameButton.innerText = name;
}

fetchUserData();