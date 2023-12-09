import json
import os

def veri_oku():
    try:
        with open('veri.json', 'r') as dosya:
            veri = json.load(dosya)
        return veri
    except FileNotFoundError:
        return None

def veri_yaz(veri):
    with open('veri.json', 'w') as dosya:
        json.dump(veri, dosya, indent=2)

def yeni_veri_ekle():
    eski_veri = veri_oku() or []
    
    # Yeni veri oluştur
    yeni_veri = {
        "baslik": input("Makale Başlığı: "),
        "yazar": input("Yazar Adı: "),
        "site": input("Site Adı: "),
        "yazi": input("Yazınız: ")
    }

    # Eski veriye yeni veriyi ekle
    eski_veri.append(yeni_veri)

    # Veriyi dosyaya yaz
    veri_yaz(eski_veri)

def html_dosyasi_olustur(veri):
    makaleler_klasoru = 'makaleler'
    os.makedirs(makaleler_klasoru, exist_ok=True)

    for indeks, makale in enumerate(veri):
        html_icerik = f'''
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4Y821FEVLY"></script>
<script src = "script.js"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
  <title>Hakkımızda</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  
  <div class = "headler">
  <header>
    <nav>
      <ul>
        <div class="logo">
        <a id="mainpage" href="/"><img src="../images/logo.webp" alt="Tarih Topluluğu"></a>
      </div>
        <li><a href="/">Anasayfa</a></li>
        <div class="demo-dropdown">
        <li class ="works" href=""><a>Çalışmalarımız</a>
          <ul>
            <li class = "anka"><a href="anka">Anka Dergimiz</a></li>
            <li class = "droped"><a href="mercek">Mercek Gazetemiz</a></li>
            <li class = "droped"><a href="eharita">E-Haritamız</a></li>
            <li class = "droped"><a href="makeler">Makelelerimiz</a></li>
            <li class = "belgesel"><a href="belgesel">Belgeselimiz</a></li>
          </ul>
        </li>
      </div>
        <li><a href="../kadromuz/index.html">Kadromuz</a></li>
        <li><a href="">Hakkımızda</a></li>
      </ul>
      <button class = "sendbutton" id="sendbutton" onclick="window.location.href='/#sendwrite'">Yazı Gönder</button>
    </nav>
  </header>
</div>
<div class="hakkimizda-kutu">
<h2 class="hakkimizda-baslik">{makale['baslik']}</h2>
<div class = "hakkimizdametin">
<p>{makale['yazi']}</p>
  </div>
  <h2>Yazar = {makale['yazar']} </h2>
</div>
    <footer>
    <div class="footer-content">
        <div class="footer-section">
            <h3>İletişim</h3>
            <p>aaaltarih@aaal.net.tr</p>
            <p>0539 625 74 77</p>
            <a href="https://www.instagram.com/tarih_toplulugu/" target="_blank">
              <img src="../images/instagram_logo.webp" alt="Instagram" width="30" height="30">
          </a>
        </div>
        <div class="footer-section">
            <h3>Linkler</h3>
            <ul>
                <li><a href="#">Ana Sayfa</a></li>
                <li><a href="#">Kadromuz</a></li>
                <li><a href="#">Hakkımızda</a></li>
            </ul>
        </div>
      </div>
  </footer>
    <script src="script.js"></script>
</body>
</html>

        
        '''

        dosya_adi = f"{makaleler_klasoru}/{makale['site']}.html"

        with open(dosya_adi, 'w') as html_dosyasi:
            html_dosyasi.write(html_icerik)
        print(f"{dosya_adi} oluşturuldu.")

if __name__ == "__main__":
    while True:
        yeni_veri_ekle()
        devam = input("Başka veri eklemek istiyor musunuz? (E/H): ").lower()
        if devam != 'e':
            break

    veri = veri_oku()
    if veri:
        html_dosyasi_olustur(veri)
    else:
        print("Henüz hiç veri eklenmemiş.")  
