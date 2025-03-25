from flask import Flask, request, jsonify, session, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
import string
import requests
from datetime import datetime, timedelta
import jwt
import os

app = Flask(__name__)
CORS(app)

# تنظیمات دیتابیس
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'  # کلید امنیتی را تغییر دهید

db = SQLAlchemy(app)

# مدل کاربر
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(11), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# مدل کد تایید
class VerificationCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(11), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    is_used = db.Column(db.Boolean, default=False)

# ایجاد جداول دیتابیس
with app.app_context():
    db.create_all()

def generate_verification_code():
    """تولید کد تصادفی 6 رقمی"""
    return ''.join(random.choices(string.digits, k=6))

def send_sms(phone, code):
    """ارسال پیامک با کد تایید"""
    # اینجا باید از سرویس پیامک مورد نظر خود استفاده کنید
    # مثال: استفاده از API پیامک
    api_key = "YOUR_SMS_API_KEY"
    url = f"https://api.sms-service.com/send?api_key={api_key}&phone={phone}&message=کد تایید شما: {code}"
    response = requests.get(url)
    return response.status_code == 200

@app.route('/')
def index():
    """نمایش صفحه اصلی"""
    return render_template('auth.html')

@app.route('/api/register', methods=['POST'])
def register():
    """ثبت نام کاربر جدید"""
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')

    if not phone or not password:
        return jsonify({'error': 'شماره موبایل و رمز عبور الزامی هستند'}), 400

    if len(phone) != 11 or not phone.isdigit():
        return jsonify({'error': 'شماره موبایل نامعتبر است'}), 400

    if User.query.filter_by(phone=phone).first():
        return jsonify({'error': 'این شماره موبایل قبلاً ثبت شده است'}), 400

    # ایجاد کاربر جدید
    new_user = User(phone=phone, password=password)
    db.session.add(new_user)
    db.session.commit()

    # تولید و ارسال کد تایید
    code = generate_verification_code()
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    
    verification_code = VerificationCode(
        phone=phone,
        code=code,
        expires_at=expires_at
    )
    db.session.add(verification_code)
    db.session.commit()

    # ارسال پیامک
    if send_sms(phone, code):
        return jsonify({'message': 'کد تایید ارسال شد'}), 200
    else:
        return jsonify({'error': 'خطا در ارسال پیامک'}), 500

@app.route('/api/verify', methods=['POST'])
def verify():
    """تایید شماره موبایل با کد ارسالی"""
    data = request.get_json()
    phone = data.get('phone')
    code = data.get('code')

    if not phone or not code:
        return jsonify({'error': 'شماره موبایل و کد تایید الزامی هستند'}), 400

    verification = VerificationCode.query.filter_by(
        phone=phone,
        code=code,
        is_used=False
    ).first()

    if not verification:
        return jsonify({'error': 'کد تایید نامعتبر است'}), 400

    if verification.expires_at < datetime.utcnow():
        return jsonify({'error': 'کد تایید منقضی شده است'}), 400

    # تایید کاربر
    user = User.query.filter_by(phone=phone).first()
    user.is_verified = True
    verification.is_used = True
    db.session.commit()

    # تولید توکن
    token = jwt.encode(
        {'user_id': user.id, 'phone': user.phone},
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    return jsonify({
        'message': 'تایید موفقیت‌آمیز',
        'token': token
    }), 200

@app.route('/api/login', methods=['POST'])
def login():
    """ورود کاربر"""
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')

    if not phone or not password:
        return jsonify({'error': 'شماره موبایل و رمز عبور الزامی هستند'}), 400

    user = User.query.filter_by(phone=phone).first()

    if not user or user.password != password:
        return jsonify({'error': 'شماره موبایل یا رمز عبور اشتباه است'}), 401

    if not user.is_verified:
        return jsonify({'error': 'لطفاً ابتدا حساب کاربری خود را تایید کنید'}), 401

    # تولید توکن
    token = jwt.encode(
        {'user_id': user.id, 'phone': user.phone},
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    return jsonify({
        'message': 'ورود موفقیت‌آمیز',
        'token': token
    }), 200

@app.route('/api/resend-code', methods=['POST'])
def resend_code():
    """ارسال مجدد کد تایید"""
    data = request.get_json()
    phone = data.get('phone')

    if not phone:
        return jsonify({'error': 'شماره موبایل الزامی است'}), 400

    user = User.query.filter_by(phone=phone).first()
    if not user:
        return jsonify({'error': 'کاربر یافت نشد'}), 404

    if user.is_verified:
        return jsonify({'error': 'این حساب کاربری قبلاً تایید شده است'}), 400

    # تولید و ارسال کد جدید
    code = generate_verification_code()
    expires_at = datetime.utcnow() + timedelta(minutes=5)
    
    verification_code = VerificationCode(
        phone=phone,
        code=code,
        expires_at=expires_at
    )
    db.session.add(verification_code)
    db.session.commit()

    if send_sms(phone, code):
        return jsonify({'message': 'کد تایید مجدداً ارسال شد'}), 200
    else:
        return jsonify({'error': 'خطا در ارسال پیامک'}), 500

if __name__ == '__main__':
    app.run(debug=True) 