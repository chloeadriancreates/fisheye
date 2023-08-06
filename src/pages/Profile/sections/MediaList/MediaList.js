import "./MediaList.scss";
import MediumCard from "./MediumCard/MediumCard";
import { useEffect, useState } from "react";

export default function MediaList({media}) {
    const [dropdown, setDropdown] = useState(false);
    const [sortingTitle, setSortingTitle] = useState("Popularité");
    const [sortedMedia, setSortedMedia] = useState(media);

    const openDropdown = () => {
        setDropdown(true);
    };

    const closeDropdown = () => {
        setDropdown(false);
    };

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

    const changeSortOrder = (sortingType) => {
        setSortedMedia(media.sort(sortingType));
        switch(sortingType) {
            case sortByDate:
                setSortingTitle("Date");
                break;
            case sortByTitle:
                setSortingTitle("Titre");
                break;
            default:
                setSortingTitle("Popularité");
                break;
        }
        closeDropdown();
    };

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
                        <span className="mediaList_sorter_select_button_text">{sortingTitle}</span>
                        <span className="mediaList_sorter_select_button_icon fas fa-chevron-down"></span>
                    </button>
                    { dropdown &&
                        <div className="mediaList_sorter_select_listbox" role="listbox">
                            <button onClick={() => changeSortOrder(sortByPopularity)}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="true">Popularité
                                <div className="mediaList_sorter_select_listbox_option_icon fas fa-chevron-down"></div>
                            </button>
                            <button onClick={() => changeSortOrder(sortByDate)}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="false">Date</button>
                            <button onClick={() => changeSortOrder(sortByTitle)}className="mediaList_sorter_select_listbox_option" role="option" aria-selected="false">Titre</button>
                        </div>
                    }
                </div>
            </div>
            <div className="mediaList_container">
                { sortedMedia.map(medium => <MediumCard key={medium.id} medium={medium} />) }
            </div>
        </section>
    );
}