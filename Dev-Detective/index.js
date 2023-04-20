//fetching elements:--


const searchbar = document.querySelector(".searchbar-container");
const profileContainer = document.querySelector(".profile-container");

const noResuls = document.getElementById("no-results");
const btnmode = document.getElementById("btn-mode");
const modetext = document.getElementById("mode-text");
const modeicon = document.getElementById("mode-icon");


const btnSubmit = document.getElementById("submit");
const input = document.getElementById("input");

const avatar = document.getElementById("avatar");
const username = document.getElementById("name");
const date = document.getElementById("date");


const user = document.getElementById("user");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");


const followers = document.getElementById("followers");
const following = document.getElementById("following");
const user_location = document.getElementById("location");
const page = document.getElementById("page");


const twitter = document.getElementById("twitter");
const company = document.getElementById("company");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


//special fetching--

let darkMode = false;


const root = document.documentElement.style;
//not needed--below if direct putting --
const url = "https://api.github.com/users/";

const get = (param) => document.getElementById(`${param}`);


//now the code begins--------------------------------------------

//event listener


btnSubmit.addEventListener("click", function() {
    if (input.value !== "") {
        getUserData(url + input.value);

    }
});


input.addEventListener("keydown", function(e) {

    if (!e) {
        var e = window.event;
    }

    if (e.key == "Enter") {

        if (input.value !== "") {
            getUserData(url + input.value);
            input.value = "";
        }

    }
}, false);


input.addEventListener("input", function() {
    noResuls.style.display = "none";
    profileContainer.classList.remove("active");
    searchbar.classList.add("active");
});



btnmode.addEventListener("click", function() {
    if (darkMode == false) {
        darkModeProperties();
    } else {
        lightModeProperties();
    }
});


function getUserData(gitUrl) {

    fetch(gitUrl)

    .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateProfile(data);
        })
        .catch((error) => {
            throw error;
        });

}


function updateProfile(data) {

    if (data.message !== "Not Found") {
        noResuls.style.display = "none";

        function checkNull(param1, param2) {
            if (param1 === "" || param1 === null) {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;

            } else {
                return true;
            }
        }

        avatar.src = `${data.avatar_url}`;
        username.innerText = data.name === null ? `${data.login}` : `${data.name}`;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;

        bio.innerText = data.bio === null ? "This Profile has No bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;

        user_location.innerText = checkNull(`${data.location}`, user_location) ? `${data.location}` : "Not Available";
        page.innerText = checkNull(`${data.blog}`, page) ? `${data.blog}` : "NotAvailable";
        page.href = checkNull(`${data.blog}`, page) ? `${data.blog}` : "#";

        twitter.innerText = checkNull(`${data.twitter_username}`, twitter) ? `${data.twitter_username}` : "Not Available";
        twitter.href = checkNull(`${data.twitter_username}`, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        company.innerText = checkNull(`${data.company}`, company) ? `${data.company}` : "Not Available";


        datesegments = `${data.created_at}`.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1]-1]}  ${datesegments[0]}`;


        searchbar.classList.toggle("active");
        profileContainer.classList.toggle("active");


    } else {
        noResuls.style.display = "block";
    }
}



//dark mode default


const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches;
const localStorageDarkode = localStorage.getItem("daresfesf");
if (localStorageDarkode == null) {
    localStorage.setItem("dark-mode", prefersDarkMode);
    darkMode = prefersDarkMode;
}
if (localStorageDarkode) {
    darkMode = localStorageDarkode;
    darkModeProperties();
} else {
    localStorage.setItem("dark-mode", prefersDarkMode);
    darkMode = prefersDarkMode;
    lightModeProperties();
}



function darkModeProperties() {

    root.setProperty("--lm-bg", "linear-gradient(to right, #16222a, #182848)");
    root.setProperty("--lm-bg-content", "#1E2A47");

    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");


    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = true;
    searchbar.classList.add("dark");
    profileContainer.classList.add("dark");
    modetext.innerText = "LIGHT";
    // modeicon.src = ('<i class="fa-sharp fa-solid fa-sun-bright" aria-hidden="true"></i>');
    //modeicon.src = "./images/sun.png";
    localStorage.setItem("dark-mode", true);
}


function lightModeProperties() {

    // root.setProperty("--lm-bg", "linear-gradient(to right, #16222a, #182848)");
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");

    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.25)");


    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;

    // searchbar.classList.add("dark");
    // profileContainer.classList.add("dark");

    modetext.innerText = "DARK";
    //  modeicon.append('<i class="fa-solid fa-moon" aria-hidden="true"></i>');
    modeicon.src = "https://fontawesome.com/v4/icon/moon-o";
    localStorage.setItem("dark-mode", false);
}
profileContainer.classList.toggle("active");
searchbar.classList.toggle("active");
getUserData(`https://api.github.com/users/Jgcianssouvik`);