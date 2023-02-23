import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";

const Basket = (props: any) => {
  // let totalPrice = 0;

  // props.cartItems.forEach((item: any) => {
  //   totalPrice += item.price * item.qty;
  // });

  const totalPrice = props.cartItems.reduce(
    (a: number, b: { price: number; qty: number }) => a + b.price * b.qty,
    0
  );

  return (
    <>
      <table className="table table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Vacation</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {props.cartItems?.map((item: any) => {
            if (item.qty > 0) {
              return (
                <tr key={item.id}>
                  <th scope="row">
                    {" "}
                    <DeleteIcon onClick={() => props.removeItem(item)}>
                      X
                    </DeleteIcon>
                    {item.title}
                  </th>
                  <td>
                    <div className="vacation-panel__basket-button-group">
                      <RemoveCircleIcon onClick={() => props.remove(item)}>
                        -
                      </RemoveCircleIcon>
                      <div>{item.qty}</div>
                      <AddCircleIcon onClick={() => props.add(item)}>
                        +
                      </AddCircleIcon>
                    </div>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.qty * item.price}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      <div className="vacation-panel__shop-total-price">
        Total: ${totalPrice}
      </div>
    </>
  );
};

export default Basket;
