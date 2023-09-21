import { workbook } from './playerlist.js';
import { link } from './current_preset.js';


const ranking = document.getElementById('ranking');

if (ranking) {
  // Wywołaj appendChild na ranking
} else {
  console.error("Element ranking nie został znaleziony.");
}
let licznik=0;
fetch('dane/ranking.xlsx') // Ścieżka do pliku Excela
    .then(response => response.arrayBuffer())
    .then(data => {
      //workbook = XLSX.read(data, { type: 'array' });
      const sheetName = 'Wins & Losses'; // Nazwa arkusza z danymi
      const sheet = workbook.Sheets[sheetName];

      // Przygotuj zakres komórek, który chcesz pobrać
      const range = 'A6:H150';

      // Pobierz dane z zakresu
      const dataFromRange = XLSX.utils.sheet_to_json(sheet, { header: 1, range });

      // Wyświetl dane w formie listy w HTML
      const ranking = document.getElementById('ranking');
      //ranking.innerHTML = ''; // Wyczyść listę, jeśli już coś jest na niej

      for (const row of dataFromRange) {
        if(row.length !== 0){
          const id = row[0]; // Zakładamy, że nazwisko znajduje się w pierwszej kolumnie (indeks 0)
          const player = row[1];
          const rating = row[2].toFixed(0);
          const wrp = row[7];
          const danePodzielone = wrp.split("-");

          const wins = danePodzielone[0];
          const draws = danePodzielone[1];
          const losts = danePodzielone[2];
          let last_wrp = row[5];
          let last_elo_change;

          let lower_name = player.replace(/ /g, '');

          if(row[3]!==undefined){
              last_elo_change = row[3].toFixed(0);
          } else {
              last_elo_change = "-";
          }

          if(last_wrp==undefined)
          {
              last_wrp="-";
              
          }
          
            
        

          // console.log(danePodzielone[0]);

          
          // Sprawdź, czy dane w komórce są niepuste, zanim dodasz je do listy
          
          if (player.trim() !== '' && player!=".") {
            const listItem = document.createElement('li');
            listItem.classList.add('ranking-record');
            listItem.classList.add(lower_name);
            ranking.appendChild(listItem);

            if(licznik%2==0){
              listItem.classList.add("white-ranking");
            }
            licznik++;


            function createDiv(listItem, DATA, CLASS) {
              const DIV = document.createElement('div');
              DIV.textContent = DATA;
              DIV.classList.add(CLASS);
              if(CLASS === 'ranking-name'){
                DIV.classList.add('ranking-link')
              }
              if(DATA === '-'){
                DIV.setAttribute('title', 'BRAK DANYCH')
                DIV.style.cursor='help'
              }
              console.log(DATA)
              if(licznik === 1 && CLASS === 'ranking-position'){
                DIV.style.fontSize='xxx-large'
                DIV.style.color="gold"
              }
              if(licznik === 2 && CLASS === 'ranking-position'){
                DIV.style.fontSize='xxx-large'
                DIV.style.color="#656363"
              }
              if(licznik === 3 && CLASS === 'ranking-position'){
                DIV.style.fontSize='xxx-large'
                DIV.style.color="rgb(162, 101, 40)"
              }
              listItem.appendChild(DIV);
              return 0;}
              
              createDiv(listItem, id, 'ranking-position');
              createDiv(listItem, player, 'ranking-name');
              createDiv(listItem, rating, 'ranking-elo');
              createDiv(listItem, wins, 'ranking-win');
              createDiv(listItem, draws, 'ranking-draw');
              createDiv(listItem, losts, 'ranking-lost');
              createDiv(listItem, last_wrp, 'ranking-last-wrp');
              createDiv(listItem, last_elo_change, 'ranking-last-elo-change');
            
          } 

        }
    }
    link();
    })
    .catch(error => console.error(error));