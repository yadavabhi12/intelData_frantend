import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [file, setFile] = useState(null);
  const [currentListId, setCurrentListId] = useState(null);
  const [mapping, setMapping] = useState({});
  const [headers, setHeaders] = useState([]);
  const userId = localStorage.getItem("userId");
   const [fieldData, setFieldData] = useState(lists[0]?.fields || []); 
 
  // const url="http://localhost:5000/api/"
  const url="https://inteldata.onrender.com/api/"
  // Fetch all lists
  const fetchLists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}lists`, {
        headers: {
          Authorization: `Bearer ${token}`,
          userId,
        },
      });
      setLists(response.data);
      setFieldData(response.data[0]?.fields || [])
     
    } catch (error) {
      console.error("Error fetching lists:", error.response?.data || error.message);
    }
  };

  // Add a new list
  const addList = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
       `${url}lists`,
        { name: newListName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLists((prev) => [...prev, response.data]);
      setNewListName("");
    } catch (error) {
      console.error("Error adding list:", error.response?.data || error.message);
    }
  };

  // Upload a file
  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("mapping", JSON.stringify(mapping));

      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}lists/${currentListId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setLists((prev) =>
        prev.map((list) => (list._id === currentListId ? response.data.list : list))
      );
      setFile(null);
      setHeaders([]);
    } catch (error) {
      console.error("Error uploading file:", error.response?.data || error.message);
    }
  };

  // Delete a list
  const deleteList = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${url}lists${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLists((prevLists) => prevLists.filter((list) => list._id !== id));
    } catch (error) {
      console.error("Error deleting list:", error.response?.data || error.message);
    }
  };
  useEffect(() => {
   
    const load=async()=>{
      await fetchLists();
    }
    load()
  }, []);

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
      setHeaders(data[0]);
    };
    reader.readAsBinaryString(selectedFile);
  };

  // Handle mapping change
  const handleMappingChange = (header, value) => {
    setMapping((prev) => ({ ...prev, [header]: value }));
  };

  return (
    <ListContext.Provider
      value={{
        lists,
        addList,
        newListName,
        setNewListName,
        fetchLists,
        handleFileChange,
        headers,
        setHeaders,
        handleMappingChange,
        uploadFile,
        deleteList,
        setMapping,
        fieldData,
        currentListId,
        setCurrentListId,
        url
      }}
    >
      {children}
    </ListContext.Provider>
  );
};








// // ListContext.js
// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // Create Context
// export const ListContext = createContext();

// export const ListProvider = ({ children }) => {
//   const [lists, setLists] = useState([]);
//   const [newListName, setNewListName] = useState("");
//   const [file, setFile] = useState(null);
//   const [currentListId, setCurrentListId] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Initial data fetch on mount
//   useEffect(() => {
//     fetchLists();
//   }, []);

//   const fetchLists = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/lists");
//       setLists(response.data);
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
//       setLists((prevLists) => [...prevLists, response.data]); // Add new list to state
//       setNewListName("");
//     } catch (error) {
//       console.error("Error adding list:", error);
//     }
//   };

//   // Delete a list
//   const deleteList = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/lists/${id}`);
//       setLists((prevLists) => prevLists.filter((list) => list._id !== id)); // Remove from state
//     } catch (error) {
//       console.error("Error deleting list:", error);
//     }
//   };

//   // Upload a file for a list
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
//       setLists((prevLists) =>
//         prevLists.map((list) =>
//           list._id === currentListId ? response.data : list
//         )
//       ); // Update file info
//       setFile(null);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };


 
//   return (
//     <ListContext.Provider
//       value={{
//         lists,
//         newListName,
//         setNewListName,
//         addList,
//         deleteList,
//         file,
//         setFile,
//         currentListId,
//         setCurrentListId,
//         showModal,
//         setShowModal,
//         fetchLists,
//         uploadFile,
//       }}
//     >
//       {children}
//     </ListContext.Provider>
//   );
// };





// // // ListContext.js
// // import React, { createContext, useState, useEffect } from "react";
// // import axios from "axios";

// // // Create Context
// // export const ListContext = createContext();

// // export const ListProvider = ({ children }) => {
// //   const [lists, setLists] = useState([]);
// //   const [newListName, setNewListName] = useState("");
// //   const [file, setFile] = useState(null);
// //   const [currentListId, setCurrentListId] = useState(null);
// //   const [showModal, setShowModal] = useState(false);

// //   // Fetch all lists
// //   useEffect(() => {
// //     fetchLists();
// //     // setCurrentListId(null)
// //   }, [lists,]);

  
// //   const fetchLists = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/api/lists");
// //       setLists(response.data);
// //     } catch (error) {
// //       console.error("Error fetching lists:", error);
// //     }
// //   };

// //   // Add a new list
// //   const addList = async () => {
// //     if (!newListName.trim()) {
// //       alert("List name cannot be empty");
// //       return;
// //     }
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/lists", {
// //         name: newListName,
// //       });
// //       setLists([...lists, response.data]);
// //       setNewListName("");
// //     } catch (error) {
// //       console.error("Error adding list:", error);
// //     }
// //   };

// //   // Delete a list
// //   const deleteList = async (id) => {
// //     try {
      
// //       await axios.delete(`http://localhost:5000/api/lists/${id}`);
// //       setLists(lists.filter((list) => list._id !== id));
// //     } catch (error) {
// //       console.error("Error deleting list:", error);
// //     }
// //   };

// //   // Upload a file for a list
// //   const uploadFile = async () => {
// //     if (!file) {
// //       alert("Please select a file to upload.");
// //       return;
// //     }
// //     const formData = new FormData();
// //     formData.append("file", file);
    

// //     try {
// //       const response = await axios.post(
// //         `http://localhost:5000/api/lists/${currentListId}/upload`,
// //         formData
// //       );
// //       setLists(lists.map((list) => (list._id === currentListId ? response.data : list)));
// //       setFile(null);
// //       setShowModal(false);
// //     } catch (error) {
// //       console.error("Error uploading file:", error);
// //     }
// //   };

// //   return (
// //     <ListContext.Provider
// //       value={{
// //         lists,
// //         newListName,
// //         setNewListName,
// //         addList,
// //         deleteList,
// //         file,
// //         setFile,
// //         currentListId,
// //         setCurrentListId,
// //         showModal,
// //         setShowModal,
// //         uploadFile,
// //       }}
// //     >
// //       {children}
// //     </ListContext.Provider>
// //   );
// // };
