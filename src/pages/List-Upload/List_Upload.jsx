import React, { useState, useContext } from 'react';
import './List_Upload.css';
import { CgSoftwareDownload } from 'react-icons/cg';
import { FaRegFilePdf } from 'react-icons/fa';
import { ListContext } from '../../Components/ContextAPI/ListContext';

const List_Upload = ({ setShowUpload }) => {
  const { file, setFile, uploadFile } = useContext(ListContext);
  const [isDragging, setIsDragging] = useState(false);

  const handleDownload = () => {
    alert('Downloading sample file...');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      alert(`File dropped: ${droppedFile.name}`);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      alert(`File selected: ${selectedFile.name}`);
    }
  };

  return (
    <div className="list-upload-card">
      <div className="list-upload-title">
        <h3>Upload Contacts</h3>
        <span className="upload-cancel" onClick={() => setShowUpload(false)}>X</span>
      </div>

      <div className="list-upload-main-container">
        <div className="list-upload-info">
          <div className="list-contact">
            <h4>Add Contacts to this List</h4>
            <button onClick={handleDownload} className="download-btn">
              <CgSoftwareDownload size={20} /> Download Sample
            </button>
          </div>
        </div>
        <div className="ulpoad-card-aria"> 
        <div
          className={`upload-area ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <>
              <FaRegFilePdf size={80} color="#4CAF50" />
              <p className="file-name">{file.name}</p>
              <p className="upload-success">File ready for upload!</p>
            </>
          ) : (
            <>
              <FaRegFilePdf size={100} color="#bbb" />
              <p className="upload-instruction">Drag & Drop your file here or click to upload</p>
              <span className="file-size-info">Maximum file size: 50 MB</span>
            </>
          )}
          <input
            type="file"
            className="file-input"
            onChange={handleFileChange}
          />
        </div>

        <div className="upload-guidelines">
          <h4>How Should My File Be Formatted?</h4>
          <p>Your file should include names, emails, and phone numbers in separate columns.</p>
          <h4>Consent Guidelines</h4>
          <p>Ensure you have obtained consent before uploading contact information.</p>
        </div>
      </div>

     </div> 

      <div className="upload-actions">
        <button className="save-btn" onClick={() =>{ uploadFile()
          setShowUpload(false)
        }}>Upload File</button>
      </div>
    </div>
  );
};

export default List_Upload;
