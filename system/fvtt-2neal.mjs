import {TwoDotNealActor} from './actor.mjs';
import {TwoDotNealActorSheet} from './actor-sheet.mjs';

import {TwoDotNealItem} from './item.mjs';
import {TwoDotNealItemSheet} from './item-sheet.mjs';

/* Handlebars helpers */
Handlebars.registerHelper('log', (x) => console.log(x));
Handlebars.registerHelper('or', (a, b) => a || b);

/* FoundryVTT hooks */
Hooks.once('init', async function () {
    console.log('Initializing 2.Neal system');

    CONFIG.Combat.initiative = {
        formula: '1d10',
        decimals: 0,
    };

    CONFIG.Actor.documentClass = TwoDotNealActor;
    CONFIG.Item.documentClass = TwoDotNealItem;
    //CONFIG.Token.documentClass = TwoDotNealTokenDocument;
    //CONFIG.Token.objectClass = TwoDotNealToken;

    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet('fvtt-2neal', TwoDotNealActorSheet, {
        makeDefault: true,
    });
    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet('fvtt-2neal', TwoDotNealItemSheet, {
        makeDefault: true,
    });

    game.settings.register('fvtt-2neal', 'createItemTypesHidden', {
        name: 'Hidden Item Types',
        hint: 'Hides items in create item dialog (comma separated list)',
        scope: 'client',
        config: true,
        type: String,
        default:
            'throwMod, acMod, hitMod, gearTab, nonWeaponProficiency, weaponProficiency',
    });

    import('https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js');
});

// make rolls show dice automatically
Hooks.on('renderChatMessage', function (message) {
    setTimeout(() => {
        $(
            `li.chat-message[data-message-id="${message.id}"] div.dice-tooltip`
        ).css('display', 'block');
    }, 250);
});

// restrict types of 'create new item' dialog
Hooks.on('renderDialog', function (dialog, html) {
    if (dialog.data.title === 'Create New Item') {
        const types = game.settings
            .get('fvtt-2neal', 'createItemTypesHidden')
            .replaceAll(' ', '')
            .split(',');
        const select = html.find('select')[0];
        for (let i = 0; i < select.length; ++i) {
            const option = select[i];
            if (types.includes(option.label)) {
                option.remove();
                --i;
            }
        }
    }
});

// add items to new actors
Hooks.on('createActor', async function (actor) {
    const actorData = actor.data;
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

    actor.update({'data.defaultGearTab': gearTab.data._id});
    actor.update({'data.equipmentGearTab': gearTab.data._id});
    actorData.data.defaultGearTab = gearTab.data._id;
    actorData.data.equipmentGearTab = gearTab.data._id;
});
