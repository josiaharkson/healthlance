import React from "react";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

import Styles from "../../css/assist.module.css";
import { go_to_Q2 } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

const Index = props => {
  const classes = useStyles();
  const { substances } = props;
  const [others, setOthers] = React.useState("");

  const [keys, setKeys] = React.useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
  });

  const handleChange = (id, e) => {
    const value = e === "true" ? true : false;
    setKeys(x => {
      let all = x;
      all[id] = value;

      return { ...all };
    });
  };

  const handleChangeJ = e => {
    const value = e.target.value.trim();

    if (!keys["J"]) setKeys({ ...keys, J: true });
    if (!value) setKeys({ ...keys, J: false });

    if (value.length >= 30) {
      return;
    } else {
      setOthers(value);
    }
  };

  const onProceed = () => {
    const myArr = Object.keys(keys);

    const numberOfSelectedYES = myArr.filter(item => keys[item] === true);

    if (!numberOfSelectedYES.length) {
      alert(
        "Kindly note that you have answered 'NO' to all items. Suggesting that you have never used these substances. Thank you for participating in this ASSIST. Your Interview Ends Here"
      );

      // EXIT CALL
      return (window.location = "/");
    }

    props.go_to_Q2({
      all: substances,
      selected: numberOfSelectedYES,
      J: others && keys.J ? others : null,
    });
  };

  return (
    <div className={Styles.body}>
      <AssisQ_Nav qNumber={1} onClick={() => onProceed()} />
      <div elevation={10} className={Styles.body_2}>
        <Typography variant="body1" style={{ color: "black" }}>
          In your life, which of the following substances have you ever used?
          even when you were in school?
          <i>(NON-MEDICAL U MEDICAL U MEDICAL USE ONLY)</i>
        </Typography>
        <Divider />

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell></TableCell>
                <TableCell align="center" padding="checkbox">
                  Yes
                </TableCell>
                <TableCell align="center" padding="checkbox">
                  No
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {substances.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell padding="checkbox">{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="center" padding="checkbox">
                    <Radio
                      size="small"
                      checked={keys[item.id] === true}
                      onChange={e => handleChange(item.id, e.target.value)}
                      value="true"
                      name={item.id + 1}
                      inputProps={{ "aria-label": Math.random() }}
                    />
                  </TableCell>
                  <TableCell align="center" padding="checkbox">
                    <Radio
                      size="small"
                      checked={keys[item.id] === false}
                      onChange={e => handleChange(item.id, e.target.value)}
                      value="false"
                      name={item.id + 4}
                      inputProps={{ "aria-label": Math.random() }}
                    />
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell padding="checkbox">10</TableCell>

                <TableCell>
                  Other - specify:
                  <TextField
                    margin="dense"
                    value={others}
                    onChange={e => handleChangeJ(e)}
                    style={{ width: "50%", marginLeft: 30 }}
                  />
                </TableCell>
                {others.trim() ? (
                  <TableCell align="center" padding="checkbox">
                    <Radio
                      checked={keys["J"] === true}
                      onChange={e => handleChange("J", e.target.value)}
                      value="true"
                      name={"J"}
                      inputProps={{ "aria-label": "J" }}
                    />
                  </TableCell>
                ) : null}
                {others.trim() ? (
                  <TableCell align="center" padding="checkbox">
                    <Radio
                      checked={keys["J"] === false}
                      onChange={e => handleChange("J", e.target.value)}
                      value="false"
                      name={"J"}
                      inputProps={{ "aria-label": "J" }}
                    />
                  </TableCell>
                ) : null}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const mapPropsToComponent = store => ({
  substances: store.assist.substances,
});

export default connect(mapPropsToComponent, { go_to_Q2 })(Index);
