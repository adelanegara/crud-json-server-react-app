import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = createTheme();
  const url = "http://localhost:3005/account";

  const onRegister = (data) => {
    axios
      .post(url, data)
      .then(() => {
        navigate("/login");
        toast.success("register success!");
      })
      .catch((error) => toast.error(error.message));
  };

  const checkAccountList = () => {
    axios
      .get(url)
      .then((response) => {
        const checkAcount = response.data.find((item) => {
          return item.email === email;
        });
        if (checkAcount) {
          toast.warning("email already exist");
        } else {
          const data = {
            email,
            password: bcrypt.hashSync(password, 10),
            name,
            id: response.data.length + 1,
            balance: 0,
            listOrder: [],
          };
          onRegister(data);
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && name && password) {
      checkAccountList();
    } else {
      toast.warning("field can't be empty");
    }
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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              //   onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => onSubmit(e)}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;