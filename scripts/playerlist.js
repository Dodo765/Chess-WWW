export var workbook;

async function main(){
  const nameList = document.getElementById('nameList');

  fetch('dane/ranking.xlsx') // Ścieżka do pliku Excela
      .then(response => response.arrayBuffer())
      .then(data => {
        workbook = XLSX.read(data, { type: 'array' });
        
        const sheetName = 'Ratings by Player'; // Nazwa arkusza z danymi
        const sheet = workbook.Sheets[sheetName];

        // Przygotuj zakres komórek, który chcesz pobrać
        const range = 'A3:A144';
        // Pobierz dane z zakresu
        const dataFromRange = XLSX.utils.sheet_to_json(sheet, { header: 1, range });

        // Wyświetl dane w formie listy w HTML
        const nameList = document.getElementById('nameList');
        //nameList.innerHTML = ''; // Wyczyść listę, jeśli już coś jest na niej
        async function create_li(){
          for (const row of dataFromRange) {
            const name = row[0]; // Zakładamy, że nazwisko znajduje się w pierwszej kolumnie (indeks 0)
            
            // Sprawdź, czy dane w komórce są niepuste, zanim dodasz je do listy
            if(name !== '' && name !== undefined){
              if (name.trim() !== '') {
                const listItem = document.createElement('li');
                listItem.classList.add('nazwiska');
                listItem.classList.add('element_listy');
                listItem.textContent = name;
                listItem.setAttribute('id', name);
                nameList.appendChild(listItem);
              }
            }       
          }
        }
        create_li();

        let nazwiska = document.querySelectorAll('.nazwiska');
        const input = document.querySelector('#search_main');
        const brakWynikow = document.getElementById('brakWynikow');

        input.addEventListener("input", function() {
          const inputtext = input.value.toLowerCase();
          let znaleziono = false;

          nazwiska.forEach(element => {
            const tekstElementu = element.textContent.toLowerCase();
      
            if (tekstElementu.includes(inputtext)) {
              element.style.display = 'block';
              znaleziono = true;
            } else {
              element.style.display = 'none';
            }
          });
          if (znaleziono) {
            brakWynikow.style.display = 'none';
          } else {
            brakWynikow.style.display = 'block';
          }
        })
      })

      .catch(error => console.error(error));
}
main();