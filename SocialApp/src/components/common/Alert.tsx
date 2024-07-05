import React from "react";

interface AlertProps {
  showAlert: boolean;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ showAlert, message }) => {
  if (!showAlert) return null;

  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center">
      <div className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Alert;
