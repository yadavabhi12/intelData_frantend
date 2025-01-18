import React, { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing search icon
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
// import generateData from './Table.Users.Data';
import './Pagination'
import Add_Profile from '../../Add_Profile/Add_Profile';
import { ListContext } from '../../Components/ContextAPI/ListContext';

const DataTable = () => {
  const { lists } = useContext(ListContext);
  
  const data = lists.flatMap((g) =>
    g.members.map((member) => ({
      ...member,
      created: g.created,
    }))
  );

 

  const [profile_Show, setProfile_Show] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredData = data.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      (typeof user.phone === 'string' ? user.phone.includes(query) : String(user.phone).includes(query)) ||
      user.location.toLowerCase().includes(query) ||
      user.created.toLowerCase().includes(query)
    );
  });

  

  // Total pages after filtering
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  // Ensure the current page does not exceed total pages
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);  // Reset to last page if current exceeds
  }

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

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
    <div className="table_main_container">
      <div className="table-search-card">
        <div className={`table-search ${isExpanded ? 'expanded' : ''}`}>
          <input
            type="text"
            placeholder="Search by any field"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);  // Reset to first page when filter changes
            }}
          />
          <button className='filter-btn' onClick={() => setIsExpanded(!isExpanded)}>
            <FaSearch />
          </button>
        </div>
        <button className="Add-profile-button" onClick={() => { setProfile_Show(true) }}>
          + Add Profile
        </button>
      </div>

      <div className="table-container">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.location}</td>
                  <td>{ new Date(user.created).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='pagination_main_card'>
        <div className="pagination_card">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPrevious size={17} />
          </button>

          <button
            onClick={() => setCurrentPage(1)}
            className={currentPage === 1 ? 'active' : ''}
          >
            1
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              className={page === currentPage ? 'active' : ''}
              disabled={typeof page !== 'number'}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(totalPages)}
            className={currentPage === totalPages ? 'active' : ''}
          >
            {totalPages}
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <MdOutlineNavigateNext size={17} />
          </button>
        </div>

        <div className="result_card">
          <span>Result: {currentPage}-{currentPage * itemsPerPage} of {filteredData.length}</span>
        </div>

        <div className="pagination_show">
          <span>Show 
            <select
              className='size'
              value={itemsPerPage}
              onChange={e => setItemsPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
            </select>
          </span>
        </div>
      </div>

      {profile_Show && <Add_Profile setProfile_Show={setProfile_Show} />}
    </div>
  );
};

export default DataTable;
