const Discord = require("discord.js");

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

// Unit Stats struct
var UnitStats = makeStruct("level questStatPoints")

// Class Scaling stats struct
var ClassScalingStats = makeStruct("strengthScaling intelligenceScaling vitalityScaling spiritScaling")

// Armor Stats struct
var ArmorStats = makeStruct("physicalArmor magicArmor strengthArmorBonus intelligenceArmorBonus vitalityArmorBonus spiritArmorBonus")

// Weapon Stats struct
var WeaponStats = makeStruct("physicalWeaponDamage magicWeaponDamage strengthWeaponBonus intelligenceWeaponBonus vitalityWeaponBonus spiritWeaponBonus")

// Attribute Stats struct
var AttributeStats = makeStruct("strength intelligence vitality spirit")

// Resource Stats struct
var ResourceStats = makeStruct("HP MP Stamina")

// Defense Stats struct
var DefenseStats = makeStruct("physicalDefense magicDefense")

// Resistance Stats struct (Damage Reduction  are in the form of percentages)
var ResistanceStats = makeStruct("physicalDamageReduction magicDamageReduction")

// Attack Stats struct
var AttackStats = makeStruct("physicalAttack magicAttack")

// Damage Stats struct
var DamageStats = makeStruct("physicalDamage magicDamage")

// Skill Damage Scaling struct
var DamageScaling = makeStruct("physicalScaling magicScaling")

// Buff Struct (Defense Buff Resistance Buff and Attack Buff are all in percentages)
var Buff = makeStruct("attributesBuff resourceBuff defenseBuff resistanceBuff attackBuff duration")

// Skill Struct
var Skill = makeStruct("name damageScaling buff castTime cooldownTime isClassSpecial")

// Battle Mage Skill Levels Struct
var BattleMageSkillLevels = makeStruct("skyStrikeLevel dragonToothLevel doubleStabLevel fallingFlowerPalmLevel circleSwingLevel")

// Battle Mage Cooldown Struct
var BattleMageCooldowns = makeStruct("skyStrikeCooldown dragonToothCooldown doubleStabCooldown fallingFlowerPalmCooldown circleSwingCooldown")

// Match Record Struct
var MatchRecord = makeStruct("elo wins losses")

// Base Damage Scaling
var baseDamageScaling = new DamageScaling(1,1)

// Empty Buffs
var emptyAttributesBuff = new AttributeStats(0,0,0,0)
var emptyResourceBuff = new ResourceStats(0,0,0)
var emptyDefenseBuff = new DefenseStats(0,0)
var emptyResistanceBuff = new ResistanceStats(0,0)
var emptyAttackBuff = new AttackStats(0,0)
var emptyBuff = new Buff(emptyAttributesBuff, emptyResourceBuff, emptyDefenseBuff, emptyResistanceBuff, emptyAttackBuff, 0)

// Basic Attack Skill Stats
var slashDamageScaling = new DamageScaling(1,0)
var stabDamageScaling = new DamageScaling(1,0)

// Sky Strike Skill Stats
var skyStrikeBaseLevelDamageScaling = new DamageScaling(0.66,0)
var skyStrikePerLevelDamageScaling = new DamageScaling(0.1,0)
var skyStrikeCastTime = 0
var skyStrikeCooldown = 4

//Light Chaser Skill Stats
var lightChaserBaseLevelDamageScaling = new DamageScaling(0,0.875)
var lightChaserPerLevelDamageScaling = new DamageScaling(0,0.0875)
var lightChaserDuration = 40

// Dragon Tooth Skill Stats
var dragonToothBaseLevelDamageScaling = new DamageScaling(0.64,0)
var dragonToothPerLevelDamageScaling = new DamageScaling(0.1,0)
var dragonToothCastTime = 0
var dragonToothCooldown = 4

//Neutral Chaser Skill Stats
var neutralChaserBaseLevelDamageScaling = new DamageScaling(0,0.85)
var neutralChaserPerLevelDamageScaling = new DamageScaling(0,0.085)
var neutralChaserDuration = 40

// Double Stab Skill Stats
var doubleStabBaseLevelDamageScaling = new DamageScaling(0.64,0)
var doubleStabPerLevelDamageScaling = new DamageScaling(0.18,0)
var doubleStabCastTime = 0
var doubleStabCooldown = 16

