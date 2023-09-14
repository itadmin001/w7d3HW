
const yearInput = document.getElementById('year-input')
const roundInput = document.getElementById('round-input')

const getData = async () =>{
    let year = yearInput.value
    let round = roundInput.value
    let response = await axios.get(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`)
    return response.data
}

const displayArea = 'tbody.stats'


const generateStats = (position,points,wins,firstName,lastName,nation,sponsor,driverData) =>{
    const html = `  <tr>
                        <td>${position}</td>
                        <td>${firstName} ${lastName}</td>
                        <td>${sponsor}</td>
                        <td>${nation}</td>
                        <td>${points}</td>
                        <td>${wins}</td>
                        <td><button class="btn btn-secondary" onclick="window.open('${driverData}');">Driver Info</button></td>
                    </tr>`
                            

    document.querySelector(displayArea).insertAdjacentHTML('beforeend',html)

}



const loadData = async () => {
    const drivers = await getData()
    
    drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(element => generateStats(element.position,element.points,element.wins,element.Driver.givenName,element.Driver.familyName,element.Driver.nationality,element.Constructors[0].name,element.Driver.url))
    
    }
    
const clearData = () =>{
    document.querySelector(displayArea).innerHTML = '';
    yearInput.value=''
    roundInput.value=''
}