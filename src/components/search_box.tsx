import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import "./css/search_box.css";

const SearchBox : React.FC<{onsearch: (value: string) => void}> = ({onsearch}) : React.JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className='search_box_container'>
        <IoSearchSharp />
        <input onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if(searchTerm.length < 1) return;
            if(e.key === "Enter") {
                onsearch(searchTerm);
                return setSearchTerm("");
            }
        }} onChange={(e:  React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.currentTarget.value)
        }} 
        value={searchTerm}
        type='text' 
        className='search_box_input_field' 
        placeholder='Search' />
    </div>
  )
}

export default SearchBox