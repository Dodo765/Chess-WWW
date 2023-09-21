import { wykresfun } from "./charts.js";
import { last_games_table } from "./games_opponents.js";
export {link}
export {aktualnyUser}

// Pobierz listę elementów i wszystkie elementy listy
const listaElementow = document.getElementById('nameList');
const elementyListy = listaElementow.querySelectorAll('.element_listy');

// Pobierz dodatkowy element "Ranking"
const rankingElement = document.getElementById('ranking_main');

// Pobierz elementy "user" i "ranking_main"
const userElement = document.getElementById('user');
const rankingMainElement = document.getElementById('ranking');

// Zmienna do przechowywania aktualnego zaznaczonego elementu
let AktualnyElement = rankingElement;
let aktualnyUser = null;

//zmienne do odczytu elo
let lower_name_user;
let user_data_div;
let user_data_div_postion;
let elo_namespace;
let position_namespace;


function pierwszemiejsca(){
  user_data_div_postion = document.querySelector(lower_name_user).querySelector('.ranking-position').textContent;
  user_data_div_postion = user_data_div_postion + ' Miejsce'
  position_namespace = document.querySelector('.actual_position')
  position_namespace.textContent = user_data_div_postion
  position_namespace.classList.remove("pierwsze_miejsce")
  position_namespace.classList.remove("drugie_miejsce")
  position_namespace.classList.remove("trzecie_miejsce")
  position_namespace.classList.add("main_miejsce")
  if(user_data_div_postion === '1 Miejsce'){
    position_namespace.classList.add("pierwsze_miejsce")
    position_namespace.classList.remove("main_miejsce")
  } else
  if( user_data_div_postion === '2 Miejsce'){
    position_namespace.classList.add("drugie_miejsce")
    position_namespace.classList.remove("main_miejsce")
  } else
  if( user_data_div_postion === '3 Miejsce'){
    position_namespace.classList.add("trzecie_miejsce")
    position_namespace.classList.remove("main_miejsce")
  }
}


// Dodaj event listener do listy elementów
listaElementow.addEventListener('click', (event) => {
  // Sprawdź, czy kliknięty element to element listy
  if (event.target.classList.contains('element_listy')) {
    // Usuń klasę "active" z poprzedniego zaznaczonego elementu, jeśli istnieje
    if (AktualnyElement) {
      AktualnyElement.classList.remove('active');
    }

    // Zaznacz kliknięty element
    AktualnyElement = event.target;
    AktualnyElement.classList.add('active');
    aktualnyUser = AktualnyElement.textContent;
    document.getElementById("user_name_change").textContent=aktualnyUser;

    
    wykresfun();
    last_games_table()
    // document.querySelector.getElementById("user_actual_ranking").textContent = document.querySelector.getElementByClassName(aktualnyUser.replace(/ /g,''))

    lower_name_user = aktualnyUser.replace(/ /g, '');
    lower_name_user = '.'+lower_name_user;
    user_data_div = document.querySelector(lower_name_user).querySelector('.ranking-elo').textContent;
    elo_namespace = document.getElementById('user_actual_ranking');
    elo_namespace.textContent = user_data_div;
    pierwszemiejsca()
    


    // Usuń klasę "hidden" z elementu "user" i dodaj ją do "ranking_main"
    userElement.classList.remove('hidden');
    rankingMainElement.classList.add('hidden');
  }
});

// Dodaj event listener do dodatkowego elementu "Ranking"
rankingElement.addEventListener('click', () => {
  // Usuń klasę "active" z poprzedniego zaznaczonego elementu, jeśli istnieje
  if (AktualnyElement) {
    AktualnyElement.classList.remove('active');
  }

  // Zaznacz element "Ranking"
  AktualnyElement = rankingElement;
  AktualnyElement.classList.add('active');

  // Usuń klasę "hidden" z elementu "ranking_main" i dodaj ją do "user"
  rankingMainElement.classList.remove('hidden');
  userElement.classList.add('hidden');
});

function link(){
  const playerlink = document.querySelectorAll('.ranking-link')
  playerlink.forEach(element => {
    element.addEventListener("click", function(){
      if (AktualnyElement) {
        AktualnyElement.classList.remove('active');
      }
  
      // Zaznacz kliknięty element
      
      AktualnyElement = document.getElementById(element.textContent)
      AktualnyElement.classList.add('active');
      aktualnyUser = AktualnyElement.textContent;
      document.getElementById("user_name_change").textContent=aktualnyUser;

  
      wykresfun();
      last_games_table()
      // document.querySelector.getElementById("user_actual_ranking").textContent = document.querySelector.getElementByClassName(aktualnyUser.replace(/ /g,''))
  
      lower_name_user = aktualnyUser.replace(/ /g, '');
      lower_name_user = '.'+lower_name_user;
      user_data_div = document.querySelector(lower_name_user).querySelector('.ranking-elo').textContent;
      elo_namespace = document.getElementById('user_actual_ranking');
      elo_namespace.textContent = user_data_div;
      pierwszemiejsca()
  
      // Usuń klasę "hidden" z elementu "user" i dodaj ją do "ranking_main"
      userElement.classList.remove('hidden');
      rankingMainElement.classList.add('hidden');
    })
  });
}
