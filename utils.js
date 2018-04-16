function initMethods() {
  sideMenuBehavior();
  var notes = manageNotes();
  manageSearcher(notes);
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
  var notes = [];
  
  addNoteBtn.addEventListener("click", addNote);
  inputNote.addEventListener("keyup", enableAddBtn);

  function addNote() {
    var textNote = inputNote.value;
    var newNote = createNote(textNote);
    content.appendChild(newNote);
    notes.push(newNote);
    inputNote.value = '';
    enableAddBtn();

    function createNote(textNote) {
      var note = document.createElement("div");
      note.setAttribute("class","content-notes-note");
      note.innerHTML = `<p>${textNote}</p>`;
      return note;
    }
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

  return notes;

}

function manageSearcher(notes){
  var divSearch = document.getElementsByClassName("searcher-header")[0];
  var searcher = divSearch.getElementsByTagName("input")[0];
  var content = document.getElementsByClassName("content-notes")[0];
  var header = document.getElementsByTagName("header")[0];
  var menuBtn = document.getElementsByClassName("menu")[0];
  var backBtn = document.getElementsByClassName("arrow-back")[0];
  var iconsRight = document.getElementsByClassName("right-header-icons")[0];
  var notesFiltered = [];
  
  searcher.addEventListener("keyup", CheckFilterNotes);
  backBtn.addEventListener("click", restartNotes);

  function CheckFilterNotes(e){

    var textFilterNotes = e.target.value;

    if(!!textFilterNotes.trim()){
      notesFiltered = filterNotes(textFilterNotes,notes);
      while (content.firstChild && notesFiltered.length >= 0) {
        content.removeChild(content.firstChild);
      }
      notesFiltered.forEach( (elem) => content.appendChild(elem));
      changeStyle();
    }else{
      restartNotes();
    }
    
    function filterNotes(text,arrayNotes){
      var newArrayNotes = [];
      arrayNotes.forEach((elem) => {
        if(elem.innerText.includes(text)){
          newArrayNotes.push(elem);
        }
      });
      return newArrayNotes;
    }
  }
  
  function changeStyle() {
    header.classList.add("header-blue");
    divSearch.classList.add("searcher-header-blue");
    menuBtn.classList.add("disabled");
    backBtn.classList.remove("disabled");
    Array.from(iconsRight.getElementsByClassName("material-icons")).map((elem) => {
      elem.classList.remove("md-black");
      elem.classList.add("md-light");
    });
  }

  function removeStyle(){
    header.classList.remove("header-blue");
    divSearch.classList.remove("searcher-header-blue");
    menuBtn.classList.remove("disabled");
    backBtn.classList.add("disabled");
    Array.from(iconsRight.getElementsByClassName("material-icons")).map((elem) => {
      elem.classList.remove("md-light");
      elem.classList.add("md-black");
    });
  }

  function restartNotes(){
    notesFiltered = [];
    notes.forEach( (elem) => content.appendChild(elem));
    searcher.value = '';
    removeStyle();
  }

}