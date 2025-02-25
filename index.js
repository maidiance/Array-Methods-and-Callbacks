const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const finals2014 = fifaData.filter(function(item){
    return item.Stage === 'Final' && item.Year === 2014;
});
console.log('task 1a', finals2014[0]['Home Team Name']);

//(b) Away Team name for 2014 world cup final
console.log('task 1b', finals2014[0]['Away Team Name']);

//(c) Home Team goals for 2014 world cup final
console.log('task 1c', finals2014[0]['Home Team Goals']);

//(d) Away Team goals for 2014 world cup final
console.log('task 1d', finals2014[0]['Away Team Goals']);

//(e) Winner of 2014 world cup final */
console.log('task 1e', finals2014[0]['Win conditions']);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   // filter with Stage === 'Final'
   const finals = data.filter(function(item){
        return item.Stage === 'Final';
   });
   return finals;
}
// console.log(getFinals(fifaData));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array, getFinalsCb) {
    // map
    const finals = getFinalsCb(array);
    const years = finals.map(function(item){
        return item.Year;
    });
    return years;
}
// console.log(getYears(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(array, getFinalsCb) {
    // Check if home team goals > away team goals
    const finals = getFinalsCb(array);
    const winners = finals.map(function(item){
        if(item['Home Team Goals'] > item['Away Team Goals']){
            return item['Home Team Name'];
        } else {
            return item['Away Team Name'];
        }
    });
    return winners;
}
// console.log(getWinners(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinalsCb, getYearsCb, getWinnersCb) {
    // map over one array and grab each item use index of other array
    const winners = getWinnersCb(array, getFinalsCb);
    const years = getYearsCb(array, getFinalsCb);
    const winnersByYear = winners.map(function(item, index){
        return `In ${years[index]}, ${item} won the world cup!`;
    });
    return winnersByYear;
}
// console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalsCb) {
   // add up all goals with .reduce
   // then divide by the length of array
   // round to two decimal places (with toFixed())
   const totalGoals = getFinalsCb.reduce(function(acc, item){
        return acc + item['Home Team Goals'] + item['Away Team Goals'];
   }, 0);
   const averageGoals = (totalGoals / getFinalsCb.length).toFixed(2);
   return averageGoals;
}
// console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    /* code here */
    // filter to ones that made it to the Finals
    const worldCup = data.filter(item => item.Stage === 'Final');
    const filteredData = worldCup.filter(item => item["Home Team Initials"] === teamInitials|| item["Away Team Initials"] === teamInitials);
    const cupWins = filteredData.reduce(function(acc, item){
        if(item["Home Team Initials"] === teamInitials){
            // count home wins
            if (item["Home Team Goals"] > item["Away Team Goals"]){
                acc++;
            }
            // count away wins
        } else if(item["Away Team Initials"] === teamInitials){
            if (item["Away Team Goals"] > item["Home Team Goals"]){
                acc++;
            }
        }
        return acc;
    }, 0);
    return cupWins;
}
//console.log('stretch goal 1:', getCountryWins(fifaData, "FRA"));


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {
    // make an array of goals
    const teamGoals = {};
    // initialize the array
    data.map(item => teamGoals[item['Home Team Name']] = 0);
    // with map add up goals
    data.map(function(item){
        teamGoals[item['Home Team Name']] = teamGoals[item["Home Team Name"]] + item["Home Team Goals"];
    });
    // number of appearances
    const numAppearances = {};
    data.map(item => numAppearances[item['Home Team Name'] + ' Games'] = 0);
    data.map(item => numAppearances[item['Home Team Name'] + ' Games'] += 1);
    // calculate averages
    const avgGoals = data.map(function(item){
        let numGoals = teamGoals[item["Home Team Name"]];
        let numGames = numAppearances[item["Home Team Name"] + " Games"];
        return {
            Name: `${item['Home Team Name']}`,
            AvgGoals: (numGoals / numGames).toFixed(2),
        };
    });
    // find the team with most avg goals
    const highestAvg = avgGoals.reduce(function(prev, current){
        return (prev.AvgGoals > current.AvgGoals) ? prev : current;
    }, 0);
    return highestAvg.Name;
}
//console.log(getGoals(fifaData));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {
    /* code here */
    // make an array of goals scored against
    // find the team with the most goals scored against
}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
