document.addEventListener('DOMContentLoaded',()=>{
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

            li.addEventListener('click',(e)=>{
                e.preventDefault();
                showImg(breeds);
            })

        });
    })

}

function showImg(breeds){
    fetch(`https://api.thecatapi.com/v1/images/${breeds.reference_image_id}?sub_id=`)
    .then(res=>res.json())
    .then(img=>{
        const view=document.getElementById('img');
    })
}


