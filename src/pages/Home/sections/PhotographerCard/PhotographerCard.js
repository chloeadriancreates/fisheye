import "./PhotographerCard.scss";
import { Link } from "react-router-dom";

export default function PhotographerCard({photographer}) {
    return (
        <Link to={`/photographer/${photographer.id}`} className="photographerCard" title={`Profil de ${photographer.name}`}>
            <picture>
                <source
                    srcSet={`/img/photographers/${photographer.portrait}-500w.jpg`}
                    media="(max-width: 1200px)"
                />
                <source
                    srcSet={`/img/photographers/${photographer.portrait}-1000w.jpg`}
                    media="(max-width: 1950px)"
                />
                <img className="photographerCard_portrait"
                    src={`/img/photographers/${photographer.portrait}-2000w.jpg`}
                    alt={photographer.name}
                />
            </picture>
            <h2 className="photographerCard_name">{photographer.name}</h2>
            <p className="photographerCard_location">{photographer.city}, {photographer.country}</p>
            <p className="photographerCard_tagline">{photographer.tagline}</p>
            <p className="photographerCard_rate">{photographer.rate}€/jour</p>
        </Link>
    );
}