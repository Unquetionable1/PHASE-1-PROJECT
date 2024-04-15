document.addEventListener('DOMContentLoaded',()=>{

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        let searchQuery = document.getElementById('search-input').value.toLowerCase();
        
        // Fetch the JSON data
        fetch('https://api.thecatapi.com/v1/breeds/search?q=air&attach_image=1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Filter the data based on the search query
            let results = data.filter(item => {
                return item.name.toLowerCase().includes(searchQuery)
            });
            displayResults(results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    });


    getImage()
    const breed = document.getElementById('breed');
    breed.addEventListener('click',()=>{
     getBreed()
    })

    
})
function getImage(){
    fetch('https://api.thecatapi.com/v1/images/search?limit=1')
    .then(res=>{
        if(!res.ok){
            new Error('You have a request error')
        }
        return res.json();
    })
    .then(imagData=>{
        imagData.map(image=>{
            const div = document.getElementById('view');
            const img=document.createElement('img');
            img.src=`${image.url}`;
            img.height="300"
            img.width='300'
            div.appendChild(img);
        })
    })
    .catch(error=>console.log(error))
}

function getBreed(){
    fetch('https://api.thecatapi.com/v1/breeds?limit=10&page=0')
    .then(res=>{
        if(!res.ok){
            new Error('You have a request error')
        }
        return res.json();
    })
    .then(breed => {
        breed.forEach(breeds => {
            let ul = document.createElement('ul');
            let div = document.getElementById('list')
            ul.innerHTML +=`<li>Name: ${breeds.name}.<hr> Description: ${breeds.description}.`
            div.appendChild(ul);

            const li = document.querySelector('li')
            li.addEventListener('click',(e)=>{
                e.preventDefault();
                showImg(breeds.reference_image_id);
            })

        });
    })

}

function showImg(reference_image_id){
    fetch(`https://api.thecatapi.com/v1/images/${reference_image_id}?sub_id=`,{
        headers:{
            'x-api-key':'live_NIMRpUfCcUpq1LBrO8QwGcYM5Zo55ydh0RkIpf4Cvkivt864j8BljpBLa2jPNahZ'
        }
    })
    .then(res=>res.json())
    .then(img=>{
        const view=document.getElementById('view');
        view.co
        const image=document.createElement('img');
            image.src=image.url;
            image.height="300"
            image.width='300'
            view.appendChild(image);
    })
    .catch(error=>console.log(error))
}


function displayResults(results) {
    let resultsContainer = document.getElementById('list');
    resultsContainer.innerHTML = ''; // Clear previous results
    
    if (results.length === 0) {
        resultsContainer.textContent = 'No results found';
    } else {
        let resultList = document.createElement('ul');
        results.forEach(item => {
            let listItem = document.createElement('li');
            listItem.innerHTML = `<hr>Name:${item.name}<hr>Description: ${item.description}
            <img src="https://api.thecatapi.com/v1/images/${item.reference_image_id}?sub_id="
            height="300" width="300"> `
            resultList.appendChild(listItem);
        });

        
        resultsContainer.appendChild(resultList);

    }
}

