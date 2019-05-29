import React, { Component, useState, useEffect } from 'react'; 
import youtube from '../Youtube/youtube';
import VideoList from '../Youtube/VideoList';
import VideoItem from '../Youtube/VideoItem';

function VideoPage( match ){ 
    
    useEffect(() => {
        handleSubmit();
      }, []);

    const [videos, setVideos] = useState([]);
    const [videoData, setVideoData] = useState([]);
    
    

    const handleSubmit = async () => {
        const response = await youtube.get('/search', {
            params: {
                q: match.match.params.id
            }
        })
    //const data = await response.json();
        
        setVideoData(response.data.items);
    };

    return(
        <div>
            {videoData.map((video) => {
            return (
                <div onClick={ () => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`,'_blank')}>
                    <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                    <div className='content'>
                        <div className='header '>{video.snippet.title}</div>
                    </div>
                </div>
            );        
            })};
        </div>
    );

    
}
export default VideoPage;