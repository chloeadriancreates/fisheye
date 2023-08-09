import "./Gallery.scss";
import { useEffect, useState } from "react";

export default function Gallery({media, currentMedium, setGallery, setCurrentMedium}) {
    const galleryContent = document.querySelector(".gallery_content");
    const [previousMedium, setPreviousMedium] = useState(null);
    const [nextMedium, setNextMedium] = useState(null);
    const [slideDirection, setSlideDirection] = useState(null);
    const currentIndex = media.indexOf(currentMedium);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

    document.onkeydown = (event) => {
        if(event.code === "ArrowLeft") {
            previous();
        } else if(event.code === "ArrowRight") {
            next();
        } else if(event.code === "Escape") {
            setGallery(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

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

    useEffect(() => {
        if(galleryContent) {
            setTimeout(function() {
                galleryContent.style.animation = `slideIn${slideDirection} 0.4s forwards ease`;
            }, 300);
        }
    }, [currentMedium, slideDirection, galleryContent]);

    return (
        <div className="gallery">
            { windowWidth >= 950 &&
                <button onClick={previous} className="gallery_nav_button gallery_nav_button--previous">
                    <div className="gallery_nav_button_icon gallery_nav_button_icon--previous fas fa-chevron-left"></div>
                    <p className="gallery_nav_button_text gallery_nav_button_text--previous">Précédent</p>
                </button>
            }
            <div className="gallery_content">
                <div className="gallery_content_display">
                    { currentMedium.video ?
                        <video
                        alt={`${currentMedium.title}, close-up view`}
                        lang="en"
                        className="gallery_content_display_medium"
                        controls="controls"
                        >
                            <source
                            src={`/img/photographers/${currentMedium.photographerId}/${currentMedium.video}`}
                            type="video/mp4"
                            />
                        </video>
                    :
                        <picture className="gallery_content_display_medium">
                            <source
                                srcSet={`/img/photographers/${currentMedium.photographerId}/${currentMedium.image}-500w.jpg`}
                                media="(max-width: 300px)"
                            />
                            <source
                                srcSet={`/img/photographers/${currentMedium.photographerId}/${currentMedium.image}-1000w.jpg`}
                                media="(max-width: 560px)"
                            />
                            <img
                                src={`/img/photographers/${currentMedium.photographerId}/${currentMedium.image}-2000w.jpg`}
                                alt={`${currentMedium.title}, close-up view`}
                                lang="en"
                            />
                        </picture>
                    }
                    <div className="gallery_content_display_caption">
                        <h3 className="gallery_content_display_caption_title">{currentMedium.title}</h3>
                        { windowWidth < 950 &&
                            <div className="gallery_nav">
                                <button onClick={previous} className="gallery_nav_button gallery_nav_button--previous">
                                    <div className="gallery_nav_button_icon gallery_nav_button_icon--previous fas fa-chevron-left"></div>
                                    <p className="gallery_nav_button_text gallery_nav_button_text--previous">Précédent</p>
                                </button>
                                <button onClick={next} className="gallery_nav_button gallery_nav_button--next">
                                <div className="gallery_nav_button_icon gallery_nav_button_icon--next fas fa-chevron-right"></div>
                                <p className="gallery_nav_button_text gallery_nav_button_text--next">Suivant</p>
                                </button>
                                <button onClick={() => setGallery(false)} className="gallery_nav_button gallery_nav_button--close">
                                    <div className="gallery_nav_button_icon gallery_nav_button_icon--close fa-solid fa-xmark"></div>
                                    <p className="gallery_nav_button_text gallery_nav_button_text--close">Fermer</p>
                                </button>
                            </div>
                        }
                    </div>
                </div>
            </div>
            { windowWidth >= 950 &&
                <button onClick={next} className="gallery_nav_button gallery_nav_button--next">
                <div className="gallery_nav_button_icon gallery_nav_button_icon--next fas fa-chevron-right"></div>
                <p className="gallery_nav_button_text gallery_nav_button_text--next">Suivant</p>
                </button>
            }
            { windowWidth >= 950 &&
                <button onClick={() => setGallery(false)} className="gallery_nav_button gallery_nav_button--close">
                    <div className="gallery_nav_button_icon gallery_nav_button_icon--close fa-solid fa-xmark"></div>
                    <p className="gallery_nav_button_text gallery_nav_button_text--close">Fermer</p>
                </button>
            }
        </div>
    );
}