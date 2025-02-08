import React, { useState } from "react";
import FormRow from "./FormRow";

const ImageUploader = ({ onFileSelection }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelection(e.target.files[0]);
    }
  };

  return (
    <div>
      <FormRow
        type="file"
        name="avatar"
        labelText="Profile Image"
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

export default ImageUploader;
