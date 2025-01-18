import { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import './List_upload_mapping.css';
import { ListContext } from "../../Components/ContextAPI/ListContext";

const ListUploadMapping = ({ id, setShowUpload }) => {
  const [file, setFile] = useState(null);
  const [mappedData, setMappedData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState({});

  const { fetchLists, lists ,url} = useContext(ListContext);
  const fieldmapping = lists[0]?.fields || [];

  const staticFields = ["name", "email", "phone"];

  useEffect(() => {
    fetchLists();
  }, []);

  // Handle file upload and parse headers
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Extract headers from the first row of the sheet
      setHeaders(data[0]);
    };
    reader.readAsBinaryString(selectedFile);
  };

  // Handle mapping field change
  const handleMappingChange = (header, mappedField) => {
    setMapping((prev) => ({ ...prev, [header]: mappedField }));
  };

  // Validate mapping before uploading
  const validateMapping = (finalMapping) => {
    let isValid = true;
    for (const header in finalMapping) {
      const mappedField = finalMapping[header];
      if (
        !staticFields.includes(mappedField) &&
        !fieldmapping.some((f) => f.name === mappedField && f.type === "text")
      ) {
        isValid = false;
        alert(`Invalid mapping for ${header}: ${mappedField}`);
        break;
      }
    }
    return isValid;
  };

  // Generate the final mapping object with fallbacks for static fields
  const generateFinalMapping = () => {
    const finalMapping = { ...mapping };
    staticFields.forEach((field) => {
      if (!Object.values(finalMapping).includes(field)) {
        finalMapping[field] = field;
      }
    });
    return finalMapping;
  };

  // Upload mapped data
  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file!");
      return;
    }

    const finalMapping = generateFinalMapping();

    if (!validateMapping(finalMapping)) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mapping", JSON.stringify(finalMapping));

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}lists/${id}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMappedData(response.data.mappedData);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Error uploading data.");
    }
    setShowUpload(false);
  };

  return (
    <div className="list_upload_mapping-container">
      <h2>Google Sheet Mapping</h2>
      <div className="list_upload_mapping-card">
        <div className="input-cancel-container">
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          <span  className="cancel-btn" onClick={() => setShowUpload(false)}>X</span>
        </div>

        {headers.length > 0 && (
          <div>
            <h3>Map Fields</h3>
            <div className="list_upload_mapping">
              {headers.map((header, index) => (
                <div key={index} className="field-mapping-row">
                  <label>{header}:</label>
                  <select
                    onChange={(e) => handleMappingChange(header, e.target.value)}
                  >
                    <option value="">Select Field</option>
                    {staticFields.map((field, fieldIndex) => (
                      <option key={fieldIndex} value={field}>
                        {field}
                      </option>
                    ))}
                    {fieldmapping.map((fieldOption, optionIndex) => (
                      <option key={optionIndex} value={fieldOption.name}>
                        {fieldOption.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="upload-btn-container">
              <button onClick={handleUpload}>Upload</button>
            </div>
          </div>
        )}
      </div>

      {mappedData.length > 0 && (
        <div>
          <h3>Uploaded Data</h3>
          <pre>{JSON.stringify(mappedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ListUploadMapping;



// import  { useContext, useEffect, useState } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";
// import './List_upload_mapping.css'
// import { ListContext } from "../../Components/ContextAPI/ListContext";


// const List_upload_mapping = ({id,setShowUpload}) => {
//     const [file, setFile] = useState(null);
 
//     const [mappedData, setMappedData] = useState([]);
//    const { fetchLists,headers, setHeaders,mapping, setMapping ,lists}= useContext(ListContext);
   
//    const field=lists[0].fields
//    console.log(field,"filelds ")
//    useEffect(()=>{
//     fetchLists()
    
//    },[])

  
    
//     const staticFields = ["name", "email", "phone"];
    
  
//     // Handle file upload and parse headers
//     const handleFileUpload = (e) => {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
  
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const binaryData = event.target.result;
//         const workbook = XLSX.read(binaryData, { type: "binary" });
//         const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
//         const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
//         // Extract headers
//         setHeaders(data[0]);
       
//       };
//       reader.readAsBinaryString(selectedFile);
//     };
  
//     // Handle mapping field change
//     const handleMappingChange = (header, mappedField) => {
//       setMapping((prev) => ({ ...prev, [header]: mappedField }));
//     };
  
//     // Generate the final mapping object with fallbacks for static fields
//     const generateFinalMapping = () => {
//       const finalMapping = { ...mapping };
//       staticFields.forEach((field) => {
//         if (!Object.values(finalMapping).includes(field)) {
//           finalMapping[field] = field;
//         }
//       });
//       return finalMapping;
//     };
  
//     // Upload mapped data
//     const handleUpload = async () => {
//       if (!file) {
//         alert("Please upload a file!");
//         return;
//       }
  
//       const finalMapping = generateFinalMapping();
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("mapping", JSON.stringify(finalMapping));
//       //  console.log(id)
  
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//           `http://localhost:5000/api/lists/${id}/upload`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setMappedData(response.data.mappedData);
//         alert("Data uploaded successfully!");
//       } catch (error) {
//         console.error(error);
//         alert("Error uploading data.");
//       }
//        setShowUpload(false)

//     };
  
//     return (
//       <div className="list_upload_mapping-container">
//         <h2>Google Sheet Mapping</h2>
//         <div className="list_upload_mapping-card">
//          <div className="input-cenel-container">
//          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
//          <span className="cenel-btn" onClick={()=>{setShowUpload(false)}}>X</span>
//          </div>
      
//         {headers.length > 0 && (<div>
//             <h3>Map Fields</h3>
//             <div className="list_upload_mapping">
//             {headers.map((header, index) => (
//               <div key={index}>
//                 <label>{header}:</label>
//                 <select onChange={(e) => handleMappingChange(header, e.target.value)}>
//                   <option value="">Select Field</option>
//                   {staticFields.map((field, fieldIndex) => (
//                     <option key={fieldIndex} value={field}>
//                       {field}
//                     </option>
//                   ))}
//                   {headers.map((headerOption, optionIndex) => (
//                     <option key={optionIndex} value={headerOption}>
//                       {headerOption}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ))}
           
//           </div>
//           <div className="upload-btn1">
//         <button onClick={handleUpload}>Upload</button>
//         </div>
       
//           </div>
//         )}
        
       
//         </div>
       
//         {mappedData.length > 0 && (
//           <div>
//             <h3>Uploaded Data</h3>
//             <pre>{JSON.stringify(mappedData, null, 2)}</pre>
//           </div>
//         )}
//       </div>
//     );
// }

// export default List_upload_mapping