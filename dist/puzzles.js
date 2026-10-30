const chains = [
 ['Sun','Flower','Bed','Room','Service','Station','Wagon'],
 ['Rain','Coat','Pocket','Watch','Dog','House','Boat'],
 ['Book','Club','Sandwich','Board','Game','Show','Business'],
 ['Snow','Ball','Room','Key','Chain','Reaction','Time'],
 ['Coffee','Table','Cloth','Mouse','Trap','Door','Bell'],
 ['Sea','Shell','Fish','Tank','Top','Hat','Trick'],
 ['Fire','Place','Mat','Board','Walk','Way','Side']
];
const phrases = [
 ['sunflower','flower bed','bedroom','room service','service station','station wagon'],
 ['raincoat','coat pocket','pocket watch','watchdog','doghouse','houseboat'],
 ['book club','club sandwich','sandwich board','board game','game show','show business'],
 ['snowball','ballroom','room key','keychain','chain reaction','reaction time'],
 ['coffee table','tablecloth','cloth mouse','mousetrap','trapdoor','doorbell'],
 ['seashell','shellfish','fish tank','tank top','top hat','hat trick'],
 ['fireplace','place mat','mat board','boardwalk','walkway','wayside']
];
// Replace less familiar links with everyday phrases before release.
chains[4] = ['Coffee','Table','Top','Hat','Trick','Question','Mark'];
phrases[4] = ['coffee table','tabletop','top hat','hat trick','trick question','question mark'];
chains[6] = ['Light','House','Boat','Race','Track','Suit','Case'];
phrases[6] = ['lighthouse','houseboat','boat race','racetrack','tracksuit','suitcase'];
export const puzzles = chains.map((words,i)=>({id:i+1,date:new Date(Date.UTC(2026,9,29+i)).toISOString().slice(0,10),words,phrases:phrases[i],alternatives:[],review:'reviewed'}));

// Historical starter puzzles allow testing the archive immediately.
puzzles.push(
 {id:101,date:'2026-10-28',words:['Water','Fall','Out','Side','Walk','Way','Point'],phrases:['waterfall','fallout','outside','sidewalk','walkway','waypoint'],alternatives:[],review:'reviewed'},
 {id:102,date:'2026-10-27',words:['Foot','Ball','Game','Show','Case','Study','Group'],phrases:['football','ball game','game show','showcase','case study','study group'],alternatives:[],review:'reviewed'},
 {id:103,date:'2026-10-26',words:['Door','Bell','Tower','Block','Party','Time','Table'],phrases:['doorbell','bell tower','tower block','block party','party time','timetable'],alternatives:[],review:'reviewed'}
);
