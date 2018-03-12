import React from 'react';
import Snackbar from 'material-ui/Snackbar';

class Notificacio extends React.Component {
  render() {
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.props.open}
          onClose={this.props.onCloseNotificacio}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.missatge}</span>}
        />
      </div>
    );
  }
}

export default Notificacio;