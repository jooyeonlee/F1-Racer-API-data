class Driver {
    constructor(data) {
        this.position = data.position;
        this.givenName = data.Driver.givenName;
        this.familyName = data.Driver.familyName;
        this.nationality = data.Driver.nationality;
        this.sponsor = data.Constructors[0].constructorId
        this.points = data.points
    }
}

const form = document.querySelector('#f1dataform')
console.log(form)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let season = event.path[0][0].value;
    let round = event.path[0][1].value;

    console.log(event)
    console.log(season, round)

    requestData(season, round);
})

const requestData = async (season, round) => {
    try {
        let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`);
        console.log(response.status);
        console.log(response.data);

        //Position, Name, Nationality, Sponsor, Points
        //position, givenName, familyName, nationality, points
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].position);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.familyName);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.nationality);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].points);
        console.log(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0].constructorId)
        
        clearTable();

        driverData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings

        for (let i=0; i < driverData.length; i++) {
            let driver = new Driver(driverData[i]);
            console.log(driverData[i]);
            createRow(driver);
        }
    } catch (err) {
        window.alert("Invalid Input. Please enter valid range of season(1950-2021) and round")
    }
}

function createRow(data){
    var tablebody = document.getElementById("resultdata").getElementsByTagName('tbody')[0];
    var row = tablebody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = `${data.position}`;
    cell2.innerHTML = `${data.givenName} ${data.familyName}`;
    cell3.innerHTML = `${data.nationality}`;
    cell4.innerHTML = `${data.sponsor}`;
    cell5.innerHTML = `${data.points}`;
}

function clearTable() {
    var tbody = document.getElementById("resultdata").getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";
}