// Ice Chaser Skill Stats
var iceChaserBaseLevelDamageScaling = new DamageScaling(0,0.875)
var iceChaserPerLevelDamageScaling = new DamageScaling(0,0.0875)
var iceChaserDuration = 40
var iceChaserAttributeBaseLevelBuff = new DefenseStats(744,0)
var iceChaserAttributePerLevelBuff = new DefenseStats(100,0)

// Falling Flower Palm Skill Stats
var fallingFlowerPalmBaseLevelDamageScaling = new DamageScaling(0.62,0)
var fallingFlowerPalmPerLevelDamageScaling = new DamageScaling(0.075,0)
var fallingFlowerPalmCastTime = 0
var fallingFlowerPalmCooldown = 6

//Fire Chaser Skill Stats
var fireChaserBaseLevelDamageScaling = new DamageScaling(0,0.83)
var fireChaserPerLevelDamageScaling = new DamageScaling(0,0.085)
var fireChaserDuration = 40
var fireChaserAttributeBaseLevelBuff = new AttributeStats(35,35,0,0)
var fireChaserAttributePerLevelBuff = new AttributeStats(10,10,0,0)

// Circle Swing Skill Stats
var circleSwingBaseLevelDamageScaling = new DamageScaling(1.18,0)
var circleSwingPerLevelDamageScaling = new DamageScaling(0.12,0)
var circleSwingCastTime = 0
var circleSwingCooldown = 8

// Shadow Chaser Skill Stats
var shadowChaserBaseLevelDamageScaling = new DamageScaling(0,0.83)
var shadowChaserPerLevelDamageScaling = new DamageScaling(0,0.0875)
var shadowChaserDuration = 40

// Battle Spirit Skill Stats
var battleSpiritAttributeBaseLevelBuff = new AttributeStats(30,0,0,0)
var battleSpiritAttributePerLevelBuff = new AttributeStats(20,0,0,0)

/*
//TODO Skill Stats
var draconicCrusherBaseLevelDamageScaling = new DamageScaling(1,1)
var draconicCrusherPerLevelDamageScaling = new DamageScaling(1,1)

var dragonBreaksTheRanksBaseLevelDamageScaling = new DamageScaling(1,1)
var dragonBreaksTheRanksPerLevelDamageScaling = new DamageScaling(1,1)

var furiousDragonStrikesTheHeartBaseLevelDamageScaling = new DamageScaling(1,1)
var furiousDragonStrikesTheHeartPerLevelDamageScaling = new DamageScaling(1,1)

var risingDragonSoarsTheSkyBaseLevelDamageScaling = new DamageScaling(1,1)
var risingDragonSoarsTheSkyPerLevelDamageScaling = new DamageScaling(1,1)
*/

