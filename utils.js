window.onload = () => {
  var content = document.getElementsByClassName("content");
  var nav = document.getElementsByClassName("navigation");
  document.getElementsByClassName("menu-button-header")[0].addEventListener("click",() => {
    if(window.innerWidth <= 768){
      nav[0].classList.toggle("navigation-visible");
      content[0].classList.toggle("content-blurred");
    }
  });
  content[0].addEventListener("click",() => {
    if(window.innerWidth <= 768 && nav[0].classList.contains("navigation-visible") && content[0].classList.contains("content-blurred")){
      nav[0].classList.remove("navigation-visible");
      content[0].classList.remove("content-blurred");
    }
  });
  
}