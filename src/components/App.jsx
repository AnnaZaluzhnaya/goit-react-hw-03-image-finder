import { Component } from 'react';
import Notiflix from 'notiflix';
import { searchImages } from '../Servise/Api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';

const perPage = 12;
export class App extends Component {
  state = {
    page: 1,
    images: [],
    query: '',
    largeImageUrl: '',
    status: 'idle',
    isShowBtn: false,
    total: 0,
    loading: false,
    totalImages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });

      try {
        const data = await searchImages(query, page, perPage);
        if (!data.total) {
          throw new Error('There are no images for your request');
        }

        if (data.total > perPage) {
          this.setState({ isShowBtn: true });
        } else if (data.total >= images.length + perPage) {
          this.setState({ isShowBtn: false });
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
        this.setState({
          totalImages: data.totalHits,
          images: [...images, ...data.hits],
          loading: false,
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  }

  error = () => {
    Notiflix.Notify.failure(
      'There are no images for your request.Please try again.'
    );
    this.setState({ loading: false, isShowBtn: false });
  };

  handleFormSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  openModal = largeImageUrl => {
    this.setState({
      largeImageUrl: largeImageUrl,
    });
  };

  closeModal = () => {
    this.setState({
      largeImageUrl: '',
    });
  };

  onMoreBtn = () => {
    this.setState(({ page, total }) => {
      return {
        page: page + 1,
        total: total + perPage,
      };
    });
  };

  render() {
    const { images, isShowBtn, loading, total, largeImageUrl } = this.state;
    const totalImg = images.length >= total;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length !== 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {largeImageUrl && (
          <Modal largeImageUrl={largeImageUrl} closeModal={this.closeModal} />
        )}
        {(!totalImg || isShowBtn) && <Button onMoreBtn={this.onMoreBtn} />}

        {loading && <Loader />}
      </div>
    );
  }
}
