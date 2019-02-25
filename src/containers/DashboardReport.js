import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
 } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventTotalsDisplay from '../components/EventTotalsDisplay';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class DashboardReport extends Component {
  render() {
    const { userData, classes } = this.props
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Basic Metrics</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {userData && userData.taskEvents ? <EventTotalsDisplay userData={userData}/> : <div><h5>No Events Found!</h5></div>}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

DashboardReport.propTypes = {
  userData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DashboardReport)