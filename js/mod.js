let modInfo = {
	name: "The T.M. Tree",
	author: "Talonmom-100",
	pointsName: "T.M. points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "Beginnings",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added Baby Talon Links, the first layer.`

let winText = `You have now beaten the game. Thanks for playing!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
    
	let gain = new Decimal(1)
	if (hasUpgrade('b', 11)) 
		gain = gain.times(2)
	if (hasUpgrade('b', 12)) 
		gain = gain.times(upgradeEffect('b', 12))
	if (hasUpgrade('b', 13)) 
		gain = gain.times(1.5)
	if (hasMilestone('b', 1)) 
		gain = gain.times(2)
	if (hasUpgrade('b', 24)) 
		gain = gain.times(1.5)
	if (hasUpgrade('t', 11)) 
		gain = gain.times(2.5)
	if (hasUpgrade('t', 12)) 
		gain = gain.times(upgradeEffect('t', 12))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("100000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}