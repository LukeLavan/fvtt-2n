/**
 * Activates listeners for a rollResult template;
 * Arguments come from renderChatMessage hook
 */
export const activateListenersRollResult = (_message, html, _data) => {
    html.find('.rollResult-collapse').click((_ev) => {
        html.find('.rollResult-mods').toggle();
        if (html.find('.rollResult-mods').css('display') === 'none')
            html.find('.rollResult-collapse').text('Show all modifiers...');
        else html.find('.rollResult-collapse').text('Hide all modifiers');
    });

    html.find('.rollResult-attack').click(async (ev) => {
        const currentTarget = ev.currentTarget,
            dataset = currentTarget.dataset,
            linkedid = dataset.linkedid,
            attackRollId = linkedid + '-toHit',
            parentId = dataset.parentid,
            parentActor = game.actors.get(parentId),
            rollConfigs = parentActor.system.rollConfigs,
            rollConfig = rollConfigs.get(attackRollId);

        if (ev.shiftKey) {
            rollConfig.sheet.roll();
            return;
        }
        rollConfig.sheet.render(true);
    });

    html.find('.rollResult-damage').click(async (ev) => {
        const currentTarget = ev.currentTarget,
            dataset = currentTarget.dataset,
            linkedid = dataset.linkedid,
            damageRollId = linkedid + '-damageRoll',
            parentid = dataset.parentid,
            parentActor = game.actors.get(parentid),
            item = parentActor.items.get(linkedid),
            label = 'damage with ' + item.name,
            rollConfigs = parentActor.system.rollConfigs;

        if (!rollConfigs.has(damageRollId)) {
            // never rolled damage before, add new rollConfig
            const damageRollConfig = await Item.create(
                {
                    name: label,
                    type: 'rollConfig',
                    data: {
                        parentid: parentActor.id,
                        label: label,
                        roll: item.system.damageRoll,
                        rollid: damageRollId,
                    },
                },
                {parent: parentActor}
            );

            rollConfigs.set(damageRollId, damageRollConfig);
        }

        // rollConfig now guaranteed to exist
        const rollConfig = rollConfigs.get(damageRollId);

        // update rollConfig from weapon data
        await parentActor.update({
            items: [
                {
                    _id: rollConfig.id,
                    system: {
                        roll: item.system.damageRoll,
                    },
                },
            ],
        });
        rollConfigs.set(damageRollId, rollConfig);

        if (ev.shiftKey) {
            rollConfig.sheet.roll();
            return;
        }
        rollConfig.sheet.render(true);
    });
};
