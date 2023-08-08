import "./Gallery.scss";
import { useEffect, useState } from "react";

export default function Gallery({media, currentMedium, setGallery, setCurrentMedium}) {
    const galleryContent = document.querySelector(".gallery_content");
    const [previousMedium, setPreviousMedium] = useState(null);
    const [nextMedium, setNextMedium] = useState(null);
    const [slideDirection, setSlideDirection] = useState(null);
    const currentIndex = media.indexOf(currentMedium);

    useEffect(() => {
        if(currentIndex === 0) {
            setPreviousMedium(media[media.length - 1]);
        } else {
            setPreviousMedium(media[currentIndex - 1]);
        }

        if(currentIndex === media.length - 1) {
            setNextMedium(media[0]);
        } else {
            setNextMedium(media[currentIndex + 1]);
        }
    }, [currentIndex, media]);

    const previous = () => {
        galleryContent.style.animation = "slideOutPrevious 0.4s forwards ease";
        setTimeout(function() {
            setCurrentMedium(previousMedium);
            setSlideDirection("Previous");
        }, 300);
    };

    const next = () => {
        galleryContent.style.animation = "slideOutNext 0.4s forwards ease";
        setTimeout(function() {
            setCurrentMedium(nextMedium);
            setSlideDirection("Next");
        }, 300);
    };

    useEffect(() => {
        if(galleryContent) {
            setTimeout(function() {
                galleryContent.style.animation = `slideIn${slideDirection} 0.4s forwards ease`;
            }, 300);
        }
    }, [currentMedium, slideDirection, galleryContent]);

    return (
        <div className="gallery">
            <button onClick={previous} className="gallery_nav gallery_nav--previous">
                <div className="gallery_nav_icon gallery_nav_icon--previous fas fa-chevron-left"></div>
                <p className="gallery_nav_text gallery_nav_text--previous">Précédent</p>
            </button>
            <div className="gallery_content">
                <div className="gallery_content_display">
                    { currentMedium.video ?
                        <video
                        alt={`${currentMedium.title}, close-up view`}
                        lang="en"
                        className="gallery_content_display_medium"
                        controls="controls"
                        role="link"
                        >
                            <source
                            src={`/img/photographers/${currentMedium.photographerId}/${currentMedium.video}`}
                            type="video/mp4"
                            />
                        </video>
                    :
                        <img
                        src={`/img/photographers/${currentMedium.photographerId}/${currentMedium.image}`}
                        alt={`${currentMedium.title}, close-up view`}
                        lang="en"
                        className="gallery_content_display_medium"
                        role="link"
                        />
                    }
                    <h3 className="gallery_content_display_title">{currentMedium.title}</h3>
                </div>
            </div>
            <button onClick={next} className="gallery_nav gallery_nav--next">
                <div className="gallery_nav_icon gallery_nav_icon--next fas fa-chevron-right"></div>
                <p className="gallery_nav_text gallery_nav_text--next">Suivant</p>
            </button>
            <button onClick={() => setGallery(false)} className="gallery_nav gallery_nav--close">
                <div className="gallery_nav_icon gallery_nav_icon--close fa-solid fa-xmark"></div>
                <p className="gallery_nav_text gallery_nav_text--close">Fermer</p>
            </button>
        </div>
    );
}