import React, { useState } from 'react';
import './Add_Profile.css';

const Add_Profile = ({setProfile_Show}) => {
  const [propertyName, setPropertyName] = useState('');
   const [dataType, setDataType] = useState('');
 
   const handleSave = async () => {
     if (!propertyName || !dataType) {
       alert('Please fill all fields');
       return;
     }
 
     try {
       const response = await fetch('http://localhost:5000/api/lists/field', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('token')}`,
         },
         body: JSON.stringify({
           name: propertyName,
           type: dataType,
         }),
       });
       const data = await response.json();
     
       if (response.ok) {
         alert('Property added successfully');

         setProfile_Show(false);
       } else {
         alert(data.error || 'Failed to add property');
       }
     } catch (error) {
       alert('Error saving property',error);
     }
   };
 
   return (
     <div className="add_property_container">
       <div className="add_property_card">
         <h3>Add Property</h3>
         <p>Enter a property and value. We will automatically convert numbers and other data types.</p>
         <div className="add_input_type">
           <div className="input-container">
             <input
               type="text"
               placeholder="Property Name"
               value={propertyName}
               onChange={(e) => setPropertyName(e.target.value)}
               required
             />
           </div>
           <div className="input-container">
             <select
               value={dataType}
               onChange={(e) => setDataType(e.target.value)}
               required
             >
               <option value="" disabled hidden>
                 Select Data Type
               </option>
               <option value="number">Number</option>
               <option value="text">Text</option>
               <option value="boolean">Boolean</option>
               <option value="date">Date</option>
             </select>
           </div>
         </div>
         <p>
           <b>Note:</b> All other profiles would have ..... against the property.
         </p>
         <div className="add_profile_btn">
           <button className="cancel" onClick={() => setProfile_Show(false)}>
             Cancel
           </button>
           <button className="save" onClick={handleSave}>
             Save
           </button>
         </div>
       </div>
     </div>
   );
};

export default Add_Profile;
// import React from 'react';
// import './Add_Profile.css';

// const Add_Profile = ({setProfile_Show}) => {
//   return (
//     <div className="add_property_container">
//       <div className="add_property_card">
//         <h3>Add Property</h3>
//         <p>Enter a property and value. We will automatically convert numbers and other data types.</p>
//         <div className="add_input_type">
//           {/* Input Field with Floating Label */}
//           <div className="input-container">
//             <input type="text" id="propertyName" placeholder='Property Name' required />
//             {/* <label htmlFor="propertyName">Property Name</label> */}
//           </div>
//           {/* Select Field with Floating Label */}
//           <div className="input-container">
//             <select id="filter" required>
//               <option value="" disabled hidden></option>
//               <option value="number">Number</option>
//               <option value="text">Text</option>
//               <option value="boolean">Boolean</option>
//               <option value="date">Date</option>
//             </select>
//             <label htmlFor="filter">Data Type</label>
//           </div>
//         </div>
//         <p>
//           <b>Note:</b> All other profiles would have ..... against the property.
//         </p>
//         <div className="add_profile_btn">
//           <button className="cancel" onClick={()=>{setProfile_Show(false)}}>Cancel</button>
//           <button className="save" onClick={()=>{setProfile_Show(false)}}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Add_Profile;
