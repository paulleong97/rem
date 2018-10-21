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
	// Sets Class
	setClass(className){
		this.className = className
	}

	// Set Battle Mage Skill Levels
	setBattleMageSkillLevels(dragonToothLevel, skyStrikeLevel, fallingFlowerPalmLevel, circleSwingLevel, doubleStabLevel){
		this.skillLevels = new BattleMageSkillLevels(skyStrikeLevel, dragonToothLevel, doubleStabLevel, fallingFlowerPalmLevel, circleSwingLevel)
	}

	// Initialize Battle Mage Cooldown
	initializeBattleMageSkillCooldowns(){
		this.skillCooldowns = new BattleMageCooldowns(skyStrikeCooldown, dragonToothCooldown, doubleStabCooldown, fallingFlowerPalmCooldown, circleSwingCooldown)
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
	calculateDamage(target, attackStats){
		var physicalDamage = attackStats.physicalAttack * (1-target.effectiveResistanceStats.physicalDamageReduction)
		var magicDamage = attackStats.magicAttack * (1-target.effectiveResistanceStats.magicDamageReduction)
		var damageStats = new DamageStats(physicalDamage, magicDamage)
		return damageStats
	}

	
	// Calculates the Base Stats that have no buffs
	calculateBaseStats(){
		this.setClass("Battle Mage")
		this.setBattleMageSkillLevels(10,10,10,10,10)
		this.initializeBattleMageSkillCooldowns()
		this.activeSkill = this.calculateSkillValues("Stab")
		this.initializeUnitStats()
		this.initializeClassScalingStats()
		this.initializeArmorStats(30,100,100,100,100,100)
		this.initializeWeaponStats(30,100,100,100,100,100)
		this.baseAttributeStats = this.calculateAttributeStats()
		this.baseMaxResourceStats = this.calculateResourceStats(this.baseAttributeStats)
		this.fillResourceStats(this.baseMaxResourceStats)
		this.baseDefenseStats = this.calculateDefenseStats(this.baseAttributeStats)
		this.baseResistanceStats = this.calculateResistanceStats(70, this.baseDefenseStats)
		this.baseAttackStats = this.calculateAttackStats(this.activeSkill.damageScaling, this.baseAttributeStats)
	}

	// Reset Effective Stats
	resetEffectiveStats(){
		this.effectiveAttributeStats = new AttributeStats(this.baseAttributeStats.strength, this.baseAttributeStats.intelligence, this.baseAttributeStats.vitality, this.baseAttributeStats.spirit)
		this.effectiveMaxResourceStats = new ResourceStats(this.baseMaxResourceStats.HP, this.baseMaxResourceStats.MP, this.baseMaxResourceStats.Stamina)
		this.effectiveDefenseStats = new DefenseStats(this.baseDefenseStats.physicalDefense, this.baseDefenseStats.magicDefense)
		this.effectiveResistanceStats = new ResistanceStats(this.baseResistanceStats.physicalDamageReduction, this.baseResistanceStats.magicDamageReduction)
		this.effectiveAttackStats = new AttackStats(this.baseAttackStats.physicalAttack, this.baseAttackStats.magicAttack)
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

	//Deals damage to target TODO: target needs to a be another instance of Stats
	dealDamage(target){
		target.resourceStats.HP = target.resourceStats.HP - (this.damageStats.physicalDamage + this.damageStats.magicDamage)
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
	initializeMatch(){
		this.challengerPlayer = new Player()
		this.challengedPlayer = new Player()

		this.challengerPlayer.calculateBaseStats()
		this.challengerPlayer.resetEffectiveStats()

		this.challengedPlayer.calculateBaseStats()
		this.challengedPlayer.resetEffectiveStats()
	}

	printTurnStatus(){
		const Discord = require("discord.js")

		module.exports.help = {
			name: "turnStatus"
		}

		module.exports.run = async (bot, message, args) => {
			const skyStrikeIcon = message.guild.emojis.find("name", "SkyStrike")
			const dragonToothIcon = message.guild.emojis.find("name", "DragonTooth")
			const fallingFlowerPalmIcon = message.guild.emojis.find("name", "FallingFlowerPalm")
			const circleSwingIcon = message.guild.emojis.find("name", "CircleSwing")
			const doubleStabIcon = message.guild.emojis.find("name", "DoubleStab")
			const neutralChaserIcon = message.guild.emojis.find("name", "NeutralChaser")
			const iceChaserIcon = message.guild.emojis.find("name", "WaterChaser")
			const fireChaserIcon = message.guild.emojis.find("name", "FireChaser")
			const shadowChaserIcon = message.guild.emojis.find("name", "ShadowChaser")
			const lightChaserIcon = message.guild.emojis.find("name", "LightChaser")

			//Challenger Embed
			let challengerEmbed = new Discord.RichEmbed()
			.setTitle("Challenger Stats")
			.setColor("#15f153")
			.addField("Resources", `Max HP: ${this.challengerPlayer.effectiveMaxResourceStats.HP.toFixed(0)} \n Max MP: ${this.challengerPlayer.effectiveMaxResourceStats.MP.toFixed(0)} \n Max Stamina: ${this.challengerPlayer.effectiveMaxResourceStats.Stamina.toFixed(0)}`)
			.addField("Attributes", `Strength: ${this.challengerPlayer.effectiveAttributeStats.strength.toFixed(0)} \n Intelligence: ${this.challengerPlayer.effectiveAttributeStats.intelligence.toFixed(0)} \n Vitality: ${this.challengerPlayer.effectiveAttributeStats.vitality.toFixed(0)} \n Spirit: ${this.challengerPlayer.effectiveAttributeStats.spirit.toFixed(0)}`)
			.addField("Attack", `Physical: ${this.challengerPlayer.effectiveAttackStats.physicalAttack.toFixed(0)} \n Magic: ${this.challengerPlayer.effectiveAttackStats.magicAttack.toFixed(0)}`, true)
			.addField("Defense", `Physical: ${this.challengerPlayer.effectiveDefenseStats.physicalDefense.toFixed(0)} \n Magic: ${this.challengerPlayer.effectiveDefenseStats.magicDefense.toFixed(0)}`, true)
			.addField("Resistance", `Physical: ${(this.challengerPlayer.effectiveResistanceStats.physicalDamageReduction*100).toFixed(2)}% \n Magic: ${(this.challengerPlayer.effectiveResistanceStats.magicDamageReduction*100).toFixed(2)}%`, true)
			.addField("Weapon", `Physical Damage: ${this.challengerPlayer.weaponStats.physicalWeaponDamage.toFixed(0)} \n Magic Damage: ${this.challengerPlayer.weaponStats.magicWeaponDamage.toFixed(0)} \n Strength Bonus: ${this.challengerPlayer.weaponStats.strengthWeaponBonus.toFixed(0)} \n Intelligence Bonus: ${this.challengerPlayer.weaponStats.intelligenceWeaponBonus.toFixed(0)} \n Vitality Bonus: ${this.challengerPlayer.weaponStats.vitalityWeaponBonus.toFixed(0)} \n Spirit Bonus: ${this.challengerPlayer.weaponStats.spiritWeaponBonus.toFixed(0)}`, true)
			.addField("Armor", `Physical Armor: ${this.challengerPlayer.armorStats.physicalArmor.toFixed(0)} \n Magic Armor: ${this.challengerPlayer.armorStats.magicArmor.toFixed(0)} \n Strength Bonus: ${this.challengerPlayer.armorStats.strengthArmorBonus.toFixed(0)} \n Intelligence Bonus: ${this.challengerPlayer.armorStats.intelligenceArmorBonus.toFixed(0)} \n Vitality Bonus: ${this.challengerPlayer.armorStats.vitalityArmorBonus.toFixed(0)} \n Spirit Bonus: ${this.challengerPlayer.armorStats.spiritArmorBonus.toFixed(0)}`, true)


			.addField("Skill Cooldowns",`${skyStrikeIcon}${this.challengerPlayer.skillCooldowns.skyStrikeCooldown} ${dragonToothIcon}${this.challengerPlayer.skillCooldowns.dragonToothCooldown} ${doubleStabIcon}${this.challengerPlayer.skillCooldowns.doubleStabCooldown} ${fallingFlowerPalmIcon}${this.challengerPlayer.skillCooldowns.fallingFlowerPalmCooldown} ${circleSwingIcon}${this.challengerPlayer.skillCooldowns.circleSwingCooldown}`) //this can be used to emulate the effect of multiple reactions
			.addField("Active Chasers",`${lightChaserIcon}${this.challengerPlayer.skillLevels.skyStrikeLevel} ${neutralChaserIcon}${this.challengerPlayer.skillLevels.dragonToothLevel} ${iceChaserIcon}${this.challengerPlayer.skillLevels.doubleStabLevel} ${fireChaserIcon}${this.challengerPlayer.skillLevels.fallingFlowerPalmLevel} ${shadowChaserIcon}${this.challengerPlayer.skillLevels.circleSwingLevel}`)
			message.channel.send(challengerEmbed)

			//Challenged Embed
			let challengedEmbed = new Discord.RichEmbed()
			.setTitle("Challenged Stats")
			.setColor("#15f153")
			.addField("Resources", `Max HP: ${this.challengedPlayer.effectiveMaxResourceStats.HP.toFixed(0)} \n Max MP: ${this.challengedPlayer.effectiveMaxResourceStats.MP.toFixed(0)} \n Max Stamina: ${this.challengedPlayer.effectiveMaxResourceStats.Stamina.toFixed(0)}`)
			.addField("Attributes", `Strength: ${this.challengedPlayer.effectiveAttributeStats.strength.toFixed(0)} \n Intelligence: ${this.challengedPlayer.effectiveAttributeStats.intelligence.toFixed(0)} \n Vitality: ${this.challengedPlayer.effectiveAttributeStats.vitality.toFixed(0)} \n Spirit: ${this.challengedPlayer.effectiveAttributeStats.spirit.toFixed(0)}`)
			.addField("Attack", `Physical: ${this.challengedPlayer.effectiveAttackStats.physicalAttack.toFixed(0)} \n Magic: ${this.challengedPlayer.effectiveAttackStats.magicAttack.toFixed(0)}`, true)
			.addField("Defense", `Physical: ${this.challengedPlayer.effectiveDefenseStats.physicalDefense.toFixed(0)} \n Magic: ${this.challengedPlayer.effectiveDefenseStats.magicDefense.toFixed(0)}`, true)
			.addField("Resistance", `Physical: ${(this.challengedPlayer.effectiveResistanceStats.physicalDamageReduction*100).toFixed(2)}% \n Magic: ${(this.challengedPlayer.effectiveResistanceStats.magicDamageReduction*100).toFixed(2)}%`, true)
			.addField("Weapon", `Physical Damage: ${this.challengedPlayer.weaponStats.physicalWeaponDamage.toFixed(0)} \n Magic Damage: ${this.challengedPlayer.weaponStats.magicWeaponDamage.toFixed(0)} \n Strength Bonus: ${this.challengedPlayer.weaponStats.strengthWeaponBonus.toFixed(0)} \n Intelligence Bonus: ${this.challengedPlayer.weaponStats.intelligenceWeaponBonus.toFixed(0)} \n Vitality Bonus: ${this.challengedPlayer.weaponStats.vitalityWeaponBonus.toFixed(0)} \n Spirit Bonus: ${this.challengedPlayer.weaponStats.spiritWeaponBonus.toFixed(0)}`, true)
			.addField("Armor", `Physical Armor: ${this.challengedPlayer.armorStats.physicalArmor.toFixed(0)} \n Magic Armor: ${this.challengedPlayer.armorStats.magicArmor.toFixed(0)} \n Strength Bonus: ${this.challengedPlayer.armorStats.strengthArmorBonus.toFixed(0)} \n Intelligence Bonus: ${this.challengedPlayer.armorStats.intelligenceArmorBonus.toFixed(0)} \n Vitality Bonus: ${this.challengedPlayer.armorStats.vitalityArmorBonus.toFixed(0)} \n Spirit Bonus: ${this.challengedPlayer.armorStats.spiritArmorBonus.toFixed(0)}`, true)


			.addField("Skill Cooldowns",`${skyStrikeIcon}${this.challengedPlayer.skillCooldowns.skyStrikeCooldown} ${dragonToothIcon}${this.challengedPlayer.skillCooldowns.dragonToothCooldown} ${doubleStabIcon}${this.challengedPlayer.skillCooldowns.doubleStabCooldown} ${fallingFlowerPalmIcon}${this.challengedPlayer.skillCooldowns.fallingFlowerPalmCooldown} ${circleSwingIcon}${this.challengedPlayer.skillCooldowns.circleSwingCooldown}`) //this can be used to emulate the effect of multiple reactions
			.addField("Active Chasers",`${lightChaserIcon}${this.challengedPlayer.skillLevels.skyStrikeLevel} ${neutralChaserIcon}${this.challengedPlayer.skillLevels.dragonToothLevel} ${iceChaserIcon}${this.challengedPlayer.skillLevels.doubleStabLevel} ${fireChaserIcon}${this.challengedPlayer.skillLevels.fallingFlowerPalmLevel} ${shadowChaserIcon}${this.challengedPlayer.skillLevels.circleSwingLevel}`)
			return message.channel.send(challengedEmbed)


		}
		
	}

	printStats(){
		
		var player1Stats = new Player()
		player1Stats.calculateBaseStats()
		player1Stats.resetEffectiveStats()
		
		const Discord = require("discord.js")

		module.exports.help = {
			name: "stats"
		}

		module.exports.run = async (bot, message, args) => {
			const skyStrikeIcon = message.guild.emojis.find("name", "SkyStrike")
			const dragonToothIcon = message.guild.emojis.find("name", "DragonTooth")
			const fallingFlowerPalmIcon = message.guild.emojis.find("name", "FallingFlowerPalm")
			const circleSwingIcon = message.guild.emojis.find("name", "CircleSwing")
			const doubleStabIcon = message.guild.emojis.find("name", "DoubleStab")
			const neutralChaserIcon = message.guild.emojis.find("name", "NeutralChaser")
			const iceChaserIcon = message.guild.emojis.find("name", "WaterChaser")
			const fireChaserIcon = message.guild.emojis.find("name", "FireChaser")
			const shadowChaserIcon = message.guild.emojis.find("name", "ShadowChaser")
			const lightChaserIcon = message.guild.emojis.find("name", "LightChaser")

			//example of an embed we display
			let endEmbed = new Discord.RichEmbed()
			.setTitle("Stats")
			.setColor("#15f153")
			.addField("Resources", `Max HP: ${player1Stats.baseMaxResourceStats.HP.toFixed(0)} \n Max MP: ${player1Stats.baseMaxResourceStats.MP.toFixed(0)} \n Max Stamina: ${player1Stats.baseMaxResourceStats.Stamina.toFixed(0)}`)
			.addField("Attributes", `Strength: ${player1Stats.baseAttributeStats.strength.toFixed(0)} \n Intelligence: ${player1Stats.baseAttributeStats.intelligence.toFixed(0)} \n Vitality: ${player1Stats.baseAttributeStats.vitality.toFixed(0)} \n Spirit: ${player1Stats.baseAttributeStats.spirit.toFixed(0)}`)
			.addField("Attack", `Physical: ${player1Stats.baseAttackStats.physicalAttack.toFixed(0)} \n Magic: ${player1Stats.baseAttackStats.magicAttack.toFixed(0)}`, true)
			.addField("Defense", `Physical: ${player1Stats.baseDefenseStats.physicalDefense.toFixed(0)} \n Magic: ${player1Stats.baseDefenseStats.magicDefense.toFixed(0)}`, true)
			.addField("Resistance", `Physical: ${(player1Stats.baseResistanceStats.physicalDamageReduction*100).toFixed(2)}% \n Magic: ${(player1Stats.baseResistanceStats.magicDamageReduction*100).toFixed(2)}%`, true)
			.addField("Weapon", `Physical Damage: ${player1Stats.weaponStats.physicalWeaponDamage.toFixed(0)} \n Magic Damage: ${player1Stats.weaponStats.magicWeaponDamage.toFixed(0)} \n Strength Bonus: ${player1Stats.weaponStats.strengthWeaponBonus.toFixed(0)} \n Intelligence Bonus: ${player1Stats.weaponStats.intelligenceWeaponBonus.toFixed(0)} \n Vitality Bonus: ${player1Stats.weaponStats.vitalityWeaponBonus.toFixed(0)} \n Spirit Bonus: ${player1Stats.weaponStats.spiritWeaponBonus.toFixed(0)}`, true)
			.addField("Armor", `Physical Armor: ${player1Stats.armorStats.physicalArmor.toFixed(0)} \n Magic Armor: ${player1Stats.armorStats.magicArmor.toFixed(0)} \n Strength Bonus: ${player1Stats.armorStats.strengthArmorBonus.toFixed(0)} \n Intelligence Bonus: ${player1Stats.armorStats.intelligenceArmorBonus.toFixed(0)} \n Vitality Bonus: ${player1Stats.armorStats.vitalityArmorBonus.toFixed(0)} \n Spirit Bonus: ${player1Stats.armorStats.spiritArmorBonus.toFixed(0)}`, true)


			.addField("Skill Levels",`${skyStrikeIcon}${player1Stats.skillLevels.skyStrikeLevel} ${dragonToothIcon}${player1Stats.skillLevels.dragonToothLevel} ${doubleStabIcon}${player1Stats.skillLevels.doubleStabLevel} ${fallingFlowerPalmIcon}${player1Stats.skillLevels.fallingFlowerPalmLevel} ${circleSwingIcon}${player1Stats.skillLevels.circleSwingLevel}`) //this can be used to emulate the effect of multiple reactions
			.addField("Chaser Levels",`${lightChaserIcon}${player1Stats.skillLevels.skyStrikeLevel} ${neutralChaserIcon}${player1Stats.skillLevels.dragonToothLevel} ${iceChaserIcon}${player1Stats.skillLevels.doubleStabLevel} ${fireChaserIcon}${player1Stats.skillLevels.fallingFlowerPalmLevel} ${shadowChaserIcon}${player1Stats.skillLevels.circleSwingLevel}`)
			return message.channel.send(endEmbed)

		}
	}
}

