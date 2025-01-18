import React, { useContext, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import DataTable from 'react-data-table-component';
import Pagination from '../../pages/All-User-data/Pagination';
import { ListContext } from '../../Components/ContextAPI/ListContext';
import './Fields.css';
import Add_Profile from '../../Add_Profile/Add_Profile';

const Fields = () => {
  const { lists, fetchLists, fieldData } = useContext(ListContext);
  const [profile_Show, setProfile_Show] = useState(false);
  const [data, setData] = useState([]); // Initialize with an empty array
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All-type');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filtered data based on search and filter type
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterType === 'All-type' || item.type === filterType)
  );

  // Pagination logic for filtered data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const columns = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Type', selector: (row) => row.type || 'list' },
  ];

  // Fetch data and set it to the state
  useEffect(() => {
    fetchLists(); // Ensure fetchLists updates the context
  }, []);

  console.log(data)
  // Sync data with the fetched lists
  useEffect(() => {
    if (lists && lists[0]?.fields) {
      setData(lists[0].fields);
    } else if (fieldData) {
      setData(fieldData); // Fallback to fieldData if lists are not available
    }
  }, [lists, fieldData]);

  return (
    <div className="lists-main-container">
      <h2>Profile properties</h2>

      <div className="list-filter-cards">
        <div className="list-filter-card">
          <div className="list-search">
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span>
              <CiSearch />
            </span>
          </div>
          <select
            id="filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All-type">All types</option>
            <option value="segment">Number</option>
            <option value="list">Boolean</option>
            <option value="text">Text</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div className="list-add">
          <button onClick={() => setProfile_Show(true)}>+ Add Properties</button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p className="list-empty-mes">
          Implementing <b>Data Not Found or List is Empty</b> Message with Filter Functionality
        </p>
      ) : (
        <div className="list-table-container">
          <DataTable
            columns={columns}
            data={paginatedData}
            pagination={false}
            noDataComponent="No data available"
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={rowsPerPage}
            totalData={filteredData.length}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(items) => {
              setRowsPerPage(items);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      {profile_Show && <Add_Profile setProfile_Show={setProfile_Show} />}
    </div>
  );
};

export default Fields;





// import React, { useContext, useEffect, useState } from 'react';
// import { CiSearch } from 'react-icons/ci';
// import { MdDelete } from 'react-icons/md';
// import DataTable from 'react-data-table-component';
// import Pagination from '../../pages/All-User-data/Pagination';
// import { ListContext } from '../../Components/ContextAPI/ListContext';
// import './Fields.css';
// import Add_Profile from '../../Add_Profile/Add_Profile';

// const Fields = () => {
//   const { lists, deleteList ,fetchLists, fieldData} = useContext(ListContext);
//   const [profile_Show, setProfile_Show] = useState(false);
//   const [data, setData] = useState(fieldData); // State to store data
//   const [search, setSearch] = useState('');
//   const [filterType, setFilterType] = useState('All-type');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentIndex, setCurrentIndex] = useState(null); // State for current List ID
//   const [deleteModal, setDeleteModal] = useState(false);

//   // Filtered data based on search and filter type
//   console.log(currentIndex)
//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase()) &&
//     (filterType === 'All-type' || item.type === filterType)
//   );

//   // Pagination logic for filtered data
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const columns = [
//     {
//       name: 'Name',
//       selector: (row) => row.name,
//       cell: (row) => row.name,
//     },
//     { name: 'Type', selector: (row) => row.type || 'list' },
   
//   ];
 
//   useEffect(() => {
//      fetchLists();
//     setData(lists[0]?.fields || [])
//       // const load=async()=>{
       
//       // }
//       // load()
//     }, []);
//     console.log(data)

//   return (
//     <div className="lists-main-container">
//       <h2>Profile properties</h2>

//       <div className="list-filter-cards">
//         <div className="list-filter-card">
//           <div className="list-search">
//             <input
//               type="text"
//               placeholder="Search here"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <span>
//               <CiSearch />
//             </span>
//           </div>
//           <select
//             id="filter"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="All-type">All types</option>
//             <option value="segment">Number</option>
//             <option value="list">Boolean</option>
//             <option value="text">Text</option>
//             <option value="text">Date</option>
//           </select>
         
//         </div>
//         <div className="list-add">
//             <button onClick={() => { setProfile_Show(true)}}>+ Add Properties</button>
//           </div>
//       </div>

//       {filteredData.length === 0 ? (
//         <p className="list-empty-mes">
//           Implementing <b>Data Not Found or List is Empty</b> Message with Filter Functionality
//         </p>
//       ) : (
//         <div className="list-table-container">
//           <DataTable
//             columns={columns}
//             data={paginatedData}
//             pagination={false}
//             noDataComponent="No data available"
//           />

//           <Pagination
//             currentPage={currentPage}
//             totalPages={Math.ceil(filteredData.length / rowsPerPage)}
//             itemsPerPage={rowsPerPage}
//             totalData={filteredData.length}
//             onPageChange={(page) => setCurrentPage(page)}
//             onItemsPerPageChange={(items) => {
//               setRowsPerPage(items);
//               setCurrentPage(1);
//             }}
//           />
//         </div>
//       )}

    
//       {profile_Show && <Add_Profile setProfile_Show={setProfile_Show} />}
//     </div>
//   );
// };

// export default Fields;
