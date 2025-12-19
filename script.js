/* =========================================
   1. NAVBAR SCROLL EFFECT
   ========================================= */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar && !navbar.classList.contains('bg-white')) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'bg-white', 'shadow-sm');
        } else {
            navbar.classList.remove('scrolled', 'bg-white', 'shadow-sm');
        }
    }
});

/* =========================================
   2. LOGIKA FILTER KATALOG
   ========================================= */
document.addEventListener('DOMContentLoaded', function() {
    // Hanya jalankan jika ada sidebar filter
    if (document.querySelector('.filter-sidebar')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('cat');

        if (categoryParam) {
            const checkbox = document.querySelector(`input[value="${categoryParam}"]`);
            if (checkbox) checkbox.checked = true;
        }
        runFilter();

        const checkboxes = document.querySelectorAll('.filter-check');
        checkboxes.forEach(box => box.addEventListener('change', runFilter));
    }
});

function runFilter() {
    const checkedCats = Array.from(document.querySelectorAll('input[id^="cat"]:checked')).map(c => c.value);
    const checkedTypes = Array.from(document.querySelectorAll('input[id^="type"]:checked')).map(c => c.value);
    const checkedSleeves = Array.from(document.querySelectorAll('input[id^="sleeve"]:checked')).map(c => c.value);

    const items = document.querySelectorAll('.product-item');
    let count = 0;

    items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        const itemType = item.getAttribute('data-type');
        const itemSleeve = item.getAttribute('data-sleeve');

        const matchCat = checkedCats.length === 0 || checkedCats.includes(itemCat);
        const matchType = checkedTypes.length === 0 || checkedTypes.includes(itemType);
        const matchSleeve = checkedSleeves.length === 0 || checkedSleeves.includes(itemSleeve);

        if (matchCat && matchType && matchSleeve) {
            item.style.display = 'block';
            count++;
        } else {
            item.style.display = 'none';
        }
    });

    const countLabel = document.getElementById('productCount');
    if(countLabel) countLabel.innerText = `Showing ${count} Products`;
}

function resetFilters() {
    document.querySelectorAll('.filter-check').forEach(box => box.checked = false);
    runFilter();
}

/* =========================================
   3. CHECKOUT & CART MODAL SYSTEM
   ========================================= */

// Fungsi Buka Modal Cart (Pop-up)
function openModal(nama, harga) {
    const nameEl = document.getElementById('modalCartName');
    const priceEl = document.getElementById('modalCartPrice');
    
    if(nameEl) nameEl.innerText = nama;
    if(priceEl) priceEl.innerText = "Rp " + parseInt(harga).toLocaleString('id-ID');
    
    // Setup Tombol "Beli Sekarang" di dalam modal -> Lari ke Checkout
    const checkoutBtn = document.querySelector('.btn-checkout-now');
    if(checkoutBtn) {
        checkoutBtn.onclick = function() {
            window.location.href = `checkout.html?prod=${encodeURIComponent(nama)}&price=${harga}`;
        };
    }

    const modalElement = document.getElementById('cartModal');
    if(modalElement) {
        const cartModal = new bootstrap.Modal(modalElement);
        cartModal.show();
    }
}

// UPDATE: Fungsi Beli Langsung (Kirim Gambar & Ukuran ke Checkout)
function buyNowFromDetail() {
    const title = document.getElementById('prodTitle').innerText;
    const priceRaw = document.getElementById('prodPrice').innerText.replace(/[^0-9]/g, '');
    const qty = parseInt(document.getElementById('qtyDisplay').innerText);
    const totalPrice = parseInt(priceRaw) * qty;
    
    // Ambil Gambar
    const imgUrl = document.getElementById('mainImage').src;

    // Ambil Ukuran (Cari radio button yang dicentang)
    let size = "All Size";
    const sizeInput = document.querySelector('input[name="size"]:checked');
    if(sizeInput) {
        // Ambil ID-nya, misal "sizeM" jadi "M"
        size = sizeInput.id.replace('size', '');
    }

    const finalName = `${title} (Size: ${size}, Qty: ${qty})`;

    // Redirect ke checkout membawa semua data (prod, price, img)
    window.location.href = `checkout.html?prod=${encodeURIComponent(finalName)}&price=${totalPrice}&img=${encodeURIComponent(imgUrl)}`;
}

// Counter Qty
function updateQty(change) {
    const display = document.getElementById('qtyDisplay');
    if(display) {
        let val = parseInt(display.innerText);
        val += change;
        if(val < 1) val = 1;
        display.innerText = val;
    }
}

/* =========================================
   4. LINK SOCIAL MEDIA
   ========================================= */
function toWA(nama) { 
    const phoneNumber = "6285713041950"; 
    const message = `Halo Admin, tanya produk: ${nama}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank'); 
}
function toShopee() { window.open("https://shopee.co.id/sandhangcomal", "_blank"); }
function toIG() { window.open("https://instagram.com/sandhangcomal", "_blank"); }