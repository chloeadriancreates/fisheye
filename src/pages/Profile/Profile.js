import "./Profile.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/getData";
import Header from "../../components/Header/Header";
import PhotographerDetails from "./sections/PhotographerDetails/PhotographerDetails";
import MediaList from "./sections/MediaList/MediaList";
import LikeTracker from "./sections/LikeTracker/LikeTracker";

export default function Profile() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data } = useSelector(state => state.photographers);
    const [photographer, setPhotographer] = useState(null);
    const [media, setMedia] = useState(null);

    useEffect(() => {
        if(!data) {
            getData(dispatch);
        } else {
            setPhotographer(data.photographers.filter(photographer => photographer.id === parseInt(id))[0]);
            setMedia(data.media.filter(media => media.photographerId === parseInt(id)));
        }
    }, [dispatch, data, id]);

    useEffect(() => {
        console.log(photographer);
    }, [photographer]);

    useEffect(() => {
        console.log(media);
    }, [media]);

    return (
        <div>
            <Header />
            { photographer && <PhotographerDetails photographer={photographer} /> }
            { media && <MediaList photographerId={id} /> }
            { photographer && <LikeTracker rate={photographer.rate} likes={photographer.totalLikes} /> }
        </div>
    );
}