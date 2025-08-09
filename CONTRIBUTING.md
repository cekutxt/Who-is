# 🤝 Katkıda Bulunma Rehberi

WHOIS Checker projesine katkıda bulunduğunuz için teşekkür ederiz! Bu rehber, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 📋 İçerik

- [Katkı Türleri](#katkı-türleri)
- [Geliştirme Ortamı](#geliştirme-ortamı)
- [Katkı Süreci](#katkı-süreci)
- [Kodlama Standartları](#kodlama-standartları)
- [Pull Request Rehberi](#pull-request-rehberi)
- [Issue Rapor Etme](#issue-rapor-etme)

## 🎯 Katkı Türleri

### 🐛 Bug Raporları
- Hataları tespit edin ve raporlayın
- Yeniden üretim adımları ekleyin
- Ekran görüntüleri ekleyin

### ✨ Özellik Önerileri
- Yeni özellik önerilerinde bulunun
- Kullanım senaryolarını açıklayın
- Mockup'lar veya örnekler paylaşın

### 📚 Dokümantasyon
- README dosyasını iyileştirin
- Kod yorumları ekleyin
- Kullanım rehberleri yazın

### 🎨 Tasarım İyileştirmeleri
- UI/UX iyileştirmeleri
- Responsive tasarım optimizasyonları
- Erişilebilirlik geliştirmeleri

## 🛠️ Geliştirme Ortamı

### Gereksinimler
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- Text editor veya IDE (VS Code önerilir)
- Git

### Kurulum
1. Repository'yi fork edin
2. Local'inize klonlayın:
   ```bash
   git clone https://github.com/yourusername/cekutxt-whois.git
   cd cekutxt-whois
   ```
3. Geliştirme sunucusu başlatın:
   ```bash
   # Python ile
   python -m http.server 8000
   
   # Node.js ile
   npx serve .
   
   # Live Server ile (VS Code extension)
   # Live Server: Open with Live Server
   ```

## 🔄 Katkı Süreci

### 1. Issue Oluşturun
- Yeni bir özellik veya bug için önce issue açın
- Mevcut issue'ları kontrol edin
- Açık bir başlık ve detaylı açıklama yazın

### 2. Branch Oluşturun
```bash
git checkout -b feature/amazing-feature
# veya
git checkout -b bugfix/issue-123
```

### 3. Değişikliklerinizi Yapın
- Küçük, anlamlı commit'ler yapın
- Clear commit mesajları yazın
- Test edin

### 4. Commit Yapın
```bash
git add .
git commit -m "Add amazing feature"
```

### 5. Push Edin
```bash
git push origin feature/amazing-feature
```

### 6. Pull Request Açın
- Açıklayıcı bir başlık yazın
- Değişiklikleri detaylı açıklayın
- İlgili issue'yu reference edin

## 📝 Kodlama Standartları

### HTML
- Semantic HTML5 elementleri kullanın
- Proper indentation (2 spaces)
- Alt text'leri ekleyin
- Erişilebilirlik standartlarına uyun

### CSS
- Tailwind CSS utility classes kullanın
- Custom CSS için BEM methodology
- Mobile-first responsive tasarım
- CSS variables kullanın

### JavaScript
- ES6+ modern syntax
- Camel case naming
- JSDoc comments ekleyin
- Error handling yapın
- Async/await kullanın

### Örnek Kod Formatı
```javascript
/**
 * Domain validation function
 * @param {string} domain - Domain to validate
 * @returns {boolean} - Validation result
 */
function validateDomain(domain) {
    if (!domain) return false;
    
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
}
```

## 🔍 Pull Request Rehberi

### Başlık Formatı
- `feat: add domain history feature`
- `fix: resolve mobile menu issue`
- `docs: update installation guide`
- `style: improve button hover effects`

### Açıklama Şablonu
```markdown
## Açıklama
Bu PR'da neler değişti?

## Değişiklik Türü
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Test Edildi
- [ ] Desktop browsers
- [ ] Mobile devices
- [ ] Different screen sizes

## Ekran Görüntüleri
(Varsa ekleyin)

## Checklist
- [ ] Kod standartlara uygun
- [ ] Self-review yapıldı
- [ ] Comments eklendi
- [ ] Documentation güncellendi
```

## 🐛 Issue Rapor Etme

### Bug Report Şablonu
```markdown
**Bug Açıklaması**
Bug'ın net açıklaması.

**Yeniden Üretme Adımları**
1. '...' git
2. '....' tıkla
3. '....' gör
4. Hata görülür

**Beklenen Davranış**
Ne olması gerekiyordu?

**Ekran Görüntüleri**
Varsa ekleyin.

**Desktop (lütfen doldurun):**
 - OS: [ör. iOS]
 - Browser: [ör. chrome, safari]
 - Version: [ör. 22]

**Smartphone (lütfen doldurun):**
 - Device: [ör. iPhone6]
 - OS: [ör. iOS8.1]
 - Browser: [ör. stock browser, safari]
 - Version: [ör. 22]

**Ek Bilgiler**
Başka eklemek istediğiniz bilgiler.
```

### Feature Request Şablonu
```markdown
**Özellik ile ilgili problemin açıklaması**
Net bir açıklama yazın. Ör. Ben [...] yapmak istiyorum ama [...]

**Önerdiğiniz çözüm**
İstediğiniz çözümün net açıklaması.

**Düşündüğünüz alternatifler**
Düşündüğünüz diğer çözümler.

**Ek bilgiler**
Feature request ile ilgili diğer bilgiler.
```

## 🏷️ Commit Mesaj Formatı

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type
- **feat**: Yeni özellik
- **fix**: Bug fix
- **docs**: Dokümantasyon değişikliği
- **style**: Kod formatı (CSS/style değişikliği değil)
- **refactor**: Kod refactoring
- **test**: Test ekleme/düzenleme
- **chore**: Build process veya auxiliary tool değişiklikleri

### Örnekler
- `feat(search): add autocomplete functionality`
- `fix(mobile): resolve menu toggle issue`
- `docs(readme): update installation instructions`

## 🎖️ Teşekkürler

Tüm katkıda bulunanlar README'de listelenecektir. Değerli katkılarınız için teşekkür ederiz!

## 📞 İletişim

Sorularınız için:
- Issue açın
- GitHub Discussions kullanın
- Email: your.email@example.com

---

Bu projeye katkıda bulunarak [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md)'a uymayı kabul etmiş olursunuz.
