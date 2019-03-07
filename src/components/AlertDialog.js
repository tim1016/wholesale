/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/*
Added Dialog box feature to return true or false depending on which
option is chosen.
Added conditional rendering for dialog title and text

*/
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  state = {
    open: !!this.props.modalOpen
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (e) => {
    if (this.props.buttonYes === e.target.textContent) {
      this.props.answer(true);
      this.setState({ open: false });
    } else {
      this.props.answer(false);
      this.setState({ open: false });
    }
  };

  render() {
    return (
      <div>
        {/* <Button variant="outlined" color="primary" >
          Open alert dialog
        </Button> */}
        <Dialog
          open={this.props.modalOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {this.props.dialogTitle
            && <DialogTitle id="alert-dialog-title">{this.props.dialogTitle}</DialogTitle>
          }
          {this.props.dialogText && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.dialogText}
            </DialogContentText>
          </DialogContent>
          )}
          <DialogActions>
            <Button id="yes123" onClick={this.handleClose} color="primary">
              {this.props.buttonYes}
            </Button>
            <Button id="no123" onClick={this.handleClose} color="primary" autoFocus>
              {this.props.buttonNo}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
