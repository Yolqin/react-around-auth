import React, {useContext} from "react";
import Card from '../components/Card';
import CurrentUserContext from '../context/CurrentUserContext';

function Main({cards, onCardClick, onProfileEdit, onAvatarEdit, onCardAdd, onCardDelete, onCardLike}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__left-container">
                    <div className="profile__avatar-container">
                        <img src={currentUser.avatar} alt="Profile Avatar" className="profile__avatar"/>
                        <button type="button" name="update avatar"
                                className="profile__avatar_edit" onClick={onAvatarEdit}/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" name="edit profile"
                                onClick={onProfileEdit}/>
                        <p className="profile__job">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" name="add card" onClick={onCardAdd}/>
            </section>

            <section className="elements">
                <ul className="elements__grid">
                    {cards.map(card => (
                        <Card card={card} key={card._id} onCardClick={onCardClick} onCardDelete={onCardDelete} onCardLike={onCardLike}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;