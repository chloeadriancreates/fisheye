/* Creates the like counter component */

function createLikeCounter(likes, price) {
    const likeCounterContent = document.createElement("div");
    likeCounterContent.setAttribute("class", "likeCounter_content");

    const divLikes = document.createElement("div");
    divLikes.setAttribute("class", "likeCounter_likes");

    const likeAmount = document.createElement("p");
    likeAmount.setAttribute("class", "likeCounter_amount");
    likeAmount.textContent = likes;

    const likeIcon = document.createElement("div");
    likeIcon.setAttribute("class", "fas fa-heart likeCounter_icon");

    divLikes.appendChild(likeAmount);
    divLikes.appendChild(likeIcon);

    const pPrice = document.createElement("p");
    pPrice.setAttribute("class", "likeCounter_price");
    pPrice.textContent = `${price}€/jour`;

    likeCounterContent.appendChild(divLikes);
    likeCounterContent.appendChild(pPrice);

    return (likeCounterContent);
}