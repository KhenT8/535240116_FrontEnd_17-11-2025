'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface IceCreamProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ExplorePage() {
  const [products, setProducts] = useState<IceCreamProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data dari external API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using fake store API - kita akan filter items yang cocok untuk ice cream
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        const data = await response.json();
        
        // Transform data untuk terlihat seperti produk ice cream
        const iceCreamProducts = data.map((product: any, index: number) => ({
          id: product.id,
          title: `Ice Cream ${product.title.split(' ')[0]}`,
          price: product.price,
          description: `Delicious ${product.title.toLowerCase()} flavored ice cream with premium ingredients.`,
          category: 'Ice Cream',
          image: product.image,
          rating: product.rating
        }));
        
        setProducts(iceCreamProducts);
      } catch (err) {
        setError('Failed to fetch ice cream products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToMyCollection = (product: IceCreamProduct) => {
    try {
      // Get existing ice creams from localStorage
      const existingIceCreams = JSON.parse(localStorage.getItem('iceCreams') || '[]');
      
      const newIceCream = {
        id: Date.now(),
        name: product.title,
        brand: 'Premium Brand',
        rating: Math.round(product.rating.rate),
        isFavorite: false,
        description: product.description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Add to collection
      const updatedIceCreams = [...existingIceCreams, newIceCream];
      localStorage.setItem('iceCreams', JSON.stringify(updatedIceCreams));
      
      alert('🎉 Ice cream added to your collection!');
    } catch (error) {
      console.error('Failed to add ice cream:', error);
      alert('Failed to add ice cream to collection');
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading delicious ice cream products... 🍦</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>❌ Error Loading Products</h4>
          <p>{error}</p>
          <Link href="/icecreams" className="btn btn-primary">
            Back to My Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link href="/icecreams" className="btn btn-secondary mb-3">
            ← Back to My Collection
          </Link>
          <h1 className="h2">🔍 Explore Ice Cream Products</h1>
          <p className="text-muted">Discover amazing ice cream products from external API!</p>
        </div>
        <span className="badge bg-info fs-6">External API</span>
      </div>

      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover', padding: '10px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted small">
                  {product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h5 text-success">${product.price}</span>
                  <span className="badge bg-primary">{product.category}</span>
                </div>
                <div className="mb-3">
                  <small className="text-warning">
                    {'⭐'.repeat(Math.round(product.rating.rate))} 
                    {'☆'.repeat(5 - Math.round(product.rating.rate))}
                    <span className="text-muted ms-1">({product.rating.count} reviews)</span>
                  </small>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <button 
                  className="btn btn-success w-100"
                  onClick={() => addToMyCollection(product)}
                >
                  ➕ Add to My Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-4">
        <strong>ℹ️ API Information:</strong> This page fetches data from 
        <a href="https://fakestoreapi.com/" target="_blank" rel="noopener noreferrer" className="ms-1">
          Fake Store API
        </a>
        {' '}and transforms it to display ice cream products.
      </div>
    </div>
  );
}