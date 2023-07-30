import React, { Component } from 'react';
import Btn from './Btn';
import ImgGallery from './ImgGallery';
import './App.css';
import { fetchImgs } from './FetchImgs/FetchImgs';
import SearchBar from './SearchBar';
import Notiflix from 'notiflix';
import Loader from './Loader';

let page = 1;

class App extends Component {
  state = {
    inputData: '',
    items: [],

    status: 'idle',
    totalHits: 0,
  };

  handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await fetchImgs(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
  };
  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await fetchImgs(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };
  render() {
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
          <ImgGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Btn onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <SearchBar onSubmit={this.handleSubmit} />
          <ImgGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <Btn onClick={this.onNextPage} />
          )}
        </div>
      );
    }
  }
}
export default App;
