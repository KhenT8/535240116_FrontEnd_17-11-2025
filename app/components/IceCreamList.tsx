'use client';
import { useState, useEffect } from 'react';

interface IceCream {
  id: number;
  name: string;
  brand: string;
  rating: number;
  isFavorite: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function IceCreamList() {
  const [iceCreams, setIceCreams] = useState<IceCream[]>([]);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('5');
  const [isFavorite, setIsFavorite] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editBrand, setEditBrand] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRating, setEditRating] = useState('5');
  const [editIsFavorite, setEditIsFavorite] = useState(false);

  // Load dari localStorage
  useEffect(() => {
    const savedIceCreams = localStorage.getItem('iceCreams');
    if (savedIceCreams) {
      setIceCreams(JSON.parse(savedIceCreams));
    }
  }, []);

  // Save ke localStorage
  useEffect(() => {
    localStorage.setItem('iceCreams', JSON.stringify(iceCreams));
  }, [iceCreams]);

  const getRatingText = (rating: number) => {
    switch(rating) {
      case 1: return { text: 'Tidak Enak', color: 'text-danger' };
      case 2: return { text: 'Hampir Tidak Enak', color: 'text-warning' };
      case 3: return { text: 'Standar', color: 'text-info' };
      case 4: return { text: 'Enak', color: 'text-primary' };
      case 5: return { text: 'Luar Biasa Enak', color: 'text-success' };
      default: return { text: 'Belum ada rating', color: 'text-muted' };
    }
  };

  const addIceCream = () => {
    if (name.trim() === '' || brand.trim() === '') return;
    
    const newIceCream: IceCream = {
      id: Date.now(),
      name: name.trim(),
      brand: brand.trim(),
      rating: parseInt(rating),
      isFavorite: isFavorite,
      description: description.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setIceCreams([...iceCreams, newIceCream]);
    setName('');
    setBrand('');
    setDescription('');
    setRating('5');
    setIsFavorite(false);
  };

  const deleteIceCream = (id: number) => {
    if (window.confirm('Hapus ice cream dari daftar?')) {
      setIceCreams(iceCreams.filter(iceCream => iceCream.id !== id));
    }
  };

  const startEdit = (iceCream: IceCream) => {
    setEditingId(iceCream.id);
    setEditName(iceCream.name);
    setEditBrand(iceCream.brand);
    setEditDescription(iceCream.description);
    setEditRating(iceCream.rating.toString());
    setEditIsFavorite(iceCream.isFavorite);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditBrand('');
    setEditDescription('');
    setEditRating('5');
    setEditIsFavorite(false);
  };

  const updateIceCream = () => {
    if (!editingId) return;

    setIceCreams(iceCreams.map(iceCream => 
      iceCream.id === editingId 
        ? {
            ...iceCream,
            name: editName.trim(),
            brand: editBrand.trim(),
            rating: parseInt(editRating),
            isFavorite: editIsFavorite,
            description: editDescription.trim(),
            updatedAt: new Date().toISOString(),
          }
        : iceCream
    ));

    cancelEdit();
  };

  const toggleFavorite = (id: number) => {
    setIceCreams(iceCreams.map(iceCream => 
      iceCream.id === id ? { ...iceCream, isFavorite: !iceCream.isFavorite } : iceCream
    ));
  };

  const updateRating = (id: number, newRating: number) => {
    setIceCreams(iceCreams.map(iceCream => 
      iceCream.id === id ? { ...iceCream, rating: newRating } : iceCream
    ));
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="container mt-4">
      {/* Notification tentang storage */}
      <div className="alert alert-info">
        <strong>Info:</strong> Using localStorage for data persistence
      </div>

      {/* Form Tambah Ice Cream */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">🍦 Tambah Ice Cream Baru</h4>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Nama Ice Cream</label>
              <input
                type="text"
                className="form-control"
                placeholder="Contoh: Paddle Pop Rainbow"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Brand/Merk</label>
              <input
                type="text"
                className="form-control"
                placeholder="Contoh: Walls, Campina"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Rating Rasa</label>
              <select 
                className="form-select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1 ⭐ - Tidak Enak</option>
                <option value="2">2 ⭐ - Hampir Tidak Enak</option>
                <option value="3">3 ⭐ - Standar</option>
                <option value="4">4 ⭐ - Enak</option>
                <option value="5">5 ⭐ - Luar Biasa Enak</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Deskripsi/Rasa</label>
              <input
                type="text"
                className="form-control"
                placeholder="Contoh: Vanilla dengan choco chips"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Favorit?</label>
              <div className="form-check form-switch mt-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isFavorite}
                  onChange={(e) => setIsFavorite(e.target.checked)}
                />
                <label className="form-check-label">★ Favorit</label>
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-success" onClick={addIceCream}>
                ➕ Tambah ke Koleksi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {editingId && (
        <div className="card mb-4 border-warning">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">✏️ Edit Ice Cream</h4>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Nama Ice Cream</label>
                <input
                  type="text"
                  className="form-control"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Brand/Merk</label>
                <input
                  type="text"
                  className="form-control"
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Rating Rasa</label>
                <select 
                  className="form-select"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                >
                  <option value="1">1 ⭐ - Tidak Enak</option>
                  <option value="2">2 ⭐ - Hampir Tidak Enak</option>
                  <option value="3">3 ⭐ - Standar</option>
                  <option value="4">4 ⭐ - Enak</option>
                  <option value="5">5 ⭐ - Luar Biasa Enak</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Deskripsi/Rasa</label>
                <input
                  type="text"
                  className="form-control"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Favorit?</label>
                <div className="form-check form-switch mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={editIsFavorite}
                    onChange={(e) => setEditIsFavorite(e.target.checked)}
                  />
                  <label className="form-check-label">★ Favorit</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-success me-2" onClick={updateIceCream}>
                  💾 Simpan Perubahan
                </button>
                <button className="btn btn-secondary" onClick={cancelEdit}>
                  ❌ Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Daftar Ice Cream */}
      <div className="card">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">🍨 Koleksi Ice Cream Saya ({iceCreams.length} items)</h4>
        </div>
        <div className="card-body">
          {iceCreams.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted fs-5">Belum ada ice cream dalam koleksi</p>
              <p className="text-muted">Tambahkan ice cream favorit Anda!</p>
            </div>
          ) : (
            <div className="row g-3">
              {iceCreams.map((iceCream) => {
                const ratingInfo = getRatingText(iceCream.rating);
                return (
                  <div key={iceCream.id} className="col-md-6 col-lg-4">
                    <div className={`card h-100 ${iceCream.isFavorite ? 'border-warning' : ''}`}>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title">{iceCream.name}</h5>
                          <button 
                            className={`btn btn-sm ${iceCream.isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={() => toggleFavorite(iceCream.id)}
                            title={iceCream.isFavorite ? 'Hapus dari favorit' : 'Tandai sebagai favorit'}
                          >
                            {iceCream.isFavorite ? '★' : '☆'}
                          </button>
                        </div>
                        
                        <p className="card-text">
                          <strong>Brand:</strong> {iceCream.brand}<br/>
                          <strong>Deskripsi:</strong> {iceCream.description || '-'}<br/>
                          <strong>Rating:</strong> {renderStars(iceCream.rating)}<br/>
                          <span className={`fw-bold ${ratingInfo.color}`}>
                            {ratingInfo.text}
                          </span>
                        </p>

                        {/* Rating Controls */}
                        <div className="mt-3">
                          <label className="form-label small">Update Rating Rasa:</label>
                          <div className="btn-group w-100" role="group">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                className={`btn btn-sm ${iceCream.rating >= star ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => updateRating(iceCream.id, star)}
                                title={getRatingText(star).text}
                              >
                                {star}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="btn-group w-100" role="group">
                          <button 
                            className="btn btn-info btn-sm"
                            onClick={() => window.location.href = `/icecreams/${iceCream.id}`}
                          >
                            👁️ Detail
                          </button>
                          <button 
                            className="btn btn-warning btn-sm"
                            onClick={() => startEdit(iceCream)}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteIceCream(iceCream.id)}
                          >
                            🗑️ Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}