import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Chip from 'material-ui/Chip';
import TagFacesIcon from 'material-ui-icons/TagFaces';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    marginTop: theme.spacing.unit  + 3,
    marginRight: theme.spacing.unit,
    padding: theme.spacing.unit / 2,
  },
});

class ChipsArray extends React.Component {

    constructor(props) {
        super(props);
    }

    handleDelete = data => () => {
      this.props.deleteChip(data);
    };

    render() {
      const { classes } = this.props;

      return (
        <div>
          {this.props.chipData.map(data => {
            return (
              <Chip
                key={data.key}
                label={data.label}
                onDelete={this.handleDelete(data)}
                className={classes.chip}
              />
            );
          })}
        </div>
      );
    }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChipsArray);
