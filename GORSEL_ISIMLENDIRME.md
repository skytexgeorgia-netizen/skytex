# Görsel İsimlendirme Rehberi

## Mevcut Görseller ve Kullanım Yerleri

Kodlar şu dosya isimlerini kullanacak şekilde güncellendi:

### Logo
- **Dosya:** `public/logo/IMG_6291.PNG`
- **Kullanım:** Header'da gösterilecek
- **Alternatif:** `public/logo/skytex-logo.png` (fallback)

### Hero Banner (Ana Sayfa Arka Plan)
- **Dosya:** `public/logo/skytex_hero_banner_option2 (1).png`
- **Kullanım:** Ana sayfa hero section arka planı
- **Alternatif:** `public/factory/hero-banner.jpg` (fallback)

### Fabrika Görselleri (Hakkımızda Sayfası)
- **Görsel 1:** `public/factory/IMG_5563.jpg`
- **Görsel 2:** `public/factory/factory-2.jpg`
- **Kullanım:** Hakkımızda sayfasında 2 sütunlu grid

### Portfolyo - Üretim Tesisleri
- **Görsel 1:** `public/factory/machine-1.jpg`
- **Görsel 2:** `public/factory/machine-2.jpg`
- **Görsel 3:** `public/factory/machine-3.jpg`
- **Görsel 4:** `public/factory/machine-4.jpg`
- **Kullanım:** Portfolyo sayfasında "Üretim Tesisleri" bölümü

## Önerilen İsimlendirme

Daha düzenli bir yapı için görselleri şu şekilde yeniden adlandırabilirsiniz:

```
public/
├── logo/
│   ├── skytex-logo.png          # IMG_6291.PNG yerine
│   └── hero-banner.png          # skytex_hero_banner_option2 (1).png yerine
├── factory/
│   ├── factory-1.jpg            # IMG_5563.jpg yerine
│   ├── factory-2.jpg
│   ├── machine-1.jpg
│   ├── machine-2.jpg
│   ├── machine-3.jpg
│   └── machine-4.jpg
```

## Görselleri Yeniden Adlandırma

Eğer görselleri yeniden adlandırmak isterseniz:

```bash
# Logo
mv public/logo/IMG_6291.PNG public/logo/skytex-logo.png

# Hero Banner
mv "public/logo/skytex_hero_banner_option2 (1).png" public/logo/hero-banner.png

# Factory
mv public/factory/IMG_5563.jpg public/factory/factory-1.jpg
```

Sonra kodları da buna göre güncellememiz gerekir.

## Şu Anki Durum

✅ Kodlar mevcut dosya isimlerini kullanacak şekilde güncellendi
✅ Fallback mekanizmaları eklendi (görsel bulunamazsa alternatif isimler denenir)
✅ Placeholder'lar görseller yüklenene kadar gösterilecek
