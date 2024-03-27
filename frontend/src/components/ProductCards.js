import UrlConst from "../resources/Urls.js"
import { Link } from "react-router-dom";


const ProductCards = ({products}) => {
  let e1 = [
      {
          "id": 1,
          "name": "tes1",
          "image_url": "/media/images/computer_1.jpg",
          "price": 120000,
          "created_by": "user",
          "created_date": "2024-03-18",
          "modified_date": "2024-03-18"
      },
      {
          "id": 2,
          "name": "VGA",
          "image_url": "/media/images/computer_2.jpg",
          "price": 455000,
          "created_by": "user",
          "created_date": "2024-03-18",
          "modified_date": "2024-03-18"
      },
      {
          "id": 3,
          "name": "Monitor",
          "image_url": "/media/images/computer_3.jpg",
          "price": 105000,
          "created_by": "user",
          "created_date": "2024-03-18",
          "modified_date": "2024-03-18"
      }
  ]

  return(
    <>
      <div className="product-cards-container">
        {products.map(item => (
          <Link to={`/product/${item.id}`}>
            <div>
              <img
                src={UrlConst.PRODUCT_IMAGE_URI + item.image_url}
              />
              <div>{item.name}</div>
              <div>{item.star_review}</div>
              <div>{item.price}</div>
              
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default ProductCards