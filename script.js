// تبدیل اعداد به فرمت پول ایران
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
}

// محاسبه قیمت با تخفیف
function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

// نمایش محصولات در صفحه
function displayProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productsGrid = document.querySelector('.products-grid');
            
            data.products.forEach(product => {
                const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="original-price" style="text-decoration: line-through; color: #81858b; font-size: 0.9rem;">
                            ${formatPrice(product.price)}
                        </span>
                        <div class="discount-badge" style="background-color: #ef394e; color: white; padding: 2px 8px; border-radius: 12px; display: inline-block; margin: 0 8px;">
                            ${product.discount}٪
                        </div>
                        <div style="margin-top: 8px;">
                            ${formatPrice(discountedPrice)}
                        </div>
                    </div>
                    <button class="add-to-cart" style="background-color: #ef394e; color: white; border: none; padding: 8px; border-radius: 8px; margin-top: 12px; cursor: pointer;">
                        افزودن به سبد خرید
                    </button>
                `;
                
                productsGrid.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}

// اجرای توابع بعد از لود شدن صفحه
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    // اضافه کردن عملکرد به دکمه جستجو
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert('جستجو برای: ' + searchTerm);
            // در اینجا می‌توانید عملیات جستجو را پیاده‌سازی کنید
        }
    });
    
    // اضافه کردن عملکرد به دکمه‌های سبد خرید
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productTitle = e.target.parentElement.querySelector('.product-title').textContent;
            alert(`محصول "${productTitle}" به سبد خرید اضافه شد`);
        }
    });
});

// اسلایدر ساده
let currentSlide = 0;
const slides = [
    'slider1.jpg',
    'slider2.jpg',
    'slider3.jpg'
];

function changeSlide() {
    const sliderImage = document.querySelector('.slider-container img');
    currentSlide = (currentSlide + 1) % slides.length;
    sliderImage.src = slides[currentSlide];
}

// تغییر اسلاید هر 5 ثانیه
setInterval(changeSlide, 5000); 