import { useState, useEffect } from 'react';
import { ProductModel } from '../../../Model/productModel';

import * as productServices from '../../../services/productServices';
import ProductCard from '../../Products/ProductCard/ProductCard';
import Spinner from '../../UI/Spinner/Spinner';
import './HomeProductsLatest.scss';

const HomeProductsLatest = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productServices.getAllProduct({
        limit: 4,
      });

      setProducts(res.data.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="latest-products container">
      <h2>Our Latest Products</h2>
      <div className="products-latest__grid">
        {!products.length && <Spinner />}
        {products.map(product => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};
export default HomeProductsLatest;