let newNoteButton = document.getElementById("newNote").addEventListener("click", newNoteCreator)

function newNoteCreator() {
  let newNote = {}
  newNote.id = Math.random().toString(36).substr(2, 9)
  newNote.title = ""
  newNote.content = ""
  newNote.created_at = `${("0" + new Date().getDate()).slice(-2)}/${("0" + (new Date().getMonth() + 1)).slice(-2)}/${new Date().getFullYear()}`
  newNote.edited_at = `${("0" + new Date().getDate()).slice(-2)}/${("0" + (new Date().getMonth() + 1)).slice(-2)}/${new Date().getFullYear()}`
  newNote.authorId = JSON.parse(localStorage.user).id
  sessionStorage.setItem("savedNote", JSON.stringify(newNote))
  window.location = "edit.html"
}