import React, {useState, useRef} from 'react'



function UploadFileButton(){
    const [buttonText, setButtonText] = useState('Adjuntar archivo');
    const [isUploaded, setIsUploaded] = useState(false);
    const fileInputRef = useRef(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          uploadFile(file);
        }
      }

    function handleClick() {
        setButtonText('Adjuntando Archivo');
        fileInputRef.current.click();
    }
    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        setIsUploaded(true);
 
        fetch('www.randomip.com', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('File uploaded successfully:', data);
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            setButtonText('Error al Adjuntar');
            setIsUploaded(false);
          });
      }

    return (
        <>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={isUploaded}
            />
            <button id="UploadFileButton" onClick={handleClick} disabled={isUploaded}>{buttonText}</button>
        </>
    );
}

export default UploadFileButton