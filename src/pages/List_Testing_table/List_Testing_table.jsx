import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './testing.css';

const ListTestingTable = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [file, setFile] = useState(null);
  const [currentListId, setCurrentListId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [members, setMembers] = useState([]);
  const [showMembersModal, setShowMembersModal] = useState(false);
  const navigate = useNavigate();

  // Fetch all lists
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/lists");
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  // Add a new list
  const addList = async () => {
    if (!newListName.trim()) {
      alert("List name cannot be empty");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/lists", {
        name: newListName,
      });
      setLists([...lists, response.data]);
      setNewListName("");
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  // Delete a list
  const deleteList = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lists/${id}`);
      setLists(lists.filter((list) => list._id !== id));
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  // Upload a file for a list
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/lists/${currentListId}/upload`,
        formData
      );
      setLists(lists.map((list) => (list._id === currentListId ? response.data : list)));
      setFile(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // 
  return (
    <div className="container">
      <h1>List Management Application</h1>

      {/* Add List Form */}
      <Form className="my-3">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Form.Group>
        <Button onClick={addList}>Add List</Button>
      </Form>

      {/* Lists Table */}
      <Table striped bordered hover>
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
          {lists.map((list) => (
            <tr key={list._id}>
              <td
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() =>navigate(`/members`)}
              >
                {list.name}
              </td>
              <td>{list.type || "list"}</td>
              <td>{list.members?.length || 0}</td>

              {/* <td>{new Date(list.created).toISOString()}</td> */}
              <td>{new Date(list.created).toLocaleString('en-US', {
    // weekday: 'short', // Optional, if you want the day of the week (e.g., "Mon")
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
    hour12: true, // To display AM/PM
})}</td>

              <td>
                <Button variant="danger" onClick={() => deleteList(list._id)}>
                  Delete
                </Button>{" "}
                <Button
                  variant="primary"
                  onClick={() => {
                    setCurrentListId(list._id);
                    setShowModal(true);
                  }}
                >
                  Upload File
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Upload File Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Choose file</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" onClick={uploadFile}>
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Members Modal */}
      {/* <Modal
        show={showMembersModal}
        onHide={() => setShowMembersModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default ListTestingTable;



























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Modal, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; // Updated for React Router v6+
// import "bootstrap/dist/css/bootstrap.min.css";
// import './testing.css';

// const ListTestingTable = () => {
//   const [lists, setLists] = useState([]); // To store lists fetched from backend
//   const [selectedList, setSelectedList] = useState(null); // Selected list for viewing details (if needed)
//   const [showModal, setShowModal] = useState(false); // State for modal visibility
//   const [file, setFile] = useState(null); // File selected for upload
//   const [newListName, setNewListName] = useState(""); // New list name input
//   const [currentListId, setCurrentListId] = useState(null); // ID of the list for file upload
//   const navigate = useNavigate(); // Navigate for routing to another page

//   // Fetch lists on component mount
//   useEffect(() => {
//     fetchLists();
//   }, []);

//   const fetchLists = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/lists");
//       setLists(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Error fetching lists:", error);
//     }
//   };

//   // Add a new list
//   const addList = async () => {
//     if (!newListName.trim()) {
//       alert("List name cannot be empty");
//       return;
//     }
//     try {
//       const response = await axios.post("http://localhost:5000/api/lists", {
//         name: newListName,
//       });
//       setLists([...lists, response.data]);
//       setNewListName("");
//     } catch (error) {
//       console.error("Error adding list:", error);
//     }
//   };

//   // Delete a list
//   const deleteList = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/lists/${id}`);
//       setLists(lists.filter((list) => list._id !== id));
//     } catch (error) {
//       console.error("Error deleting list:", error);
//     }
//   };

//   // Show members of a list on a new page
//   const showMembers = (id) => {
//     navigate(`/members/${id}`); // Navigate to the members page with the list ID
//   };

//   // Upload a file
//   const uploadFile = async () => {
//     if (!file) {
//       alert("Please select a file to upload.");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/lists/${currentListId}/upload`,
//         formData
//       );
//       setLists(
//         lists.map((list) =>
//           list._id === currentListId ? response.data : list
//         )
//       );
//       setFile(null);
//       setShowModal(false); // Close the modal after upload
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>List Management Application</h1>

//       {/* Add List */}
//       <Form className="my-3">
//         <Form.Group>
//           <Form.Control
//             type="text"
//             placeholder="Enter list name"
//             value={newListName}
//             onChange={(e) => setNewListName(e.target.value)}
//           />
//         </Form.Group>
//         <Button onClick={addList}>Add List</Button>
//       </Form>

//       {/* Lists Table */}
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Members</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lists.map((list) => (
//             <tr key={list._id}>
//               <td onClick={() => showMembers(list._id)}>{list.name}</td>
//               <td>{list.type || "N/A"}</td>
//               <td>{list.members?.length || 0}</td>
//               <td>
//                 <Button
//                   variant="danger"
//                   onClick={() => deleteList(list._id)}
//                 >
//                   Delete
//                 </Button>
//                 <Button
//                   variant="primary"
//                   onClick={() => {
//                     setCurrentListId(list._id);
//                     setShowModal(true);
//                   }}
//                 >
//                   Upload File
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Upload File Modal */}
//       <Modal
//         show={showModal}
//         onHide={() => setShowModal(false)} // Properly close the modal
//         centered
//         dialogClassName="modal-90w"
//         style={{ zIndex: 100 }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Upload File</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.File
//                 label="Choose file"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//             </Form.Group>
//             <Button variant="primary" onClick={uploadFile}>
//               Upload
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default ListTestingTable;
