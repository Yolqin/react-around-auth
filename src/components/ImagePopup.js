function ImagePopup({selectedCard, onClose}) {

    return (
        <div className={`page__dialog_type_image dialog ${selectedCard ? 'dialog_open' : null}`}>
            <div className="dialog__container">
                <button className="dialog__close-button" type="button" onClick={onClose}/>
                <figure className="dialog__figure">
                    <img alt={selectedCard ? selectedCard.name : null} className="dialog__image"
                         src={selectedCard ? selectedCard.link : null}/>
                    <figcaption
                        className="dialog__image-caption">{selectedCard ? selectedCard.name : null} </figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;