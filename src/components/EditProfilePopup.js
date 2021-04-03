import React, {useEffect, useContext} from "react";
import CurrentUserContext from '../context/CurrentUserContext';
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAboutChange(e) {
        setAbout(e.target.value);
    }

    return (
        <PopupWithForm
            name='edit-profile'
            title='Edit profile'
            isOpen={props.isOpen}
            onClose={props.onClose}
            submitText='Save'
            onSubmit={handleSubmit}
        >
            <Input
                type='text'
                name='name'
                inputType='name'
                placeholder='Name'
                required
                minLength='2'
                maxLength='40'
                errorId='profile__name_error'
                value={name}
            />
            <Input
                type='text'
                name='job'
                inputType='about-me'
                placeholder='Description'
                required
                minLength='2'
                maxLength='200'
                errorId='profile__text_error'
                handleChange={handleAboutChange}
                value={about}
            />
        </PopupWithForm>
    )

}

export default EditProfilePopup;