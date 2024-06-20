import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from "mdb-react-ui-kit";

const Pagination = ({ currentPage, handlePagination, totalPages }) => {

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    for (let i = 0; i < totalPages; i++) {
      items.push(
        <MDBPaginationItem key={i} active={currentPage === i}>
          <MDBPaginationLink onClick={() => handlePagination(i)}>
            {i + 1}
          </MDBPaginationLink>
        </MDBPaginationItem>
      );
    }

    return (
      <MDBPagination>
        {currentPage > 0 && (
          <MDBPaginationItem>
            <MDBBtn rounded onClick={() => handlePagination(currentPage - 1)}>
              Prev
            </MDBBtn>
          </MDBPaginationItem>
        )}
        {items}
        {currentPage < totalPages - 1 && (
          <MDBPaginationItem>
            <MDBBtn rounded onClick={() => handlePagination(currentPage + 1)}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        )}
      </MDBPagination>
    );
  };

  return (
    <div>
      {renderPagination()}
    </div>
  );
};

export default Pagination;
