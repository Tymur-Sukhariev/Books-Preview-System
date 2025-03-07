let out = document.querySelector('.result_box')


if(sessionStorage.getItem('booksData')){

    let isIsbn = (isbn_arry)=>{
        let no = false;

        for(let i = 0; i < isbn_arry.length; i++){
            if(isbn_arry[i].type === "ISBN_13" || isbn_arry[i].type === "ISBN_10"){
                return isbn_arry[i].identifier;
            }
        }

        return no;
    }
    
    let storedData = JSON.parse(sessionStorage.getItem('booksData'));
    let data_array = storedData.items;
    // console.log(data_array);

    for(let i = 0; i<data_array.length;i++){

        let book = data_array[i]
            
        if (book.volumeInfo && book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers.length > 0 && isIsbn(book.volumeInfo.industryIdentifiers)) {
            out.innerHTML += `
            <li id=${isIsbn(book.volumeInfo.industryIdentifiers)}>
                <b> ${book.volumeInfo.title}</b> | ${book.volumeInfo.authors}
            </li>

            `
        } 

    }

}else{
    out.innerHTML = "NO BOOKS FOUND =("
}


let body = document.querySelector('body')

body.addEventListener('click', (e)=>{

    if (e.target.tagName === 'LI') {

        let target = e.target;
        let isbn = target.id;

        sessionStorage.setItem('isbn', JSON.stringify(isbn));
        window.location.href = 'display.html';
        
    }
    if(e.target.parentNode.tagName === "LI"){
        let target = e.target.parentNode;
        let isbn = target.id;
        
        sessionStorage.setItem('isbn', JSON.stringify(isbn));
        window.location.href = 'display.html';
    }
})




