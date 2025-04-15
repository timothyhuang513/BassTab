import { useState, useRef } from "react"
import styles from "./file-upload.module.css"

export function FileUpload({ setTabData }) {

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // const response = await fetch("http://localhost:8000/analyze", {
        const response = await fetch("https://basstab.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTabData(data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.dropzoneContent}>
          <div className={styles.uploadIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <h3 className={styles.dropzoneTitle}>Drag and drop your file here</h3>
          <p className={styles.dropzoneText}>or</p>
          <button className={styles.browseButton} onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className={styles.fileInput} accept=".mp3" />
          <p className={styles.supportedTypes}>Supported file types: MP3</p>
        </div>
      </div>

      {file && (
        <div className={styles.fileList}>
          <div className={styles.fileListHeader}>
            <h3 className={styles.fileListTitle}>Selected File</h3>
            <ul className={styles.files}>
              <li className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <span className={styles.fileName}>{file.name}</span>
                  <span className={styles.fileSize}>{(file.size / 1024).toFixed(0)} KB</span>
                </div>
                <button className={styles.removeButton} onClick={handleRemoveFile}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className={styles.srOnly}>Remove file</span>
                </button>
              </li>
            </ul>
          </div>
          <button onClick={handleUpload} className={styles.uploadButton}>
            Upload File
          </button>
          {loading && <p className={styles.loadingText}>Analyzing... 🎧</p>}
        </div>
      )}
    </div>
  )
}
