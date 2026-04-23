import React, { useState, useEffect } from "react";

const EMPTY_FORM = { name: "", description: "", quantity: "", price: "", category: "" };

export default function ItemForm({ onSubmit, editingItem, onCancel }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  // When editingItem changes, populate the form
  useEffect(() => {
    if (editingItem) {
      setForm({
        name:        editingItem.name        || "",
        description: editingItem.description || "",
        quantity:    editingItem.quantity    ?? "",
        price:       editingItem.price       ?? "",
        category:    editingItem.category    || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || form.price === "") {
      setError("Name and Price are required.");
      return;
    }
    try {
      await onSubmit({
        ...form,
        quantity: Number(form.quantity),
        price:    Number(form.price),
      });
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>{editingItem ? "✏️ Edit Item" : "➕ Add New Item"}</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-grid">
        <label>
          Name *
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Laptop" />
        </label>

        <label>
          Category
          <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics" />
        </label>

        <label>
          Price (LKR) *
          <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" />
        </label>

        <label>
          Quantity
          <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} placeholder="0" />
        </label>

        <label className="full-width">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Optional description..." rows={2} />
        </label>
      </div>

      {/* 🆕 TO ADD A NEW FIELD FOR THE LAB:
          1. Add the field to EMPTY_FORM above
          2. Add an <input> here with the matching name
          3. Add the field to the Item model in backend/models/Item.js
      */}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editingItem ? "Update Item" : "Add Item"}
        </button>
        {editingItem && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
