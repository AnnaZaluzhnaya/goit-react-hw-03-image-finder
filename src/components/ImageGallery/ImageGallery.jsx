import style from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import { Component } from 'react';

export class ImageGallery extends Component {
  state = {
    isShowModal: false,
    modalUrl: '',
    largeImageURL: '',
  };

  toggleModal = () => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
  };

  handleItemClick = event => {
    const { images } = this.props;

    this.toggleModal();
    this.setState({
      modalUrl: images.largeImageURL,
    });
  };

  render() {
    const { images } = this.props;
    const { isShowModal, modalUrl } = this.state;
    return (
      <ul className={style.ImageGallery}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={this.handleItemClick}
            tags={tags}
          />
        ))}
        {isShowModal && (
          <Modal largeImage={modalUrl} onModalClose={this.toggleModal} />
        )}
      </ul>
    );
  }
}

export default ImageGallery;
