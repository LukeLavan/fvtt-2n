export const table_06_cha = (data) => {
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
};
