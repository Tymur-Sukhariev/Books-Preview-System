google.books.load();

let showPreloader = ()=>{
    document.querySelector('.preloader').style.display = 'block'
}
let hidePreloader = ()=>{
    document.querySelector('.preloader').style.display = 'none'
}


let initializeViewer = (isbn)=>{
    let viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(isbn);
}

if (sessionStorage.getItem('isbn')) {
    showPreloader()

    let isbn = JSON.parse(sessionStorage.getItem('isbn'));

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${isbn}&key=AIzaSyA82j0CN_EhbUE58ZZKuq78cDy4JFJm6UE&maxResults=1`)
    .then((response) => {
       return response.json();
    })
    .then((data) => {
  

        let data_array = data.items[0].volumeInfo
        
                let in_title = document.querySelector('.title')
                let in_authors = document.querySelector('.authors')
                let in_date = document.querySelector('.date')
                let in_publisher = document.querySelector('.publisher')
                let in_page = document.querySelector('.page')
                let in_cat = document.querySelector('.cat')
                let in_desc = document.querySelector('.desc')
        
                console.log(data.items[0]);
        
                in_title.innerHTML+=`
                <p>${data_array.title}</p>
                `
                if(data_array.authors && data_array.authors.length >0){
                    in_authors.innerHTML+=`
                    <p>${data_array.authors}</p>
                    `
                }else{
                    in_authors.innerHTML+=`
                    <p>Unknown</p>
                    `
                }
        
                if(data_array.publishedDate){
                    in_date.innerHTML+=`
                    <p>${data_array.publishedDate}</p>
                    `
                }else{
                    in_date.innerHTML+=`
                    <p>Unknown</p>
                    `
                }
                if(data_array.publisher){
                    in_publisher.innerHTML+=`
                    <p>${data_array.publisher}</p>
                    `
                }else{
                    in_publisher.innerHTML+=`
                    <p>Unknown</p>
                    `
                }
                if(data_array.pageCount){
                    in_page.innerHTML+=`
                    <p>${data_array.pageCount}</p>
                    `
                }else{
                    in_page.innerHTML+=`
                    <p>Unknown</p>
                    `
                }
        
                if(data_array.categories && data_array.categories.length >0){
                    in_cat.innerHTML+=`
                        <p>${data_array.categories}</p>
                    `
                }else{
                    in_cat.innerHTML+=`
                        <p>Unknown</p>
                    `
                }
        
                if(data_array.description){
                    in_desc.innerHTML+=`
                    <p>${data_array.description}</p>
                    `
                }else{
                    in_desc.innerHTML+=`
                    <p>Unknown</p>
                    `
                }

                if(data.items[0].accessInfo.viewability!="NO_PAGES"){
                    initializeViewer(isbn);
                }else{
                    document.querySelector('h4').style.display = "block"
                }
                hidePreloader()

    })
    .catch((error) => {
        alert('Error:', error); 
    });
} else {
    alert("Error!");
}
