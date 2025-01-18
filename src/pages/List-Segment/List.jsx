import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { FaFileUpload } from 'react-icons/fa';
import './List.css'
import { ListContext } from '../../Components/ContextAPI/ListContext';
import  List_upload_mapping from '../List-Upload/List_upload_mapping'
import Pagination from '../All-User-data/Pagination';

const List = () => {
  const {
    lists,
    fetchLists,
    deleteList,
    addList,
    newListName,
    setNewListName,
    currentListId,
    setCurrentListId,
  } = useContext(ListContext);

  const [showUpload, setShowUpload] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All-type');
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLists();
  }, []);

  const handleUploadClick = (listId) => {
    setShowUpload(true);
    setCurrentListId(listId);
  };

  const handleNameClick = (id) => {
    setCurrentListId(id);
    navigate('members');
  };

  const filteredData = lists
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === 'All-type' || item.type === filterType)
    )
    .sort((a, b) => new Date(b.created) - new Date(a.created));

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleModalClose = () => {
    setShowModal(false);
    setNewListName('');
  };

  return (
    <div className="lists-main-container">
      <h2>Lists & Segments</h2>
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
            <option value="segment">Segment</option>
            <option value="list">List</option>
            <option value="text">Text</option>
          </select>
        </div>
        <div className="list-add">
          <button onClick={() => setShowModal(true)}>+ List</button>
          <button onClick={() => setShowModal(true)}>+ Segment</button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p className="list-empty-mes">
          <b>No matching data or the list is empty.</b>
        </p>
      ) : (
        <div className="list-table-container">
          <table className="list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Members</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr key={row._id}>
                  <td
                    className="clickable-name"
                    onClick={() => handleNameClick(row._id)}
                  >
                    {row.name}
                  </td>
                  <td>{row.type || 'list'}</td>
                  <td>{row.members?.length || 0}</td>
                  <td>
                    {new Date(row.created).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                  <td>
                    <div className="td-lm-btn">
                      <button
                        className="lm-btn"
                        onClick={() => {
                          setDeleteModal({ show: true, id: row._id });
                          setCurrentListId(row._id);
                        }}
                      >
                        <MdDelete size={29} color="#e86565" />
                      </button>
                      <button
                        className="lm-btn"
                        onClick={() => handleUploadClick(row._id)}
                      >
                        <FaFileUpload color="#606161" size={29} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / rowsPerPage)}
            itemsPerPage={rowsPerPage}
            totalData={filteredData.length}
            onPageChange={(page) => setCurrentPage(page)}
            onItemsPerPageChange={(items) => {
              setRowsPerPage(items);
              setCurrentPage(1);
            }}
          />

          {showUpload && (
            <div className="upload-popup">
              <List_upload_mapping
                id={currentListId}
                setShowUpload={setShowUpload}
              />
            </div>
          )}
        </div>
      )}

      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this item?</p>
            <div className="modal-actions">
              <button onClick={() => setDeleteModal(false)}>Cancel</button>
              <button
                onClick={() => {
                  deleteList(currentListId);
                  setDeleteModal(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Create List</h3>
            <input
              type="text"
              placeholder="Enter list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleModalClose}>Cancel</button>
              <button
                onClick={() => {
                  addList();
                  setShowModal(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;

// import React, {useContext, useState } from 'react';
// import { CiSearch } from 'react-icons/ci';
// import './List.css';
// import List_Table from '../List-Table/List-Table';
// import { ListContext } from '../../Components/ContextAPI/ListContext';


// const List = () => {

//   const {
//     lists,
//     newListName,
//     setNewListName
//     ,currentListId,
//     deleteList,
//     addList
//   } = useContext(ListContext);

  



//   const [data, setData] = useState(lists);
//   const [search, setSearch] = useState(''); 
//   const [filterType, setFilterType] = useState('All-type');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showModal, setShowModal] = useState(false);
 
//   const [deleteModal, setDeleteModal] = useState(false);


 
    

//     // console.log(lists,"list")
//     const filteredData = data.filter((item) => {
//       // console.log("Item before filtering:", item);
//       return (
//         item.name.toLowerCase().includes(search.toLowerCase()) &&
//         (filterType === "All-type" || item.type === filterType)
//       );
//     }).sort((a, b) => {
//       // console.log("Item being sorted:", a, b);
//       return new Date(b.created) - new Date(a.created);
//     });
  
//   // console.log("Filtered Data:", filteredData);
  

//     // console.log(typeof(filterType))
  

//   const handleModalClose = () => {
//     setShowModal(false);
//     setNewListName('');
//   };

  

//   return (
//     <div className="lists-main-container">
//       <h2>Lists & Segments</h2>

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
//             <option value="segment">Segment</option>
//             <option value="list">List</option>
//             <option value="text">Text</option>
//           </select>
//         </div>
//         <div className="list-add">
//           <button onClick={() => setShowModal(true)}>+ List</button>
//           <button onClick={() => setShowModal(true)}>+ Segment</button>
//         </div>
     
//       </div>
//       {
//         filteredData>=0? <p className='list-empty-mes'>Implementing <b> Data Not Found or List is Empty </b> Message with Filter Functionality
// Here's how you can implement a filter with messages for both empty list and no matching data:</p>:
      

//       <List_Table
//         lists={filteredData}
//         setDeleteModal={setDeleteModal}
//       />
//     }

//       {deleteModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <p>Are you sure you want to delete this item?</p>
//             <div className="modal-actions">
//               <button onClick={() => setDeleteModal(false)}>
//                 Cancel
//               </button>
//               <button onClick={()=>{
//                 deleteList(currentListId)
//                 setDeleteModal(false)
//               }}>OK</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Create List</h3>
//             <input
//               type="text"
//               placeholder="Enter list name"
//               value={newListName}
//               onChange={(e) => setNewListName(e.target.value)}
//             />
//             <div className="modal-actions">
//               <button onClick={handleModalClose}>Cancel</button>
//               <button onClick={()=>{
//                 addList()
//                 setShowModal(false)
//               }   
//               }>Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;








// import React, { useState } from 'react';
// import { CiSearch } from 'react-icons/ci';
// import './List.css';
// import List_Table from '../List-Table/List-Table';

// const generateData = () => {
//   return Array.from({ length: 3000 }, (_, i) => ({
//     id: i + 1,
//     name: `User ${i + 1}`,
//     members: Math.floor(Math.random() * 100),
//     type: i % 3 === 0 ? 'list' : i % 3 === 1 ? 'text' : 'segment',
//     created: new Date(
//       2024,
//       Math.floor(Math.random() * 12),
//       Math.floor(Math.random() * 28),
//       Math.floor(Math.random() * 24),
//       Math.floor(Math.random() * 60)
//     ).toLocaleString(),
//   }));
// };

// const List = () => {
//   const [data, setData] = useState(generateData());
//   const [search, setSearch] = useState('');
//   const [filterType, setFilterType] = useState('All-type');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [showModal, setShowModal] = useState(false);
//   const [newListName, setNewListName] = useState('');
//   const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

//   const filteredData = data
//     .filter(
//       (item) =>
//         item.name.toLowerCase().includes(search.toLowerCase()) &&
//         (filterType === 'All-type' || item.type === filterType)
//     )
//     .sort((a, b) => new Date(b.created) - new Date(a.created));

//   const handleDelete = () => {
//     setData((prevData) => prevData.filter((item) => item.id !== deleteModal.id));
//     setDeleteModal({ show: false, id: null });
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setNewListName('');
//   };

//   const handleCreateList = () => {
//     if (newListName.trim()) {
//       const newList = {
//         id: data.length + 1,
//         name: newListName,
//         members: 0,
//         type: 'list',
//         created: new Date().toLocaleString(),
//       };
//       setData((prevData) => [...prevData, newList]);
//       handleModalClose();
//     }
//   };

//   return (
//     <div className="lists-main-container">
//       <h2>Lists & Segments</h2>

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
//             <option value="segment">Segment</option>
//             <option value="list">List</option>
//             <option value="text">Text</option>
//           </select>
//         </div>
//         <div className="list-add">
//           <button onClick={() => setShowModal(true)}>+ List</button>
//           <button onClick={() => setShowModal(true)}>+ Segment</button>
//         </div>
     
//       </div>

//       <List_Table
//         filteredData={filteredData}
//         setDeleteModal={setDeleteModal}
//       />

//       {deleteModal.show && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <p>Are you sure you want to delete this item?</p>
//             <div className="modal-actions">
//               <button onClick={() => setDeleteModal({ show: false, id: null })}>
//                 Cancel
//               </button>
//               <button onClick={handleDelete}>OK</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Create List</h3>
//             <input
//               type="text"
//               placeholder="Enter list name"
//               value={newListName}
//               onChange={(e) => setNewListName(e.target.value)}
//             />
//             <div className="modal-actions">
//               <button onClick={handleModalClose}>Cancel</button>
//               <button onClick={handleCreateList}>Create</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default List;
