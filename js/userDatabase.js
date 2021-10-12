const Users = [
    {
        id: 0,
        firstName: "Lucas",
        lastName: "Argerich",
        email: "lucasargerichcoder@gmail.com",
        password: "12345678"
    },
]
if (localStorage.getItem("Users") == null) {
    localStorage.setItem("Users",JSON.stringify(Users))
}