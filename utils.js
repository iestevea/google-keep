function sideMenuBehavior() {
  
  var content = document.getElementsByClassName("content")[0];
  var nav = document.getElementsByClassName("navigation")[0];
  var menuBtn = document.getElementsByClassName("menu-button-header")[0];

  menuBtn.addEventListener("click", showMenu);
  content.addEventListener("click", hideMenu);

  function showMenu() {
    if(window.innerWidth <= 768){
      nav.classList.toggle("navigation-visible");
      content.classList.toggle("content-blurred");
    }
  }

  function hideMenu() { 
    if(window.innerWidth <= 768){ // && nav.classList.contains("navigation-visible") && content.classList.contains("content-blurred") -- Note: Removing a class that does not exist, does NOT throw an error!!!
      nav.classList.remove("navigation-visible");
      content.classList.remove("content-blurred");
    }
  }

}