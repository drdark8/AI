import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
          <div>
            <h3 className="font-bold text-lg mb-4">درباره ما</h3>
            <p className="text-gray-600">
              فروشگاه آنلاین ما، مرجع خرید امن و مطمئن برای تمامی نیازهای شما
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">خدمات مشتریان</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-gray-900">
                  راهنمای ارسال
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">پیوندهای مفید</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">تماس با ما</h3>
            <div className="space-y-2 text-gray-600">
              <p>آدرس: تهران، خیابان ولیعصر</p>
              <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
              <p>ایمیل: info@shop.com</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© ۱۴۰۲ تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
} 