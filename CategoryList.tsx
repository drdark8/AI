import Link from 'next/link';

interface Category {
  id: number;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: 1, name: 'موبایل', icon: '📱' },
  { id: 2, name: 'لپ‌تاپ', icon: '💻' },
  { id: 3, name: 'پوشاک', icon: '👕' },
  { id: 4, name: 'لوازم خانگی', icon: '🏠' },
  { id: 5, name: 'کتاب', icon: '📚' },
  { id: 6, name: 'ورزشی', icon: '⚽' },
];

export default function CategoryList() {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6 text-right">دسته‌بندی‌های محصولات</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.id}`}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-4xl mb-2">{category.icon}</span>
            <span className="text-gray-800 font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 