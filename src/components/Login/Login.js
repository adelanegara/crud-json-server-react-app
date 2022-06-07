import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";
import bcrypt from "bcryptjs";

import {
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { onLogin, setUserData } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = createTheme();
  const navigate = useNavigate();

  const checkAccount = (account) => {
    const checkAccount = account.find((item) => {
      return item.email === email;
    });
    if (checkAccount) {
      const checkPassword = bcrypt.compareSync(password, checkAccount.password);
      if (checkPassword) {
        setUserData(checkAccount);
        console.log(checkAccount);
        onLogin();
        toast.success("Login Succesfully");
        navigate("/");
      } else {
        toast.error("invalid password");
      }
    } else {
      toast.error("Account doesn't exist");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:3005/account")
      .then((response) => checkAccount(response.data))
      .catch((error) => toast.error(error.message));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        data-testid="login"
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
                 <Link to={`/register`} className=" mr-1 m-5">
          {" "}
          Register{" "}
        </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;