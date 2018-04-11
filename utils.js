window.onload = () => {
  document.getElementById("menu-button").addEventListener("click",() => {
    var nav = document.getElementsByClassName("navigation");
    nav[0].classList.toggle("navigation-visible");
    console.log(nav[0]);
  });
}