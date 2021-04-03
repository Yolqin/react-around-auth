import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`page__dialog_type_${props.name} dialog ${props.isOpen && 'dialog_open'}`}>
            <div className="dialog__container">
                <button className="dialog__close-button" type="button" name="close button" onClick={props.onClose}/>
                <form action="#" className={`dialog__form dialog__form_type_${props.type}`} method="post"
                      name="profile-edit"
                      onSubmit={props.onSubmit}
                >
                    <h3 className="dialog__header">
                        {props.title}
                    </h3>
                    {props.children}
                    <button type="submit" className="dialog__button">{props.submitText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;