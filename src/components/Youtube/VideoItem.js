import React from 'react';
import './video.css';

const VideoItem = ({video}) => {
    return (
        <div onClick={ () => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`,'_blank')}>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
        </div>
    )
};
export default VideoItem;