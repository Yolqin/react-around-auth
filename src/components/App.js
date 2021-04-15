import React, {useEffect} from "react";
import { BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import * as auth from '../utils/auth';
import CurrentUserContext from '../context/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

function App() {

    const [selectedCard, setSelectedCard] = React.useState(null);
    const [profileDialog, setProfileDialog] = React.useState(false);
    const [avatarDialog, setAvatarDialog] = React.useState(false);
    const [cardDialog, setCardDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: ''});
    const [cards, setCards] = React.useState([]);
    const [ email, setEmail ] = React.useState(false);
    const [ password, setPassword ] = React.useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
    const [ isSuccess, setIsSuccess ] = React.useState(false);
    const [isInfoTooltip, setInfoTooltip] = React.useState(false);

    const history = useHistory();

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards({})])
            .then(([user, initialCards]) => {
                setCurrentUser(user)
                setCards(initialCards)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if(jwt) {
            auth.getToken(jwt)
                .then((res) => {
                    if(res.err) {
                        console.log(res.err);
                    }
                    if(res) {
                        setEmail(res.data.email);
                        setIsLoggedIn(true);
                        setIsSuccess(true);
                        history.push('/');
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [history]);

    function handleRegister(email, password) {
        auth.register(email, password)
            .then((res) => {
                if(res.data) {
                    setIsSuccess(true);
                    toggleToolTip();
                    history.push('/');
                }
                else {
                    setIsSuccess(false);
                    toggleToolTip();
                    return;
                }
            })
            .catch(err => console.log(err));
    }

    function handleLogin(email, password) {
        if(!email || !password) return;

        auth.authorize(email, password)
            .then((data) => {
                if(!data) {
                    setIsSuccess(false);
                    toggleToolTip();
                }
                if(data.token) {
                    toggleToolTip();
                    setPassword('');
                    setIsSuccess('');
                    setIsLoggedIn('');
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        setEmail('');
        history.push('/signin');
    }

    function toggleToolTip() {
        setInfoTooltip(!isInfoTooltip);
    }

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
        setInfoTooltip(false);
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
                    <BrowserRouter>
                    <Switch>
                        <Route path='/signup'>
                            <Header email={isLoggedIn ? email : ""} link={'/signin'} linkText={"Log in"} />
                            <Register email={email} password={password} handleRegister={handleRegister} />
                        </Route>

                        <Route path='/signin'>
                            <Header email={isLoggedIn ? email : ""} link={'/signup'} linkText={"Sign up"} />
                            <Login email={email} password={password} handleLogin={handleLogin} />
                        </Route>

                        <ProtectedRoute exact path='/'
                                        isLoggedIn={isLoggedIn}
                                        email={email}
                                        cards={cards}
                                        component={Main}
                                        toggleToolTip={toggleToolTip}
                                        handleSignOut={handleSignOut}
                                        handleEditAvatarClick={handleEditAvatarClick}
                                        handleEditProfileClick={handleEditProfileClick}
                                        handleAddPlaceClick={handleAddPlaceClick}
                                        handleCardLike={(card) => handleCardLike(card)}
                                        handleCardDelete={(card) => handleCardDelete(card)}
                                        handleCardClick={(card) => handleCardClick(card)}
                                        onCardClick={(card) => handleCardClick(card)}
                                        onDeleteClick={(card) => handleCardDelete(card)}
                                        onLickeClick={(card) => handleCardLike(card)}
                        />

                    </Switch>
                    </BrowserRouter>
                    <Footer/>
                </div>

                <Route path='/'>
                    { loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' /> }
                </Route>

                <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltip} onClose={closeAllPopups}/>
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
