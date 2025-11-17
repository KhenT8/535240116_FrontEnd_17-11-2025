import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg" style={{ border: 'none', borderRadius: '20px', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <div className="card-body text-center p-5">
          {/* Judul dengan Warna Solid */}
          <h1 className="card-title display-4 fw-bold mb-4">
            <span style={{ color: '#FF69B4' }}>My</span>
            <span className="mx-2"> </span>
            <span style={{ color: '#00CED1' }}>Ice</span>
            <span className="mx-2"> </span>
            <span style={{ 
              color: '#FFFFFF', 
              backgroundColor: '#FFD700',
              padding: '5px 15px',
              borderRadius: '15px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
            }}>Cream</span>
            <span className="mx-2"> </span>
            <span style={{ color: '#8B4513' }}>Collection</span>
          </h1>

          {/* Informasi Pribadi */}
          <div className="row justify-content-center mb-4">
            <div className="col-md-8">
              <div className="card" style={{ background: 'rgba(255, 255, 255, 0.9)', border: '2px dashed #FF69B4' }}>
                <div className="card-body">
                  <p className="card-text fs-5">
                    <strong>Nama:</strong> Eli Cohen Joshua Bunoch
                  </p>
                  <p className="card-text fs-5">
                    <strong>NIM:</strong> 535240116
                  </p>
                  <p className="card-text fs-5">
                    <strong>Topik Project:</strong> Ice Cream Collection Tracker
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tombol */}
          <Link href="/icecreams" className="btn btn-primary btn-lg mt-3" 
                style={{
                  background: 'linear-gradient(45deg, #FF69B4, #00CED1)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '12px 30px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(255, 105, 180, 0.3)'
                }}>
            Lihat Koleksi Ice Cream →
          </Link>
        </div>
      </div>
    </div>
  );
}