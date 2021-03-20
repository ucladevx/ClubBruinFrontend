import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'

function YouTube() {

    const [text, setText] = useState("")
    const [searchResults, setSearchResults] = useState("LALA")

    const handleSearch = async (e) => {
        e.preventDefault()
        console.log(`Searching ${text}`)

        axios({
            method: "GET",
            url: "https://youtube.googleapis.com/youtube/v3/search",
            params: {
                part: "snippet",
                maxResults: 5,
                q: text,
                key: "AIzaSyCygYEGK5Sy_HQgQS2YdC1oJfBcAEH1d5Y"
            }
        }).then((res) => {
            setSearchResults(res.data.items)
            console.log(res.data.items)
        })

    }

    const handleTextChange = (e) => {
        e.preventDefault()
        setText(e.target.value)
    }

    return (
        <div>
            <h1>YouTube</h1>
            <div className='search-bar ui segment'>
                <form onSubmit={handleSearch} className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search">Search</label>
                        <input onChange={handleTextChange} name='video-search' type="text" value={text} />
                    </div>
                </form>
            </div>
            <div>
                {JSON.stringify(searchResults)}
            </div>
        </div>
    )
}

export default YouTube
