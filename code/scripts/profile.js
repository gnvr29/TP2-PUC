const profileDataRequestURL = "https://api.github.com/users/gnvr29";
const profileSocialMediaURL = profileDataRequestURL + "/social_accounts";
const profilePic = document.getElementById("my-pic");
const nameArea = document.getElementById("name-area");
const bioArea = document.getElementById("bio-area");
const locationArea = document.getElementById("location-area");
const websiteLink = document.getElementById("website-area");
const instagramLink = document.getElementById("instagram-area");
const linkedInLink = document.getElementById("linkedin-area");
const githubArea = document.getElementById("github-area");
const followersArea = document.getElementById("followers");
let profileDataJSON;

async function fetchProfileData(){
    try {
        let response = await fetch(profileDataRequestURL);
        if(!response.ok){
            throw new Error("Unable to fetch user's data");
        }
        profileDataJSON = await response.json();
        console.table(profileDataJSON);
        displayProfilePic();
        displayProfileText();
        displayLinks();
    } catch (error) {
        console.log(error);
    }
}

function displayProfilePic() {
    let picUrl = profileDataJSON.avatar_url;
    profilePic.setAttribute("src", picUrl);
}

function displayProfileText(){
    let name = profileDataJSON.name;
    let bio = profileDataJSON.bio;
    let profileLocation = profileDataJSON.location;
    let followers = profileDataJSON.followers
    let website = profileDataJSON.html_url;
    
    nameArea.innerText = name;
    bioArea.innerText = bio;
    locationArea.innerText = profileLocation;
    followersArea.innerHTML = ` ${followers}`;
    websiteLink.setAttribute("href", website);
    websiteLink.innerHTML = `<p class="mb-5">${website}</p>`;
    githubArea.setAttribute("href", website);
}

async function displayLinks() {
    try {
        let response = await fetch(profileSocialMediaURL);
        if(!response.ok){
            throw new Error("Unable ti fetch user's social media account");
        }
        let linksJSON = await response.json();
        let linkedin = linksJSON[0].url;
        let instagram = linksJSON[1].url;

        instagramLink.setAttribute("href", instagram);
        linkedInLink.setAttribute("href", linkedin);
    } catch (error) {
        console.log(error);
    }
}

fetchProfileData();