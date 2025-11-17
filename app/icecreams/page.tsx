import IceCreamList from '../components/IceCreamList';
import Link from 'next/link';

export default function IceCreamsPage() {
  return (
    <div className="container mt-3">
      <Link href="/" className="btn btn-secondary mb-3">
        ← Kembali ke Home
      </Link>
      <IceCreamList />
    </div>
  );
}