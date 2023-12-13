import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import './style.css'

const fileTypes = ['JPEG', 'PNG', 'GIF']

export default function DragDrop() {
  const [file, setFile] = useState<any>(null)
  const handleChange = () => {
    setFile(file)
  }
  return (
    <div className="drag-drop">
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        label="Drag & Drop or browse map file here"
      />
    </div>
  )
}
