import React, { Component, Fragment } from 'react';
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import FirebaseService from '../../services/FirebaseService';
import { urls } from '../../utils/urlUtils';
import { withRouter } from 'react-router-dom';

const styles = {
  areaLogin: {
    margin: '16px auto',
    padding: '16px',
    width: '30%',
  },
  textField: {
    width: '100%',
    marginBottom: '20px',
  },
  btn: {
    marginTop: '20px',
    display: 'inline-block',
  },
};

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  login = event => {
    event.preventDefault();
    const { email } = this.state;
    const { password } = this.state;
    FirebaseService.login(email, password)
      .then(() => {
        // eslint-disable-next-line react/prop-types
        this.props.history.push(urls.home.path);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  createUser = event => {
    event.preventDefault();
    const { email } = this.state;
    const { password } = this.state;

    FirebaseService.createUser(email, password)
      .then(user => {
        // eslint-disable-next-line react/prop-types
        this.props.history.push(urls.home.path);
        console.log(user);
      })
      .catch(error => {
        alert(error.message);
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render = () => {
    return (
      <Paper elevation={4} style={styles.areaLogin}>
        <Fragment>
          <Typography
            variant="h5"
            component="h2"
            style={{ marginBottom: '15px' }}
          >
            Login
          </Typography>
          <form onSubmit={this.login}>
            <TextField
              style={styles.textField}
              type="email"
              value={this.state.email}
              label="email"
              required
              onChange={this.handleChange('email')}
            />
            <TextField
              style={styles.textField}
              type="password"
              value={this.state.password}
              label="password"
              required
              onChange={this.handleChange('password')}
            />

            <Button variant="contained" type="submit" style={styles.btn}>
              Login
            </Button>

            {/* <Button
              variant="contained"
              onClick={this.createUser}
              style={styles.btn}
            >
              New User
            </Button> */}
          </form>
        </Fragment>
      </Paper>
    );
  };
}

export default withRouter(Login);
