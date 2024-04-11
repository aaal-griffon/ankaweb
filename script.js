
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5I-eiujkhT7byg65h-qxFtI8qQ1rLsw8",
  authDomain: "tarihwebsite.firebaseapp.com",
  projectId: "tarihwebsite",
  storageBucket: "tarihwebsite.appspot.com",
  messagingSenderId: "408360779909",
  appId: "1:408360779909:web:50e308f945ad8ca52729ec",
  measurementId: "G-FDHV6WW9FG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

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
document.getElementById("sendbutton").addEventListener("click", function () {
  scroll();
});

function scroll() {
  var div = document.getElementById("sendwrite");
  div.scrollIntoView({ behavior: 'smooth' });
}





function makelekoyucu(basliksema, baslikomer) {
  // Makaleler için

  var makaleListesi = document.getElementById('makaleListesi');
  console.log(basliksema);
  for (var i = basliksema.length - 1; i >= 0; i--) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '/makaleler/' + baslikomer[i] + ".html"; // İstersen buraya makalenin gerçek linkini ekleyebilirsin
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

      makelekoyucu(baslikkerem, site);
    })
    .catch(error => {
      console.error('Fetch hatası:', error);
    });

  // Gelişmeler için
  var gelistirmelerIcerik = document.getElementById('gelistirmelerIcerik');
 
});

const form = document.querySelector('form'); // Assuming your form has an 'id'
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const adsoyad = document.getElementById('baslik').value;
  const mail = document.getElementById('mail').value;
  const telefon = document.getElementById('telefon').value;
  const file = document.getElementById('dosya').files[0];

  // Check if a file was selected
  if (!file) {
    alert("Lütfen Dosya Seçin!");
    return; // Stop submission if no file
  }

  // File Upload to Firebase Storage
  const storageRef = ref(storage, `submissions/${file.name}`);
  uploadBytes(storageRef, file)
    .then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((fileUrl) => {
          // Store submission data in Firestore
          addDoc(collection(db, "submissions"), {
            adSoyad: adsoyad,
            email: mail,
            telefon: telefon,
            fileUrl: fileUrl,
            dosyaAdi: file.name,
          })
            .then(() => alert("Yazı Gönderildi!"))
            .catch((error) => alert("Firestore error:", error));
        });
    })
    .catch((error) => alert("Dosya Yüklenemedi:", error));

});
