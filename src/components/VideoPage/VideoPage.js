import React, { Component, useState, useEffect } from 'react'; 
import youtube from '../Youtube/youtube';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));





function VideoPage( match ){ 
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);
    useEffect(() => {
        handleSubmit();
      }, []);

    const [videos, setVideos] = useState([]);
    const [videoData, setVideoData] = useState([]);
    
    const searchValue = match.match.params.id + " recipe";

    const handleSubmit = async () => {

        const response = await youtube.get('/search', {
            params: {
                q: searchValue
            }
        })    
        setVideoData(response.data.items);
    };

    return(
        <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Recipe Video Page
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Here are some examples of similar recipes on Youtube for a visual example.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                  </Grid>
                  <Grid item>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {videoData.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                      
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.snippet.thumbnails.medium.url}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.snippet.title}
                      </Typography>
                      <Typography>
                        --------------------------------------------
                      </Typography>
                      <Typography>
                        {card.snippet.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="primary" onClick={ () => 
                        window.open(`https://www.youtube.com/watch?v=${card.id.videoId}`,'_blank')}>
                        View Video
                    </Button>
                    <Button component={Link} to={ROUTES.HOME} color="primary" className={useStyles.button}>
                        Back Home
                    </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* End footer */}
      </React.Fragment>
    );

    
}
export default VideoPage;

