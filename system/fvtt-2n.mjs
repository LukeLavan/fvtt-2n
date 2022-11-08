import {createActor, TwoNActor} from './actor.mjs';
import {TwoNItem} from './item.mjs';

import {TwoNActorSheet} from './sheets/actor-sheet.mjs';
import {TwoNItemSheet} from './sheets/item-sheet.mjs';
import {TwoNRollConfigSheet} from './sheets/rollConfig-sheet.mjs';
import {TwoNSpellSheet} from './sheets/spell-sheet.mjs';

import {registerAllPartials} from './utils/registerAllPartials.js';
import {rollResultActivateListeners} from './utils/rollResultActivateListeners.mjs';

import {registerSettings} from './settings.mjs';

/* Handlebars helpers */
Handlebars.registerHelper('log', (x) => console.log(x));
Handlebars.registerHelper('or', (a, b) => a || b);

/* FoundryVTT hooks */
Hooks.once('init', async function () {
    console.log('Initializing 2n system');

    registerAllPartials();

    CONFIG.Combat.initiative = {
        formula: '1d10',
        decimals: 0,
    };

    CONFIG.Actor.documentClass = TwoNActor;
    CONFIG.Item.documentClass = TwoNItem;
    //CONFIG.Token.documentClass = TwoNTokenDocument;
    //CONFIG.Token.objectClass = TwoNToken;

    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet('fvtt-2n', TwoNActorSheet, {
        makeDefault: true,
    });
    Items.unregisterSheet('core', ItemSheet);
    Items.registerSheet('fvtt-2n', TwoNItemSheet, {
        types: ['gear', 'weapon'],
        makeDefault: true,
    });
    Items.registerSheet('fvtt-2n', TwoNRollConfigSheet, {
        types: ['rollConfig'],
        makeDefault: true,
    });
    Items.registerSheet('fvtt-2n', TwoNSpellSheet, {
        types: ['spell'],
        makeDefault: true,
    });

    registerSettings();

    import('../lib/Sortable.min.js');
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
            .get('fvtt-2n', 'createItemTypesHidden')
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
Hooks.on('createActor', createActor);

Hooks.on('renderChatMessage', (message, html, data) => {
    if (message.getFlag('fvtt-2n', 'rollResult'))
        rollResultActivateListeners(message, html, data);
});
