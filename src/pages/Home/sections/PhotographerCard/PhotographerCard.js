import "./PhotographerCard.scss";
import { Link } from "react-router-dom";

export default function PhotographerCard({photographer}) {
    return (
        <Link to={`/photographer/${photographer.id}`} className="photographerCard" title={`Profil de ${photographer.name}`}>
            <img
            src={`/img/photographers/${photographer.portrait}`} alt={photographer.name}
            className="photographerCard_portrait"
            />
            <h2 className="photographerCard_name">{photographer.name}</h2>
            <p className="photographerCard_location">{photographer.city}, {photographer.country}</p>
            <p className="photographerCard_tagline">{photographer.tagline}</p>
            <p className="photographerCard_rate">{photographer.rate}€/jour</p>
        </Link>
    );
}