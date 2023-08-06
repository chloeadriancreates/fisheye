import "./MediaList.scss";
import MediumCard from "./MediumCard/MediumCard";

export default function MediaList({media}) {
    return (
        <section className="mediaList">
            { media.map(medium => <MediumCard key={medium.id} medium={medium} />) }
        </section>
    );
}