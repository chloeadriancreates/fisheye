import "./Home.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import PhotographerCard from "./sections/PhotographerCard/PhotographerCard";
import { getData } from "../../utils/getData";

export default function Home() {
    const { data } = useSelector(state => state.photographers);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!data) {
            getData(dispatch);
        }
        console.log(data);
    }, [dispatch, data]);

    return (
        <div>
            <Header />
            <section className="photographerList">
                { data && data.photographers.map(photographer => <PhotographerCard key={photographer.id} photographer={photographer} />) }
            </section>
        </div>
    );
}