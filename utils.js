window.onload = () => {
  document.getElementById("menu-button").addEventListener("click",() => {
    if(window.innerWidth <= 768){
      var nav = document.getElementsByClassName("navigation");
      nav[0].classList.toggle("navigation-visible");
      var content = document.getElementsByClassName("content");
      content[0].classList.toggle("content-blurred");
    }
  });
}