import React from "react";

function Input(props) {
    return (
        <>
            <input
                type={props.type}
                name={props.name}
                className={`dialog__input dialog__input_type_${props.inputType}`}
                placeholder={props.placeholder}
                required
                minLength={props.minLength}
                maxLength={props.maxLength}
                onChange={props.handleChange}
                value={props.value}
            />

            <span
                id={props.errorId}
                className="dialog__error"
            />
        </>
    );
}

export default Input;