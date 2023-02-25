import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../utils/API";
import ProductItem from "./ui/ProductItem";
import { updateData } from "../utils/API";

const CreateUpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading, isError } = useQuery(
    ["product", { id }],
    getProduct
  );

  const titleRef: any = useRef("");
  const priceRef: any = useRef("");
  const imageRef: any = useRef("");

  const queryClient = useQueryClient();

  const { mutateAsync: updateMutate } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["product"]);
      navigate("/");
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    updateMutate({
      id: id,
      title: titleRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
    });
  };

  if (isLoading) {
    return <div>Loading update :</div>;
  }

  if (isError) {
    return <div>wtf</div>;
  }
  return (
    <>
      <ProductItem data={data} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            ref={titleRef}
            className="form-control"
            value={data.title}
          ></input>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            ref={priceRef}
            type="number"
            className="form-control"
            value={data.price}
          ></input>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            ref={imageRef}
            className="form-control"
            value={data.image}
          ></input>
        </div>
        <button type="submit">Add vacation</button>
      </form>
    </>
  );
};

export default CreateUpdateProduct;
