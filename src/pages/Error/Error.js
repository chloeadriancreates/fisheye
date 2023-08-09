import "./Error.scss";
import Header from "../../components/Header/Header";
import "../../components/Button/Button.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Error() {
    useEffect(() => {
        document.title = `Erreur – Fisheye`;
    }, []);

    return (
        <div className="error">
            <Header />
            <section className="error_section">
                <h2 className="error_section_title">404</h2>
                <p className="error_section_description">Cette page n'existe pas. Revenez à l'accueil pour découvrir nos photographes !</p>
                <Link to={"/"} className="error_section_button button" title="Accueil">Retourner à l'accueil</Link>
            </section>
        </div>
    );
}