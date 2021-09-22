function fid() {
    return Math.random().toString(36).substr(2, 9);
  };

  for (let i = 0; i <= 10; i++) {
    let link = document.createElement("a")
    link.href=`/note/${fid()}`
    document.body.appendChild(link)
    console.log(i)
  }