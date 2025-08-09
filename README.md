# 🔍 Domain & WHOIS Checker

Modern ve responsive bir domain WHOIS sorgulama web uygulaması. Domain adreslerinin kayıt durumunu, sahiplik bilgilerini ve WHOIS detaylarını kolayca sorgulayın.

## ✨ Özellikler

- 🎨 **Modern Tasarım**: Glass morphism efekti ile şık ve çağdaş arayüz
- 📱 **Responsive**: Tüm cihazlarda mükemmel görünüm (mobil, tablet, masaüstü)
- ⚡ **Hızlı Sorgulama**: Anlık WHOIS bilgi erişimi
- 🛡️ **Güvenli**: Client-side uygulama, veri güvenliği
- 🆓 **Ücretsiz**: Tamamen ücretsiz API kullanımı
- 🌐 **Türkçe**: Tam Türkçe dil desteği

## 📊 Sorgulanan Bilgiler

- ✅ Domain kayıt durumu (aktif/pasif)
- 📅 Kayıt tarihi ve bitiş tarihi
- 🏢 Registrar bilgileri (şirket adı, IANA ID)
- 🔄 Son güncelleme tarihi
- 🌐 Name server listesi
- 📋 Domain durumu ve kısıtlamaları

## 🚀 Canlı Demo

[GitHub Pages'te Görüntüle](https://yourusername.github.io/cekutxt-whois)

## 📸 Ekran Görüntüleri

### Ana Sayfa
![Ana Sayfa](screenshots/homepage.png)

### WHOIS Sonuç Ekranı
![WHOIS Sonuçları](screenshots/results.png)

### Mobil Görünüm
![Mobil Görünüm](screenshots/mobile.png)

## 🛠️ Teknolojiler

- **HTML5**: Semantik ve erişilebilir yapı
- **CSS3**: Modern animasyonlar ve glass morphism
- **JavaScript (ES6+)**: Asenkron API çağrıları ve DOM manipülasyonu
- **Tailwind CSS**: Utility-first CSS framework
- **WHOIS API**: Ücretsiz WHOIS veri sağlayıcısı

## 📦 Kurulum

### 1. Repository'yi Klonlayın
```bash
git clone https://github.com/yourusername/cekutxt-whois.git
cd cekutxt-whois
```

### 2. Tarayıcıda Açın
```bash
# Basit HTTP sunucusu (Python 3)
python -m http.server 8000

# Alternatif olarak (Node.js)
npx serve .

# Veya doğrudan index.html dosyasını tarayıcıda açın
```

### 3. Tarayıcıdan Erişin
```
http://localhost:8000
```

## 📂 Proje Yapısı

```
cekutxt-whois/
├── index.html              # Ana sayfa
├── about.html              # Hakkında sayfası
├── assets/
│   ├── css/
│   │   └── styles.css      # Özel CSS stilleri
│   ├── js/
│   │   └── script.js       # Ana JavaScript dosyası
│   └── images/
│       ├── favicon.ico     # Site ikonu
│       └── screenshots/    # Ekran görüntüleri
├── README.md               # Proje dökümantasyonu
└── LICENSE                 # MIT Lisansı
```

## 🔧 Kullanım

1. **Domain Girin**: Ana sayfadaki arama kutusuna sorgulamak istediğiniz domain adresini girin
2. **Sorgulayın**: "WHOIS Sorgula" butonuna tıklayın veya Enter tuşuna basın
3. **Sonuçları İnceleyin**: Domain kayıt bilgileri, registrar detayları ve name server listesi görüntülenecek

### Desteklenen Domain Formatları
- `example.com`
- `subdomain.example.org`
- `example.net`
- `example.tr`

## 🌐 API Bilgisi

Bu uygulama [whois.freeapi.app](https://whois.freeapi.app) ücretsiz WHOIS API'sini kullanmaktadır.

### API Özellikleri:
- ✅ Ücretsiz kullanım
- ✅ Rate limiting koruması
- ✅ JSON response format
- ✅ CORS desteği

## 🤝 Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Katkıda bulunmak için:

1. **Fork** edin
2. **Feature branch** oluşturun (`git checkout -b feature/amazing-feature`)
3. **Commit** edin (`git commit -m 'Add some amazing feature'`)
4. **Push** edin (`git push origin feature/amazing-feature`)
5. **Pull Request** açın

### Geliştirme Rehberi

```bash
# Geliştirme için local sunucu başlatın
npm install -g live-server
live-server --port=8080

# Veya Python ile
python -m http.server 8080
```

## 🐛 Bilinen Sorunlar ve Çözümler

### API Erişim Sorunları
- **Problem**: CORS hatası veya API erişim sorunu
- **Çözüm**: Uygulama otomatik olarak 4 farklı API endpoint'i dener:
  1. FreeAPI Direct (ana kaynak)
  2. AllOrigins Proxy (CORS proxy)
  3. CorsProxy.io (alternatif proxy)
  4. Demo Mode (offline test)

### Diğer Bilinen Sorunlar
- [ ] Bazı TLD'ler için WHOIS bilgisi sınırlı olabilir
- [ ] API rate limiting nedeniyle aşırı kulımda gecikmeler yaşanabilir
- [ ] Safari'de bazı CSS animasyonları farklı görünebilir

### API Hatası Çözüm Adımları
1. **Farklı tarayıcı deneyin** (Chrome, Firefox önerilir)
2. **Tarayıcı önbelleğini temizleyin**
3. **VPN kullanıyorsanız kapatın**
4. **Demo modu için**: `google.com` veya `github.com` deneyin

## 📝 To-Do

- [ ] DNS kayıt sorgulama özelliği
- [ ] Domain geçmiş bilgileri
- [ ] Toplu domain sorgulama
- [ ] Dark/Light mode toggle
- [ ] Çoklu dil desteği (İngilizce)
- [ ] PWA (Progressive Web App) desteği

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Teşekkürler

- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [WHOIS Free API](https://whois.freeapi.app/) - WHOIS veri sağlayıcısı
- [Heroicons](https://heroicons.com/) - SVG ikonlar

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/cekutxt-whois&type=Date)](https://star-history.com/#yourusername/cekutxt-whois&Date)

---

**Not**: Bu proje eğitim ve açık kaynak amaçlı geliştirilmiştir. Ticari kullanım için API sağlayıcısının koşullarını kontrol ediniz.

