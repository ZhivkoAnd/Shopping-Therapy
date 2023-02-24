import { useQuery, useMutation } from "@tanstack/react-query";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../utils/API";

const CreateUpdateProduct = ({
  handleSubmit,
  titleRef,
  priceRef,
  imageRef,
}: any) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading, isError } = useQuery(
    ["product", { id }],
    getProduct
  );

  // const { mutateAsync, isLoading: isMutating } = useMutation(updateData);

  if (isLoading) {
    return <div>Loading update :</div>;
  }

  if (isError) {
    return <div>wtf</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input ref={titleRef} className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input ref={priceRef} type="number" className="form-control"></input>
      </div>
      <div className="form-group">
        <label>Image</label>
        <input ref={imageRef} className="form-control"></input>
      </div>
      <button type="submit">Add vacation</button>
    </form>
  );
};

export default CreateUpdateProduct;
