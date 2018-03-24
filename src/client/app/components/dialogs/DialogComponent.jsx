import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class DialogComponent extends React.Component {

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.tancarDialog();
  };

  render() {
    const { fullScreen } = this.props;
    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{this.props.titol}</DialogTitle>
          <DialogContent>
            <DialogContentText>
            {this.props.missatge}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Acceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DialogComponent.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(DialogComponent);