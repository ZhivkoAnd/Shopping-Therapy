import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({
  handleSubmit,
  titleRef,
  priceRef,
  imageRef,
}: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="create-product-modal-button">
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Product
        </Button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Button onClick={handleClose}>X</Button>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input ref={titleRef} className="form-control"></input>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  ref={priceRef}
                  type="number"
                  className="form-control"
                ></input>
              </div>
              <div className="form-group">
                <label>Image</label>
                <input ref={imageRef} className="form-control"></input>
              </div>
              <button type="submit" onClick={handleClose}>
                Add vacation
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
