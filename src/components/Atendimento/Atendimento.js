import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { firebaseDatabase } from '../../utils/firebaseUtils';
import FirebaseService from '../../services/FirebaseService';

import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  // Divider,
  Avatar,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import moment from 'moment';

import Video from '../Video/Video';

const styles = {
  main: {
    margin: '16px',
    padding: '16px',
    height: 'calc(100vh - 6.7vh)',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: 'calc(100vw - 79px - 40vw) 40vw',
    width: 'calc(100vw - 79px)',
  },
  gridRowSup: {
    height: 'calc(100vh - 26.8vh)',
  },
  gridRowInf: {
    height: 'calc(100vh - 80vh)',
    borderTop: '1px solid darkgrey',
  },
  containerLeft: {
    width: 'calc(100vw - 79px - 40vw)',
    position: 'relative',
  },
  containerRight: {
    width: '40vw',
    borderLeft: '1px solid darkgrey',
    overflowY: 'auto',
    paddingLeft: '10px',
    boxSizing: 'border-box',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  dividerFullWidth: {
    margin: '0 0 0 70px',
  },
  root: {
    width: '100%',
    maxWidth: 360,
  },
};

class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      ultimonome: '',
      ultimoguiche: '',
      historico: [],
    };
  }

  componentDidMount = () => {
    FirebaseService.getUniqueDataBy('leituras', 'historico', data =>
      this.setState({ historico: Object.values(data).reverse() }, () => {
        var ultimoRec = Object.values(data);
        ultimoRec = ultimoRec[ultimoRec.length - 1];
        this.setState({ ultimonome: ultimoRec.nome });
        this.setState({ ultimoguiche: ultimoRec.guiche });
      })
    );
    firebaseDatabase.ref('leituras').on('child_changed', () => {
      window.location.reload();
    });
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  renderVideo = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerLeft} style={{ overflow: 'hidden' }}>
        <Video />
      </div>
    );
  };

  renderRecentCalls = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerRight}>
        {/* <p>Ultimas Chamadas</p> */}
        <List>
          {this.state.historico.map(node => (
            // eslint-disable-next-line react/jsx-key
            <ListItem>
              <ListItemText primary={node.guiche + ' - ' + node.nome} />
            </ListItem>
            // <Divider component="li" />
          ))}
        </List>
      </div>
    );
  };

  renderCurrentCall = () => {
    const { classes } = this.props;
    return (
      <div className={classes.containerLeft}>
        {/* <p>Chamada Atual</p> */}
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.grow}
          >
            {this.state.ultimonome}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            Guichê {this.state.ultimoguiche}
          </Typography>
        </Toolbar>
      </div>
    );
  };

  // renderTimer = () => {
  //   const time = moment().format('HH:mm:ss a');
  //   return {
  //     setInterval(time, 1000);
  //   };
  // };

  renderCompany = () => {
    const { classes } = this.props;
    const hour = moment().format('HH:mm:ss a');
    return (
      <div className={classes.containerRight}>
        {/* <p>Logo e Hora</p> */}
        <List className={classes.root}>
          <ListItem>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="Estácio" secondary="Nova América" />
          </ListItem>
          <li>
            <Typography
              className={classes.dividerFullWidth}
              color="textSecondary"
              variant="caption"
            >
              {hour}
            </Typography>
          </li>
        </List>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={4} className={classes.main}>
        <div className={classes.gridRow} style={styles.gridRowSup}>
          {this.renderVideo()}
          {this.renderRecentCalls()}
        </div>

        <div className={classes.gridRow} style={styles.gridRowInf}>
          {this.renderCurrentCall()}
          {this.renderCompany()}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Attendance);
