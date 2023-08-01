import React, { Component } from 'react';
import Btn from './Btn';
import ImgGallery from './ImgGallery';
import './App.css';
import { fetchImgs } from './FetchImgs/FetchImgs';
import SearchBar from './SearchBar';
import Notiflix from 'notiflix';
import Loader from './Loader';

class App extends Component {
  state = {
    inputData: '',
    items: [],

    page: 1,
    status: 'idle',
    totalHits: 0,
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.inputData !== this.state.inputData ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ status: 'pending' });
      const { totalHits, hits } = await fetchImgs(
        this.state.inputData,
        this.state.page
      );
      if (hits.length < 1) {
        this.setState({ status: 'idle' });
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        this.setState(prevState => ({
          items: prevState.page === 1 ? hits : [...prevState.items, ...hits],
          totalHits: totalHits,
          status: 'resolved',
        }));
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  handleSubmit = async inputData => {
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by an empty field, try again.');
    } else {
      this.setState({ inputData, page: 1 });
    }
  };

  onNextPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { totalHits, status, items, page } = this.state;

    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmit} />
        {status === 'pending' && (
          <>
            <Loader />
          </>
        )}
        {status === 'rejected' && <p>Something went wrong, try again later.</p>}
        {status === 'resolved' && (
          <>
            {items.length > 0 && (
              <ImgGallery page={page} items={this.state.items} />
            )}
            {totalHits > 12 && totalHits > items.length && (
              <Btn onClick={this.onNextPage} />
            )}
          </>
        )}
      </div>
    );
  }
}
export default App;
