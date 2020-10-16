import React from "react";
import clsx from "clsx";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";

import Styles from "../../css/assist.module.css";
import { go_to_Q5 } from "../../../../store/actions/assist";

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
  const { selectedSubstances_Q_2 } = props;
  const [others, setOthers] = React.useState("");

  const [keys, setKeys] = React.useState(makeArray(selectedSubstances_Q_2));

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

    props.go_to_Q5(data);
  };

  return (
    <div className={Styles.body}>
      <AssisQ_Nav qNumber={4} onClick={() => onProceed()} />

      <Paper elevation={10} className={Styles.body_2}>
        <Typography variant="body1">
          <b> During the past three months</b>, how often has your use of these
          substances listed below led to health, social, legal or financial
          problems?
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
                  Never
                </TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_white)}
                  align="center"
                  padding="checkbox"
                >
                  Once or Twice
                </TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_gray)}
                  align="center"
                  padding="checkbox"
                >
                  Monthly
                </TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_white)}
                  align="center"
                  padding="checkbox"
                >
                  Weekly
                </TableCell>
                <TableCell
                  className={clsx(classes.rot, classes.rot_gray)}
                  align="center"
                  padding="checkbox"
                >
                  Daily or Almost Daily
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedSubstances_Q_2.map((item, index) => {
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
                        name="Never"
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
                        checked={keyValue === "4"}
                        onChange={e =>
                          handleChange(item.id, e.target.value, e.target.name)
                        }
                        value="4"
                        name="Once or Twice"
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
                        checked={keyValue === "5"}
                        onChange={e =>
                          handleChange(item.id, e.target.value, e.target.name)
                        }
                        value="5"
                        name="Monthly"
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
                        name="Weekly"
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
                        checked={keyValue === "7"}
                        onChange={e =>
                          handleChange(item.id, e.target.value, e.target.name)
                        }
                        value="7"
                        name="Daily or Almost Daily"
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
  selectedSubstances_Q_2: store.assist.answers.selectedSubstances_Q_2,
});

export default connect(mapPropsToComponent, { go_to_Q5 })(Index);
