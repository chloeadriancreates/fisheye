import "./PhotographerDetails.scss";
import Button from "../../../../components/Button/Button";

export default function PhotographerDetails({photographer, setModal}) {
    return (
        <article className="photographerDetails">
            <picture>
                <source
                    srcSet={`/img/photographers/${photographer.portrait}-500w.jpg`}
                    media="(max-width: 380px)"
                />
                <source
                    srcSet={`/img/photographers/${photographer.portrait}-1000w.jpg`}
                    media="(max-width: 630px)"
                />
                <source
                    srcSet={`/img/photographers/${photographer.portrait}-2000w.jpg`}
                    media="(max-width: 950px)"
                />
                <img className="photographerDetails_portrait"
                    src={`/img/photographers/${photographer.portrait}-1000w.jpg`}
                    alt={photographer.name}
                />
            </picture>
            <div className="photographerDetails_caption">
                <h1 className="photographerDetails_caption_name">{photographer.name}</h1>
                <p className="photographerDetails_caption_location">{photographer.city}, {photographer.country}</p>
                <p className="photographerDetails_caption_tagline">{photographer.tagline}</p>
                <Button text="Contactez-moi" onClickFunction={() => {setModal(true);}} />
            </div>
        </article>
    );
}