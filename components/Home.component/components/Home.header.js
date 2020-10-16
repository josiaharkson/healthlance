import React from "react";
import Link from "next/link";
import Button from "@material-ui/core/Button";
import Styles from "../css/home.header.module.css";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Slide from "@material-ui/core/Slide";
import Hidden from "@material-ui/core/Hidden";

const MainText = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  return (
    <React.Fragment>
      <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={100}
      >
        <div className={Styles.text_first} style={{ color: "black" }}>
          Know your level of risk
        </div>
      </Slide>
      <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={2000}
      >
        <div>
          <div className={Styles.text_second} style={{ color: "GrayText" }}>
            Associated with use of Alcohol, tobacco products and other drugs
          </div>
          <Link href="assist_v3_english">
            <div className={Styles.button} style={{ background: secondary }}>
              <span>TAKE TEST NOW </span>
            </div>
          </Link>
        </div>
      </Slide>
    </React.Fragment>
  );
};

const MainImage = () => {
  return (
    <React.Fragment>
      <img src="/svg/responsive.svg" alt="fff" className={Styles.img} />
    </React.Fragment>
  );
};

const Index = () => {
  return (
    <div className={Styles.root}>
      <div className={Styles.header_one}>
        <MainText />
      </div>

      <div className={Styles.header_two}>
        <MainImage />
      </div>
    </div>
  );
};

export default Index;
// {
//   /* <Slide
//         direction="right"
//         in={true}
//         mountOnEnter
//         unmountOnExit
//         timeout={3000}
//       >
//         <div className={Styles.text_third} style={{ color: primary }}>
//           An adaptation of the WHO Alcohol, Smoking and Substance Involvement
//           Screening Test (ASSIST) and Feedback - Version 3.0
//         </div>
//       </Slide> */
// }

// <Hidden only={["xs", "sm",  ]}>

// </Hidden>
