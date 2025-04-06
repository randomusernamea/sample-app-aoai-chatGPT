import React, { useState, useRef, ChangeEvent, FC, Dispatch, SetStateAction  } from 'react';

interface UploadFileButtonProps {
  setUploadedFile: (data: any) => void; // Replace 'any' with your response type
}


interface UploadFileButtonProps {
  setUploadedFile: Dispatch<SetStateAction<string>>;
}


export const UploadFileButton: FC<UploadFileButtonProps> = ({ setUploadedFile }: UploadFileButtonProps) => {
  const [buttonText, setButtonText] = useState<string>('Adjuntar archivo');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleClick = () => {
    setButtonText('Adjuntando Archivo');
    fileInputRef.current?.click();
  };

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    setIsUploaded(true);

    fetch('www.randomip.com', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadedFile(data);
        console.log('File uploaded successfully:', data);
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        setButtonText('Error al Adjuntar');
        setIsUploaded(false);
      });
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        disabled={isUploaded}
      />
      <button 
        id="UploadFileButton" 
        onClick={handleClick} 
        disabled={isUploaded}
      >
        {buttonText}
      </button>
    </>
  );
};