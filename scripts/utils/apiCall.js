let data;

/* Gets all photographers */
async function getPhotographers() {
    if(data) {
        console.log("Je n'ai pas appelé l'API");
        console.log(data);
        return data;
    } else {
        try {

            /* API call from Github Pages */
            let response = await fetch("https://chloeadriancreates.github.io/ChloeAdrian_6_14012022/data/photographers.json", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "https://chloeadriancreates.github.io/ChloeAdrian_6_14012022",
                }
            });
    
            /* Local API call */
            // let response = await fetch("data/photographers.json");
    
            data = await response.json();
            console.log("J'ai appelé l'API");
            console.log(data);
            return await data;
        } catch(error) {
            console.log(error);
        }
    }
}