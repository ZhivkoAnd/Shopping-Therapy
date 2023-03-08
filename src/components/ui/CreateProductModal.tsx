import * as React from "react";
import { useRef } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createData } from "../../utils/API";

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

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const titleRef: any = useRef("");
  const priceRef: any = useRef("");
  const imageRef: any = useRef("");

  const queryClient = useQueryClient();

  const { mutateAsync: createMutate } = useMutation(createData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["shop"]);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // mutate sends this object to the Create Data API call
    createMutate({
      title: titleRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
    });
    handleClose();
  };

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
            <form>
              <div className="form-group">
                <label>Title</label>
                <input ref={titleRef} className="form-control"></input>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input ref={priceRef} type="number" className="form-control" />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input ref={imageRef} className="form-control"></input>
              </div>
              <button type="submit" onClick={handleSubmit}>
                Add vacation
              </button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
