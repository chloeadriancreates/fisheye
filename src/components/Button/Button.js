import "./Button.scss";

export default function Button({onClickFunction, text}) {
    return (
        <button className="button" onClick={onClickFunction}>{text}</button>
    );
}