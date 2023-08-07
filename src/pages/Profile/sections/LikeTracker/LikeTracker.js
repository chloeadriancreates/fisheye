import "./LikeTracker.scss";

export default function LikeTracker({rate, likes}) {
    return (
        <div className="likeTracker">
            <div className="likeTracker_likes">
                <p className="likeTracker_likes_text">{likes}</p>
                <div className="likeTracker_likes_icon fas fa-heart"></div>
            </div>
            <p className="likeTracker_rate">{rate}€/jour</p>
        </div>
    );
}