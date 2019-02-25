import React, { Component } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'


class Alert extends Component {

  render() {

    const { deleteContext, alertOpen, handleCancel, handleAccept } = this.props
    return (
      <Dialog
          open={alertOpen}
          onClose={handleCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Are you sure you want to ${deleteContext.text}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action <em>cannot</em> be reversed.
              Please make sure you want to permanently delete this {deleteContext.type.toLowerCase()}!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary" autoFocus>
              Cancel
            </Button>
            <Button onClick={handleAccept} color="primary">
              Delete {deleteContext.type}
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default Alert