//document.querySelector('#spicy').addEventListener('click', makeReq)                
//document.querySelector('#meatzerella').addEventListener('click', makeReq)
// document.querySelector('#mushroom').addEventListener('click', makeReq)
const pizzaIds = []
renderElements()

document.querySelector('.pizza-list').addEventListener('click', makeReq)

// replace with event delegation, after element render

const tip = document.querySelector('#tip')
const panel = document.querySelector('.api-content')



async function renderElements(){
  // get div that holds the cards
  let sect = document.getElementById('pizza-list')
  
  // send value to api
  const res = await fetch(`/api?data`)
  //get back data
  const data = await res.json()
  console.log(data)
  
  // for each element, take the name and put it in an h2, take the dispImg and put it in img tag, all inside a card div
  Object.entries(data).forEach( entry  => {
    
    const [pizzaId, content] = entry
    pizzaIds.push(pizzaId)
    let div = document.createElement('div')
    div.classList.add('card', 'clickH',pizzaId)
    

    let h2 = document.createElement('h2')
    h2.textContent = content.name
    h2.classList.add('clickH', pizzaId)

    let img = document.createElement('img')
    img.src = content.dispImg
    img.classList.add('clickH', pizzaId)
    
    div.appendChild(h2)
    div.appendChild(img)
    sect.appendChild(div)
          
  })
  
}

  // make req
async function makeReq(e){
  
  if (!e.target.classList.contains('clickH')) return;
  console.log(pizzaIds)
  // hide tip
  tip.style.display = "none"
  //show ingredient panel
  panel.style.display = 'initial'
  
  // figure out which pizza user clicked on
  // if the thing you click on, has a class that is inside pizzaIds, use that classname as the pizzaType    
  const targetClasses = Array.from(e.target.classList)  ;
  const pizzaType = pizzaIds.filter(element => targetClasses.includes(element))
  console.log(e)
  console.log(pizzaType)
  // send value to api
  const res = await fetch(`/api?pizza=${pizzaType}`)
  //get back data
  const data = await res.json()

  //grab ingredients
  let ingredients = data['ingredients']
  //grab list to place them in
  let ul = document.getElementById('api-list')
  //make sure list is empty 
  ul.innerHTML = "";
  
  
  
  //loop through list
  ingredients.forEach(item => {
    let li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  })
  
  document.querySelector('#api-img').src = data.img
}