import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* لوگو */}
          <Link href="/" className="text-2xl font-bold text-red-500">
            فروشگاه آنلاین
          </Link>

          {/* جستجو */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="جستجو در محصولات..."
              className="w-full p-2 border rounded-lg text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* منوی کاربر */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="mr-1">سبد خرید</span>
              </div>
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="mr-1">ورود / ثبت‌نام</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 