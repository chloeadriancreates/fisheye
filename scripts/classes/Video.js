class Video extends Media {
    constructor(video, mediaArray) {
        super(video, mediaArray);
        this.video = video.video;
    }

    createMediaCard() {
        const media = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", `assets/photographers/${this.photographerId}/${this.video}`);
        source.setAttribute("type", "video/mp4");
        media.appendChild(source);
        return this.createMediaCaption(media, this.mediaArray, this.data);
    }
}