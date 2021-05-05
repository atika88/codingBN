/* font style */
function changeFont(){
  document.getElementById("output").style.fontFamily = font.value;
}

/* change font size */
function changeSize(n){
  var s = document.getElementById("output");
  s.style.fontSize = n.value + "px";
}

/* font color */

function changeFontColor(){
  document.getElementById("output").style.color = color.value;
}

/*bold function*/

function bold_click(){
  var text=document.getElementById("output").style.fontWeight;

  if (text !== "bold") {
    document.getElementById("output").style.fontWeight = "bold";
  } else {
    document.getElementById("output").style.fontWeight = "normal";
  }
}

/* italic function*/

function italic_click(){
  var text =document.getElementById("output").style.fontStyle;

  if (text !== "italic") {
    document.getElementById("output").style.fontStyle = "italic";
  } else {
    document.getElementById("output").style.fontStyle = "normal";
  }
}

/* underline function */

function underline_click(){
  var text = document.getElementById("output").style.textDecoration;

  if (text !== "underline") {
    document.getElementById("output").style.textDecoration = "underline";
  } else {
    document.getElementById("output").style.textDecoration = "none";
  }
}

/* reset button */

function reset_click(){
  document.getElementById("output").style.fontWeight = "normal";
  document.getElementById("output").style.textDecoration = "none";
  document.getElementById("output").style.fontStyle = "normal";
  document.getElementById("output").style.color = "black";
}

/* clear button */

function clear_click(){
  document.getElementById("output").value = "";
}

/* save button */

let saveButton = document.getElementById("save");
let addText = document.getElementById("output");
let addTitle = document.getElementById("title");

saveButton.addEventListener("click", (e) => {
  if(addTitle.value == "" || addText.value == ""){
    return alert("empty title and notes");
  }

  let notes = localStorage.getItem("notes");
  if(notes == null){
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text : addText.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTitle.value = "";
  addText.value = ""; 

  showNotes();
})

//show notes
function showNotes(){
  let notes = localStorage.getItem("notes");
  if(notes == null){
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  
  notesObj.forEach(function(element, index){
    html += `
  
            <div id="note">
            <hr>
                <p class="note-counter">Note ${index + 1}</p>
                <hr>
                <h3 class="note-title"> Title: ${element.title} </h3>
                <p class="note-text"> Note: ${element.text}</p>
                <button class="note-btn" id="${index}" onclick="deleteNote(this.id)" >Delete note</button>
                <button class="note-btn edit-btn" id="${index}" onclick="editNote(this.id)">Edit note</button>
            </div>
        </div>
        
        `;
  });

  let noteElm = document.getElementById("notes");
  if(notesObj.length != 0){
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "No notes yet";
  }

}

//function delete

function deleteNote(index){
  let confirmDel = confirm("Delete Note?");
  
  if(confirmDel == true){
    let notes = localStorage.getItem("notes");
    if(notes == null){
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

  }
    
}

//edit function

function editNote(index){
  let notes = localStorage.getItem("notes");
  if(addTitle.value !== "" || addText.value !== ""){
    return alert("Clear Titles and Notes before editting");
  }

  if(notes == null){
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.findIndex((element, index) => {
    addTitle.value = element.title;
    addText.value = element.text;
  })

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();

}

showNotes();
