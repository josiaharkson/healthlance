import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  btn: { margin: 8 },
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { handleClose, open, answers, id, setMsg, setType, setOpen } = props;
  const [name, setName] = React.useState("");
  const [isloading, setisloading] = React.useState(false);

  const saveResult = async () => {
    setisloading(true);
    try {
      const res = await axios.post("/api/user/result/save", {
        id,
        data: JSON.stringify({
          ...answers,
          name: name.trim() ? name : "Untitled",
          date: new Date(),
        }),
      });

      setMsg("Saved! You can find saved results on your profile page.");
      setType("success");
      handleClose();
      setOpen(true);
      setisloading(false);
    } catch (e) {
      setMsg("Failed! An Error Occured");
      setType("error");
      setOpen(true);
      setisloading(false);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      selectedValue="dd"
    >
      <DialogTitle id="simple-dialog-title">
        Assign a name to the new result
      </DialogTitle>
      <div style={{ padding: 40 }}>
        <TextField
          name="report_name"
          variant={"outlined"}
          required
          fullWidth
          id="report_name"
          label="Result Name"
          onChange={e => setName(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => saveResult()}
          disabled={isloading}
          className={classes.btn}
        >
          SAVE
        </Button>

        <Button
          variant="contained"
          onClick={() => handleClose()}
          className={classes.btn}
        >
          cancel
        </Button>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
