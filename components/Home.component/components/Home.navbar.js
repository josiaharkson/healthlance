import React from "react";
import { Link as ScrollLink } from "react-scroll";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

import Styles from "../css/home.navbar.module.css";

const Link = ({ text, to, onClick }) => {
  return (
    <ScrollLink
      activeClass={Styles.active_btn}
      onSetActive={() => {
        if (onClick) onClick();
      }}
      to={to}
      spy={true}
      smooth="easeInOutQuad"
      offset={-50}
      className={Styles.btn}
      duration={1500}
      // onSetActive={e => console.log(e)}
      // onSetInactive={e => console.log(e)}
    >
      {text}
    </ScrollLink>
  );
};

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const matches = useMediaQuery("(max-width:960px)");

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: matches ? 0 : 150,
    target: undefined,
  });

  return (
    <React.Fragment>
      <DropDownMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />

      <Slide
        direction="right"
        in={!trigger}
        mountOnEnter
        unmountOnExit
        timeout={500}
      >
        <div className={Styles.root}>
          <div className={Styles.left}>
            <h1 className={Styles.logo}>HealthLance</h1>
            <Hidden only={["xs"]}>
              <Link text="About us" to="about_us" />
              <Link text="Contact us" to="contact_us" />
              <Link text="Accountability" to="programs" />
            </Hidden>

            <Hidden only={["sm", "md", "lg", "xl"]}>
              <IconButton
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon style={{ color: "#4b0082" }} />
              </IconButton>
            </Hidden>
          </div>
          <div className={Styles.right}>{""}</div>
        </div>
      </Slide>

      <Slide
        direction="left"
        in={trigger}
        mountOnEnter
        unmountOnExit
        timeout={800}
      >
        <div className={Styles.root_trigger_bg}>
          <div className={Styles.left}>
            <h1 className={Styles.logo}>HealthLance</h1>
            <Hidden only={["xs"]}>
              <Link text="About us" to="about_us" />
              <Link text="Contact us" to="contact_us" />
              <Link text="Accountability" to="programs" />
            </Hidden>

            <Hidden only={["sm", "md", "lg", "xl"]}>
              <IconButton
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MenuIcon style={{ color: "white" }} />
              </IconButton>
            </Hidden>
          </div>
          <div className={Styles.right}>{""}</div>
        </div>
      </Slide>
    </React.Fragment>
  );
};

export default NavBar;

function DropDownMenu({ open, anchorEl, handleClose }) {
  return (
    <Menu
      id="fade-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem>
        <Link text="About us" to="about_us" onClick={handleClose} />
      </MenuItem>
      <MenuItem>
        <Link text="Contact us" to="contact_us" onClick={handleClose} />
      </MenuItem>
      <MenuItem>
        <Link text="Programs" to="programs" onClick={handleClose} />
      </MenuItem>
    </Menu>
  );
}
