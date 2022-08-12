import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store/store'
import {render, screen} from '@testing-library/react'
import Home from '../src/components/home/Home';


describe('Render DOM elementes', function() {
  it('Renders <Home /> without Crashing', function() {
    render(<Provider store={store}><Home /></Provider>);
    screen.getByPlaceholderText('Search videogame by name...');
    // const div = document.createElement("div");
    // ReactDOM.render(<Provider store={store}><Home></Home></Provider>, div);
  });
});