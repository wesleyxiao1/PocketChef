import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';

import { compose } from 'recompose';
import Header from '../Header/header'
import Footer from '../Footer/footer'
import Nav from '../Navbar/navbar';
import Pantry from '../Pantry/pantry';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withAuthorization } from '../Session';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Switch from '@material-ui/core/Switch';
import yellow from '@material-ui/core/colors/yellow';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import * as ROUTES from '../../constants/routes';
import { ListItemText, ListItem } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import youtube from '../Youtube/youtube';
import VideoList from '../Youtube/VideoList';
import VideoItem from './VideoItem';


const YTKEY = 'AIzaSyC77Pb3aPbpOg3RDhx8GZzPEbts4VAeN6w';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: {
    part: 'snippet',
    maxResults: 5,
    type: 'video',
    key: YTKEY
  }
});

