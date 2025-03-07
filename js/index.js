let click = document.querySelector('input[type="submit"]');
let input = document.querySelector('.input');

let showPreloader = ()=>{
    document.querySelector('.preloader').style.display = 'block'
}
let hidePreloader = ()=>{
    document.querySelector('.preloader').style.display = 'none'
}

click.addEventListener('click', () => {
    let query = input.value;
    console.log(query);
    if(query.trim() === ''){
        alert("Fill the input!")
    }else{
        showPreloader()

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyA82j0CN_EhbUE58ZZKuq78cDy4JFJm6UE&maxResults=40`)
        .then((response)=>{
           return response.json();
        })
        .then((data)=>{
 
            sessionStorage.setItem('booksData', JSON.stringify(data));
            hidePreloader()
            window.location.href = 'list.html';
        })
        .catch((error) => {
            alert('Error:', error); 
        });
    }
})