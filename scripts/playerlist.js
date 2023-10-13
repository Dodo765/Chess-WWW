export var workbook;


async function main(){
  const nameList = document.getElementById('nameList');

  fetch('dane/workbook')
      .then(response => response.arrayBuffer())
      .then(data => {

        // workbook = XLSX.read(data, { type: 'array' }); ////zajmuje długo
        // XLSX.writeFile(workbook, "workbook");//

        workbook = XLSX.readFile(data, { type: 'buffer' }) //poprawione

        document.querySelector(".loader").classList.add("loader-hiden");
        const sheetName = 'Ratings by Player';
        const sheet = workbook.Sheets[sheetName];

        
        const range = 'A3:A144';
        const dataFromRange = XLSX.utils.sheet_to_json(sheet, { header: 1, range });
        const nameList = document.getElementById('nameList');
        async function create_li(){
          for (const row of dataFromRange) {
            const name = row[0]; 
            
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