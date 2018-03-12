import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class AlertDialog extends React.Component {
  render() {
    return (
        <Dialog
          open={this.props.open}
          onClose={this.props.onCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.titol || "Teacher Support"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.missatge}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCloseDialog} color="primary">
              Cancel·lar
            </Button>
            <Button onClick={this.props.confirmarAccio} color="primary" autoFocus>
              Acceptar
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default AlertDialog;