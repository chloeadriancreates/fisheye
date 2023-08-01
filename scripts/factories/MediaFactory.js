class MediaFactory {
    constructor(media, mediaArray) {
        if(media.video) {
            return new Video(media, mediaArray);
        } else {
            return new Image(media, mediaArray);
        }
    }
}