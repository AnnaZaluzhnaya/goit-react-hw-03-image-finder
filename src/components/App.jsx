import { Component } from 'react';
// import { searchImages } from 'Servise/Api';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Modal from './Modal';
// import { ToastContainer } from 'react-toastify';

export class App extends Component {
  state = {
    page: 1,
    images: [],
    searchName: '',
    status: 'idle',
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName, page: 1 });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <Loader />
        {/* <Modal /> */}
      </div>
    );
  }
}
