// PlanUpdateButton.tsx
import React from "react";

interface PlanUpdateButtonProps {
  onClick: () => void;
}

const PlanUpdateButton: React.FC<PlanUpdateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded-md mx-5 my-2 w-full"
    >
      Actualizar Plan
    </button>
  );
};

export default PlanUpdateButton;
