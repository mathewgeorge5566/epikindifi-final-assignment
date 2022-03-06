// Write your code here!
// Write your code here!

//Data sturcture Used
//User name stored in an array 
var users = [
    "Mathew",
    "Maria",
    "Jacob",
    "UserA",
    "UserB",
    "UserC",                          
];

class books{
    constructor(id,title,author,lender,borrower){
        this.id = id;
        this.title = title;
        this.author = author;
        this.lender = lender;
        this.borrower = borrower;
    }
}

let book1 = new books("1","Book1","Author1","UserC","UserB")
let book2 = new books("2","Book2","Author2","UserC","-")
let book3 = new books("3","Book3","Author3","UserD","UserC")
let book4 = new books("4","Book4","Author4","UserA","-")
let book5 = new books("5","Book5","Author5","UserA","-")
let book6 = new books("6","Book6","Author6","UserB","UserA")


let Bookclub = [book1,book2,book3,book4,book5,book6];
let count = Bookclub.length+1;
let loginuser =""

const isUserLoggedIn =()=>{
    if(loginuser == ""){
        return false;
    }
    else{
        return true;
    }
}

const borrow_book = (i) =>{
    Bookclub[i-1].borrower = loginuser;
    fetchBooksDetails();
}

function return_book(i){
    Bookclub[i-1].borrower = "--";
    fetchBooksDetails();
}
const book_row =(book) =>{
    let action ="-";
    if(loginuser == book.borrower && isUserLoggedIn()){
        action = `<button onclick=return_book(${book.id})>Return</button>`;
    }
    else if(loginuser == book.lender){
        action = "-";
    }
    else if(book.borrower =="-" && isUserLoggedIn())
    {
        action = `<button onclick="borrow_book(${book.id})">Borrow</button>`;
    }
    return '<tr>'+
                '<td>'+ book.id +'</td>'+
                '<td>'+ book.title +'</td>'+
                '<td>'+ book.author +'</td>'+
                '<td>'+ book.lender +'</td>'+
                '<td>'+ book.borrower +'</td>'+
                '<td>'+ action +'</td>'+
            '</tr>';
}
//function to fetch all the data from local storage and to display in the table
function fetchBooksDetails () {
    const booksList = document.getElementById('info-table-body');
    booksList.innerHTML = '';
    Bookclub.map((book)=>{
        booksList.innerHTML += book_row(book);     
    })
    
    fetchInputRow();
}

const insert_new_book =() =>{

    const new_book_title = document.getElementById('new-book-title').value;
    const new_book_author = document.getElementById('new-book-author').value;
    const new_book_lender = loginuser;
    const new_book_borrower = "-";
    const new_book_id = count;
    
    if(new_book_title.length <=0 || new_book_author <=0){
        alert("Title or Author cannot be empty!");
    }
    else{
        let new_book = new books(new_book_id,new_book_title,new_book_author,new_book_lender,new_book_borrower);
        Bookclub.push(new_book);
        count++;

        fetchBooksDetails();
    }
    
}

const fetchInputRow=() =>{  
    const inputRow = document.getElementById('info-table-body-new-book');
    if(isUserLoggedIn()){
        inputRow.innerHTML  =   '<tr>'+
                                    '<td id="new-book-id">'+count+'</td>'+
                                    '<td>'+'<input id="new-book-title" placeholder="Title">'+'</td>'+
                                    '<td>'+'<input id="new-book-author" placeholder="Author">'+'</td>'+
                                    '<td id="lender">'+loginuser+'</td>'+
                                    '<td id="borrower">'+`-`+'</td>'+
                                    '<td id="button-action-new-book">'+'<button onclick="insert_new_book()">Add Book</button>'+'</td>'+
                                '</tr>';
    }
}
//Function For loggin username display
function changeLoggedInUser(){
    let logged_in_username = document.getElementById("logged-in-user-name-current");
    let user_name = document.getElementById("logged-user").value;

    loginuser = user_name;
    if(users.includes(user_name)){
        logged_in_username.innerHTML = "Logged in user : " + user_name;
        fetchBooksDetails();
    }
    else{
        alert("The entered user Name: "+ user_name +" is not Found!");
    }
}
