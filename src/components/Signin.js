import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import clsx from "clsx";
import SnackBar from "@material-ui/core/SnackBar";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  textField: {
    width: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
  },
}));

function Signin() {
  const [Snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });

  const history = useHistory();

  const { vertical, horizontal, open } = Snackbar;

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [values, setvalues] = useState("");
  function handleEmailChange(e) {
    setemail(e.target.value);
  }
  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    adduser();
  }
  function handleClick(newState) {
    setSnackbar({ open: true, ...newState });
  }
  //  function handleClose ()  {
  //     setSnackbar({ ...state, open: false });
  //   };
  function adduser() {
    axios
      .post("http://localhost:5000/api", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data.errors[0].msg);
        SnackBar.message = err.response.data.errors[0].msg;
        handleClick({
          vertical: "bottom",
          horizontal: "center",
        });
        setTimeout(() => {
          setSnackbar((SnackBar.open = false));
        }, 5000);
      });
  }

  function handleClickShowPassword() {
    setvalues({ ...values, showPassword: !values.showPassword });
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SIGN IN
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleEmailChange}
          required
        />
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <Grid item xs={12}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handlePasswordChange}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </Grid>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
        <Grid container>
          <Grid item>
            <Link className={classes.link} to="/SignUp" variant="body2">
              "Don't have an account? Sign Up"
            </Link>
          </Grid>
        </Grid>
      </div>
      <div>
        <SnackBar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          message={SnackBar.message}
          TransitionComponent={TransitionUp}
          key={vertical + horizontal}
        />
      </div>
    </Container>
  );
}

export default Signin;
