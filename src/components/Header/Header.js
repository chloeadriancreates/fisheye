import "./Header.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <Link to={"/"} className="header_link" title="Accueil">
                <img src="/img/logo.png" className="header_link_logo" alt="Page d'accueil Fisheye" lang="fr" />
            </Link>
            { location.pathname === "/" && <h1 className="header_title">Nos photographes</h1> }
        </header>
    );
}