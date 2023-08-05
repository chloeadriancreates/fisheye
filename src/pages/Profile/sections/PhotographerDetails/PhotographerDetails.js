import "./PhotographerDetails.scss";
import Button from "../../../../components/Button/Button";

export default function PhotographerDetails({photographer}) {
    return (
        <article className="photographerDetails">
            <div className="photographerDetails_caption">
                <h1 className="photographerDetails_caption_name">{photographer.name}</h1>
                <p className="photographerDetails_caption_location">{photographer.city}, {photographer.country}</p>
                <p className="photographerDetails_caption_tagline">{photographer.tagline}</p>
                <Button text="Contactez-moi" />
            </div>
            <img src={`/img/photographers/${photographer.portrait}`} alt={photographer.name} className="photographerDetails_portrait"/>
        </article>
    );
}