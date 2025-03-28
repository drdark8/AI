# سیستم احراز هویت دانی‌تک

این پروژه یک سیستم احراز هویت با استفاده از Flask و SQLite است که شامل ثبت نام، ورود و تایید شماره موبایل با پیامک می‌باشد.

## ویژگی‌ها

- ثبت نام با شماره موبایل
- تایید شماره موبایل با کد پیامکی
- ورود به حساب کاربری
- ذخیره‌سازی امن رمز عبور
- استفاده از توکن JWT برای احراز هویت
- رابط کاربری زیبا و ریسپانسیو

## نصب و راه‌اندازی

1. نصب پکیج‌های مورد نیاز:
```bash
pip install -r requirements.txt
```

2. تنظیم API key سرویس پیامک در فایل `auth_system.py`

3. اجرای برنامه:
```bash
python auth_system.py
```

## نحوه استفاده

1. ثبت نام:
   - وارد کردن شماره موبایل و رمز عبور
   - دریافت کد تایید از طریق پیامک
   - وارد کردن کد تایید

2. ورود:
   - وارد کردن شماره موبایل و رمز عبور
   - دریافت توکن دسترسی

## امنیت

- رمزنگاری رمز عبور
- استفاده از توکن JWT
- محدودیت زمانی برای کد تایید
- محافظت در برابر حملات مختلف

## توسعه‌دهنده

- نام: دانیال
- ایمیل: your.email@example.com

## لایسنس

MIT License 