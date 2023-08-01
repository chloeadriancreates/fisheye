class Media {
    constructor(media, mediaArray) {
        this.data = media;
        this.likes = media.likes;
        this.photographerId = media.photographerId;
        this.title = media.title;
        this.mediaArray = mediaArray;
    }

    createMediaCaption(media, mediaArray, data) {
        const article = document.createElement("article");

        media.setAttribute("alt", `${this.title}, close-up view`);
        media.setAttribute("lang", "en");
        media.setAttribute("class", "mediaCard");
        media.setAttribute("role", "link");
        media.setAttribute("tabindex", 0);
        media.addEventListener("click", function () {
            openLightbox(mediaArray, mediaArray.indexOf(data));
        });
        media.addEventListener("keydown", function (event) {
            if (event.code == "Enter" || event.code == "Space") {
                openLightbox(mediaArray, mediaArray.indexOf(data));
            }
        });

        const caption = document.createElement("div");
        caption.setAttribute("class", "mediaCard_caption");

        const pTitle = document.createElement("p");
        pTitle.setAttribute("class", "mediaCard_title");
        pTitle.setAttribute("lang", "en");
        pTitle.textContent = this.title;

        const likeContainer = document.createElement("div");
        likeContainer.setAttribute("class", "mediaCard_likes");

        const likeAmount = document.createElement("p");
        likeAmount.textContent = this.likes;

        const likeButton = document.createElement("button");
        likeButton.setAttribute("class", "mediaCard_likeButton mediaCard_likeButton--notLiked");
        const likeIcon = document.createElement("div");
        let liked = false;
        let currentLikes = this.likes;
        likeIcon.setAttribute("class", "fas fa-heart");
        likeButton.setAttribute("aria-label", "likes");
        likeButton.setAttribute("lang", "en");
        likeButton.addEventListener("click", function () {
            if (liked == false) {
                likeButton.classList.remove("mediaCard_likeButton--notLiked");
                likeButton.classList.add("mediaCard_likeButton--liked");
                likeAmount.textContent = currentLikes + 1;
                let likeCounter = document.querySelector(".likeCounter_amount");
                likeCounter.textContent = parseInt(likeCounter.textContent) + 1;
            } else {
                likeButton.classList.remove("mediaCard_likeButton--liked");
                likeButton.classList.add("mediaCard_likeButton--notLiked");
                likeAmount.textContent = currentLikes;
                let likeCounter = document.querySelector(".likeCounter_amount");
                likeCounter.textContent = parseInt(likeCounter.textContent) - 1;
            }
            liked = !liked;
        });

        likeButton.append(likeIcon);
        likeContainer.append(likeAmount);
        likeContainer.append(likeButton);

        caption.append(pTitle);
        caption.append(likeContainer);

        article.appendChild(media);
        article.appendChild(caption);

        return (article);
    }
}