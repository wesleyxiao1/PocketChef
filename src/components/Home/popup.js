import React from 'react';  
import './style.css';
import youtube from '../Youtube/youtube';
import VideoList from '../Youtube/VideoList';

class Popup extends React.Component { 
    constructor(props){
        super(props);
        this.state = {
          videoData: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        this.setState({
            videoData: response.data.items
        })
    };
  
    render() { 
        {this.handleSubmit(this.props.text)} 

    return ( 
        <div className='popup'>  
            <div className='popup\_inner'>
                <button onClick={this.props.closePopup}>close me</button>  
            </div>  
            <div>
                <VideoList videos={this.videoData}/>
            </div>
        </div>  
    );  
}  
}  

export default Popup;