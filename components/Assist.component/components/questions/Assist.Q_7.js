import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";

import Styles from "../../css/assist.module.css";
import { go_to_Q8 } from "../../../../store/actions/assist";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 600,
  },
  tb_head: {
    padding: 444,
  },
  rot: {
    width: "100%",
    fontWeight: 700,
    height: "100%",
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 1,
  },
  rot_gray: {
    backgroundColor: theme.palette.action.hover,
  },
  rot_white: {
    backgroundColor: "inherit",
  },
}));

const makeArray = arr => {
  const data = {};
  arr.map(item => {
    const { id, name } = item;
    data[id] = { id, name, value: "0", Q2_name: "Never" };
  });

  return data;
};

const Index = props => {
  const classes = useStyles();
  const { selectedSubstances_Q_1 } = props;
  const [others, setOthers] = React.useState("");

  const [keys, setKeys] = React.useState(makeArray(selectedSubstances_Q_1));

  const handleChange = (id, value, name) => {
    setKeys(x => {
      let all = x;

      all[id].value = value;
      all[id].Q2_name = name;

      return { ...all };
    });
  };

  const onProceed = () => {
    const allId = Object.keys(keys);

    const data = [];
    allId.map(id => {
      if (keys[id].value !== "0") data.push(keys[id]);
      return;
    });

    props.go_to_Q8(data);
  };

  return (
    <div className={Styles.body}>
      <AssisQ_Nav qNumber={7} onClick={() => onProceed()} />

      <Paper elevation={10} className={Styles.body_2}>
        <Typography variant="body1">
          Have you ever Have you ever tried and failed to control, cut down or
          stop using (FIRST DRUG, SECOND DRUG, ETC.)?
        </Typography>
        <Divider />

        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead className={classes.tb_head}>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell></TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_gray)}
                  align="center"
                  padding="checkbox"
                >
                  No, Never
                </TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_white)}
                  align="center"
                  padding="checkbox"
                >
                  Yes, in the past 3 months
                </TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_gray)}
                  align="center"
                  padding="checkbox"
                >
                  Yes, but not in the past 3 months
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedSubstances_Q_1.map((item, index) => {
                const keyValue = keys[item.id].value;
                return (
                  <TableRow key={item.id}>
                    <TableCell padding="checkbox">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell
                      className={classes.rot_gray}
                      align="center"
                      padding="checkbox"
                    >
                      <Radio
                        size="small"
                        checked={keyValue === "0"}
                        onChange={e =>
                          handleChange(item.id, e.target.value, e.target.name)
                        }
                        value="0"
                        name="No, Never"
                        inputProps={{ "aria-label": Math.random() }}
                      />
                    </TableCell>
                    <TableCell
                      className={classes.rot_white}
                      align="center"
                      padding="checkbox"
                    >
                      <Radio
                        size="small"
                        checked={keyValue === "6"}
                        onChange={e =>
                          handleChange(item.id, e.target.value, e.target.name)
                        }
                        value="6"
                        name="Yes, in the past 3 months"
                        inputProps={{ "aria-label": Math.random() }}
                      />
                    </TableCell>

                    <TableCell
                      className={classes.rot_gray}
                      align="center"
                      padding="checkbox"
                    >
                      <Radio
                        size="small"
                        checked={keyValue === "3"}
                        onChange={e =>
                          handleChange(item.id, e.target.value, e.target.name)
                        }
                        value="3"
                        name="Yes, but not in the past 3 months"
                        inputProps={{ "aria-label": Math.random() }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

const mapPropsToComponent = store => ({
  selectedSubstances_Q_1: store.assist.answers.selectedSubstances_Q_1,
});

export default connect(mapPropsToComponent, { go_to_Q8 })(Index);
