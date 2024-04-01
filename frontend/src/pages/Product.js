import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import UrlConst from "../resources/Urls.js"
import { useCookies } from 'react-cookie';

const Product = () => {
  let { id } = useParams();

  const [cookies, setCookie] = useCookies(['user']);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: UrlConst.PRODUCT_DETAIL,
      headers: {'Authorization': "Token " + cookies['token']},
      params: { pk : id}
    }).then((res) => {
      setProduct(res.data.product_detail)
    }).catch((err) => {
      console.log("error in product detail")
    })
  }, [])

  const AddToCartHandler = () => {
    axios({
      method: 'post',
      url: UrlConst.ADD_TO_CART,
      headers: {'Authorization': "Token " + cookies['token']},
      data: { 
        product_pk : product.id,
        total_order : 1 
      }
    }).then((res) => {
      // console.log("success")
    }).catch((err) => {
      console.log("error in add to cart")
    })
  }

  return (
    <>
      {product !== null && (
        <div className="product-container">
          <div>
            <img
              src={UrlConst.PRODUCT_IMAGE_URI + product.image_url}
            />
          </div>
          <div> 
            <div>{product.name}</div>
            <div>{product.star_review}</div>
            <div>Description</div>
            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
          </div>
          <div>
            <div>Rp. {product.price}</div>
            <div>Status In Stock</div>
            <div>
              <button
                onClick={AddToCartHandler}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Product