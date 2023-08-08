import { setData } from "../app/slices/photographerSlice";

export const getData = async(dispatch) => {
    const response = await fetch("/data/photographers.json");
    const responseJS = await response.json();
    responseJS.photographers.forEach(photographer => {
        const photographerMedia = responseJS.media.filter(medium => medium.photographerId === parseInt(photographer.id));
        let likeCounter = 0;
        photographerMedia.forEach(medium => {
            likeCounter += medium.likes;
        });
        photographer.totalLikes = likeCounter;
        photographer.media = {
            sorting: "Popularité",
            list: responseJS.media.filter(media => media.photographerId === parseInt(photographer.id))
        };
    });
    responseJS.media.forEach(medium => medium.liked = false);
    dispatch(setData(responseJS));
};