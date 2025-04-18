addLayer("b", {
    name: "Baby Talon Link", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff00ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Baby Talon Links", // Name of prestige currency
    baseResource: " T.M. points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('b', 14)) 
            mult = mult.times(upgradeEffect('b', 14))
        if (hasUpgrade('b', 21)) 
            mult = mult.times(2)
        if (hasUpgrade('b', 23)) 
            mult = mult.times(1.5)
        if (hasMilestone('b', 2)) 
            mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for Baby Talon Links", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "The Start",
            description: "Double T.M. Point gain.",
            cost: new Decimal(1)
    },
        12: {
            title: "Baby Talon Links are Kirbys",
            description: "Boost T.M. Points based on Baby Talon Links.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
        },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            } // Add formatting to the effect
    },
        13: {
            title: "Baby Talon Links say E",
            description: "1.5x T.M. Point gain.",
            cost: new Decimal(7)
    },
        14: {
            title: "Baby Talon Links are pets",
            description: "Boost Baby Talon Link gain based on T.M. Points.",
            cost: new Decimal(12),
            effect() {
                return player.points.add(1).pow(0.15)
        },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x" 
            } // Add formatting to the effect
    },
        21: {
            title: "Baby Talon Links like to play",
            description: "Double Baby Talon Link gain.",
            cost: new Decimal(30)
    },
        22: {
            title: "Baby Talon Links are smart",
            description: "Unlock a milestone.",
            cost: new Decimal(69)
    },
        23: {
            title: "Baby Talon Links can have babies",
            description: "1.5x Baby Talon Link gain.",
            cost: new Decimal(350)
    },
        24: {
            title: "Baby Talon Links love animals",
            description: "1.5x T.M. point gain again.",
            cost: new Decimal(875)
    },
        31: {
            title: "Baby Talon Links can be different types",
            description: "Get 1/2 to unlocking BTL Types.",
            cost: new Decimal(1475)
    },
        32: {
            title: "Baby Talon Links are smart 2",
            description: "Unlock another milestone.",
            cost: new Decimal(2025)
    },
        33: {
            title: "Baby Talon Links can transform...",
            description: "*effect might be implemented in a later update*",
            cost: new Decimal(4550)
    },
        34: {
            title: "...into Talon Links!",
            description: "Unlock a new layer.",
            cost: new Decimal(6000)
    }
},
milestones: {
    1: {
        requirementDescription: "Baby Talon Links can read: 200 Baby Talon Links",
        effectDescription: "Double T.M. point gain again.",
        done() { 
            return player.b.points.gte(200) 
        },
        unlocked() { 
            if (!hasUpgrade('b', 22))
                return false 
        }
    },
    2: {
        requirementDescription: "Baby Talon Links can speak: 3020 Baby Talon Links",
        effectDescription: "Double Baby Talon Link gain again.",
        done() { 
            return player.b.points.gte(3020) 
        },
        unlocked() { 
            if (!hasUpgrade('b', 32))
                return false 
        }
    }
}
})
