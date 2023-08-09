import "./Profile.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/getData";
import Header from "../../components/Header/Header";
import PhotographerDetails from "./sections/PhotographerDetails/PhotographerDetails";
import MediaList from "./sections/MediaList/MediaList";
import LikeTracker from "./sections/LikeTracker/LikeTracker";
import Gallery from "./sections/Gallery/Gallery";
import ContactForm from "./sections/ContactForm/ContactForm";

export default function Profile() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data } = useSelector(state => state.photographers);
    const [photographer, setPhotographer] = useState(null);
    const [gallery, setGallery] = useState(false);
    const [modal, setModal] = useState(false);
    const [currentMedium, setCurrentMedium] = useState(null);

    const openGallery = (medium) => {
        setGallery(true);
        setCurrentMedium(medium);
    };

    useEffect(() => {
        if(!data) {
            getData(dispatch);
        } else {
            setPhotographer(data.photographers.filter(photographer => photographer.id === parseInt(id))[0]);
        }
    }, [dispatch, data, id]);

    useEffect(() => {
        if(photographer) {
            document.title = `${photographer.name} – Fisheye`;
        }
    }, [photographer]);

    useEffect(() => {
        if(document.querySelector(".profile")) {
            document.querySelector(".profile").inert = modal;
        }
    }, [modal]);

    if(photographer) {
        if(gallery) {
            return <Gallery media={photographer.media.list} currentMedium={currentMedium} setGallery={setGallery} setCurrentMedium={setCurrentMedium} />;
        } else {
            return (
                <div>
                    { modal &&
                        <ContactForm setModal={setModal} photographer={photographer} />
                    }
                    <section
                    className={`profile ${modal && "profile--hidden"}`}>
                        <Header />
                        <PhotographerDetails photographer={photographer} setModal={setModal} />
                        <MediaList photographerId={id} openGallery={openGallery} />
                        <LikeTracker rate={photographer.rate} likes={photographer.totalLikes} />
                    </section>
                </div>
            );
        }
    }
}