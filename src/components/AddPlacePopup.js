import React from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
        setName('');
        setLink('');
        console.log(name,link);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm
            name='add-grid-item'
            title='New place'
            isOpen={props.isOpen}
            onClose={props.onClose}
            submitText='Save'
            onSubmit={handleSubmit}
        >
            <Input
                type='text'
                name='name'
                inputType='grid-title'
                placeholder='Title'
                required
                minLength='2'
                maxLength='30'
                errorId='card__title_error'
                handleChange={handleNameChange}
                value={name}
            />
            <Input
                type='url'
                name='link'
                inputType='url'
                placeholder='Image link'
                required
                errorId='card__url_error'
                handleChange={handleLinkChange}
                value={link}
            />
        </PopupWithForm>
    )

}

export default AddPlacePopup;