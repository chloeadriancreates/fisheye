import "./MediumCard.scss";
import { Link } from "react-router-dom";

export default function MediumCard({medium}) {
    return (
        <article className="mediumCard">
            <Link className="mediumCard_thumbnail" title={`${medium.title}, close-up view`}>
                { medium.video ?
                    <video
                    alt={`${medium.title}, close-up view`}
                    lang="en"
                    className="mediumCard_thumbnail_medium"
                    role="link"
                    >
                        <source
                        src={`/img/photographers/${medium.photographerId}/${medium.video}`}
                        type="video/mp4"
                        />
                    </video>
                :
                    <img
                    src={`/img/photographers/${medium.photographerId}/${medium.image}`}
                    alt={`${medium.title}, close-up view`}
                    lang="en"
                    className="mediumCard_thumbnail_medium"
                    role="link"
                    />
                }
                <p className="mediumCard_thumbnail_alert">Ouvrir la galerie</p>
            </Link>
            <div className="mediumCard_caption">
                <p className="mediumCard_caption_title" lang="en">{medium.title}</p>
                <div className="mediumCard_caption_like">
                    <p className="mediumCard_caption_like_text">{medium.likes}</p>
                    <button className={`mediumCard_caption_like_button mediumCard_caption_like_button${medium.liked ? "--liked" : "--notLiked"}`} aria-label="likes" lang="en">
                        <i className="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </article>
    );
}