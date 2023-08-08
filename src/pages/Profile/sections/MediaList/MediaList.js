import { sortMedia } from "../../../../app/slices/photographerSlice";
import "./MediaList.scss";
import MediumCard from "./MediumCard/MediumCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function MediaList({photographerId, openGallery}) {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.photographers);
    const [photographer, setPhotographer] = useState(null);
    const [dropdown, setDropdown] = useState(false);

    const openDropdown = () => {
        setDropdown(true);
    };

    const closeDropdown = () => {
        setDropdown(false);
    };

    useEffect(() => {
        setPhotographer(data.photographers.find(photographer => photographer.id === parseInt(photographerId)));
    }, [dispatch, data, photographerId]);

    useEffect(() => {
        document.addEventListener(
            "click",
            function(event) {
                if (!event.target.closest(".mediaList_sorter_select_button") && dropdown) {
                    closeDropdown();
                }
            },
            false
        );

        document.addEventListener(
            "keydown",
            function(event) {
                if (event.code === "Escape" && dropdown) {
                    closeDropdown();
                }
            },
            false
        );
    }, [dropdown]);

    return (
        <section className="mediaList">
            <div className="mediaList_sorter">
                <p className="mediaList_sorter_label">Trier par</p>
                <div className="mediaList_sorter_select">
                    <button onClick={() => {
                        if(dropdown) {
                            closeDropdown();
                        } else {
                            openDropdown();
                        }
                    }} className="mediaList_sorter_select_button button" aria-haspopup="listbox" aria-labelledby="mediaSorter_label">
                        { photographer && <span className="mediaList_sorter_select_button_text">{photographer.media.sorting}</span> }
                        <span className="mediaList_sorter_select_button_icon fas fa-chevron-down"></span>
                    </button>
                    { dropdown &&
                        <div className="mediaList_sorter_select_listbox" role="listbox">
                            <button onClick={() => dispatch(sortMedia({ sorting: "Popularité", photographerId: photographerId }))}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="true">Popularité
                                <div className="mediaList_sorter_select_listbox_option_icon fas fa-chevron-down"></div>
                            </button>
                            <button onClick={() => dispatch(sortMedia({ sorting: "Date", photographerId: photographerId }))}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="false">Date</button>
                            <button onClick={() => dispatch(sortMedia({ sorting: "Titre", photographerId: photographerId }))}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="false">Titre</button>
                        </div>
                    }
                </div>
            </div>
            <div className="mediaList_container">
                { photographer && photographer.media.list.map(medium => <MediumCard key={medium.id} medium={medium} openGallery={openGallery} />) }
            </div>
        </section>
    );
}