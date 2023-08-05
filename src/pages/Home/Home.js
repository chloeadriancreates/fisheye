import "./Home.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../app/slices/photographerSlice";
import Header from "../../components/Header/Header";
import PhotographerCard from "../../components/PhotographerCard/PhotographerCard";

export default function Home() {
    const { data } = useSelector(state => state.photographers);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!data) {
            const getPhotographers = async() => {
                const response = await fetch("/data/photographers.json");
                const responseJS = await response.json();
                dispatch(setData(responseJS));
            };
            getPhotographers();
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