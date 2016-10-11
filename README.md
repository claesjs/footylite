# footylite
Footy Lite is a little football (soccer) simulator that uses statistics from Premier League.

## Simulating a match
A match simulation is started from app.js. The command is simply ```node app```. It looks for the teams in ```home.json``` and ```away.json```.

## Team sheets
The team sheets are written in json:
```
{
    "name": "Por",
    "teamrating": 1896,
    "tactic": "N",
    "playhard": false,
    "orders": [
        
    ]
}
```
- **name**: The team's name
- **teamrating**: The team's rating, usually starts at 1000.
- **tactic**: Which tactic start the match.
- **playhard**: Y or N for playing hard. If plyaing hard the chance for a red card is increased at the same time as the opponent's scoring chance is decreased.
- **orders**: The team's orders for the match.

## Tactics
- **N - Normal**
- **D - Defensive**. Both team's scoring chances are decreased, extra effective against Longball.
- **A - Attacking**. Both team's scoring chances are increased.
- **C - Counter-Attack**. Both team's scoring chances are slightly decreased, extra effective against Attacking and Passing.
- **L - Longball**. Both team's scoring chances are slightly increased, extra effective against Counter-Attack.
- **P - Passing**. Extra effective against Longball.

## Orders
There are two orders that can be used during a match:
- **TACTIC**: Changes the team's tactic.
- **PLAYHARD**: Changes playing hard.

There are two conditions:
- **MIN**: Match minute.
- **SCORE**: Difference in score.

Examples:
```
TACTIC A IF SCORE <= 0, MIN > 45
```
Change tactic to Attacking if you are trailing by 1 or more goals and the match minute is larger than 45.

```
TACTIC D IF SCORE > 1
```
Change tactic to Defesive if you are leading by 2 or more goals.
