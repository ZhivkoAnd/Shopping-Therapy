import React from "react";
import LoadingSpinners from "../components/ui/LoadingSpinners";

interface AdminProductList {
  data: any;
  remove: (id: number) => void;
  isLoadingDeletedElement: boolean;
}

const AdminProductList = ({
  data,
  remove,
  isLoadingDeletedElement,
}: AdminProductList) => {
  return (
    <div>
      <table className="table table-striped table-light">
        <thead>
          <tr>
            <th scope="col">Vacation</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((city: any) => {
            return (
              <tr key={city.id}>
                <th scope="row">{city.title}</th>
                <td>
                  {city.price}
                  <button onClick={() => remove(city.id)}>
                    {isLoadingDeletedElement ? (
                      <LoadingSpinners three_dots />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
