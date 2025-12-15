'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setRole(data?.role);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (pathname === '/auth') return null;

  return (
    <nav style={{
      background: 'var(--color-white)',
      borderBottom: '1px solid #E5E7EB',
      padding: '16px 20px',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
      }}>
        <Link href="/" style={{
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--color-primary)',
          textDecoration: 'none',
        }}>
          Farm To Table
        </Link>

        <div style={{
          display: 'flex',
          gap: 20,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          <Link href="/" style={linkStyle}>Home</Link>
          <Link href="/browse" style={linkStyle}>Browse Produce</Link>
          {role === 'farmer' && (
            <Link href="/add-product" style={linkStyle}>Add Product</Link>
          )}
          {user ? (
            <button onClick={handleLogout} style={logoutButtonStyle}>
              Logout
            </button>
          ) : (
            <Link href="/auth" style={linkStyle}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'var(--color-text-primary)',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
};

const logoutButtonStyle = {
  background: 'transparent',
  border: '1px solid var(--color-primary)',
  color: 'var(--color-primary)',
  padding: '6px 16px',
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
};
