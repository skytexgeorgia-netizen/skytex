# Görsel Entegrasyon Rehberi

Bu dosya, Skytex Georgia web sitesine görsellerin nasıl ekleneceğini açıklar.

## Görsel Klasör Yapısı

Görsellerinizi aşağıdaki klasörlere yerleştirmeniz gerekmektedir:

```
public/
├── logo/
│   └── skytex-logo.png          # Ana logo (Header'da kullanılacak)
├── factory/
│   ├── hero-banner.jpg          # Ana sayfa hero section arka planı
│   ├── factory-1.jpg            # Hakkımızda sayfası - Fabrika görseli 1
│   ├── factory-2.jpg            # Hakkımızda sayfası - Fabrika görseli 2
│   ├── machine-1.jpg             # Portfolyo - Makine görseli 1
│   ├── machine-2.jpg             # Portfolyo - Makine görseli 2
│   ├── machine-3.jpg             # Portfolyo - Makine görseli 3
│   └── machine-4.jpg             # Portfolyo - Makine görseli 4
└── about/
    └── (gelecekte kullanım için)
```

## Görsel Gereksinimleri

### Logo (`/public/logo/skytex-logo.png`)
- **Boyut**: 48x48px - 96x96px (2x retina için)
- **Format**: PNG (şeffaf arka plan önerilir)
- **Kullanım**: Header'da görünecek

### Hero Banner (`/public/factory/hero-banner.jpg`)
- **Boyut**: 1920x1080px veya daha büyük
- **Format**: JPG
- **Kullanım**: Ana sayfa hero section arka planı

### Fabrika Görselleri (`/public/factory/factory-1.jpg`, `factory-2.jpg`)
- **Boyut**: 1200x800px veya benzer aspect ratio
- **Format**: JPG
- **Kullanım**: Hakkımızda sayfasında

### Makine Görselleri (`/public/factory/machine-*.jpg`)
- **Boyut**: 1200x800px veya benzer aspect ratio
- **Format**: JPG
- **Kullanım**: Portfolyo sayfasında "Üretim Tesisleri" bölümünde

## Görselleri Ekleme Adımları

1. **Görselleri hazırlayın**
   - Görselleri yukarıdaki boyutlara göre optimize edin
   - Dosya isimlerini yukarıdaki gibi kullanın

2. **Görselleri public klasörüne kopyalayın**
   ```bash
   # Örnek:
   cp /path/to/your/logo.png public/logo/skytex-logo.png
   cp /path/to/your/factory.jpg public/factory/factory-1.jpg
   ```

3. **Web sitesini test edin**
   ```bash
   npm run dev
   ```
   Görseller otomatik olarak görünecektir.

## Görsel Optimizasyonu

Next.js Image bileşeni otomatik olarak:
- Lazy loading yapar
- Responsive boyutlandırma yapar
- WebP formatına dönüştürür (desteklenirse)
- Performans optimizasyonu yapar

## Notlar

- Görseller yüklenmezse, sayfa hata vermez - fallback olarak gradient/renkli arka planlar gösterilir
- Tüm görseller `onError` handler'ı ile korunmuştur
- Görseller eksik olsa bile web sitesi çalışmaya devam eder

## Mevcut Entegrasyonlar

✅ **Header**: Logo entegre edildi (`/logo/skytex-logo.png`)
✅ **Ana Sayfa**: Hero banner arka planı hazır (`/factory/hero-banner.jpg`)
✅ **Hakkımızda**: 2 fabrika görseli için yer hazır
✅ **Portfolyo**: 4 makine görseli için "Üretim Tesisleri" bölümü eklendi

## Sonraki Adımlar

1. Görselleri yukarıdaki klasörlere ekleyin
2. `npm run dev` ile test edin
3. Görsellerin doğru göründüğünü kontrol edin
