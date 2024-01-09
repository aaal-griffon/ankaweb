window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-4Y821FEVLY');
function toggleMobileMenu() {
    var ulElement = document.querySelector('.headler ul');

    // Görünürlüğü kontrol et ve tersine çevir
    if (ulElement.style.display === 'none' || ulElement.style.display === '') {
        ulElement.style.display = 'block';
    } else {
        ulElement.style.display = 'none';
    }
}
function yazigonderscroll(){
    window.location.href = "../../#sendwrite";
}