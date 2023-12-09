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
  document.addEventListener('DOMContentLoaded', function () {
    // Makaleler için
    var makaleListesi = document.getElementById('makaleListesi');
    var makaleler = ["Anka", "Mercek", "Belgeselimiz"];
  
    for (var i = 0; i < makaleler.length; i++) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '/makeleler/'+makaleler[i]; // İstersen buraya makalenin gerçek linkini ekleyebilirsin
      a.textContent = makaleler[i];
      li.appendChild(a);
      makaleListesi.appendChild(li);
    }
  
    // Gelişmeler için
    var gelistirmelerIcerik = document.getElementById('gelistirmelerIcerik');
    // Buraya gelişmelerin içeriğini ekleyebilirsin
    gelistirmelerIcerik.innerHTML = '<p>Burada gelişmelerin içeriği olacak.</p>';
  });