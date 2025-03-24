import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';

// داده‌های نمونه برای محصولات
const products = [
  {
    id: 1,
    title: 'گوشی آیفون 13',
    price: 45000000,
    image: '/images/iphone.jpg',
    description: 'گوشی آیفون 13 با حافظه 128 گیگابایت'
  },
  {
    id: 2,
    title: 'لپ تاپ مک‌بوک',
    price: 85000000,
    image: '/images/macbook.jpg',
    description: 'لپ تاپ مک‌بوک پرو با پردازنده M1'
  },
  {
    id: 3,
    title: 'ساعت هوشمند اپل',
    price: 15000000,
    image: '/images/watch.jpg',
    description: 'ساعت هوشمند اپل سری 7'
  },
  {
    id: 4,
    title: 'ایرپاد پرو',
    price: 12000000,
    image: '/images/airpods.jpg',
    description: 'ایرپاد پرو نسل دوم'
  },
  // می‌توانید محصولات بیشتری اضافه کنید
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4">
        {/* بنر اصلی */}
        <div className="bg-blue-600 text-white rounded-lg p-8 my-8 text-center">
          <h1 className="text-4xl font-bold mb-4">به فروشگاه ما خوش آمدید</h1>
          <p className="text-xl">بهترین محصولات با بهترین قیمت‌ها</p>
        </div>

        {/* دسته‌بندی‌ها */}
        <CategoryList />

        {/* محصولات */}
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-6 text-right">محصولات پرفروش</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 