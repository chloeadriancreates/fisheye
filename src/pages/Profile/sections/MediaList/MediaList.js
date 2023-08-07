import { updateSorting } from "../../../../app/slices/photographerSlice";
import "./MediaList.scss";
import MediumCard from "./MediumCard/MediumCard";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function MediaList({photographerId}) {
    const dispatch = useDispatch();
    const { data } = useSelector(state => state.photographers);
    const [dropdown, setDropdown] = useState(false);
    const [media, setMedia] = useState(null);
    const [sortedMedia, setSortedMedia] = useState(null);

    const openDropdown = () => {
        setDropdown(true);
    };

    const closeDropdown = () => {
        setDropdown(false);
    };

    useEffect(() => {
        setMedia(data.media.filter(media => media.photographerId === parseInt(photographerId)));
    }, [data, photographerId]);

    useEffect(() => {
        const sortByDate = (a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate - aDate;
        };
        const sortByPopularity = (a, b) => {
            return b.likes - a.likes;
        };
        const sortByTitle = (a, b) => {
            return a.title.localeCompare(b.title);
        };
        const sortMedia = () => {
            switch(data.sorting) {
                case "Date":
                    setSortedMedia(media.sort(sortByDate));
                    break;
                case "Titre":
                    setSortedMedia(media.sort(sortByTitle));
                    break;
                default:
                    setSortedMedia(media.sort(sortByPopularity));
                    break;
            }
        };
        if(media) {
            sortMedia();
        }
    }, [data.sorting, media]);

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
                        <span className="mediaList_sorter_select_button_text">{data.sorting}</span>
                        <span className="mediaList_sorter_select_button_icon fas fa-chevron-down"></span>
                    </button>
                    { dropdown &&
                        <div className="mediaList_sorter_select_listbox" role="listbox">
                            <button onClick={() => dispatch(updateSorting({ sorting: "Popularité"}))}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="true">Popularité
                                <div className="mediaList_sorter_select_listbox_option_icon fas fa-chevron-down"></div>
                            </button>
                            <button onClick={() => dispatch(updateSorting({ sorting: "Date"}))}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="false">Date</button>
                            <button onClick={() => dispatch(updateSorting({ sorting: "Titre"}))}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="false">Titre</button>
                        </div>
                    }
                </div>
            </div>
            <div className="mediaList_container">
                { sortedMedia && sortedMedia.map(medium => <MediumCard key={medium.id} medium={medium} />) }
            </div>
        </section>
    );
}