/* Top-level variables */
const mediaContainer = document.querySelector(".mediaList");

/* Gets the photographer from the id in the URL */
async function getPhotographer(data) {
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    const id = urlParams.get("id");

    // return data.find((p) => p.id == id);
    return new Photographer(data.find((p) => p.id == id));
}

/* Displays the profile card component */
function displayProfileCard(photographer) {
    const container = document.querySelector(".profile");
    const userCard = photographer.createProfileCard();
    container.appendChild(userCard);
}

/* Gets the media corresponding to the photographer id */
async function getMedia(data, photographerId) {
    return data.filter((media) => media.photographerId == photographerId);
}

/* Displays the media card components */
function displayMediaCard(media) {
    media.forEach((medium) => {
        const mediaData = new MediaFactory(medium, media);
        const mediaCard = mediaData.createMediaCard();
        mediaContainer.appendChild(mediaCard);
    });
}

/* Adds likes from all media */
function totalLikes(media) {
    let sum = 0;
    media.map(medium => {
        sum += medium.likes;
    });
    return(sum);
}

/* Displays the like counter component */
async function displayLikeCounter(media, price) {
    const likeCounterContainer = document.querySelector(".likeCounter");
    const likeCounter = createLikeCounter(totalLikes(media), price);
    likeCounterContainer.appendChild(likeCounter);
}

/* Runs all functions above + adds on click and on keydown events for media sorter functions  */
async function init() {
    const { photographers, media } = await getPhotographers();
    
    const photographer = await getPhotographer(photographers);
    displayProfileCard(photographer);
    document.title = `${photographer.name} - Fisheye`;

    const modalTitleName = document.getElementById("modal_titleName");
    modalTitleName.textContent = photographer.name;

    const photographerMedia = await getMedia(media, photographer.id);
    sort(photographerMedia, sortByPopularity);
    displayLikeCounter(photographerMedia, photographer.price);

    const optionLikes = document.getElementById("likes");
    optionLikes.addEventListener("click", function() {
        sort(photographerMedia, sortByPopularity);
    });
    optionLikes.addEventListener("keydown", function(event) {
        if(event.code == "Enter" || event.code == "Space") {
            sort(photographerMedia, sortByPopularity);
        }
    });

    const optionDate = document.getElementById("date");
    optionDate.addEventListener("click", function() {
        sort(photographerMedia, sortByDate);
    });
    optionDate.addEventListener("keydown", function(event) {
        if(event.code == "Enter" || event.code == "Space") {
            sort(photographerMedia, sortByDate);
        }
    });
    
    const optionTitle = document.getElementById("title");
    optionTitle.addEventListener("click", function() {
        sort(photographerMedia, sortByTitle);
    });
    optionTitle.addEventListener("keydown", function(event) {
        if(event.code == "Enter" || event.code == "Space") {
            sort(photographerMedia, sortByTitle);
        }
    });
};

init();

