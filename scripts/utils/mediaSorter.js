/* Top-level variables */
const listbox = document.querySelector(".mediaSorter_listbox");
const button = document.querySelector(".mediaSorter_button");
const selectDefaultValue = document.querySelector(".mediaSorter_button_text");

/* Shows dropdown if it's hidden, and hides it if it's showing */
function toggleDropdown() {
    if(listbox.style.display == "flex") {
        listbox.style.display = "none";
    } else {
        listbox.style.display = "flex";
    }
}

button.addEventListener("click", toggleDropdown);

/* Closes dropdown */
function closeDropdown() {
    listbox.style.display = "none";
}

/* Closes dropdown if the user clicks outside of it */
document.addEventListener(
    "click",
    function(event) {
        if (!event.target.closest(".mediaSorter_button") && listbox.style.display == "flex") {
            closeDropdown();
        }
    },
    false
);

/* Closes dropdown if the user taps escape when it's open */
document.addEventListener(
    "keydown",
    function(event) {
        if (event.code == "Escape" && listbox.style.display == "flex") {
            closeDropdown();
        }
    },
    false
);

/* Sorts media by date */
function sortByDate(a, b) {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);
    return bDate - aDate;
}

/* Sorts media by popularity */
function sortByPopularity(a, b) {
    return b.likes - a.likes;
}

/* Sorts media by title */
function sortByTitle(a, b) {
    return a.title.localeCompare(b.title);
}

/* Sorts media based on input function */
function sort(media, sortingFunc) {
    media.sort(sortingFunc);
    switch(sortingFunc) {
        case sortByPopularity:
            selectDefaultValue.textContent = "Popularité";
            break;
        case sortByDate:
            selectDefaultValue.textContent = "Date";
            break;
        case sortByTitle:
            selectDefaultValue.textContent = "Titre";
            break;
    }
    closeDropdown();
    deleteCards(mediaContainer);
    displayMediaCard(media);
}