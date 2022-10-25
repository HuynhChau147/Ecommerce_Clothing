import React, { useEffect, useState, useCallback } from 'react';
import AdminProductItem from '../../components/AdminProductItem/AdminProductItem';

import * as productServices from '../../services/productServices';
import './AdminProduct.scss';
import { ProductModel } from '../../Model/productModel';
import Pagination from '../../components/Pagination/Pagination';
import useDebounce from '../../hooks/useDebounce';
import HeadingCta from './HeadingCta';
import HeaderProductBlock from './HeaderProductBlock';

const AdminProduct = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [totalPages, setTotalPage] = useState<number>(0);
  const [pageActive, setPageActive] = useState<number>(1);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const debounceSearchValue = useDebounce(searchInput, 500);

  useEffect(() => {
    const fetchProducts = async (page: number, keywords: string) => {
      const res = await productServices.getAllProduct({
        page,
        limit: 10,
        keywords,
      });

      setProducts(res.data.data);
      setTotalPage(res.totalPages);
      setIsDelete(false);
      setIsCreate(false);
    };

    fetchProducts(pageActive, debounceSearchValue);
  }, [pageActive, debounceSearchValue, isDelete, isCreate]);

  const pageChangeHandler = useCallback((page: any) => {
    setPageActive(page.selected + 1);
  }, []);

  const onDelete = useCallback(() => {
    setIsDelete(true);
  }, []);

  return (
    <section className="admin-product-container">
      <HeadingCta
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setIsCreate={setIsCreate}
      />

      <HeaderProductBlock />

      <div className="admin-product-listitem">
        {products.length &&
          products.map(product => (
            <AdminProductItem
              key={product._id}
              product={product}
              onDelete={onDelete}
            />
          ))}
      </div>
      <div className="admin-product-footer">
        {totalPages && (
          <Pagination
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
          />
        )}
      </div>
    </section>
  );
};
export default AdminProduct;