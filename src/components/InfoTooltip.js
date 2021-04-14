import dialogSuccess from '../images/success-union.svg';
import dialogFail from '../images/fail-union.svg';

function InfoTooltip(props) {
    return (
        <div className={`dialog dialog_type_auth-result ${props.isOpen ? "dialog_open" : ""}`} onClick={props.onClose}>
            <button type="button" aria-label="close-auth-result" className="dialog__close-button" onClick={props.onClose}></button>
            <div className="dialog__infoTool">
                <img
                    className="dialog__image_auth-result"
                    src={props.isSuccess ? dialogSuccess : dialogFail}
                    alt={props.isSuccess ? "success-icon" : "failure-icon"}
                />
                <h2 className="dialog__header">
                    {props.isSuccess ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;