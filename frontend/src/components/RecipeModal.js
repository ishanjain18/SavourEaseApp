import { useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

export default function ScrollDialog({ open, setOpen, dishData }) {
  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {dishData.RecipeName}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            component={"span"}
          >
            <Typography variant="body" color="text.secondary">
              <strong>Cuisine:</strong> {dishData?.Cuisine} <br></br>
              <strong>Course:</strong> {dishData?.Course} <br></br>
              <strong>Diet:</strong> {dishData?.Diet} <br></br>
              <strong>Servings: </strong> {dishData?.Servings} <br></br>
              <strong>Total Preparation Time: </strong>{" "}
              {dishData?.TotalTimeInMins} minutes
            </Typography>
            <br></br>
            <hr style={{ opacity: "0.5" }}></hr>
            <strong style={{ fontWeight: 800 }}>Ingredients:</strong>
            <br></br>
            {dishData?.FullIngredients.split(",").map((ingred) => {
              return (
                <li
                  key={ingred}
                  style={{ margin: "8px 0px", fontSize: "1rem", lineHeight: 1 }}
                >
                  {ingred}
                </li>
              );
            })}
            <hr style={{ opacity: "0.5", marginTop: "10px 0px" }}></hr>
            <strong style={{ fontWeight: 800 }}>Recipe:</strong>
            <br></br>
            {dishData?.Instructions}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
