const { count } = require('console');
const fetch = require('node-fetch'); //Package requried to use the fetch functionality

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}) //Package required to receive input and send output

const fetchData = fetch('https://mach-eight.uc.r.appspot.com/') //API Call, downloading raw data from MachEight URL

readline.question(`Please Provide Input Number: `, inp => {
        const input = Number(inp); //Converting input to a Number and removing whitespaces
        if(isNaN(input) || !input){ //Validation if a sting or null values are entered
            console.log('Please provide only integer value greater than 0 and try again');
            readline.close()
        }else if(!Number.isInteger(input)){
            console.log('Please provide only integer value without decimals');
            readline.close()
        }
        else{
            fetchData.then(response => { //This API return promises and using 'then' method to resolve them
                return response.json();
            })
            .then(jsondata => {
                const obj = jsondata.values;
                let count = 0;
                for(let i=0; i < obj.length - 1; i++){ //first for loop to count get the height value of a record to add with another record
                    for(let j= i + 1; j < obj.length; j++){ //secord loop to add the height to the outer loop value
                        let sumHeight = Number(obj[i].h_in) + Number(obj[j].h_in); //converting the object value to integer by using Number Constructor function
                        if(sumHeight === input){
                            //forming the output using backtics
                            console.log(`- ${obj[i].first_name} ${obj[i].last_name}       ${obj[j].first_name} ${obj[j].last_name}`);
                            count++;
                        }
                    }
                }
                if(count === 0){
                    console.log('No matches found for the given input'); //No matches found scenario
                }
            });
            readline.close() //Closing the readline
        }
    })



