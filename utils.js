function initMethods() {
  sideMenuBehavior();
  manageNotes();
}

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
      nav.classList.remove("navigation-visible");
      content.classList.remove("content-blurred");
  }
}

function manageNotes() {

  var content = document.getElementsByClassName("content-notes")[0];
  var addNoteBtn = document.getElementsByClassName("addNoteBtn")[0];
  var inputNote = document.getElementsByClassName("searcher-content")[0].getElementsByTagName("input")[0];
  
  addNoteBtn.addEventListener("click", addNote);
  inputNote.addEventListener("keyup", enableAddBtn);

  function addNote() {
    var textNote = inputNote.value;
    var newNote = document.createElement("div");
    newNote.setAttribute("class","content-notes-note");
    newNote.innerHTML = "<p>"+textNote+"</p>";
    content.appendChild(newNote);
    inputNote.value = '';
    enableAddBtn();
  }
  
  function enableAddBtn(e) {
    if(!!inputNote.value.trim()){
      addNoteBtn.classList.remove("disabled");
      if(e.keyCode == 13){
        addNote();
      }
    }else{
      addNoteBtn.classList.add("disabled");
    }
  }
}