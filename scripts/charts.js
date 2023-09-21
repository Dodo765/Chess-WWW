import { workbook } from "./playerlist.js";
import { aktualnyUser } from "./current_preset.js";
export {wykresfun};

function wykresfun(){
        //let ranking = document.getElementById('ranking');
    if (ranking) {
    } else {
    console.error("Element ranking nie został znaleziony.");
    }

    if (window.myChart !== undefined) {
        window.myChart.destroy();
    }



    fetch('dane/ranking.xlsx') // Ścieżka do pliku Excela
        .then(response => response.arrayBuffer())
        .then(exceldata => {
        //const workbook = XLSX.read(exceldata, { type: 'array' });
        const sheetName = aktualnyUser; // Nazwa arkusza z danymi
        const sheet = workbook.Sheets[sheetName];

        // Przygotuj zakres komórek, który chcesz pobrać
        const range_date = 'A28:A100';
        const range_ranking = 'G28:G100';

        // Pobierz dane z zakresu
        const dataFromRange_date = XLSX.utils.sheet_to_json(sheet, { header: 1, range: range_date });
        const dataFromRange_ranking = XLSX.utils.sheet_to_json(sheet, { header: 1, range: range_ranking });
        
        //ranking.innerHTML = ''; // Wyczyść listę, jeśli już coś jest na niej

        
            
            // Przygotuj tablice jednowymiarowe dla każdego zakresu
            const datesArray = dataFromRange_date.map(row => row[0]);
            const rankingArray = dataFromRange_ranking.map(row => row[0]);

            
            // Usuń puste komórki (undefined) i komórkę z treścią "initial ranking"
            let cleanedDatesArray = datesArray.filter(date => date !== undefined && date !== '<initial rating>');
            let cleanedrankingArray = rankingArray.filter(date => date !== undefined);

            for (let i = 0; i < cleanedrankingArray.length; i++) {
                cleanedrankingArray[i] = Math.round(cleanedrankingArray[i]);
            }
            
            //skopiowanie daty początkowej

            cleanedDatesArray[cleanedrankingArray.length-1] = cleanedDatesArray[cleanedrankingArray.length-2];

            cleanedDatesArray.reverse();
            cleanedrankingArray.reverse();

            
            //tworzenie wykresu

            // Przygotuj etykiety (daty i godziny) na osi X
            const labels = cleanedDatesArray.map(date => {

                // Przekształć liczby na daty i godziny
                const luxonDate = luxon.DateTime.fromJSDate(new Date((date - 25569) * 86400 * 1000));
                return luxonDate.setLocale('pl').toFormat('LLL d, yyyy HH:mm');

            });

            // Przygotuj dane na osi Y (punkty rankingowe)
            const data = {
                labels: labels,
                datasets: [{
                    label: 'punkty ELO',
                    data: cleanedrankingArray,
                    borderColor: 'blue',
                    fill: true,
                    pointHitRadius: '1'
                }]
            };

            
            // Konfiguracja wykresu
            const config = {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Data i Godzina'
                            },
                            ticks: {
                                color: 'white'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Punkty Rankingowe'
                            },
                            ticks: {
                                color: 'white'
                            }
                        }
                    },
                    animations: {
                        tension: {
                            duration:100,
                            easing: 'linear',
                            from: 0.1,
                            to: 0.4
                        }
                    }
                }
            };

            


            // Utwórz i wyświetl wykres
            

        

            const ctx = document.getElementById('eloChart'); // Zmień na odpowiednią wartość id elementu canvas
            const myChart = new Chart(ctx, config);
            window.myChart = myChart;
    
        })
    .catch(error => console.error(error));
}

// //let ranking = document.getElementById('ranking');
// if (ranking) {
// } else {
//   console.error("Element ranking nie został znaleziony.");
// }


// fetch('dane/ranking.xlsx') // Ścieżka do pliku Excela
//     .then(response => response.arrayBuffer())
//     .then(exceldata => {
//       const workbook = XLSX.read(exceldata, { type: 'array' });
//       const sheetName = aktualnyUser; // Nazwa arkusza z danymi
//       console.log(aktualnyUser);
//       const sheet = workbook.Sheets[sheetName];

//       // Przygotuj zakres komórek, który chcesz pobrać
//       const range_date = 'A28:A100';
//       const range_ranking = 'G28:G100';

//       // Pobierz dane z zakresu
//       const dataFromRange_date = XLSX.utils.sheet_to_json(sheet, { header: 1, range: range_date });
//       const dataFromRange_ranking = XLSX.utils.sheet_to_json(sheet, { header: 1, range: range_ranking });
     
//       //ranking.innerHTML = ''; // Wyczyść listę, jeśli już coś jest na niej

      
        
//         // Przygotuj tablice jednowymiarowe dla każdego zakresu
//         const datesArray = dataFromRange_date.map(row => row[0]);
//         const rankingArray = dataFromRange_ranking.map(row => row[0]);

        
//         // Usuń puste komórki (undefined) i komórkę z treścią "initial ranking"
//         let cleanedDatesArray = datesArray.filter(date => date !== undefined && date !== '<initial rating>');
//         let cleanedrankingArray = rankingArray.filter(date => date !== undefined);

//         for (let i = 0; i < cleanedrankingArray.length; i++) {
//             cleanedrankingArray[i] = Math.round(cleanedrankingArray[i]);
//         }
        
//         //skopiowanie daty początkowej

//         cleanedDatesArray[cleanedrankingArray.length-1] = cleanedDatesArray[cleanedrankingArray.length-2];

//         cleanedDatesArray.reverse();
//         cleanedrankingArray.reverse();

        
//         //tworzenie wykresu

//         // Przygotuj etykiety (daty i godziny) na osi X
//         const labels = cleanedDatesArray.map(date => {

//             // Przekształć liczby na daty i godziny
//             const luxonDate = luxon.DateTime.fromJSDate(new Date((date - 25569) * 86400 * 1000));
//             return luxonDate.setLocale('pl').toFormat('LLL d, yyyy HH:mm');

//         });

//         // Przygotuj dane na osi Y (punkty rankingowe)
//         const data = {
//             labels: labels,
//             datasets: [{
//                 label: 'punkty ELO',
//                 data: cleanedrankingArray,
//                 borderColor: 'blue',
//                 fill: true,
//                 pointHitRadius: '1'
//             }]
//         };

        
//         // Konfiguracja wykresu
//         const config = {
//             type: 'line',
//             data: data,
//             options: {
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Data i Godzina'
//                         }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: 'Punkty Rankingowe'
//                         }
//                     }
//                 },
//                 animations: {
//                     tension: {
//                         duration:100,
//                         easing: 'linear',
//                         from: 0.1,
//                         to: 0.4
//                     }
//                 }
//             }
//         };

//         // Utwórz i wyświetl wykres
//         const ctx = document.getElementById('eloChart'); // Zmień na odpowiednią wartość id elementu canvas
//         const myChart = new Chart(ctx, config);
            
//     })
//     .catch(error => console.error(error));