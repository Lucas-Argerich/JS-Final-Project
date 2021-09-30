let newNoteButton = document.getElementById("newNote").addEventListener("click", newNoteCreator)

function newNoteCreator() {
  let newNote = {}
  newNote.id = Math.random().toString(36).substr(2, 9)
  newNote.title = ""
  newNote.content = ""
  newNote.created_at = Date()
  newNote.edited_at = Date()
  newNote.authorId = JSON.parse(localStorage.user).id
  sessionStorage.setItem("savedNote", JSON.stringify(newNote))
  window.location = "edit.html"
}