//Stats Class
var Player = class {
	// Set PlayerID
	setID(id){
		this.ID = id;
	}

	// Set PlayerUsername
	setUsername(username){
		this.username = username;
	}

	// Initialize Match Record
	initializeMatchRecord(){
		this.matchRecord = new MatchRecord(1200, 0, 0);
	}

	// Sets Class
	setClass(className){
		this.className = className;
	}

	// Set Battle Mage Skill Levels
	setBattleMageSkillLevels(dragonToothLevel, skyStrikeLevel, fallingFlowerPalmLevel, circleSwingLevel, doubleStabLevel){
		this.skillLevels = new BattleMageSkillLevels(skyStrikeLevel, dragonToothLevel, doubleStabLevel, fallingFlowerPalmLevel, circleSwingLevel);
	}

	// Initialize Battle Mage Cooldowns
	initializeBattleMageSkillCooldowns(){
		this.baseSkillCooldowns = new BattleMageCooldowns(skyStrikeCooldown, dragonToothCooldown, doubleStabCooldown, fallingFlowerPalmCooldown, circleSwingCooldown);
	}

	// Reset Current Cooldowns
	clearBattleMageSkillCooldowns(){
		this.currentSkillCooldowns = new BattleMageCooldowns(0, 0, 0, 0, 0);
	}

	// Reduce cooldowns at end of turn
	decrementBattleMageSkillCooldowns(){
		if (this.currentSkillCooldowns.skyStrikeCooldown > 0){
			this.currentSkillCooldowns.skyStrikeCooldown--;
		}
		if (this.currentSkillCooldowns.dragonToothCooldown > 0){
			this.currentSkillCooldowns.dragonToothCooldown--;
		}
		if (this.currentSkillCooldowns.doubleStabCooldown > 0){
			this.currentSkillCooldowns.doubleStabCooldown--;
		}
		if (this.currentSkillCooldowns.fallingFlowerPalmCooldown > 0){
			this.currentSkillCooldowns.fallingFlowerPalmCooldown--;
		}
		if (this.currentSkillCooldowns.circleSwingCooldown > 0){
			this.currentSkillCooldowns.circleSwingCooldown--;
		}
	}


	// Calculate Skill Stats
	calculateSkillValues(skillName){
		if (this.className = "Battle Mage"){
			// Calculate Stab Stats
			if (skillName == "Stab"){
				var stab = new Skill("Stab", stabDamageScaling, emptyBuff, 0, 0, false)
				return stab
			}

			// Calculate Slash Stats
			if (skillName == "Slash"){
				var slash = new Skill("Slash", slashDamageScaling, emptyBuff, 0, 0, false)
				return slash
			}

			// Calculate Sky Strike Skill Stats
			if (skillName == "Sky Strike"){
				var skyStrikePhysicalDamageScaling = skyStrikeBaseLevelDamageScaling.physicalScaling + (this.skillLevels.skyStrikeLevel - 1) * skyStrikePerLevelDamageScaling.physicalScaling
				var skyStrikeMagicDamageScaling = skyStrikeBaseLevelDamageScaling.magicScaling + (this.skillLevels.skyStrikeLevel - 1) * skyStrikePerLevelDamageScaling.magicScaling
				var skyStrikeDamageScaling = new DamageScaling(skyStrikePhysicalDamageScaling, skyStrikeMagicDamageScaling)
				var skyStrike = new Skill("Sky Strike",skyStrikeDamageScaling, emptyBuff, skyStrikeCastTime, skyStrikeCooldown, false)
				return skyStrike
			}
			
			// Calculate Dragon Tooth Skill Stats
			if (skillName == "Dragon Tooth"){
				var dragonToothPhysicalDamageScaling = dragonToothBaseLevelDamageScaling.physicalScaling + (this.skillLevels.dragonToothLevel - 1) * dragonToothPerLevelDamageScaling.physicalScaling
				var dragonToothMagicDamageScaling = dragonToothBaseLevelDamageScaling.magicScaling + (this.skillLevels.dragonToothLevel - 1) * dragonToothPerLevelDamageScaling.magicScaling
				var dragonToothDamageScaling = new DamageScaling(dragonToothPhysicalDamageScaling, dragonToothMagicDamageScaling)
				var dragonTooth = new Skill("Dragon Tooth",dragonToothDamageScaling, emptyBuff, dragonToothCastTime, dragonToothCooldown, false)
				return dragonTooth
			}

			// Calculate Double Stab Skill Stats
			if (skillName == "Double Stab"){
				var doubleStabPhysicalDamageScaling = doubleStabBaseLevelDamageScaling.physicalScaling + (this.skillLevels.doubleStabLevel - 1) * doubleStabPerLevelDamageScaling.physicalScaling
				var doubleStabMagicDamageScaling = doubleStabBaseLevelDamageScaling.magicScaling + (this.skillLevels.doubleStabLevel - 1) * doubleStabPerLevelDamageScaling.magicScaling
				var doubleStabDamageScaling = new DamageScaling(doubleStabPhysicalDamageScaling, doubleStabMagicDamageScaling)
				var doubleStab = new Skill("Double Stab",doubleStabDamageScaling, emptyBuff, doubleStabCastTime, doubleStabCooldown, false)
				return doubleStab
			}

			// Calculate Falling Flower Palm Skill Stats
			if (skillName == "Falling Flower Palm"){
				var fallingFlowerPalmPhysicalDamageScaling = fallingFlowerPalmBaseLevelDamageScaling.physicalScaling + (this.skillLevels.fallingFlowerPalmLevel - 1) * fallingFlowerPalmPerLevelDamageScaling.physicalScaling
				var fallingFlowerPalmMagicDamageScaling = fallingFlowerPalmBaseLevelDamageScaling.magicScaling + (this.skillLevels.fallingFlowerPalmLevel - 1) * fallingFlowerPalmPerLevelDamageScaling.magicScaling
				var fallingFlowerPalmDamageScaling = new DamageScaling(fallingFlowerPalmPhysicalDamageScaling, fallingFlowerPalmMagicDamageScaling)
				var fallingFlowerPalm = new Skill("Falling Flower Palm",fallingFlowerPalmDamageScaling, emptyBuff, fallingFlowerPalmCastTime, fallingFlowerPalmCooldown, false)
				return fallingFlowerPalm
			}

			// Calculate Circle Swing Skill Stats
			if (skillName == "Circle Swing"){
				var circleSwingPhysicalDamageScaling = circleSwingBaseLevelDamageScaling.physicalScaling + (this.skillLevels.circleSwingLevel - 1) * circleSwingPerLevelDamageScaling.physicalScaling
				var circleSwingMagicDamageScaling = circleSwingBaseLevelDamageScaling.magicScaling + (this.skillLevels.circleSwingLevel - 1) * circleSwingPerLevelDamageScaling.magicScaling
				var circleSwingDamageScaling = new DamageScaling(circleSwingPhysicalDamageScaling, circleSwingMagicDamageScaling)
				var circleSwing = new Skill("Circle Swing",circleSwingDamageScaling, emptyBuff, circleSwingCastTime, circleSwingCooldown, false)
				return circleSwing
			}
		}
	}

	// Initalize Level and Quest Stat Points
	initializeUnitStats(){
		this.unitStats = new UnitStats(70, 30)
	}

	// Set Class Scaling based on class
	initializeClassScalingStats(){
		if (this.className == "Battle Mage"){
			this.classScalingStats = new ClassScalingStats(3.5, 3.5, 2.5, 2.5)
		}
	}

	// Set Armor Stats
	initializeArmorStats(physicalArmor, magicArmor, strengthArmorBonus, intelligenceArmorBonus, vitalityArmorBonus, spiritArmorBonus){
		this.armorStats = new ArmorStats(physicalArmor, magicArmor, strengthArmorBonus, intelligenceArmorBonus, vitalityArmorBonus, spiritArmorBonus)
	}

	// Set Weapon Stats
	initializeWeaponStats(physicalWeaponDamage, magicWeaponDamage, strengthWeaponBonus, intelligenceWeaponBonus, vitalityWeaponBonus, spiritWeaponBonus){
		this.weaponStats = new WeaponStats(physicalWeaponDamage, magicWeaponDamage, strengthWeaponBonus, intelligenceWeaponBonus, vitalityWeaponBonus, spiritWeaponBonus)
	}

	//Calculate Attribute Stats based on level, quest stat points, Armor bonus, weapon bonus, and class scaling
	calculateAttributeStats(){
		var strength = (this.unitStats.level + this.unitStats.questStatPoints + this.armorStats.strengthArmorBonus + this.weaponStats.strengthWeaponBonus) * this.classScalingStats.strengthScaling
		var intelligence = (this.unitStats.level + this.unitStats.questStatPoints + this.armorStats.intelligenceArmorBonus + this.weaponStats.intelligenceWeaponBonus) * this.classScalingStats.intelligenceScaling
		var vitality = (this.unitStats.level + this.unitStats.questStatPoints + this.armorStats.vitalityArmorBonus + this.weaponStats.vitalityWeaponBonus) * this.classScalingStats.vitalityScaling
		var spirit = (this.unitStats.level + this.unitStats.questStatPoints + this.armorStats.spiritArmorBonus + this.weaponStats.spiritWeaponBonus) * this.classScalingStats.spiritScaling
		var attributeStats = new AttributeStats(strength, intelligence, vitality, spirit)
		return attributeStats
	}

	// Calculate maxHP, maxMP, and maxStamina based on level and attributes
	calculateResourceStats(attributeStats){
		var maxHP = 100 * this.unitStats.level + 5 * attributeStats.vitality
		var maxMP = 50 * this.unitStats.level + 5 * attributeStats.intelligence
		var maxStamina = 50 * this.unitStats.level + 5 * attributeStats.vitality
		var resourceStats = new ResourceStats(maxHP, maxMP, maxStamina)
		return resourceStats
	}

	//refills HP, MP, and Stamina
	fillResourceStats(maxResourceStats){
		this.currentResources = new ResourceStats(maxResourceStats.HP, maxResourceStats.MP, maxResourceStats.Stamina)
	}

	// Calculate the Defense Stats based on attributes and Armor stats
	calculateDefenseStats(attributeStats){
		var physicalDefense = attributeStats.strength + this.armorStats.physicalArmor
		var magicDefense = attributeStats.intelligence + this.armorStats.magicArmor
		var defenseStats = new DefenseStats(physicalDefense, magicDefense)
		return defenseStats
	}

	// Calculate Resistance Stats based on physical defense and the level of the attacker
	calculateResistanceStats(attackerLevel, defenseStats){
		var physicalDamageReduction = defenseStats.physicalDefense / (defenseStats.physicalDefense + attackerLevel*150)
		var magicDamageReduction = defenseStats.magicDefense / (defenseStats.magicDefense + attackerLevel*150)
		var resistanceStats = new ResistanceStats(physicalDamageReduction, magicDamageReduction)
		return resistanceStats
	}

	// Calculate Attack Stats based on weapon damages, attribute stats, and skill damage scaling TODO: Need to create Skill Enum
	calculateAttackStats(skillDamageScaling, attributeStats){
		var physicalAttack = this.weaponStats.physicalWeaponDamage * (1 + attributeStats.strength/175) * skillDamageScaling.physicalScaling
		var magicAttack = this.weaponStats.magicWeaponDamage * (1 + attributeStats.intelligence/175) * skillDamageScaling.magicScaling
		var attackStats = new AttackStats(physicalAttack, magicAttack)
		return attackStats
	}

	// Calculated the Damage that you would do TODO: target needs to be another instance of Stats
	calculateDamage(resistanceStats, attackStats){
		var physicalDamage = attackStats.physicalAttack * (1-resistanceStats.physicalDamageReduction)
		var magicDamage = attackStats.magicAttack * (1-resistanceStats.magicDamageReduction)
		var damageStats = new DamageStats(physicalDamage, magicDamage)
		return damageStats
	}

	//Deals damage to target TODO: target needs to a be another instance of Stats
	dealDamage(target, damageStats){
		target.currentResources.HP = target.currentResources.HP - (damageStats.physicalDamage + damageStats.magicDamage)
	}

	
	// Calculates the Base Stats that have no buffs
	calculateBaseStats(id,username){
		this.setID(id)
		this.setUsername(username)
		this.initializeMatchRecord()
		this.setClass("Battle Mage")
		this.setBattleMageSkillLevels(10,10,10,10,10)
		this.initializeBattleMageSkillCooldowns()
		this.clearBattleMageSkillCooldowns()
		this.initializeUnitStats()
		this.initializeClassScalingStats()
		this.initializeArmorStats(30,30,100,100,100,100)
		this.initializeWeaponStats(30,30,100,100,100,100)
		this.baseAttributeStats = this.calculateAttributeStats()
		this.baseMaxResourceStats = this.calculateResourceStats(this.baseAttributeStats)
		this.fillResourceStats(this.baseMaxResourceStats)
		this.baseDefenseStats = this.calculateDefenseStats(this.baseAttributeStats)
		this.baseResistanceStats = this.calculateResistanceStats(70, this.baseDefenseStats)
		this.baseAttackStats = this.calculateAttackStats(baseDamageScaling, this.baseAttributeStats)
	}

	setBaseStats(player){
		this.ID = player.ID
		this.username = player.username
		this.matchRecord = player.matchRecord
		this.className = player.className
		this.skillLevels = player.skillLevels
		this.initializeBattleMageSkillCooldowns()
		this.clearBattleMageSkillCooldowns()
		this.unitStats = player.unitStats
		this.classScalingStats = player.classScalingStats
		this.armorStats = player.armorStats
		this.weaponStats = player.weaponStats
		this.baseAttributeStats = player.baseAttributeStats
		this.baseMaxResourceStats = player.baseMaxResourceStats
		this.fillResourceStats(this.baseMaxResourceStats)
		this.baseDefenseStats = player.baseDefenseStats
		this.baseResistanceStats = player.baseResistanceStats
		this.baseAttackStats = player.baseAttackStats
	}

	// Reset Effective Stats
	resetEffectiveStats(skillName){
		this.activeSkill = this.calculateSkillValues(skillName)
		this.effectiveAttributeStats = new AttributeStats(this.baseAttributeStats.strength, this.baseAttributeStats.intelligence, this.baseAttributeStats.vitality, this.baseAttributeStats.spirit)
		this.effectiveMaxResourceStats = new ResourceStats(this.baseMaxResourceStats.HP, this.baseMaxResourceStats.MP, this.baseMaxResourceStats.Stamina)
		this.effectiveDefenseStats = new DefenseStats(this.baseDefenseStats.physicalDefense, this.baseDefenseStats.magicDefense)
		this.effectiveResistanceStats = new ResistanceStats(this.baseResistanceStats.physicalDamageReduction, this.baseResistanceStats.magicDamageReduction)
		this.effectiveAttackStats = this.calculateAttackStats(this.activeSkill.damageScaling, this.baseAttributeStats)
	}
	
	// Clears or Initializes the array of buffs
	resetBuffs(){
		this.activeBuffs = []
	}

	// Add Buff to Array
	buffAddition(buff1, buff2){
		var attributesBuffSum = new AttributeStats(buff1.attributesBuff.strength + buff2.attributesBuff.strength, buff1.attributesBuff.intelligence + buff2.attributesBuff.intelligence, buff1.attributesBuff.vitality + buff2.attributesBuff.vitality, buff1.attributesBuff.spirit + buff2.attributesBuff.spirit)
		var resourceBuffSum = new ResourceStats(buff1.resourceBuff.HP + buff2.resourceBuff.HP, buff1.resourceBuff.MP + buff2.resourceBuff.MP, buff1.resourceBuff.Stamina + buff2.resourceBuff.Stamina)
		var defenseBuffSum = new DefenseStats(buff1.physicalDefense + buff2.physicalDefense, buff1.magicDefense + buff2.magicDefense)
		var resistanceBuffSum = new ResistanceStats(buff1.physicalDamageReduction + buff2.physicalDamageReduction, buff1.magicDamageReduction + buff2.magicDamageReduction)
		var attackBuffSum = new AttackStats(buff1.physicalAttack + buff2.physicalAttack, buff1.magicAttack + buff2.magicAttack)
		var buffSum = new Buff(attributesBuffSum, resourceBuffSum, defenseBuffSum, resistanceBuffSum, attackBuffSum)
		return buffSum
	}

	// Calculates the total buff
	calculateTotalBuff(){
		this.totalBuff = new Buff(emptyAttributesBuff, emptyResourceBuff, emptyDefenseBuff, emptyResistanceBuff, emptyAttackBuff, 0)
		if (this.activeBuffs.length){
			for (var i = this.activeBuffs.length - 1; i >= 0; i--) {
			this.totalBuff = buffAddition(this.totalBuff, this.activeBuffs[i])
			}
		}
	}

	// Remove Buffs that have a duration of zero
	removeExpiredBuffs(){
		if (this.activeBuffs.length){
			for (var i = this.activeBuffs.length - 1; i >= 0; i--) {
				if (this.activeBuffs[i].duration == 0){
					this.activeBuffs.splice(i,1) 
				}
			}
		}
	}

	// Apply Buff to Effective Attribute Stats
	buffEffectiveAttributeStats(){
		var newEffectiveStrength = this.baseAttributeStats.strength + this.totalBuff.attributesBuff.strength
		var newEffectiveIntelligence = this.baseAttributeStats.intelligence + this.totalBuff.attributesBuff.intelligence
		var newEffectiveVitality = this.baseAttributeStats.vitality + this.totalBuff.attributesBuff.vitality
		var newEffectiveSpirit = this.baseAttributeStats.spirit + this.totalBuff.attributesBuff.spirit
		this.effectiveAttributeStats = new AttributeStats(newEffectiveStrength, newEffectiveIntelligence, newEffectiveVitality, newEffectiveSpirit)
	}

	// Apply Buff to Effective Resources Stats
	buffEffectiveResourceStats(){
		var attributeBasedMaxResourceStats = calculateResistanceStats(this.effectiveAttributeStats)
		var newEffectiveMaxHP = attributeBasedMaxResourceStats.HP + this.totalBuff.resourceBuff.HP
		var newEffectiveMaxMP = attributeBasedMaxResourceStats.MP + this.totalBuff.resourceBuff.MP
		var newEffectiveMaxStamina = attributeBasedMaxResourceStats.Stamina + this.totalBuff.resourceBuff.Stamina
		this.effectiveMaxResourceStats = new ResourceStats(newEffectiveMaxHP, newEffectiveMaxMP, newEffectiveMaxStamina)
	}

	// Apply Buff to Effective Defense Stats
	buffEffectiveDefenseStats(){
		var attributeBasedDefenseStats = calculateDefenseStats(this.effectiveAttributeStats)
		var newEffectivePhysicalDefense = attributeBasedDefenseStats.physicalDefense * (1 + this.totalBuff.defenseBuff.physicalDefense)
		var newEffectiveMagicDefense = attributeBasedDefenseStats.magicDefense + (1 + this.totalBuff.defenseBuff.magicDefense)
		this.effectiveDefenseStats = new DefenseStats(newEffectivePhysicalDefense, newEffectiveMagicDefense)
	}

	// Apply Buff to Effective Resistance Stats
	BuffEffectiveResistanceStats(){
		var defenseBasedResistanceStats = calculateResistanceStats(70, this.effectiveDefenseStats)
		var newEffectivePhysicalDamageReduction = defenseBasedResistanceStats.physicalDamageReduction + this.totalBuff.resistanceBuff.physicalDamageReduction
		var newEffectiveMagicDamageReduction = defenseBasedResistanceStats.magicDamageReduction + this.totalBuff.resistanceBuff.magicDamageReduction
		this.effectiveResistanceStats = new ResistanceStats(newEffectivePhysicalDamageReduction, newEffectiveMagicDamageReduction)
	}

	// Apply Buff to Effective Resistance Stats
	BuffEffectiveAttackStats(skill){
		var skillBasedAttackStats = calculateAttackStats(skill,this.baseAttributeStats)
		var newEffectivePhysicalAttack = skillBasedAttackStats.physicalAttack * (1 + this.totalBuff.attackBuff.physicalAttack)
		var newEffectiveMagicAttack = skillBasedAttackStats.magicAttack * (1 + this.totalBuff.attackBuff.magicAttack)
		this.effectiveAttackStats = new AttackStats(newEffectivePhysicalAttack, newEffectiveMagicAttack)
	}

	// Apply the total buff
	applyTotalBuff(skill){
		this.buffEffectiveAttributeStats()
		this.buffEffectiveResourceStats()
		this.buffEffectiveDefenseStats()
		this.BuffEffectiveResistanceStats()
		this.BuffEffectiveAttackStats(this.dragonTooth)
	}

	// Reduce the duration for each active buff
	decrementBuffsDuration(){
		if (this.activeBuffs.length){
			for (var i = this.activeBuffs.length - 1; i >= 0; i--) {
				this.activeBuffs[i].duration--
			}
		}
	}

	// Update Function for Buffs
	updateBuffs(skill){
		this.removeExpiredBuffs()
		this.calculateTotalBuff()
		this.applyTotalBuff(skill)
		this.decrementBuffsDuration()
	}

	// Add Buff to activeBuffs
	addBuff(incomingBuff){
		this.activeBuffs.push(incomingBuff)
	}

	// DEBUG: Prints Base Stats
	printBaseStats(){
		console.log(this.className)
		console.log(this.skillLevels)
		console.log(this.circleSwing)
		console.log(this.unitStats)
		console.log(this.classScalingStats)
		console.log(this.armorStats)
		console.log(this.weaponStats)
		console.log(this.baseAttributeStats)
		console.log(this.baseMaxResourceStats)
		console.log(this.currentResources)
		console.log(this.baseDefenseStats)
		console.log(this.baseAttackStats)
	}

	// DEBUG: Prints Effective Stats 
	printEffectiveStats(){
		console.log(this.className)
		console.log(this.skillLevels)
		console.log(this.circleSwing)
		console.log(this.unitStats)
		console.log(this.classScalingStats)
		console.log(this.armorStats)
		console.log(this.weaponStats)
		console.log(this.effectiveAttributeStats)
		console.log(this.effectiveMaxResourceStats)
		console.log(this.currentResources)
		console.log(this.effectiveDefenseStats)
		console.log(this.effectiveAttackStats)
	}
}

