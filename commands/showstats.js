const Discord = require("discord.js");
//const Stats = require("Stats.js");

module.exports.run = async (bot, message, args) => {
   message.channel.send("Testing to get some battlemage values");


  //***Localized stats.js here to test functinality***

   // Struct Factory
function makeStruct(names) {
  var names = names.split(' ');
  var count = names.length;
  function constructor() {
    for (var i = 0; i < count; i++) {
      this[names[i]] = arguments[i];
    }
  }
  return constructor;
}

//Stats Class
class Stats {
	//Initalize Level and Quest Stat Points
	initializeUnitStats(){
		this.level = 70
		this.quest_stat_points = 30
	}

	//Set Class Scaling based on class
	initializeClassScalingStats(className){
		if (className == "BattleMage"){
			this.strengthScaling = 3.5
			this.intelligenceScaling = 3.5
			this.vitalityScaling = 2.5
			this.spiritScaling = 2.5
		}
	}

	//Set Armor Stats
	initializeArmourStats(physicalArmor,magicArmor,strengthArmorBonus,intelligenceArmorBonus,vitalityArmorBonus,spiritArmorBonus){
		this.physicalArmor = physicalArmor
		this.magicArmor = magicArmor
		this.strengthArmorBonus = strengthArmorBonus
		this.intelligenceArmorBonus = intelligenceArmorBonus
		this.vitalityArmorBonus = vitalityArmorBonus
		this.spiritArmorBonus = spiritArmorBonus
	}

	//Set Weapon Stats
	initializeWeaponStats(physicalDamage,magicDamage,strengthWeaponBonus,intelligenceWeaponBonus,vitalityWeaponBonus,spiritWeaponBonus){
		this.physicalDamage = physicalDamage
		this.magicDamage = magicDamage
		this.strengthWeaponBonus = strengthWeaponBonus
		this.intelligenceWeaponBonus = intelligenceWeaponBonus
		this.vitalityWeaponBonus = vitalityWeaponBonus
		this.spiritWeaponBonus = spiritWeaponBonus
	}

	//Calculate Attribute Stats based on level, quest stat points, armour bonus, weapon bonus, and class scaling
	calculateAttributeStats(){
		this.strength = (this.level + this.quest_stat_points + this.strengthArmorBonus + this.strengthWeaponBonus) * this.strengthScaling
		this.intelligence = (this.level + this.quest_stat_points + this.intelligenceArmorBonus + this.intelligenceWeaponBonus) * this.intelligenceScaling
		this.vitality = (this.level + this.quest_stat_points + this.vitalityArmorBonus + this.vitalityWeaponBonus) * this.vitalityScaling
		this.spirit = (this.level + this.quest_stat_points + this.spiritArmorBonus + this.spiritWeaponBonus) * this.spiritScaling
	}

	//Calculate HP, MP, and Stamina based on level and attributes
	calculateResourceStats(){
		this.maxHP = 100 * this.level + 5 * this.vitality
		this.maxMP = 50 * this.level + 5 * this.intelligence
		this.maxStamina = 50 * this.level + 5 * this.vitality
	}

	//Calculate the Defense Stats based on attributes and armour stats
	calculateDefenseStats(){
		this.physicalDefense = this.strength + this.physicalArmor
		this.magicDefense = this.intelligence + this.magicArmor
	}

	//Calculate Resistance Stats based on physical defense and the level of the attacker
	calculateResistanceStats(attacker){
		this.physicalDamageReduction = this.physicalDefense / (this.physicalDefense + attacker.level*150)
		this.magicDamageReduction = this.magicDefense / (this.magicDefense + attacker.level*150)
	}

	// Calculate Attack Stats based on weapon damages, attribute stats, and skill scaling TODO: Need to create Skill Enum
	calculateAttackStats(skill){
		this.physicalAttack = this.physicalDamage * (1 + this.strength/175) * skill.physicalScaling
		this.magicAttack = this.magicDamage * (1 + this.intelligence/175) * skill.magicScaling
	}

	// Calculated the Damage that you would do TODO: target needs to be another instance of Stats
	calculateDamage(target){
		this.physicalDamage = this.physicalAttack * (1-target.physicalDamageReduction)
		this.magicDamage = this.magicAttack * (1-target.magicDamageReduction)
	}

	//initializes all stats that don't require skill or another player info
	initializeLevel70BattleMage(){
		this.initializeUnitStats()
		this.initializeClassScalingStats("BattleMage")
		this.initializeArmourStats(30,100,100,100,100,100)
		this.initializeWeaponStats(30,100,100,100,100,100)
		this.calculateAttributeStats()
		this.calculateResourceStats()
		this.fillResourceStats()
	}

	//Deals damage to target TODO: target needs to a be another instance of Stats
	dealDamage(target){
		target.currentHP = target.currentHP - (this.physicalDamage = this.magicDamage)
	}

	//refills HP, MP, and Stamina
	fillResourceStats(){
		this.HP = this.maxHP
		this.MP = this.maxMP
		this.Stamina = this.maxStamina
	}
}

  //***End of Localized stats.js here to test functinality***


    //display stats
    var player1Stats = new Stats()
    player1Stats.initializeLevel70BattleMage()
    var propValue;
    for(var propName in player1Stats) {
        propValue = player1Stats[propName]

        console.log(propName,propValue);
        message.channel.send(`${propName}: ${propValue}`);
    }
}

  module.exports.help = {
    name: "showstats"
  }
