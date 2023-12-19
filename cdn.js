const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function readData() {
  try {
    const data = fs.readFileSync('veri.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    } else {
      throw error;
    }
  }
}

function writeData(data) {
  fs.writeFileSync('veri.json', JSON.stringify(data, null, 2), 'utf-8');
}

function addNewData() {
  const existingData = readData() || [];

  rl.question('Makale Başlığı: ', (title) => {
    rl.question('Yazar Adı: ', (author) => {
      rl.question('Site Adı: ', (site) => {
        rl.question('Yazınız: ', (content) => {
          const newData = {
            "baslik": title,
            "yazar": author,
            "site": site,
            "yazi": content
          };

          existingData.push(newData);
          writeData(existingData);

          rl.question('Başka veri eklemek istiyor musunuz? (E/H): ', (answer) => {
            if (answer.toLowerCase() !== 'e') {
              rl.close();
            } else {
              addNewData();
            }
          });
        });
      });
    });
  });
}

function createHtmlFiles(data) {
  const makalelerFolder = 'makaleler';

  if (!fs.existsSync(makalelerFolder)) {
    fs.mkdirSync(makalelerFolder);
  }

  data.forEach((makale, index) => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-4Y821FEVLY"></script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
  <title>${makale['baslik']}</title>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" type="image/x-icon" href="../images/logo.webp">
</head>
<body>
  
  <div class = "headler">
    <header>
      <nav>
        <div class="logo2">
          <a id="mainpage" href="/"><img src="../images/logo.webp" alt="Tarih Topluluğu"></a>
          <div class="mobile-menu-button" onclick="toggleMobileMenu()">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
        <ul>
          <div class="logo">
            <a id="mainpage" href="/"><img src="../images/logo.webp" alt="Tarih Topluluğu"></a>
          </div>
  
          <li><a href="/">Anasayfa</a></li>
          <div class="demo-dropdown">
            <li class ="works" href=""><a>Çalışmalarımız</a>
              <ul>
                <li class = "anka"><a href="/anka">Anka Dergimiz</a></li>
                <li class = "droped"><a href="/mercek">Mercek Gazetemiz</a></li>
                <li class = "droped"><a href="/eharita">E-Haritamız</a></li>
                <li class = "droped"><a href="/makeler">Makelelerimiz</a></li>
                <li class = "belgesel"><a href="/belgesel">Belgeselimiz</a></li>
              </ul>
            </li>
          </div>
  
          <li><a href="">Kadromuz</a></li>
          <li><a href="/hakkimizda/">Hakkımızda</a></li>
          <button class = "sendbutton" id="sendbutton" onclick="yazigonderscroll()">Yazı Gönder</button>
        </ul>
      </nav>
    </header>
  </div>
  <div class="hakkimizda-kutu">
    <h2 class="hakkimizda-baslik">${makale['baslik']}</h2>
    <div class = "hakkimizdametin">
      <p>${makale['yazi']}</p>
      </div>
  </div>
      <footer>
        <div class="footer-content">
          <div class="footer-section">
            <h3>İletişim</h3>
            <p>aaaltarih@aaal.net.tr</p>
            <p>0539 625 74 77</p>
            <a href="https://www.instagram.com/tarih_topluluugu/" target="_blank">
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
  </html>`;
  
    const fileName = `${makalelerFolder}/${makale['site']}.html`;
    fs.writeFileSync(fileName, htmlContent);
    console.log(`${fileName} oluşturuldu.`);
  });
}

rl.on('close', () => {
  const data = readData();
  
  if (data) {
    createHtmlFiles(data);
  } else {
    console.log('Henüz hiç veri eklenmemiş.');
  }
});

addNewData();
