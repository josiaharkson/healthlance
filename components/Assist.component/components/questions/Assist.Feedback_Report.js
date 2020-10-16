import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import Styles from "../../css/assist.module.css";

import AssisQ_Nav from "./Assist.Q_Nav";

import { makeStyles } from "@material-ui/core/styles";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Index = props => {
  const { answers } = props;
  const classes = useStyles();

  const [view, setView] = React.useState("first");
  const [results, setResults] = React.useState(null);
  const [substances, setSubstances] = React.useState(null);

  const getResults = async () => {
    try {
      const res = await axios.post("/api/assist/calculate-answer", {
        answers,
      });

      const { Q_8, getRiskLevels, SUB_J } = res.data;
      setResults({ Q_8, getRiskLevels, SUB_J });
      setView("second");
    } catch (e) {}
  };

  const getSubstances = async () => {
    try {
      const res = await axios.get("/api/assist/get-substances");

      setSubstances(res.data);
    } catch (e) {}
  };

  const onProceed = () => {};

  React.useEffect(() => {
    if (!substances) getSubstances();
  });

  return (
    <div className={Styles.body}>
      <AssisQ_Nav qNumber={"REPORT"} onClick={() => onProceed()} />
      <Paper elevation={10} className={Styles.body_2}>
        {view === "first" && <FirstComp getResults={getResults} />}
        {view === "second" && (
          <SecondComp results={results} substances={substances} />
        )}
      </Paper>
    </div>
  );
};

const mapPropsToComponent = store => ({
  answers: store.assist.answers,
});

export default connect(mapPropsToComponent)(Index);

const FirstComp = ({ getResults }) => (
  <React.Fragment>
    <Divider />
    <h1>Welcome To feedback report!</h1>
    <h3>Congratulaions You Have Completed The Questions Successfully</h3>

    <Button
      color="primary"
      variant="outlined"
      style={{ padding: 20 }}
      onClick={() => getResults()}
    >
      Click Here to Get Your Results
    </Button>
  </React.Fragment>
);

const SecondComp = ({ results, substances }) => {
  const classes = useStyles();
  const { getRiskLevels, Q_8, SUB_J } = results;
  console.log({ substances, Q_8, SUB_J });
  return (
    <React.Fragment>
      <Divider />
      <h1>Second Report</h1>

      <Divider />

      {getRiskLevels.map(item => {
        if (item.substance === "J")
          return (
            <React.Fragment key={item.value}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel1a-content-${item.value}`}
                  id={`panel1a-header-${item.value}`}
                >
                  <div className={classes.heading}>
                    <div>Substance: {SUB_J}</div>
                    <div>Risk Level: {item.riskLevel}</div>
                    <div>Substance Involvement Score: {item.value}</div>
                  </div>
                </AccordionSummary>
              </Accordion>
            </React.Fragment>
          );
        let substance = getFirstPartName(substances[item.substance].name);

        return (
          <React.Fragment key={item.value}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel1a-content-${item.value}`}
                id={`panel1a-header-${item.value}`}
              >
                <div className={classes.heading}>
                  <div>Substance: {substance}</div>
                  <div>Risk Level: {item.riskLevel}</div>
                  <div>Substance Involvement Score: {item.value}</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <h4>Regular use of {substance} is associated with: </h4>
                  <ul>
                    {substances[item.substance].risks.map(r => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <h5>
                    Your risk of experiencing these harms is: {item.riskLevel}
                  </h5>
                </div>
              </AccordionDetails>
            </Accordion>
          </React.Fragment>
        );
      })}

      {Q_8.trim() && (
        <React.Fragment>
          <h3>
            You indicated that you have injected drugs
            {Q_8 === "Yes, but not in the past 3 months" && ", but not"} in the
            last 3 months
          </h3>
          <Button variant="contained" color="primary">
            {" "}
            VIEW - RISKS OF INJECTING{" "}
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const getFirstPartName = name => name.split("(")[0].trim();
