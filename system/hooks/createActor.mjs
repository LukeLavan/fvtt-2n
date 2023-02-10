const createPlayerCharacter = async (actor) => {
    // default 'equipment' gearTab
    const gearTab = await Item.create(
        {
            name: 'Equipment',
            type: 'gearTab',
            data: {
                equipped: true,
                default: true,
                locked: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.defaultGearTab': gearTab._id});
    actor.update({'data.equipmentGearTab': gearTab._id});
    actor.system.defaultGearTab = gearTab._id;
    actor.system.equipmentGearTab = gearTab._id;

    // stat-based combat modifiers
    const statHitMod = await Item.create(
        {
            name: 'STR/DEX',
            type: 'hitMod',
            data: {
                melee: '0',
                missile: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.statHitMod': statHitMod._id});

    const statAcMod = await Item.create(
        {
            name: 'DEX',
            type: 'acMod',
            data: {
                dexterity: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.statAcMod': statAcMod._id});

    // encumbrance-based combat modifiers
    const encumbranceHitMod = await Item.create(
        {
            name: 'Encumbrance',
            type: 'hitMod',
            data: {
                melee: '0',
                missile: '0',
                thrown: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.encumbranceHitMod': encumbranceHitMod._id});

    const encumbranceAcMod = await Item.create(
        {
            name: 'Encumbrance',
            type: 'acMod',
            data: {
                natural: '0',
                locked: true,
                protected: true,
            },
        },
        {parent: actor}
    );
    actor.update({'data.encumbranceAcMod': encumbranceAcMod._id});
};

export const createActor = async (actor) => {
    switch (actor.type) {
        case 'pc':
            createPlayerCharacter(actor);
    }
};
