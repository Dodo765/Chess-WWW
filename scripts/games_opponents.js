import { workbook } from "./playerlist.js";
import { aktualnyUser } from "./current_preset.js";
export {last_games_table}



function last_games_table(){

    function createDiv(listItem, DATA, CLASS) {
        const DIV = document.createElement('div');
        DIV.textContent = DATA;
        DIV.classList.add(CLASS);
        if(listItem !== ''){
            listItem.appendChild(DIV);
        }
        if(DATA === '-'){
            DIV.setAttribute('title', 'Runda pauzy / brak przeciwnika')
            DIV.style.cursor='help'
        }
        return 0
    }

    let licznik=0;
    fetch('dane/ranking.xlsx') // Ścieżka do pliku Excela
        .then(response => response.arrayBuffer())
        .then(data => {
            const sheetName = aktualnyUser; // Nazwa arkusza z danymi
            const sheet = workbook.Sheets[sheetName];
    
            // Przygotuj zakres komórek, który chcesz pobrać
            const range = 'A28:H200';
            const player_range = 'J3:L200'
    
            // Pobierz dane z zakresu
            const dataFromRange = XLSX.utils.sheet_to_json(sheet, { header: 1, range});
            const dataFromPlayerRange = XLSX.utils.sheet_to_json(sheet, { header: 1, player_range});

            let ilosc_elementow = 0;
            for(let i = 0; i< dataFromRange.length; i++){
                if(dataFromRange[i].length !== 0){
                    ilosc_elementow++
                }
            }
            ilosc_elementow--
            //console.log(ilosc_elementow)

            const last_games_list = document.getElementById('last_games-table');

            last_games_list.innerHTML = '<li class="games_record_label games_record"><div class="games-no">NO</div><div class="games-opponent">Imie i nazwisko</div><div class="games-opponent-rating">ELO Przeciwnika</div><div class="games-outcome">Wynik</div><div class="games-player-rating">ELO Gracza</div><div class="games-rating-change">Zmiana ELO</div></li>'


            for (const row of dataFromRange) {
                if(row.length !== 0){
                    let opponent = row[3]
                    if(opponent === '.'){
                        opponent = '-'
                    }
                    const date = row[0]
                    let opp_rating = ''
                    if(row[4] !== undefined && row[4] !== '-  '){
                        opp_rating = row[4].toFixed(0);
                    }
                    let outcome=''
                    if(row[5]=== 'won'){
                        outcome = 'Wygrana'
                    }
                    if(row[5]=== 'lost'){
                        outcome = 'Przegrana'
                    }
                    if(row[5]=== 'draw'){
                        outcome = 'Remis'
                    }
                    let pl_rating = ''
                    if(row[6] !== undefined && row[6] !== '-  '){
                        pl_rating = row[6].toFixed(0)
                    }
                    let elo_change = ''
                    if(row[7]>0){
                        elo_change = '+' + row[7]
                    } else {
                        elo_change = row[7]
                    }
                    let listItem =''
                    if(date !== '' && date !=='<initial rating>'){
                        listItem = document.createElement('li');
                        listItem.classList.add('games_record');
                        last_games_list.appendChild(listItem);
                    }
        
                    licznik++;
                    
                    
                    
                    createDiv(listItem, ilosc_elementow, 'games-no')
                    ilosc_elementow--
                    createDiv(listItem, opponent, 'games-opponent')
                    createDiv(listItem, opp_rating, 'games-opponent-rating')
                    createDiv(listItem, outcome, 'games-outcome')
                    createDiv(listItem, pl_rating, 'games-player-rating')
                    createDiv(listItem, elo_change, 'games-rating-change')
                }
            }
            
            const last_opponent_table = document.querySelector('.last_opponents_table')
            last_opponent_table.innerHTML = '<li class="opponents_record opponents_record_label" id="opponents-record"> <div class="opponents-name"> Nazwisko i imię </div> <div class="opponents-rating"> ELO </div> <div class="opponents-win"> Wygrane </div> <div class="opponents-draw"> Remisy </div> <div class="opponents-lost"> Przegrane </div>'
            for(const row of dataFromPlayerRange){
                if(row[10] !== ''&& row[10] !== undefined && row[10] !== 'Rating' && row[10] !== 'Total'){
                    let opponent = row[9]
                    if(opponent === '.'){
                        opponent = '-' 
                    }
                    let opponent_rating = ''
                    if(row[10] !== '' && row[10] !== undefined){
                        opponent_rating = row[10].toFixed(0)
                    }
                    const wdl = row[11]
                    // console.log(opponent)
                    // console.log(opponent_rating)
                    // console.log(wdl)
                    let win, draw, lost = undefined
                    if(wdl !== undefined && wdl !== ''){
                        win = wdl[0]
                        draw = wdl[2]
                        lost = wdl[4]
                    }

                    if(win !== undefined){
                        const listItem = document.createElement('li');
                        listItem.classList.add('opponents_record');
                        last_opponent_table.appendChild(listItem);
                        
                        createDiv(listItem, opponent, 'opponents-name')
                        createDiv(listItem, opponent_rating, 'opponents-rating')
                        createDiv(listItem, win, 'opponents-win')
                        createDiv(listItem, draw, 'opponents-draw')
                        createDiv(listItem, lost, 'opponents-lost')
                    }
                }
            }
        })
        .catch(error => console.error(error));
}