module.exports.Game = class {
	// Initialize Challenger Player
	initializeChallengerPlayer(challengerID, challengerUsername){
		this.challengerPlayer = new Player();
		this.challengerPlayer.calculateBaseStats(challengerID, challengerUsername);
		this.challengerPlayer.resetEffectiveStats("Stab");
	}
	// Set Challenger Player
	setChallengerPlayer(challengerPlayer){
		this.challengerPlayer = new Player();
		this.challengerPlayer.setBaseStats(challengerPlayer);
		this.challengerPlayer.resetEffectiveStats("Stab");
	}
	// Initialize Challenged Player
	initializeChallengedPlayer(challengedID, challengedUsername){
		this.challengedPlayer = new Player();
		this.challengedPlayer.calculateBaseStats(challengedID, challengedUsername);
		this.challengedPlayer.resetEffectiveStats("Stab");
	}
	// Set Challenged Player
	setChallengedPlayer(challengedPlayer){
		this.challengedPlayer = new Player();
		this.challengedPlayer.setBaseStats(challengedPlayer);
		this.challengedPlayer.resetEffectiveStats("Stab");
	}

	// Set Game State {"No Match", "Pending Challenge", "Active Match"}
	setGameState(gameState){
		this.gameState = gameState;
	}

	// Set Game State to "Pending Challenge"
	challengeOpponent(){
		this.gameState = "Pending Challenge";
	}

	// Set Game State to "Active Match"
	challengeAccepted(){
		this.gameState = "Active Match";
	}
	// Initialize Values for the first turn
	initializeMatch(){
		this.turn = 1;
		this.challengerActiveSkill = undefined;
		this.challengedActiveSkill = undefined;
		console.log("match initialized");
	}

	// Initial Values for next turn
	nextTurn(message){
		if ((this.challengerPlayer.currentResources.HP <= 0) || (this.challengedPlayer.currentResources.HP <= 0)){
			// Find the winner
			var winnerName = this.calculateResults();
			// Update the Elo
			updateJSON();
			// Update game state
			this.gameState = "No Match";
			// Print Finished match message
			let endMatchEmbed = new Discord.RichEmbed()
			.setTitle(`${winnerName} Wins!`)
			.setColor("#15f153")
			.addField(`${this.challengerPlayer.username}`,`ELO: ${this.challengerPlayer.matchRecord.elo.toFixed(0)} \n Wins: ${this.challengerPlayer.matchRecord.wins} \n Losses: ${this.challengerPlayer.matchRecord.losses}`, true)
			.addField(`${this.challengedPlayer.username}`,`ELO: ${this.challengedPlayer.matchRecord.elo.toFixed(0)} \n Wins: ${this.challengedPlayer.matchRecord.wins} \n Losses: ${this.challengedPlayer.matchRecord.losses}`, true)
			message.channel.send(endMatchEmbed);
		} else {
			this.turn++;
			this.challengerActiveSkill = undefined;
			this.challengedActiveSkill = undefined;
			console.log("next turn");
		}
	}
	
	// Calculate Skill Damage
	calculateSkillDamage(player,skillname){
		var skill = player.calculateSkillValues(skillname);
		var skillAttackStats = player.calculateAttackStats(skill.damageScaling, player.effectiveAttributeStats);
		if (player.ID === this.challengerPlayer.ID){
			var skillDamage = player.calculateDamage(this.challengedPlayer.effectiveResistanceStats, skillAttackStats);
			player.dealDamage(this.challengedPlayer, skillDamage);
		} else if (player.ID === this.challengedPlayer.ID){
			var skillDamage = player.calculateDamage(this.challengerPlayer.effectiveResistanceStats, skillAttackStats);
			player.dealDamage(this.challengerPlayer, skillDamage);
		} else {
			console.log("Error in Damage Calculation")
		}
	}

	calculateElo(){
	  
	  return Ea;
	}
	// Calculate Results when game ends
	calculateResults(){
		var challengerPercentRemainingHP = this.challengerPlayer.currentResources.HP/this.challengerPlayer.effectiveMaxResourceStats.HP
		var challengedPercentRemainingHP = this.challengedPlayer.currentResources.HP/this.challengedPlayer.effectiveMaxResourceStats.HP

		var challengerPlayerElo = this.challengerPlayer.matchRecord.elo;
		var challengedPlayerElo = this.challengedPlayer.matchRecord.elo;
		var k = 100;

		var challengerPlayerWinProbability = 1 /(1 + Math.pow(10,((challengedPlayerElo-challengerPlayerElo)/400)));
		var challengedPlayerWinProbability = 1 /(1 + Math.pow(10,((challengerPlayerElo-challengedPlayerElo)/400)));
		// If challengerPlayer wins
		if(challengerPercentRemainingHP > challengedPercentRemainingHP){
			this.challengerPlayer.matchRecord.wins++;
			this.challengedPlayer.matchRecord.losses++;
			this.challengerPlayer.matchRecord.elo = this.challengerPlayer.matchRecord.elo + k * (1 - challengerPlayerWinProbability);
			this.challengedPlayer.matchRecord.elo = this.challengedPlayer.matchRecord.elo + k * (0 - challengedPlayerWinProbability);
			return(this.challengerPlayer.username);
		} 
		// If challengedPlayer wins
		else if (challengedPercentRemainingHP > challengerPercentRemainingHP){
			this.challengedPlayer.matchRecord.wins++;
			this.challengerPlayer.matchRecord.losses++;
			this.challengerPlayer.matchRecord.elo = this.challengerPlayer.matchRecord.elo + k * (0 - challengerPlayerWinProbability);
			this.challengedPlayer.matchRecord.elo = this.challengedPlayer.matchRecord.elo + k * (1 - challengedPlayerWinProbability);
			return(this.challengedPlayer.username);
		}
		// Its a draw
		else {
			return undefined;
		}
	}
	
		
	
}

