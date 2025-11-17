'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface IceCream {
  id: number;
  name: string;
  brand: string;
  rating: number;
  isFavorite: boolean;
  description: string;
}

export default function IceCreamDetail() {
  const params = useParams();
  const router = useRouter();
  const [iceCream, setIceCream] = useState<IceCream | null>(null);

  useEffect(() => {
    const savedIceCreams = localStorage.getItem('iceCreams');
    if (savedIceCreams) {
      const iceCreams: IceCream[] = JSON.parse(savedIceCreams);
      const foundIceCream = iceCreams.find(iceCream => iceCream.id === Number(params.id));
      setIceCream(foundIceCream || null);
    }
  }, [params.id]);

  const getRatingText = (rating: number) => {
    switch(rating) {
      case 1: return { text: 'Tidak Enak', color: 'text-danger', badge: 'bg-danger' };
      case 2: return { text: 'Hampir Tidak Enak', color: 'text-warning', badge: 'bg-warning' };
      case 3: return { text: 'Standar', color: 'text-info', badge: 'bg-info' };
      case 4: return { text: 'Enak', color: 'text-primary', badge: 'bg-primary' };
      case 5: return { text: 'Luar Biasa Enak', color: 'text-success', badge: 'bg-success' };
      default: return { text: 'Belum ada rating', color: 'text-muted', badge: 'bg-secondary' };
    }
  };

  const renderStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (!iceCream) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          <h4>Ice Cream Tidak Ditemukan</h4>
          <p>Ice cream yang Anda cari tidak ada dalam koleksi.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          ← Kembali ke Koleksi
        </button>
      </div>
    );
  }

  const ratingInfo = getRatingText(iceCream.rating);

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" style={{textDecoration: 'none'}}>Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/icecreams" style={{textDecoration: 'none'}}>Koleksi Ice Cream</a>
          </li>
          <li className="breadcrumb-item active">Detail Ice Cream</li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">Detail Ice Cream</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <th className="bg-light" style={{width: '30%'}}>ID</th>
                    <td>{iceCream.id}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Nama Ice Cream</th>
                    <td className="fw-bold fs-5">{iceCream.name}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Brand/Merk</th>
                    <td className="fs-5">{iceCream.brand}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Deskripsi</th>
                    <td>{iceCream.description || '-'}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Rating Rasa</th>
                    <td>
                      <span className="fs-5">{renderStars(iceCream.rating)}</span>
                      <br/>
                      <span className={`badge ${ratingInfo.badge} fs-6 mt-1`}>
                        {ratingInfo.text}
                      </span>
                      <br/>
                      <small>{iceCream.rating} bintang</small>
                    </td>
                  </tr>
                  <tr>
                    <th className="bg-light">Status Favorit</th>
                    <td>
                      <span className={`badge ${iceCream.isFavorite ? 'bg-warning' : 'bg-secondary'} fs-6`}>
                        {iceCream.isFavorite ? '★ FAVORIT' : 'Biasa Saja'}
                      </span>
                      <br/>
                      <small className="text-muted">
                        {iceCream.isFavorite 
                          ? 'Ini adalah ice cream favorit pribadi Anda' 
                          : 'Bukan ice cream favorit'
                        }
                      </small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-4 text-center">
              <div className="card">
                <div className="card-body">
                  <h5>Ice Cream Info</h5>
                  <p className="text-muted">
                    {iceCream.isFavorite 
                      ? 'Ini adalah ice cream favorit Anda! ' 
                      : 'Ice cream yang enak untuk dicoba!'
                    }
                  </p>
                  {iceCream.rating >= 4 && (
                    <span className="badge bg-success mb-2">Recommended! </span>
                  )}
                  {iceCream.rating <= 2 && (
                    <span className="badge bg-warning mb-2">Mungkin tidak cocok</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-secondary" onClick={() => router.back()}>
              ← Kembali ke Koleksi
            </button>
            <a href="/icecreams" className="btn btn-primary">
              Lihat Semua Ice Cream
            </a>
            <a href="/" className="btn btn-outline-primary">
              Kembali ke Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}