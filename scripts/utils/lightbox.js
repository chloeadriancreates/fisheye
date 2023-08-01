const lightbox = document.getElementById("lightbox");
const header = document.querySelector("header");
const main = document.getElementById("main");
const modalContainer = document.getElementById("modalContainer");
const lightboxClose = document.querySelector(".lightbox_close");
const lightboxContent = document.querySelector(".lightbox_content");
const lightboxPrevious = document.querySelector(".lightbox_previous");
const lightboxNext = document.querySelector(".lightbox_next");

/* Creates image to put into the lightbox */
function createImage(path) {
    const image = document.createElement("img");
    image.setAttribute("src", path);
    image.setAttribute("lang", "en");
    return image;
}

/* Creates video to put into the lightbox */
function createVideo(path) {
    const video = document.createElement("video");
    const source = document.createElement("source");
    source.setAttribute("src", path);
    source.setAttribute("type", "video/mp4");
    video.setAttribute("controls", "controls");
    video.setAttribute("lang", "en");
    video.appendChild(source);
    return video;
}

/* Opens lightbox */
function openLightbox(mediaArray, id, effect) {
    lightbox.style.display = "flex";
    header.style.display = "none";
    main.style.display = "none";
    modalContainer.style.display = "none";

    let media = "";
    const { photographerId, video, image, title } = mediaArray[id];

    /* Checks if media exists, whether it is a video or an image, and injects it accordingly */
    if(video) {
        media = createVideo(`assets/photographers/${photographerId}/${video}`);
    } else if(image) {
        media = createImage(`assets/photographers/${photographerId}/${image}`);
    } else {
        media = document.createElement("p");
        media.textContent = "Désolés, nous n'avons pas trouvé ce fichier.";
    }

    media.setAttribute("class", "lightbox_media");
    media.setAttribute("tabindex", 0);

    const pTitle = document.createElement("h3");
    pTitle.setAttribute("class", "lightbox_title");
    pTitle.textContent = title;

    /* Animates the media changes */
    if(effect == "next") {
        lightboxContent.style.animation = "slideOutNext 0.4s ease";
        setTimeout(function() {
            deleteCards(lightboxContent);
            lightboxContent.style.animation = "slideInNext 0.4s ease";
            lightboxContent.appendChild(media);
            lightboxContent.appendChild(pTitle);
        }, 300);
    } else if(effect == "previous") {
        lightboxContent.style.animation = "slideOutPrevious 0.4s ease";
        setTimeout(function() {
            deleteCards(lightboxContent);
            lightboxContent.style.animation = "slideInPrevious 0.4s ease";
            lightboxContent.appendChild(media);
            lightboxContent.appendChild(pTitle);
        }, 300);
    } else {
        deleteCards(lightboxContent);
        lightboxContent.appendChild(media);
        lightboxContent.appendChild(pTitle);
    }

    /* Switches to previous media on click or on keydown */
    lightboxPrevious.onclick = function() {
        if(id == 0) {
            openLightbox(mediaArray, mediaArray.length-1, "previous");
        } else {
            openLightbox(mediaArray, id-1, "previous");
        }
    };
    lightboxPrevious.onkeydown = function(event) {
        if(event.code == "Enter" || event.code == "Space") {
            if(id == 0) {
                openLightbox(mediaArray, mediaArray.length-1, "previous");
            } else {
                openLightbox(mediaArray, id-1, "previous");
            }
        }
    };

    /* Switches to next media on click or on keydown */
    lightboxNext.onclick = function() {
        if(id+1 == mediaArray.length) {
            openLightbox(mediaArray, 0, "next");
        } else {
            openLightbox(mediaArray, id+1, "next");
        }
    };
    lightboxNext.onkeydown = function(event) {
        if(event.code == "Enter" || event.code == "Space") {
            if(id+1 == mediaArray.length) {
                openLightbox(mediaArray, 0, "previous");
            } else {
                openLightbox(mediaArray, id+1, "next");
            }
        }
    };

    /* Switches to previous or next media with arrow keys */
    document.onkeydown = function(event) {
        if(event.code == "ArrowLeft") {
            if(id == 0) {
                openLightbox(mediaArray, mediaArray.length-1, "previous");
            } else {
                openLightbox(mediaArray, id-1, "previous");
            }
        } else if(event.code == "ArrowRight") {
            if(id+1 == mediaArray.length) {
                openLightbox(mediaArray, 0, "previous");
            } else {
                openLightbox(mediaArray, id+1, "next");
            }
        }
    };
}

/* Closes lightbox */
function closeLightbox() {
    lightbox.style.display = "none";
    header.style.display = "flex";
    main.style.display = "block";
    modalContainer.style.display = "none";
    deleteCards(lightboxContent);
}

/* Adds on click and on keydown events on close icon */
lightboxClose.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("keydown", function(event) {
    if(event.code == "Enter" || event.code == "Space") {
        closeLightbox();
    }
});
document.addEventListener("keydown", function(event) {
    if(event.code == "Escape") {
        closeLightbox();
    }
});