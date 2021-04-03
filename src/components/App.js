import React, {useEffect} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api"
import CurrentUserContext from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {

    const [selectedCard, setSelectedCard] = React.useState(null);
    const [profileDialog, setProfileDialog] = React.useState(false);
    const [avatarDialog, setAvatarDialog] = React.useState(false);
    const [cardDialog, setCardDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''});
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards({})])
            .then(([user, initialCards]) => {
                setCurrentUser(user)
                setCards(initialCards)
            })
            .catch(err => console.log(err))
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setAvatarDialog(true);
    }

    function handleEditProfileClick() {
        setProfileDialog(true);
    }

    function handleAddPlaceClick() {
        setCardDialog(true);
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== card._id);
                setCards(newCards);
            })
            .catch(err => console.log(err))
    }

    function closeAllPopups(e) {
        setSelectedCard(false);
        setProfileDialog(false);
        setAvatarDialog(false);
        setCardDialog(false);
        setDeleteDialog(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.updateLikes(card._id, !isLiked)
            .then((newCard) => {
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
        })
            .catch(err => console.log(err))
    }

    function handleUpdateUser(userData) {
        api.setUserInfo(userData)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleUpdateAvatar(avatarData) {
        api.setUserAvatar(avatarData)
            .then((user) => {
                setCurrentUser(user);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleAddPlaceSubmit(cardData) {
        api.addCard({name: cardData.name, link: cardData.link})
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header/>
                    <Main
                        onCardClick={handleCardClick}
                        onProfileEdit={handleEditProfileClick}
                        onAvatarEdit={handleEditAvatarClick}
                        onCardAdd={handleAddPlaceClick}
                        onCardDelete={handleCardDelete}
                        cards = {cards}
                        onCardLike={handleCardLike}
                    />
                    <Footer/>
                </div>

                <EditProfilePopup isOpen={profileDialog} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
                <EditAvatarPopup isOpen={avatarDialog} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
                <AddPlacePopup isOpen={cardDialog} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

                <PopupWithForm
                    name='delete-confirmation'
                    title='Are you sure?'
                    isOpen={deleteDialog}
                    onClose={closeAllPopups}
                    submitText='Yes'
                />

                <ImagePopup
                    selectedCard={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
