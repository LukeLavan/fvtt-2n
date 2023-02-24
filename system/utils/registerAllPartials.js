// gets called during init

const path = 'systems/fvtt-2n/templates/partials/';

const partials = {
    pcTabBasic: path + 'pc/basic.html',
    pcTabCombat: path + 'pc/combat.html',
    pcTabGear: path + 'pc/gear.html',
    pcTabSkills: path + 'pc/skills.html',
    pcTabSpells: path + 'pc/spells.html',

    rollResultsModTable: path + 'rollResults/modTable.html',
    rollResultsResult: path + 'rollResults/result.html',
};

export const registerAllPartials = async () => {
    return await loadTemplates(partials);
};
