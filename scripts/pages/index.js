/* Displays photographer cards on homepage */
async function displayData(photographers) {
    /* Gets the container for all photographer cards on homepage */
    const photographersSection = document.querySelector(".userList");

    /* Runs the photographer factory to create the card component for each photographer */
    photographers.forEach((photographer) => {
        const photographerObject = new Photographer(photographer);
        const userCardDOM = photographerObject.createUserCard();
        photographersSection.appendChild(userCardDOM);
    });
};

/* Runs both functions above */
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
    