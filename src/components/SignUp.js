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
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
  },
}));

function SignUp() {
  const classes = useStyles();

  const [Snackbar, setSnackbar] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
  });
  const { vertical, horizontal, open } = Snackbar;
  const history = useHistory();
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [values, setvalues] = useState("");

  function handleNameChange(e) {
    setname(e.target.value);
  }

  function handleEmailChange(e) {
    setemail(e.target.value);
  }

  function handlePassChange(e) {
    setpassword(e.target.value);
  }

  function handleAddressChange(e) {
    setaddress(e.target.value);
  }

  function handleNumberChange(e) {
    setphone(e.target.value);
  }

  function handleSubmit(e) {
    console.log(name, phone, email, password, address);
    e.preventDefault();
    adduser();
  }
  function handleClick(newState) {
    setSnackbar({ open: true, ...newState });
  }

  function adduser() {
    axios
      .post("http://localhost:5000/api", {
        name: name,
        email: email,
        password: password,
        phoneNumber: phone,
        address: address,
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          SIGNUP
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmailChange}
              />
            </Grid>

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
                  onChange={handlePassChange}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </Grid>
            </FormControl>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phnNum"
                onChange={handleNumberChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Address"
                name="Address"
                multiline
                rows={6}
                variant="outlined"
                fullWidth
                onChange={handleAddressChange}
              />
            </Grid>
          </Grid>
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} to="/Signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
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

export default SignUp;
