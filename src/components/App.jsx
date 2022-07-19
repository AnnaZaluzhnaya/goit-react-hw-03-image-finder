import { Component } from 'react';
import { searchImages } from '../Servise/Api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';
import { ImFilesEmpty } from 'react-icons/im';

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

        if (data.total > images.length + perPage) {
          this.setState({ isShowBtn: true });
          // this.scrollOnLoadButton();
        } else if (images.length + perPage >= data.total) {
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
        Notiflix.Notify.failure(
          'There are no images for your request.Please try again.'
        );
        this.setState({ loading: false, isShowBtn: false });
      }
    }
  }

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
    this.scrollOnMoreButton();
    this.setState(({ page, total }) => {
      return {
        page: page + 1,
        total: total + perPage,
      };
    });
  };

  scrollOnMoreButton = () => {
    Scroll.animateScroll.scrollToBottom({
      duration: 1700,
      delay: 100,
      smooth: true,
      offset: 50,
    });
  };

  render() {
    const { images, isShowBtn, loading, largeImageUrl } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length === 0 && (
          <p>
            <ImFilesEmpty />
            Find the best images for the gallery, which is currently empty
          </p>
        )}

        {images.length !== 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {largeImageUrl && (
          <Modal largeImageUrl={largeImageUrl} closeModal={this.closeModal} />
        )}
        {isShowBtn && <Button onMoreBtn={this.onMoreBtn} />}

        {loading && <Loader />}
      </div>
    );
  }
}
