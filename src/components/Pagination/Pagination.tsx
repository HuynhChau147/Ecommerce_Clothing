import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.scss';

type PaginationProps = {
    totalPages: number;
    onPageChange: (page: any) => void;
    activePage?: number;
};

const Pagination = ({
    totalPages,
    onPageChange,
    activePage,
}: PaginationProps) => {
    if (totalPages === 0) return <></>;

    return (
        <ReactPaginate
            forcePage={activePage}
            onPageChange={onPageChange}
            className="pagination"
            pageClassName="pagination__page"
            pageLinkClassName="pagination__page--link"
            activeClassName="pagination__page--active"
            disabledClassName="pagination__page--disable"
            nextClassName="pagination__page--arrow"
            previousClassName="pagination__page--arrow"
            pageCount={totalPages}
            pageRangeDisplayed={3}
            previousLabel="<<"
            nextLabel=">>"
            breakLabel="..."
        />
    );
};
export default React.memo(Pagination);