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
  var deleteAllNotesBtn = document.getElementsByClassName("delete-all")[0];
  var inputNote = document.getElementsByClassName("searcher-content")[0].getElementsByTagName("input")[0];
  var notes = [];
  var notesStorage = [];
  
  addNoteBtn.addEventListener("click", addNote);
  inputNote.addEventListener("keyup", enableAddBtn);
  deleteAllNotesBtn.addEventListener("click",confirmDeleteNote);

  loadNotes();

  function refreshStorage(notes,notesStorage) {
    localStorage.clear();
    notesStorage = [];
    notesStorage = notes.map((note) => {
      return note.children[0].innerText;
    });
    localStorage["notes"] = JSON.stringify(notesStorage);
  }

  function loadNotes() {
    if(localStorage.length != 0){
      notesStorage = JSON.parse(localStorage["notes"]);
      for(let i=0; i<notesStorage.length; i++){
        var newNote = createNote(notesStorage[i]);
        content.appendChild(newNote);
        notes.push(newNote);
      }
    }
  }

  function addNote() {
    var textNote = inputNote.value;
    var newNote = createNote(textNote);
    content.appendChild(newNote);
    notes.push(newNote);
    notesStorage.push(textNote);

    refreshStorage(notes,notesStorage);

    inputNote.value = '';
    enableAddBtn();
  }

  function createNote(textNote) {
    var modal = document.getElementsByClassName("modal")[0];
    var note = document.createElement("div");
    note.setAttribute("class","content-notes-note");
    note.innerHTML = getNoteContent(textNote);
    note.addEventListener("mouseenter", showNoteBtns);
    note.addEventListener("mouseleave", hideNoteBtns);
    note.children[1].children[0].children[1].addEventListener("click",deleteNote);
    note.children[1].children[1].addEventListener("click", (e) => {
      getTextEdited().then((text) => {
        note.children[0].innerText = text;
        refreshStorage(notes,notesStorage);
        modal.classList.add("hidden");
      });
    });
    return note;
  }

  function getNoteContent(text) {
      return `<p>${text}</p>
        <div class="deleteNoteBtnContainer">
          <a href="#" class="deleteNoteBtn" >
            <input type="checkbox">
            <i class="material-icons md-24  md-black">delete</i>
          </a>
          <a href="#" class="editNoteBtn" >
            <i class="material-icons md-24  md-black">mode_edit</i>
          </a>
        </div>`;
  }

  function getTextEdited() {
    var modal = document.getElementsByClassName("modal")[0];
    var acceptEditBtn = document.getElementsByClassName("accept")[0];
    var closeEditBtn = document.getElementsByClassName("close")[0];
    var textToEdit = document.getElementsByClassName("modal-edit-note")[0].getElementsByTagName("input")[0];

    modal.classList.remove("hidden");

    return new Promise((resolve,reject) => {
      acceptEditBtn.onclick = (() => {
        resolve(textToEdit.value);
        textToEdit.value ='';
      });
      closeEditBtn.onclick = (() => {
        modal.classList.add("hidden");
      });
    });
  }

  function showNoteBtns(e){
    e.target.children[1].classList.add("visible");
  }

  function hideNoteBtns(e){
    e.target.children[1].classList.remove("visible");
  }

  function deleteNote(e) {
    var index = notes.indexOf(e.target.parentNode.parentNode.parentNode);
    notes.splice(index,1);
    refreshStorage(notes,notesStorage);
    content.removeChild(e.target.parentNode.parentNode.parentNode);
  }

  function confirmDeleteNote(){
    if(confirm("¿Estás seguro de que quieres borrar las notas seleccionadas?")) {
      deleteAll();
    } else {
      uncheckedAll();
    }
  }

  function deleteAll(){
    Array.from(content.children).forEach((note,index) => {
      if(note.getElementsByTagName("input")[0].checked) {
        notes.splice(index,1);
        content.removeChild(note);
      }
    });
    refreshStorage(notes,notesStorage);
  }

  function uncheckedAll(){
    Array.from(content.children).forEach((note,index) => {
      if(note.getElementsByTagName("input")[0].checked){
        note.getElementsByTagName("input")[0].checked = false;
      }
    });
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
      removeNotes();
      notesFiltered.forEach((elem) => {
        var note = document.createElement("div");
        note.setAttribute("class","content-notes-note");
        note.innerHTML = elem;
        content.appendChild(note);
      });
      changeStyle();
    }else{
      restartNotes();
    }
  }

  function filterNotes(text,arrayNotes){
    var newArrayNotes = [];
    newArrayNotes = arrayNotes.filter((note) => note.innerText.includes(text));
    newArrayNotes = newArrayNotes.map( (note) => {
       return note.innerHTML.replace(text,`<span class="highlight">${text}</span>`);
    });
    return newArrayNotes;
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
    removeNotes();
    notesFiltered = [];
    notes.forEach( (elem) => content.appendChild(elem));
    searcher.value = '';
    removeStyle();
  }

  function removeNotes() {
    while (content.firstChild && notesFiltered.length >= 0) {
      content.removeChild(content.firstChild);
    }
  }

}