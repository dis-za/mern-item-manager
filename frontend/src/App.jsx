import React, { useState, useEffect } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { getItems, createItem, updateItem, deleteItem } from "./api/items";

export default function App() {
  const [items, setItems]           = useState([]);
  const [editingItem, setEditing]   = useState(null);
  const [loading, setLoading]       = useState(true);
  const [toast, setToast]           = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getItems();
      setItems(res.data);
    } catch {
      showToast("❌ Failed to fetch items — is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleCreate = async (data) => {
    await createItem(data);
    showToast("✅ Item added!");
    fetchItems();
  };

  const handleUpdate = async (data) => {
    await updateItem(editingItem._id, data);
    setEditing(null);
    showToast("✅ Item updated!");
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteItem(id);
    showToast("🗑️ Item deleted.");
    fetchItems();
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📦 Item Manager</h1>
        <p>MERN Stack — SLIIT Lab Practice</p>
      </header>

      <main className="app-main">
        <ItemForm
          onSubmit={editingItem ? handleUpdate : handleCreate}
          editingItem={editingItem}
          onCancel={() => setEditing(null)}
        />

        <section className="items-section">
          <h2>All Items ({items.length})</h2>
          <ItemList
            items={items}
            onEdit={setEditing}
            onDelete={handleDelete}
            loading={loading}
          />
        </section>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
