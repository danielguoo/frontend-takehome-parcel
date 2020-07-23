import React from 'react';
import { MdSearch } from "react-icons/md";
import './SearchBar.css';

export default ({searchValue, handleChange, handleSubmit}) => (
  <form className="Search" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Search for Ruby Gems!"
      value={searchValue}
      onChange={handleChange}
    />
    <button type="submit"> <MdSearch/> </button>
  </form>
)