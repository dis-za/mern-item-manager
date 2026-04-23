import React from "react";

export default function ItemList({ items, onEdit, onDelete, loading }) {
  if (loading) return <p className="status-msg">Loading items...</p>;
  if (!items.length) return <p className="status-msg">No items yet — add one above!</p>;

  return (
    <div className="item-grid">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <div className="item-card-header">
            <h3>{item.name}</h3>
            <span className="badge">{item.category || "General"}</span>
          </div>

          {item.description && <p className="item-desc">{item.description}</p>}

          <div className="item-meta">
            <span>💰 LKR {Number(item.price).toFixed(2)}</span>
            <span>📦 Qty: {item.quantity}</span>
          </div>

          {/* 🆕 If you add a new field, display it here */}

          <div className="item-actions">
            <button className="btn-edit" onClick={() => onEdit(item)}>Edit</button>
            <button className="btn-delete" onClick={() => onDelete(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
