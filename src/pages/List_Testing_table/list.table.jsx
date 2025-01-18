import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { ListContext } from "../../Components/ContextAPI/ListContext";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const MembersTable = () => {
  const { currentListId } = useContext(ListContext);
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, [currentPage, itemsPerPage]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `${url}lists/${currentListId}/members`,
        {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        }
      );
      setMembers(response.data.members);
      setTotalData(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="container">
      <h1>Members of List</h1>
      <Button variant="secondary" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalData / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        totalData={totalData}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default MembersTable;





// table fetch data in per pagination 

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { Table, Button } from "react-bootstrap";
// import { ListContext } from "../../Components/ContextAPI/ListContext";
// import Pagination from "../Pagination/Pagination"; // Assuming Pagination is in the same directory
// import { useNavigate } from "react-router-dom"; // For navigation
// // import './Pagination.css'; // CSS for pagination

// const MembersTable = () => {
//   const { currentListId } = useContext(ListContext);
//   const id = currentListId;
//   const [members, setMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [totalData, setTotalData] = useState(0);
//   const navigate = useNavigate(); // For back button navigation

//   useEffect(() => {
//     fetchMembers();
//   }, [currentPage]);

//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/lists/${id}/members?page=${currentPage}&limit=${itemsPerPage}`
//       );
//       setMembers(response.data.members);
//       setTotalData(response.data.totalCount);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="container">
//       <h1>Members of List</h1>
//       <Button variant="secondary" onClick={() => navigate(-1)}>
//         Back
//       </Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Member Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Location</th>
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member) => (
//             <tr key={member._id}>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.phone}</td>
//               <td>{member.location}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Pagination Component */}
//       <Pagination
//         currentPage={currentPage}
//         totalPages={Math.ceil(totalData / itemsPerPage)}
//         itemsPerPage={itemsPerPage}
//         onPageChange={handlePageChange}
//         totalData={totalData}
//         pageSet={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default MembersTable;





















// import React, { useState, useEffect ,useContext} from "react";
// import axios from "axios";
// import { Table, Button } from "react-bootstrap";
// import { ListContext } from "../../Components/ContextAPI/ListContext";


// // import 

// const MembersTable = () => {
//   const {  currentListId}=useContext(ListContext)
//   const id  =currentListId
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/lists/${id}/members`);
//       setMembers(response.data);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Members of List</h1>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Member Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Location</th>
           
//           </tr>
//         </thead>
//         <tbody>
//           {members.map((member) => (
//             <tr key={member._id}>
//               <td>{member.name}</td>
//               <td>{member.email}</td>
//               <td>{member.phone}</td>
//               <td>{member.location}</td>
             
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default MembersTable;
