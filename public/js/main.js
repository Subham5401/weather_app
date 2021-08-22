const cityName = document.getElementById('cityName');  //city name
const submitbtn = document.getElementById('submitbtn');
const city_name = document.getElementById('result'); //result
const temp_status = document.getElementById('temp_status');
const temp_status_value = document.getElementById('temp_status_value');
const datahide = document.getElementById('temp');  //Hide the default data

const getInfo = async(event) => {
    event.preventDefault();     //this prevents the whole page to load again after submitting the form 
    let cityValue = cityName.value; 

    if(cityValue === ""){
        city_name.innerText = 'Search box cannot be empty!';
        datahide.style.display = "none";
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=baf68243cb4d100eeeae6ff99a6f76c1`;  //API , error= I didn't add https
            const response = await fetch(url);

            const data = await response.json();  //converts json to js
            const arrData = [data]; //converts data into an array

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;  //stores name of city and country
            temp_status_value.innerText = arrData[0].main.temp;      //stores temperature
            
            //condition to check sunny or cloudy
            const tempmood = arrData[0].weather[0].main;

            if(tempmood === "Clear"){
                temp_status.innerHTML =
                    "<i class= 'fas fa=sun' style='color: #eccc68;'></i>";
            }else if(tempmood === "Clouds"){
                temp_status.innerHTML =
                    "<i class= 'fas fa=cloud' style='color: #f1f2f6;'></i>";
            }else if(tempmood === "Rain"){
                temp_status.innerHTML =
                    "<i class= 'fas fa=cloud-rain' style='color: #a4b0be;'></i>";
            }else{
                temp_status.innerHTML =
                    "<i class= 'fas fa=sub' style='color: #f1f2f6;'></i>";
            }
            datahide.style.display = "block";
            // condition to check sunny or cloudy
            }
        catch{
                 city_name.innerText = `Please enter a valid city's name.`;
                 datahide.style.display = "none";
        }
     }
}

submitbtn.addEventListener('click',  getInfo);

