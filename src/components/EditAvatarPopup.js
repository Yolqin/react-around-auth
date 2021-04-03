import React, {useEffect, useContext} from "react";
import CurrentUserContext from '../context/CurrentUserContext';
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const currentUser = useContext(CurrentUserContext);

    const [avatar, setAvatar] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar
        });
    }

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Change profile picture'
            isOpen={props.isOpen}
            onClose={props.onClose}
            submitText='Save'
            onSubmit={handleSubmit}
        >
            <Input
                type='url'
                name='link'
                inputType='url-avatar'
                placeholder='Avatar link'
                required
                errorId='card__url-avatar_error'
                handleChange={handleAvatarChange}
                value={avatar}
            />
        </PopupWithForm>
    )

}

export default EditAvatarPopup;