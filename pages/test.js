import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 7,
    borderRadius: 5,
  },
  // colorPrimary: {
  //   backgroundColor:
  //     theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  // },
  // bar: {
  //   borderRadius: 5,
  //   backgroundColor: "#1a90ff",
  // },
}))(LinearProgress);

function CircularProgressWithLabel2(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel2.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearProgressWithLabel2(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        {/* <LinearProgress variant="determinate" value={33} /> */}
        <BorderLinearProgress variant="determinate" value={33} />
      </Box>
      <Box minWidth={35}>
        <CircularProgressWithLabel2 value={33} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel2.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
