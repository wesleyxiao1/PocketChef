import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function FiltersGroup(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    highProtein: props.highProtein,
    tmpFilter: false,
  });

  const [open, setOpen, callback] = React.useState(true);

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    //debugger;

    props.callback(!highProtein)
  };

  const { highProtein, tmpFilter } = state;
  //const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle id="form-dialog-title">Filters</DialogTitle>
      <DialogContent>
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Select from the following filters:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={highProtein} onChange={handleChange('highProtein')} value="highProtein" />}
                label="High Protein"
              />
            </FormGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FiltersGroup;