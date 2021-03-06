import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../Context/GlobalContext";

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

const Login = () => {
  const { account, onLogin, setUserData } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const theme = createTheme();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkAccount = account.find((item) => {
      return item.email === email && item.password === password;
    });
    if (checkAccount) {
      setUserData(checkAccount);
      onLogin();
      toast.success("Login Succesfully");
      navigate("/");
    } else {
      toast.error("Invalid username or password");
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
