import {useContext} from "react";
import CurrentUserContext from '../context/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);


    function handleCardClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__grid-item">
            <button
                className="elements__delete-button"
                type="button"
                hidden={!isOwn}
                onClick={handleDeleteClick}
            />
            <img alt={card.name} className="elements__grid-image" src={card.link}
                 onClick={handleCardClick}
            />
            <div className="elements__grid-description">
                <h2 className="elements__grid-header">{card.name}</h2>
                <div className="elements__like-right">
                    <button
                        className={`elements__like-button ${isLiked ? 'elements__like-button_active' : null}`}
                        type="button"
                        onClick={handleLikeClick}
                    />
                    <p className="elements__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;