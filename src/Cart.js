import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading.gif";

function Cart() {
  useEffect(() => {
    axios
      .get(`http://localhost:8001/cart/${userId}`)
      .then((data) => {
        setContent(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [content, setContent] = useState();
  const userId = "Admin";

  return (
    <>
      {!content && <img src={Loading}></img>}
      {content && (
        <>
          <table>
            <thead>
              <td>Name</td>
              <td>Quantity</td>
            </thead>
            {content.map((row) => (
              <tr>
                <td>{row.productName}</td>
                <td>{row.qty}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </>
  );
}

export default Cart;
