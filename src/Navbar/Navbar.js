import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  const { isLogin, onLogout } = useContext(GlobalContext);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} data-testid="navbar">
        <AppBar sx={{ bgcolor: "#0b0b45", p: "10px" }} position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              TRADING APP
            </Typography>
            {isLogin && (
              <Button
                data-testid="button-logout"
                style={{
                  textDecoration: "none",
                  backgroundColor: "red ",
                  padding: "8px 12px",
                  fontWeight: "bold",
                  color: "#0094b6",
                }}
                onClick={onLogout}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export { Navbar as NavbarUnwrapped };
export default Navbar;
