import "./MediumCard.scss";
import { useDispatch } from "react-redux";
import { toggleLike } from "../../../../../app/slices/photographerSlice";

export default function MediumCard({medium, openGallery}) {
    const dispatch = useDispatch();

    return (
        <article className="mediumCard">
            <button onClick={() => openGallery(medium)} className="mediumCard_thumbnail" title={`${medium.title}, close-up view`}>
                { medium.video ?
                    <video
                    alt={`${medium.title}, close-up view`}
                    lang="en"
                    className="mediumCard_thumbnail_medium"
                    >
                        <source
                        src={`/img/photographers/${medium.photographerId}/${medium.video}`}
                        type="video/mp4"
                        />
                    </video>
                :
                    <picture>
                        <source
                            srcSet={`/img/photographers/${medium.photographerId}/${medium.image}-500w.jpg`}
                            media="(max-width: 320px)"
                        />
                        <source
                            srcSet={`/img/photographers/${medium.photographerId}/${medium.image}-1000w.jpg`}
                            media="(max-width: 3380px)"
                        />
                        <img
                            src={`/img/photographers/${medium.photographerId}/${medium.image}-2000w.jpg`}
                            alt={`${medium.title}, close-up view`}
                            lang="en"
                            className="mediumCard_thumbnail_medium"
                        />
                    </picture>
                }
                <p className="mediumCard_thumbnail_alert">Ouvrir la galerie</p>
            </button>
            <div className="mediumCard_caption">
                <p className="mediumCard_caption_title" lang="en">{medium.title}</p>
                <div className="mediumCard_caption_like">
                    <p className="mediumCard_caption_like_text">{medium.likes}</p>
                    <button
                    onClick={() => dispatch(toggleLike({medium: medium}))}
                    className={`mediumCard_caption_like_button mediumCard_caption_like_button${medium.liked ? "--liked" : "--notLiked"}`} aria-label="likes" lang="en"
                    >
                        <i className="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </article>
    );
}