import React from 'react';
import './Pagination.css';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  totalData,
  onItemsPerPageChange, // Callback for updating items per page
}) => {
  const maxPageButtons = 5;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageButtons / 2));

    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    return pageNumbers;
  };

  return (
    <div className="pagination_main_card">
      <div className="pagination_card">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <GrFormPrevious size={17} />
        </button>

        <button onClick={() => onPageChange(1)} className={currentPage === 1 ? 'active' : ''}>
          1
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}

        <button onClick={() => onPageChange(totalPages)} className={currentPage === totalPages ? 'active' : ''}>
          {totalPages}
        </button>

        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <MdOutlineNavigateNext size={17} />
        </button>
      </div>

      <div className="result_card">
        <span>
          Result: {Math.min((currentPage - 1) * itemsPerPage + 1, totalData)} - {Math.min(currentPage * itemsPerPage, totalData)} of {totalData}
        </span>
      </div>

      <div className="pagination_show">
        <label>
          Show
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="pagination_select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        
        </label>
      </div>
    </div>
  );
};

export default Pagination;











// import './Pagination.css';
// import { MdOutlineNavigateNext } from "react-icons/md";
// import { GrFormPrevious } from "react-icons/gr";
// import { IoIosArrowDown } from "react-icons/io";



// const Pagination = ({ currentPage, totalPages,  itemsPerPage, onPageChange,totalData,pageSet }) => {
//   const maxPageButtons = 5;

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
//     const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageButtons / 2));

//     if (startPage > 2) {
//       pageNumbers.push('...'); 
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     if (endPage < totalPages - 1) {
//       pageNumbers.push('...');
//     }

//     return pageNumbers;
//   };

//   return (
   

// <div className='pagination_main_card'>
// <div className="pagination_card">
//       {/* Previous Button */}
//       <button 
//         onClick={() => onPageChange(currentPage - 1)} 
//         disabled={currentPage === 1}>
//         <GrFormPrevious size={17} />

//       </button>

//       {/* First Page */}
//       <button 
//         onClick={() => onPageChange(1)} 
//         className={currentPage === 1 ? 'active' : ''}>
//         1
//       </button>
      
//       {/* Dynamic Page Buttons */}
//       {getPageNumbers().map((page, index) => (
//         <button
//           key={index}
//           onClick={() => typeof page === 'number' && onPageChange(page)}
//           className={page === currentPage ? 'active' : ''}
//           disabled={typeof page !== 'number'} // Disable dots (...)
//         >
//           {page}
//         </button>
//       ))}

//       {/* Last Page */}
//       <button 
//         onClick={() => onPageChange(totalPages)} 
//         className={currentPage === totalPages ? 'active' : ''}>
//         {totalPages}
//       </button>

//       {/* Next Button */}
//       <button 
//         onClick={() => onPageChange(currentPage + 1)} 
//         disabled={currentPage === totalPages}>
//        <MdOutlineNavigateNext size={17}/>
//       </button>
//     </div>
//     <div className="result_card">
//       <span>Result   : {currentPage}-{currentPage*10}   of {totalData}</span>
//     </div>
//     <div className="pagination_show">
//        <span >Show 
//          <span className='pagination_next' onClick={() => currentPage<totalPages&&pageSet((p)=>p+5)} 
//             disabled={currentPage === totalPages}>
//            {  itemsPerPage}<IoIosArrowDown size={18}/>
       

//          </span>
//       </span>
//     </div>

// </div>

//   );
// };

// export default Pagination;
