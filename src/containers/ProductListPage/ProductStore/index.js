import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
// import "./style.css"

const ProductStore = (props) => {

  const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
      under5k: 5000,
      under10k: 10000,
      under15k: 15000,
      under20k: 20000,
      under30k: 30000
    })
    //console.log(`props`, props);
    const { match } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductBySlug(match.params.slug));
    }, [])
  return (
    <>
      {
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
            <div className="card">
              <div className="cardHeader">
              <div>{props.match.params.slug} mobile under {priceRange[key]}</div>
                <button>view all</button>
              </div>
              <div style={{ display: 'flex' }}>
                {
                  product.productsByPrice[key].map(product => 
                    <div className="productContainer">
                      <div className="productImgContainer">
                        <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: '5px 0' }}>{product.name}</div>
                        <div>
                          <span>4.3</span>
                          <span>3353</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                      </div>
                    </div>  
                  )
                }
              </div>
          </div>
          );
        })
      }
    </>
  );
}

export default ProductStore