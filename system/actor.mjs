export class TwoDotNealActor extends Actor {
    prepareDerivedData() {
        const actorData = this.data;
        switch (actorData.type) {
            case 'pc':
                this._preparePCDerivedData(actorData);
                break;
        }
    }

    _preparePCDerivedData(actorData) {
        const data = actorData.data;
        this._preparePCDerivedDataAbilities(data);
        data.hitDieRollAdjusted = data.hitDieRoll + ' + ' + data.hitPointAdjust;
        this._preparePCDerivedDataSavingThrows(actorData);
        this._preparePCDerivedDataAC(actorData);
        this._preparePCDerivedDataHitAdjust(actorData);
        this._preparePCDerivedDataItems(actorData);
        this._preparePCDerivedDataEncumbrance(actorData);
    }

    _preparePCDerivedDataAbilities(data) {
        this._preparePCDerivedDataStr(data);
        this._preparePCDerivedDataDex(data);
        this._preparePCDerivedDataCon(data);
        this._preparePCDerivedDataInt(data);
        this._preparePCDerivedDataWis(data);
        this._preparePCDerivedDataCha(data);
        this._preparePCDerivedDataPer(data);
    }

    _preparePCDerivedDataStr(data) {
        const str = data.str;
        switch (str) {
            case 1:
                data.meleeAttackAdjust = -5;
                data.meleeDamageAdjust = -4;
                data.weightAllowance = 1;
                data.maxPress = 3;
                data.openDoors = 1;
                data.bendBars = 0;
                break;
            case 2:
                data.meleeAttackAdjust = -3;
                data.meleeDamageAdjust = -2;
                data.weightAllowance = 1;
                data.maxPress = 5;
                data.openDoors = 1;
                data.bendBars = 0;
                data.weightLimits = {
                    base: 1,
                    light: 2,
                    medium: 3,
                    heavy: 4,
                    severe: 6,
                };
                break;
            case 3:
                data.meleeAttackAdjust = -3;
                data.meleeDamageAdjust = -1;
                data.weightAllowance = 5;
                data.maxPress = 10;
                data.openDoors = 2;
                data.bendBars = 0;
                data.weightLimits = {
                    base: 5,
                    light: 6,
                    medium: 7,
                    heavy: 9,
                    severe: 10,
                };
                break;
            case 4:
            case 5:
                data.meleeAttackAdjust = -2;
                data.meleeDamageAdjust = -1;
                data.weightAllowance = 10;
                data.maxPress = 25;
                data.openDoors = 3;
                data.bendBars = 0;
                data.weightLimits = {
                    base: 10,
                    light: 13,
                    medium: 16,
                    heavy: 19,
                    severe: 25,
                };
                break;
            case 6:
            case 7:
                data.meleeAttackAdjust = -1;
                data.meleeDamageAdjust = 0;
                data.weightAllowance = 20;
                data.maxPress = 55;
                data.openDoors = 4;
                data.bendBars = 0;
                data.weightLimits = {
                    base: 20,
                    light: 29,
                    medium: 38,
                    heavy: 46,
                    severe: 55,
                };
                break;
            case 8:
            case 9:
                data.meleeAttackAdjust = 0;
                data.meleeDamageAdjust = 0;
                data.weightAllowance = 35;
                data.maxPress = 90;
                data.openDoors = 5;
                data.bendBars = 1;
                data.weightLimits = {
                    base: 35,
                    light: 50,
                    medium: 65,
                    heavy: 80,
                    severe: 90,
                };
                break;
            case 10:
            case 11:
                data.meleeAttackAdjust = 0;
                data.meleeDamageAdjust = 0;
                data.weightAllowance = 40;
                data.maxPress = 115;
                data.openDoors = 6;
                data.bendBars = 2;
                data.weightLimits = {
                    base: 40,
                    light: 58,
                    medium: 76,
                    heavy: 96,
                    severe: 110,
                };
                break;
            case 12:
            case 13:
                data.meleeAttackAdjust = 0;
                data.meleeDamageAdjust = 0;
                data.weightAllowance = 45;
                data.maxPress = 140;
                data.openDoors = 7;
                data.bendBars = 4;
                data.weightLimits = {
                    base: 45,
                    light: 69,
                    medium: 93,
                    heavy: 117,
                    severe: 140,
                };
                break;
            case 14:
            case 15:
                data.meleeAttackAdjust = 0;
                data.meleeDamageAdjust = 0;
                data.weightAllowance = 55;
                data.maxPress = 170;
                data.openDoors = 8;
                data.bendBars = 7;
                data.weightLimits = {
                    base: 55,
                    light: 85,
                    medium: 115,
                    heavy: 145,
                    severe: 170,
                };
                break;
            case 16:
                data.meleeAttackAdjust = 0;
                data.meleeDamageAdjust = 1;
                data.weightAllowance = 70;
                data.maxPress = 195;
                data.openDoors = 9;
                data.bendBars = 10;
                data.weightLimits = {
                    base: 70,
                    light: 100,
                    medium: 130,
                    heavy: 160,
                    severe: 195,
                };
                break;
            case 17:
                data.meleeAttackAdjust = 1;
                data.meleeDamageAdjust = 1;
                data.weightAllowance = 85;
                data.maxPress = 220;
                data.openDoors = 10;
                data.bendBars = 13;
                data.weightLimits = {
                    base: 85,
                    light: 121,
                    medium: 157,
                    heavy: 193,
                    severe: 220,
                };
                break;
            case 18:
                //TODO: percentile strength
                data.meleeAttackAdjust = 1;
                data.meleeDamageAdjust = 2;
                data.weightAllowance = 110;
                data.maxPress = 255;
                data.openDoors = 11;
                data.bendBars = 16;
                data.weightLimits = {
                    base: 110,
                    light: 149,
                    medium: 188,
                    heavy: 227,
                    severe: 255,
                };
                break;
            case 19:
                data.meleeAttackAdjust = 3;
                data.meleeDamageAdjust = 7;
                data.weightAllowance = 485;
                data.maxPress = 640;
                data.openDoors = 16;
                data.bendBars = 50;
                break;
            case 20:
                data.meleeAttackAdjust = 3;
                data.meleeDamageAdjust = 8;
                data.weightAllowance = 535;
                data.maxPress = 700;
                data.openDoors = 17;
                data.bendBars = 60;
                break;
            case 21:
                data.meleeAttackAdjust = 4;
                data.meleeDamageAdjust = 9;
                data.weightAllowance = 635;
                data.maxPress = 810;
                data.openDoors = 17;
                data.bendBars = 70;
                break;
            case 22:
                data.meleeAttackAdjust = 4;
                data.meleeDamageAdjust = 10;
                data.weightAllowance = 785;
                data.maxPress = 970;
                data.openDoors = 18;
                data.bendBars = 80;
                break;
            case 23:
                data.meleeAttackAdjust = 5;
                data.meleeDamageAdjust = 11;
                data.weightAllowance = 935;
                data.maxPress = 1130;
                data.openDoors = 18;
                data.bendBars = 90;
                break;
            case 24:
                data.meleeAttackAdjust = 6;
                data.meleeDamageAdjust = 12;
                data.weightAllowance = 1235;
                data.maxPress = 1440;
                data.openDoors = 19;
                data.bendBars = 95;
                break;
            case 25:
                data.meleeAttackAdjust = 7;
                data.meleeDamageAdjust = 14;
                data.weightAllowance = 1535;
                data.maxPress = 1750;
                data.openDoors = 19;
                data.bendBars = 99;
                break;
            default:
                data.meleeAttackAdjust = 0;
                data.meleeDamageAdjust = 0;
                data.weightAllowance = 0;
                data.maxPress = 0;
                data.openDoors = 0;
                data.bendBars = 0;
                break;
        }
    }

    _preparePCDerivedDataDex(data) {
        const dex = data.dex;
        switch (dex) {
            case 1:
                data.missileHitAdjust = -6;
                data.defenseAdjust = -5;
                break;
            case 2:
                data.missileHitAdjust = -4;
                data.defenseAdjust = -5;
                break;
            case 3:
                data.missileHitAdjust = -3;
                data.defenseAdjust = -4;
                break;
            case 4:
                data.missileHitAdjust = -2;
                data.defenseAdjust = -3;
                break;
            case 5:
                data.missileHitAdjust = -1;
                data.defenseAdjust = -2;
                break;
            case 6:
                data.missileHitAdjust = 0;
                data.defenseAdjust = -1;
                break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                data.missileHitAdjust = 0;
                data.defenseAdjust = 0;
                break;
            case 15:
                data.missileHitAdjust = 0;
                data.defenseAdjust = 1;
                break;
            case 16:
                data.missileHitAdjust = 1;
                data.defenseAdjust = 2;
                break;
            case 17:
                data.missileHitAdjust = 2;
                data.defenseAdjust = 3;
                break;
            case 18:
                data.missileHitAdjust = 2;
                data.defenseAdjust = 4;
                break;
            case 19:
            case 20:
                data.missileHitAdjust = 3;
                data.defenseAdjust = 4;
                break;
            case 21:
            case 22:
            case 23:
                data.missileHitAdjust = 4;
                data.defenseAdjust = 5;
                break;
            case 24:
            case 25:
                data.missileHitAdjust = 5;
                data.defenseAdjust = 6;
                break;
            default:
                data.missileHitAdjust = 0;
                data.defenseAdjust = 0;
        }
    }

    _preparePCDerivedDataCon(data) {
        const con = data.con;
        switch (con) {
            case 1:
                data.hitPointAdjust = -3;
                data.systemShock = 25;
                data.poisonSave = -2;
                data.regen = 'None';
                break;
            case 2:
                data.hitPointAdjust = -2;
                data.systemShock = 30;
                data.poisonSave = -1;
                data.regen = 'None';
                break;
            case 3:
                data.hitPointAdjust = -2;
                data.systemShock = 35;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 4:
                data.hitPointAdjust = -1;
                data.systemShock = 40;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 5:
                data.hitPointAdjust = -1;
                data.systemShock = 45;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 6:
                data.hitPointAdjust = -1;
                data.systemShock = 50;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 7:
                data.hitPointAdjust = 0;
                data.systemShock = 55;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 8:
                data.hitPointAdjust = 0;
                data.systemShock = 60;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 9:
                data.hitPointAdjust = 0;
                data.systemShock = 65;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 10:
                data.hitPointAdjust = 0;
                data.systemShock = 70;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 11:
                data.hitPointAdjust = 0;
                data.systemShock = 75;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 12:
                data.hitPointAdjust = 0;
                data.systemShock = 80;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 13:
                data.hitPointAdjust = 0;
                data.systemShock = 85;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 14:
                data.hitPointAdjust = 0;
                data.systemShock = 88;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 15:
                data.hitPointAdjust = 1;
                data.systemShock = 90;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 16:
                data.hitPointAdjust = 2;
                data.systemShock = 95;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 17:
                data.hitPointAdjust = 2;
                data.systemShock = 97;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 18:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
            case 19:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 1;
                data.regen = 'None';
                break;
            case 20:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 1;
                data.regen = '1/6 turns';
                break;
            case 21:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 2;
                data.regen = '1/5 turns';
                break;
            case 22:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 2;
                data.regen = '1/4 turns';
                break;
            case 23:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 3;
                data.regen = '1/3 turns';
                break;
            case 24:
                data.hitPointAdjust = 2;
                data.systemShock = 99;
                data.poisonSave = 3;
                data.regen = '1/2 turns';
                break;
            case 25:
                data.hitPointAdjust = 2;
                data.systemShock = 100;
                data.poisonSave = 4;
                data.regen = '1 turn';
                break;
            default:
                data.hitPointAdjust = 0;
                data.systemShock = 0;
                data.poisonSave = 0;
                data.regen = 'None';
                break;
        }
    }

    _preparePCDerivedDataInt(data) {
        const int = data.int;
        switch (int) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                data.numLanguages = 1;
                data.maxSpellLevel = 0;
                data.spellLearnChance = 0;
                data.maxSpellPerLevel = 0;
                break;
            case 9:
                data.numLanguages = 2;
                data.maxSpellLevel = 4;
                data.spellLearnChance = 35;
                data.maxSpellPerLevel = 6;
                break;
            case 10:
                data.numLanguages = 2;
                data.maxSpellLevel = 5;
                data.spellLearnChance = 40;
                data.maxSpellPerLevel = 7;
                break;
            case 11:
                data.numLanguages = 2;
                data.maxSpellLevel = 5;
                data.spellLearnChance = 45;
                data.maxSpellPerLevel = 7;
                break;
            case 12:
                data.numLanguages = 3;
                data.maxSpellLevel = 6;
                data.spellLearnChance = 50;
                data.maxSpellPerLevel = 7;
                break;
            case 13:
                data.numLanguages = 3;
                data.maxSpellLevel = 6;
                data.spellLearnChance = 55;
                data.maxSpellPerLevel = 9;
                break;
            case 14:
                data.numLanguages = 4;
                data.maxSpellLevel = 7;
                data.spellLearnChance = 60;
                data.maxSpellPerLevel = 9;
                break;
            case 15:
                data.numLanguages = 4;
                data.maxSpellLevel = 7;
                data.spellLearnChance = 65;
                data.maxSpellPerLevel = 11;
                break;
            case 16:
                data.numLanguages = 5;
                data.maxSpellLevel = 8;
                data.spellLearnChance = 70;
                data.maxSpellPerLevel = 11;
                break;
            case 17:
                data.numLanguages = 6;
                data.maxSpellLevel = 8;
                data.spellLearnChance = 75;
                data.maxSpellPerLevel = 14;
                break;
            case 18:
                data.numLanguages = 7;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 85;
                data.maxSpellPerLevel = 18;
                break;
            case 19:
                data.numLanguages = 8;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 95;
                data.maxSpellPerLevel = 99;
                break;
            case 20:
                data.numLanguages = 9;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 96;
                data.maxSpellPerLevel = 99;
                break;
            case 21:
                data.numLanguages = 10;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 97;
                data.maxSpellPerLevel = 99;
                break;
            case 22:
                data.numLanguages = 11;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 98;
                data.maxSpellPerLevel = 99;
                break;
            case 23:
                data.numLanguages = 12;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 99;
                data.maxSpellPerLevel = 99;
                break;
            case 24:
                data.numLanguages = 15;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 100;
                data.maxSpellPerLevel = 99;
                break;
            case 25:
                data.numLanguages = 20;
                data.maxSpellLevel = 9;
                data.spellLearnChance = 100;
                data.maxSpellPerLevel = 99;
                break;
            default:
                break;
        }
    }

    _preparePCDerivedDataWis(data) {
        const wis = data.wis;
        switch (wis) {
            case 1:
                data.magicDefenseAdjust = -6;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 80;
                break;
            case 2:
                data.magicDefenseAdjust = -4;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 60;
                break;
            case 3:
                data.magicDefenseAdjust = -3;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 50;
                break;
            case 4:
                data.magicDefenseAdjust = -2;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 45;
                break;
            case 5:
                data.magicDefenseAdjust = -1;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 40;
                break;
            case 6:
                data.magicDefenseAdjust = -1;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 35;
                break;
            case 7:
                data.magicDefenseAdjust = -1;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 30;
                break;
            case 8:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 25;
                break;
            case 9:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 20;
                break;
            case 10:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 15;
                break;
            case 11:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 10;
                break;
            case 12:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 5;
                break;
            case 13:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = '1st';
                data.chanceSpellFailure = 0;
                break;
            case 14:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = '1st';
                data.chanceSpellFailure = 0;
                break;
            case 15:
                data.magicDefenseAdjust = 1;
                data.bonusSpells = '2nd';
                data.chanceSpellFailure = 0;
                break;
            case 16:
                data.magicDefenseAdjust = 2;
                data.bonusSpells = '2nd';
                data.chanceSpellFailure = 0;
                break;
            case 17:
                data.magicDefenseAdjust = 3;
                data.bonusSpells = '3rd';
                data.chanceSpellFailure = 0;
                break;
            case 18:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '4th';
                data.chanceSpellFailure = 0;
                break;
            case 19:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '1st, 3rd';
                data.chanceSpellFailure = 0;
                break;
            case 20:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '2nd, 4th';
                data.chanceSpellFailure = 0;
                break;
            case 21:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '3rd, 5th';
                data.chanceSpellFailure = 0;
                break;
            case 22:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '4th, 5th';
                data.chanceSpellFailure = 0;
                break;
            case 23:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '1st, 6th';
                data.chanceSpellFailure = 0;
                break;
            case 24:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '5th, 6th';
                data.chanceSpellFailure = 0;
                break;
            case 25:
                data.magicDefenseAdjust = 4;
                data.bonusSpells = '6th, 7th';
                data.chanceSpellFailure = 0;
                break;
            default:
                data.magicDefenseAdjust = 0;
                data.bonusSpells = 'None';
                data.chanceSpellFailure = 0;
                break;
        }
    }

    _preparePCDerivedDataCha(data) {
        const cha = data.cha;
        switch (cha) {
            case 1:
                data.maxHenchmen = 0;
                data.loyaltyBase = -8;
                data.reactionAdjust = -7;
                break;
            case 2:
                data.maxHenchmen = 1;
                data.loyaltyBase = -7;
                data.reactionAdjust = -6;
                break;
            case 3:
                data.maxHenchmen = 1;
                data.loyaltyBase = -6;
                data.reactionAdjust = -5;
                break;
            case 4:
                data.maxHenchmen = 1;
                data.loyaltyBase = -5;
                data.reactionAdjust = -4;
                break;
            case 5:
                data.maxHenchmen = 2;
                data.loyaltyBase = -4;
                data.reactionAdjust = -3;
                break;
            case 6:
                data.maxHenchmen = 2;
                data.loyaltyBase = -3;
                data.reactionAdjust = -2;
                break;
            case 7:
                data.maxHenchmen = 3;
                data.loyaltyBase = -2;
                data.reactionAdjust = -1;
                break;
            case 8:
                data.maxHenchmen = 3;
                data.loyaltyBase = -1;
                data.reactionAdjust = 0;
                break;
            case 9:
                data.maxHenchmen = 4;
                data.loyaltyBase = 0;
                data.reactionAdjust = 0;
                break;
            case 10:
                data.maxHenchmen = 4;
                data.loyaltyBase = 0;
                data.reactionAdjust = 0;
                break;
            case 11:
                data.maxHenchmen = 4;
                data.loyaltyBase = 0;
                data.reactionAdjust = 0;
                break;
            case 12:
                data.maxHenchmen = 5;
                data.loyaltyBase = 0;
                data.reactionAdjust = 0;
                break;
            case 13:
                data.maxHenchmen = 5;
                data.loyaltyBase = 0;
                data.reactionAdjust = 1;
                break;
            case 14:
                data.maxHenchmen = 6;
                data.loyaltyBase = 1;
                data.reactionAdjust = 2;
                break;
            case 15:
                data.maxHenchmen = 7;
                data.loyaltyBase = 3;
                data.reactionAdjust = 3;
                break;
            case 16:
                data.maxHenchmen = 8;
                data.loyaltyBase = 4;
                data.reactionAdjust = 5;
                break;
            case 17:
                data.maxHenchmen = 10;
                data.loyaltyBase = 6;
                data.reactionAdjust = 6;
                break;
            case 18:
                data.maxHenchmen = 15;
                data.loyaltyBase = 8;
                data.reactionAdjust = 7;
                break;
            case 19:
                data.maxHenchmen = 20;
                data.loyaltyBase = 10;
                data.reactionAdjust = 8;
                break;
            case 20:
                data.maxHenchmen = 25;
                data.loyaltyBase = 12;
                data.reactionAdjust = 9;
                break;
            case 21:
                data.maxHenchmen = 30;
                data.loyaltyBase = 14;
                data.reactionAdjust = 10;
                break;
            case 22:
                data.maxHenchmen = 35;
                data.loyaltyBase = 16;
                data.reactionAdjust = 11;
                break;
            case 23:
                data.maxHenchmen = 40;
                data.loyaltyBase = 18;
                data.reactionAdjust = 12;
                break;
            case 24:
                data.maxHenchmen = 45;
                data.loyaltyBase = 20;
                data.reactionAdjust = 13;
                break;
            case 25:
                data.maxHenchmen = 50;
                data.loyaltyBase = 20;
                data.reactionAdjust = 14;
                break;
            default:
                data.maxHenchmen = 0;
                data.loyaltyBase = 0;
                data.reactionAdjust = 0;
                break;
        }
    }

    _preparePCDerivedDataPer(data) {
        const per = data.per;
        switch (per) {
            case 1:
                data.surpriseAdjust = -6;
                data.illusionImmunity = 'None';
                break;
            case 2:
                data.surpriseAdjust = -5;
                data.illusionImmunity = 'None';
                break;
            case 3:
                data.surpriseAdjust = -3;
                data.illusionImmunity = 'None';
                break;
            case 4:
                data.surpriseAdjust = -2;
                data.illusionImmunity = 'None';
                break;
            case 5:
                data.surpriseAdjust = -1;
                data.illusionImmunity = 'None';
                break;
            case 6:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 7:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 8:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 9:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 10:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 11:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 12:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 13:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 14:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 15:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
            case 16:
                data.surpriseAdjust = 1;
                data.illusionImmunity = 'None';
                break;
            case 17:
                data.surpriseAdjust = 2;
                data.illusionImmunity = 'None';
                break;
            case 18:
                data.surpriseAdjust = 2;
                data.illusionImmunity = 'None';
                break;
            case 19:
                data.surpriseAdjust = 3;
                data.illusionImmunity = '1st level';
                break;
            case 20:
                data.surpriseAdjust = 3;
                data.illusionImmunity = '2nd level';
                break;
            case 21:
                data.surpriseAdjust = 4;
                data.illusionImmunity = '3rd level';
                break;
            case 22:
                data.surpriseAdjust = 4;
                data.illusionImmunity = '4th level';
                break;
            case 23:
                data.surpriseAdjust = 4;
                data.illusionImmunity = '5th level';
                break;
            case 24:
                data.surpriseAdjust = 5;
                data.illusionImmunity = '6th level';
                break;
            case 25:
                data.surpriseAdjust = 5;
                data.illusionImmunity = '7th level';
                break;
            default:
                data.surpriseAdjust = 0;
                data.illusionImmunity = 'None';
                break;
        }
    }

    _preparePCDerivedDataSavingThrows(data) {
        const throws = data.data.savingThrows;
        throws.ppd = 0;
        throws.rsw = 0;
        throws.pepo = 0;
        throws.brw = 0;
        throws.spell = 0;
        for (let i of data.items) {
            const itemData = i.data.data;
            if (i.data.type === 'throwMod' && itemData.active) {
                const ppd = parseInt(itemData.ppd) || 0;
                const rsw = parseInt(itemData.rsw) || 0;
                const pepo = parseInt(itemData.pepo) || 0;
                const brw = parseInt(itemData.brw) || 0;
                const spell = parseInt(itemData.spell) || 0;
                const all = parseInt(itemData.all) || 0;
                throws.ppd += ppd + all;
                throws.rsw += rsw + all;
                throws.pepo += pepo + all;
                throws.brw += brw + all;
                throws.spell += spell + all;
            }
        }
    }

    _preparePCDerivedDataAC(data) {
        const ac = data.data.armorClasses;
        for (let i of data.items) {
            const itemData = i.data.data;
            if (i.data.type === 'acMod' && itemData.active) {
                const natural = parseInt(itemData.natural) || 0;
                const dexterity = parseInt(itemData.dexterity) || 0;
                const armor = parseInt(itemData.armor) || 0;
                const shield = parseInt(itemData.shield) || 0;
                const magic = parseInt(itemData.magic) || 0;
                ac.natural += natural;
                ac.dexterity += dexterity;
                ac.armor += armor;
                ac.shield += shield;
                ac.magic += magic;
            }
        }
        ac.encumbrance = 0; // TODO: encumbrance affects AC

        ac.total =
            ac.natural +
            ac.dexterity +
            ac.armor +
            ac.shield +
            ac.magic +
            ac.encumbrance;
        ac.touch =
            ac.natural + ac.dexterity + ac.shield + ac.magic + ac.encumbrance;
        ac.back = ac.natural + ac.armor + ac.magic + ac.encumbrance;
        ac.surprise = ac.total - 2;
    }

    _preparePCDerivedDataHitAdjust(data) {
        const hit = data.data.hitAdjust;
        for (let i of data.items) {
            const itemData = i.data.data;
            if (i.data.type === 'hitMod' && itemData.active) {
                const melee = parseInt(itemData.melee) || 0;
                const missile = parseInt(itemData.missile) || 0;
                const thrown = parseInt(itemData.thrown) || 0;
                hit.melee += melee;
                hit.missile += missile;
                hit.thrown += thrown;
            }
        }
    }

    _preparePCDerivedDataItems(data) {
        const gearTabs = new Map();
        const spellTabs = data.data.spellTabs;

        data.items.forEach((item) => {
            if (item.type === 'gearTab') {
                gearTabs.set(item.id, {
                    tab: item,
                    items: [],
                });
                item.data.data.length = 0;
                item.data.data.weight = 0;
            } else if (item.type === 'gear') {
                if (gearTabs.has(item.data.data.tab)) {
                    const tab = gearTabs.get(item.data.data.tab);
                    tab.items.push(item);
                    tab.tab.data.data.length += 1;
                    tab.tab.data.data.weight +=
                        Number(item.data.data.weight) *
                        Number(item.data.data.quantity);
                }
            } else if (item.type === 'nonWeaponProficiency')
                item.data.data.total =
                    Number(item.data.data.base) + Number(item.data.data.adjust);
            else if (item.type === 'spell')
                spellTabs[item.data.data.level].spells.push(item);
        });

        data.data.gearTabs = gearTabs;
    }

    _preparePCDerivedDataEncumbrance(data) {
        // calculate equipped weight
        let equippedWeight = 0;
        data.data.gearTabs.forEach((tab) => {
            const tabData = tab.tab.data.data;
            if (tabData.equipped) equippedWeight += tabData.weight;
        });
        data.data.equippedWeight = equippedWeight;

        // calculate movement modifiers
        const baseSpeed = data.data.speed;
        const speedLevels = {
            base: baseSpeed,
            light: Math.floor(baseSpeed * (2 / 3)),
            medium: Math.floor(baseSpeed * (1 / 2)),
            heavy: Math.floor(baseSpeed * (1 / 3)),
            severe: 1,
        };
        data.data.speedLevels = speedLevels;

        // determine which encumbrance category currently applies
        let currentEncumbrance = '';
        const weightLimits = data.data.weightLimits;
        if (weightLimits) {
            if (equippedWeight <= weightLimits.base)
                currentEncumbrance = 'base';
            else if (equippedWeight <= weightLimits.light)
                currentEncumbrance = 'light';
            else if (equippedWeight <= weightLimits.medium)
                currentEncumbrance = 'medium';
            else if (equippedWeight <= weightLimits.heavy)
                currentEncumbrance = 'heavy';
            else if (equippedWeight <= weightLimits.severe)
                currentEncumbrance = 'severe';
        }
        data.data.currentEncumbrance = currentEncumbrance;
    }
}
