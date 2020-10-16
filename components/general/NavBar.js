import React from "react";
import Typography from "@material-ui/core/Typography";
import Styles from "./navbar.module.css";
import { useTheme } from "@material-ui/core/styles";

const NavBar = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <div className={Styles.root} style={{ color: primary }}>
      <div className={Styles.left}>
        <h1 className={Styles.logo}>HealthLance</h1>
        <h3 className={Styles.btn}>About us</h3>
        <h3 className={Styles.btn}>Programs</h3>
        <h3 className={Styles.btn}>Contact Us</h3>
      </div>
      <div className={Styles.right}>
        <h3 className={Styles.btn}>Login</h3>
        <h3 className={Styles.btn}>Signup</h3>
      </div>
    </div>
  );
};

export default NavBar;
