import React from 'react';

const SummaryCard = ({ title, value }) => {
  return (
    <div className="summary-card">
      <h2>{title}</h2>
      <p>{value || "N/A"}</p>
    </div>
  );
};

export default SummaryCard;
