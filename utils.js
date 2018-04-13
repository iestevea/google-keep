function sideMenuBehavior() {
  
  var content = document.getElementsByClassName("content")[0];
  var nav = document.getElementsByClassName("navigation")[0];
  var menuBtn = document.getElementsByClassName("menu-button-header")[0];
  var addNoteBtn = document.getElementsByClassName("addNoteBtn")[0];
  var inputNote = document.getElementsByClassName("searcher-content")[0].getElementsByTagName("input")[0];

  menuBtn.addEventListener("click", showMenu);
  content.addEventListener("click", hideMenu);
  addNoteBtn.addEventListener("click", addNote);
  inputNote.addEventListener("keyup", enableAddBtn);

  function showMenu() {
    if(window.innerWidth <= 768){
      nav.classList.toggle("navigation-visible");
      content.classList.toggle("content-blurred");
    }
  }
  
  function hideMenu() { 
    if(window.innerWidth <= 768){ 
      nav.classList.remove("navigation-visible");
      content.classList.remove("content-blurred");
    }
}

  function addNote() {
    var textNote = inputNote.value;
    var newNote = document.createElement("div");
    newNote.setAttribute("class","content-notes");
    newNote.innerHTML = "<p>"+textNote+"</p>";
    content.appendChild(newNote);
    inputNote.value = '';
    enableAddBtn();
  }

  function enableAddBtn() {
    if(inputNote.value != ''){
      addNoteBtn.classList.remove("disabled");
    }else{
      addNoteBtn.classList.add("disabled");
    }
  }

}