let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
let intervalId;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function changeSlide(n) {
    currentIndex = (currentIndex + n + slides.length) % slides.length;
    showSlide(currentIndex);
    resetInterval();
}

function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => changeSlide(1), 3000);
}

// Initial display
showSlide(currentIndex);

// Auto play
intervalId = setInterval(() => changeSlide(1), 3000); // 3000 milliseconds (3 seconds) interval for auto play
document.getElementById("sendbutton").addEventListener("click", function() {
    scroll();
  });
  
  function scroll() {
    var div = document.getElementById("sendwrite");
    div.scrollIntoView({ behavior: 'smooth' });
  }





    function makelekoyucu(basliksema,baslikomer) {
    // Makaleler için

    var makaleListesi = document.getElementById('makaleListesi');
    console.log(basliksema);
    for (var i = basliksema.length - 1; i >= 0; i--) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '/makaleler/'+baslikomer[i]+".html"; // İstersen buraya makalenin gerçek linkini ekleyebilirsin
      a.textContent = basliksema[i];
      li.appendChild(a);
      makaleListesi.appendChild(li);
    }
    }
  
  document.addEventListener('DOMContentLoaded', function () {

  const jsonDosyaURL = 'veri.json';

  fetch(jsonDosyaURL)
    .then(response => {
      // Yanıtı kontrol et
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // JSON formatına dönüştür
      return response.json();
    })
    .then(jsonData => {
      // "yazi" parametresini al
      var baslikkerem = jsonData.map(item => item.baslik);
      var site = jsonData.map(item => item.site);
      const okey = 1;
      // Yazıları konsola yazdır
     console.log(baslikkerem)
     console.log(site)
 
      makelekoyucu(baslikkerem,site);
    })
    .catch(error => {
      console.error('Fetch hatası:', error);
    });
  
    // Gelişmeler için
    var gelistirmelerIcerik = document.getElementById('gelistirmelerIcerik');
    // Buraya gelişmelerin içeriğini ekleyebilirsin
    gelistirmelerIcerik.innerHTML = '<p>Burada gelişmelerin içeriği olacak.</p>';

  });