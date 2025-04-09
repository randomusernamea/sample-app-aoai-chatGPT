import React, { useState, useRef, ChangeEvent, FC, Dispatch, SetStateAction  } from 'react';
import './UploadFileButton.css'


interface UploadFileButtonProps {
  setUploadedFile: Dispatch<SetStateAction<string>>;
  className?: string;
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
    const extension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase() || undefined;
    if (!(extension === 'docx' || extension === 'txt' || extension === 'doc')){
      alert('Solo se permiten archivos .doc, .docx y .txt!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setIsUploaded(true);

    fetch('/convertFile', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadedFile(data.texto);
        console.log('File uploaded successfully:', data);
        setButtonText('¿Adjuntar otro?')
        setIsUploaded(false);
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
        className='uploadFileButton' 
        onClick={handleClick} 
        disabled={isUploaded}
      >
        {buttonText}
      </button>
    </>
  );
};