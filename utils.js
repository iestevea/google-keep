window.onload = () => {
  var content = document.getElementsByClassName("content");
  var nav = document.getElementsByClassName("navigation");
  document.getElementById("menu-button").addEventListener("click",() => {
    if(window.innerWidth <= 768){
      nav[0].classList.toggle("navigation-visible");
      content[0].classList.toggle("content-blurred");
    }
  });
  content[0].addEventListener("click",() => {
    console.log("se ha pulsado el contenido");
    if(window.innerWidth <= 768 && nav[0].classList.contains("navigation-visible") && content[0].classList.contains("content-blurred")){
      nav[0].classList.remove("navigation-visible");
      content[0].classList.remove("content-blurred");
    }
  });
  
}