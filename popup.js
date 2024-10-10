const container = document.querySelector(".notes-container");
const addNote = document.querySelector(".addNote");

//Update notes in Chrome storage
const updateNote = function () {
  const notePads = document.querySelectorAll(".note-pad");
  const notes = Array.from(notePads).map(notePad => notePad.querySelector('textarea').value);
  chrome.storage.local.set({ updateNote: notes }, () => console.log('Notes saved:', notes));
}

//Display notes from Chrome Storage
const displayNote = function () {
  chrome.storage.local.get(['updateNote'], (result) => {
    const notes = result.updateNote || [];
    notes.forEach(note => {
      container.insertAdjacentHTML("afterbegin",
        `<div class="note-pad">
      <textarea type="text" placeholder="What's on your mind?...">${note}</textarea>
      <img id="deleteImg" class="delImg" src="images/delete.png">
      <img id="saveImg" class="saveImg" src="images/save.png">
    </div>`);
    });
  });
};
//Load existing notes when the document is ready
document.addEventListener('DOMContentLoaded', displayNote);


//Add new note on button click
addNote.addEventListener('click', () => {
  container.insertAdjacentHTML("afterbegin",
    `<div class="note-pad">
    <textarea type="text" placeholder="What's on your mind?..."></textarea>
    <img id="deleteImg" class="delImg" src="images/delete.png">
    <img id="saveImg" class="saveImg" src="images/save.png">
  </div>`);
});

container.addEventListener('click', function (e) {
  if (e.target.className === "delImg") {
    e.target.parentElement.remove();
    updateNote();
  }
  if (e.target.className === "saveImg") updateNote();
});






