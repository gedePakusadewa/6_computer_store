import ProductCards from "../components/ProductCards.js";
import UrlConst from "../resources/Urls.js"
import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const Dashboard = () =>{
  const [cookies, setCookie] = useCookies(['user']);

  const [products, setProducts] = useState(null);

  useEffect(() =>{
    axios({
      method: 'get',
      url: UrlConst.ALL_PRODUCT,
      headers: {'Authorization': "Token " + cookies['token']},
    }).then((res) => {
      setProducts(res.data)
    }).catch((err) => {
      console.log("error in dashboard")
    })
  }, []);

  return(
    <>
      dashboard
      {products !== null && (
        <ProductCards
          products={products}
        />
      )}
    </>
  )
}

export default Dashboard