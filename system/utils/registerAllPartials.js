// gets called during init

const partials = {
    pcTabBasic: 'systems/fvtt-2n/templates/partials/pc/basic.html',
    pcTabCombat: 'systems/fvtt-2n/templates/partials/pc/combat.html',
    pcTabGear: 'systems/fvtt-2n/templates/partials/pc/gear.html',
    pcTabSkills: 'systems/fvtt-2n/templates/partials/pc/skills.html',
    pcTabSpells: 'systems/fvtt-2n/templates/partials/pc/spells.html',
};

export const registerAllPartials = async () => {
    return await loadTemplates(partials);
};
