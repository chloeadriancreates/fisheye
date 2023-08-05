import "./Home.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../app/slices/photographerSlice";

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
        <div>Hi!</div>
    );
}