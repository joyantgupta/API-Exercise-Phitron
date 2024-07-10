const loadAllItem = (itemName) => 
{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
    .then(res => res.json())
    .then(data => {
        displayItem(data.meals);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        displayItem([]);
    });
};

const displayItem = (items) => 
{
    const itemContainer = document.getElementById("food-container");
    itemContainer.innerHTML = '';

    if(items == null || items.length == 0)
    {
        const div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = `
            <h2>No items found</h2>;
        `
        itemContainer.appendChild(div);
        return;
    }

    items.forEach((item) => 
    {
        const div = document.createElement("div");
        div.classList.add("card");
        div.dataset.itemId = item.idMeal;
        div.innerHTML = `
            <img class = "card-img" src=${item.strMealThumb} alt="${item.strMeal}" />
            <h3>${item.strMeal}</h3>
        `;
        itemContainer.appendChild(div);
    });
}

document.getElementById("srch").addEventListener("click", () =>
{
    const itemContainer = document.getElementById("food-container");
    itemContainer.innerHTML = '';

    const inputValue = document.getElementById("srch-box").value.trim();
    if(inputValue)
    {
        loadAllItem(inputValue)
    }
    else
    {
        const div = document.createElement("div");
        div.classList.add("no-srch");
        div.innerHTML = `
            <h2>Please enter a search item</h2>
        `
        itemContainer.appendChild(div);
        return;
    }
    document.getElementById("srch-box").value = "";
})

document.getElementById("food-container").addEventListener("click", (event) =>
{
    if(event.target.closest(`.card`))
    {
        const card = event.target.closest('.card');
        const itemId = card.dataset.itemId;
        loadItemDetails(itemId);
    }
});

const loadItemDetails = (itemId) => 
{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
    .then(res => res.json())
    .then(data => {
        displayItemDetails(data.meals[0]);
    })
    .catch(error => {
        console.error('Error fetching item details:', error);
    });
};
const displayItemDetails = (item) => 
{
    const itemContainer = document.getElementById("food-container");
    itemContainer.innerHTML = '';

    const itemDetails = document.getElementById("details");
    itemDetails.innerHTML = '';

    const div = document.createElement("div");
    div.classList.add("item-info");
    div.innerHTML = `
        <img src="${item.strMealThumb}" alt="${item.strMeal}">
        <h3>${item.strMeal}</h3>
        <ul>
            <li>${item.strCategory}</li>
            <li>${item.strArea}</li>
            <li>${item.strIngredient1}</li>
            <li>${item.strIngredient2}</li>
            <li>${item.strIngredient3}</li>
            <li>${item.strIngredient4}</li>
            <li>${item.strIngredient5}</li>
        </ul>
        `;
    itemDetails.appendChild(div);
};
