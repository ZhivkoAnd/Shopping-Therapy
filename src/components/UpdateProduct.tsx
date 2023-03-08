import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../utils/API";
import ProductItem from "./ui/ProductItem";
import { updateData } from "../utils/API";

const CreateUpdateProduct = () => {
  // We can get the id from the url, thanks to react-router-dom, as this is our path /update-product/:id
  const { id } = useParams();
  const navigate = useNavigate();

  //The curly braces used here, { id }, are called object destructuring syntax in JavaScript. They are used to extract a property called id from an object and assign it to a variable with the same name.
  //In this case, the useQuery hook from the react-query library takes an array as its first argument. The first element of the array is a string key that identifies the query, and the second element is an object that contains any parameters needed by the query.
  //So, the array ["product", { id }] is passed as the first argument to useQuery. The string "product" is the key that identifies this query, and { id } is an object that contains a single property, id, with the value of the id variable. ( the id from the useParams router dom )
  //The reason for using curly braces is to destructure the id property from the object and assign it directly to a variable with the same name. This way, the id variable can be used directly in the array passed to useQuery without having to manually assign it like ["product", { id: id }].
  //It's a shorthand way of assigning an object property to a variable with the same name.

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
    // mutate sends this object to the update Data API call
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
            defaultValue={data.title}
          ></input>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            ref={priceRef}
            type="number"
            className="form-control"
            defaultValue={data.price}
          ></input>
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            ref={imageRef}
            className="form-control"
            defaultValue={data.image}
          ></input>
        </div>
        <button type="submit">Add vacation</button>
      </form>
    </>
  );
};

export default CreateUpdateProduct;
