export const table_04_int = (data) => {
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
};
