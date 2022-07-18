import { Component } from 'react';
import { searchImages } from '../Servise/Api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
// import Modal from './Modal';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    query: '',
    status: 'idle',
    largeImage: '',
    isShowModal: false,
    total: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;
    if (prevState.query === query && prevState.page === page) {
      return;
    }

    this.setState({ status: 'pending' });

    try {
      const data = await searchImages(query, page);
      if (data.total === 0) {
        throw new Error('There are no images for your request');
      }

      this.setState({
        status: 'fulfilled',
        totalImages: data.totalHits,
        images:
          query !== prevState.query ? data.hits : [...images, ...data.hits],
      });
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  }

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  onClickModalOpen = images => {
    this.state({
      largeImage: images,
      isShowModal: true,
    });
  };

  onModalClose = () => {
    this.state({
      largeImage: '',
      isShowModal: false,
    });
  };

  render() {
    const { images, status } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {images.length !== 0 && (
          <ImageGallery
            images={images}
            onClickModalOpen={this.onClickModalOpen}
          />
        )}

        {/* <Modal largeImage={largeImage} onModalClose={this.onModalClose} /> */}
      </div>
    );
  }
}
