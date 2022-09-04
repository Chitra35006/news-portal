const loadCategories = async () =>{
    try{
        const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
        const data = await response.json();
        return data;
    }
    catch{
        error =>{
            console.log(error);
        }    
    }
}

const setNewsCategory = async () =>{
    const data = await loadCategories();
    const data1 = data.data.news_category;
    const categoryContainer = document.getElementById('category-container');
    for(const category of data1){
        //console.log(data1);
    const li = document.createElement ('li');
    li.classList.add('ul');
    li.innerHTML = `
    <li onclick="setNewsFeed('${category.category_id}')" id="${category.category_id}" class="category-name category category_names2"> ${category.category_name} </li>
    `; 
    categoryContainer.appendChild(li);
    }
    //console.log(categoryContainer);
}












const loadNewsFeed = async(category_id) =>{
    try{
        const response = await fetch("https://openapi.programming-hero.com/api/news/category/"+category_id);
        const data = await response.json();
        return data;
    }
    catch{
        error =>{
            console.log(error);
        }    
    }
}

const setNewsFeed= async(category_id) =>{
    spinner.classList.remove("d-none");
    const data = await loadNewsFeed (category_id);
    const data1 = data.data;

    data1.sort((a,b) =>{
        return b.total_view - a.total_view;
    })
    

    const newsContainer = document.getElementById('news-container') ;
    newsContainer.textContent = "";

    spinner.classList.add("d-none");

        

        let i=0;
        for (const item of data1){
         //console.log(item);
    
         const newsdiv = document.createElement('div');
         i++;
        newsdiv.classList.add('col-lg-6');
        newsdiv.innerHTML =`
    <div class=" new-container-div new-container-div2 border border-light">
          <div class="parent-div">
             <img class="img-thumbnail me-4" src="${item.thumbnail_url ? item.thumbnail_url: 'Image Not Found'}" alt="">

             <div class="mt-2 me-1">
                <h4>${item.title ? item.title : 'Title Not Found'}</h4>
                <p class="c-text-light">${item.details.length > 170 ? item.details.slice(0,170) + '...': 'Details Not Found'}</p>
            </div>
          </div>
         <div class="p-3">
            

        <table class="main_table">
            <tr>
                <td>
                    <table>
                        <tr>
                            <td class="p-2">
                                <img class = "image-fluid rounded-circle author-image" src ="${item.author.img ? item.author.img: 'Image Not Found'}"
                            </td>

                            <td class="p-2">
                                <h6>${item.author.name ? item.author.name: 'Name Not Found'}</h6>
                                <p>${item.author.published_date ? item.author.published_date: 'Not Found'}</p>
                            </td>
                        </tr>

                    </table>
                </td>

                <td class="p-2 td-right d-flex">

                    <img class="view-icon m-1" src="view.png">
                    
                    <h6>${item.total_view ? item.total_view + 'M': 'View Not Found'}</h6>
                </td>
            </tr>

        </table>
        
        <button onclick="showNewsdetails('${item._id}')" class="see-more-button" href="#" data-bs-toggle="modal" data-bs-target="#newsDetailModal">See More</button>
        
      </div>
    </div>
        `;
        newsContainer.appendChild(newsdiv);
    }

    const newsItem = document.getElementById('news-item');
    if(i==0){
        newsItem.innerText = "No News Found";
    }
    else {
        newsItem.innerText = i + " News Found";
    }
}





const loadModal = async(_id) =>{
    try{
        const response = await fetch("https://openapi.programming-hero.com/api/news/"+_id);
        const data = await response.json();
        return data;
    }
    catch{
        error =>{
            console.log(error);
        }    
    }
}


const showNewsdetails = async(_id) =>{
    const data = await loadModal (_id);
    const data1 = data.data[0];
    console.log(data1);

    const modalBody = document.getElementById('news-details');
    modalBody.innerHTML = `
    <img class="img-fluid" src ="${data1.image_url ? data1.image_url : 'Image Not Found' }"/>
    <h4 class="p-2 font-weight-bold">${data1.title ? data1.title: 'Title Not Found' } </h4>
    <p class="p-2 font-weight-bold">${data1.details ? data1.details : 'Details Not Found' }</p>
    `;
}


//setCategoriesNewsFeed();
setNewsCategory();


document.getElementById('filter_home').addEventListener('click', function(){
    const spinner = document.getElementById('spinner');
    spinner.classList.remove("d-none");
    setNewsFeed('08');
})




