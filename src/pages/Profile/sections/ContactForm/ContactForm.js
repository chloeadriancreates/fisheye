import "./ContactForm.scss";
import { useState } from "react";

export default function ContactForm({setModal, photographer}) {
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const checkFormValue = (value, setError) => {
        if(!value) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const emptyFields = [];
        for (const field in formJson) {
            if(!formJson[field]) {
                emptyFields.push(field);
            }
        }
        if(emptyFields.length) {
            if(emptyFields.includes("firstName")) {
                setFirstNameError(true);
            }
            if(emptyFields.includes("lastName")) {
                setLastNameError(true);
            }
            if(emptyFields.includes("email")) {
                setEmailError(true);
            }
            if(emptyFields.includes("message")) {
                setMessageError(true);
            }
        } else {
            console.log(`Expéditeur: ${formJson.firstName} ${formJson.lastName} (${formJson.email})`);
            console.log(`Destinataire: ${photographer.name} (#${photographer.id})`);
            console.log(`Message: ${formJson.message}`);
            setModal(false);
        }
    };

    return (
        <section id="modal" className="modal" role="dialog" aria-modal="true">
            <form className="modal_container" method="post" onSubmit={handleSubmit}>
                <fieldset className="modal_container_form">
                    <div className="modal_container_form_header">
                        <h2 className="modal_container_form_header_title">Contact</h2>
                        <h2 className="modal_container_form_header_name">{photographer.name}</h2>
                    </div>
                    <div className="modal_container_form_field">
                        <label className="modal_container_form_field_label" htmlFor="firstName">Prénom</label>
                        <input name="firstName" type="text" id="firstName" className="modal_container_form_field_input" placeholder="Marty" onBlur={(event) => checkFormValue(event.target.value, setFirstNameError)}
                        onChange={(event) => checkFormValue(event.target.value, setFirstNameError)} />
                        {firstNameError && <p className="modal_container_form_field_error">Merci d'entrer votre prénom.</p>}
                    </div>
                    <div className="modal_container_form_field">
                        <label className="modal_container_form_field_label" htmlFor="lastName">Nom</label>
                        <input name="lastName" type="text" id="lastName" className="modal_container_form_field_input" placeholder="McFly" onBlur={(event) => checkFormValue(event.target.value, setLastNameError)}
                        onChange={(event) => checkFormValue(event.target.value, setLastNameError)} />
                        {lastNameError && <p className="modal_container_form_field_error">Merci d'entrer votre nom de famille.</p>}
                    </div>
                    <div className="modal_container_form_field">
                        <label className="modal_container_form_field_label" htmlFor="email">Email</label>
                        <input name="email" type="email" id="email" className="modal_container_form_field_input" placeholder="johnny@begoode.com" onBlur={(event) => checkFormValue(event.target.value, setEmailError)}
                        onChange={(event) => checkFormValue(event.target.value, setEmailError)} />
                        {emailError && <p className="modal_container_form_field_error">Merci d'entrer votre email.</p>}
                    </div>
                    <div className="modal_container_form_field">
                        <label className="modal_container_form_field_label" htmlFor="message">Votre message</label>
                        <textarea name="message" id="message" placeholder="Une demande, une requête, un devis..." className="modal_container_form_field_input modal_field_input--textarea" onBlur={(event) => checkFormValue(event.target.value, setMessageError)} onChange={(event) => checkFormValue(event.target.value, setMessageError)}></textarea>
                        {messageError && <p className="modal_container_form_field_error">Merci d'entrer votre message.</p>}
                    </div>
                    <button type="submit" className="modal_container_form_submit">Envoyer
                    </button>
                    <button onClick={() => setModal(false)} className="modal_container_form_close">
                        <div className="modal_container_form_close_icon fa-solid fa-xmark"></div>
                        <p className="modal_container_form_close_text">Fermer</p>
                    </button>
                </fieldset>
            </form>
        </section>
    );
}