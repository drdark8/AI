import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductCard({ id, title, price, image, description }: ProductProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${id}`}>
        <div className="relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">{price.toLocaleString()} تومان</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              افزودن به سبد
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
} 