import {TwoDotNealActor} from './actor.mjs';
import {TwoDotNealActorSheet} from './actor-sheet.mjs';

/* console.log Handlebars helper */
Handlebars.registerHelper('log', (x) => console.log(x));

/* FoundryVTT hooks */
Hooks.once('init', async function () {
    console.log('Initializing 2.Neal system');

    CONFIG.Combat.initiative = {
        formula: '1d10',
        decimals: 0,
    };

    CONFIG.Actor.documentClass = TwoDotNealActor;
    //CONFIG.Item.documentClass = TwoDotNealItem;
    //CONFIG.Token.documentClass = TwoDotNealTokenDocument;
    //CONFIG.Token.objectClass = TwoDotNealToken;

    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet('fvtt-2neal', TwoDotNealActorSheet, {
        makeDefault: true,
    });
    //Actors.unregisterSheet('core', ItemSheet);
    //Actors.registerSheet('fvtt-2neal', TwoDotNealItemSheet, {
    //    makeDefault: true,
    //});

    game.settings.register('fvtt-2neal', 'createItemTypesHidden', {
        name: 'Hidden Item Types',
        hint: 'Hides items in create item dialog',
        scope: 'client',
        config: true,
        type: String,
        default:
            'throwMod, acMod, hitMod, gearTab, nonWeaponProficiency, weaponProficiency',
        onChange: (value) => {
            console.log(value);
        },
    });
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
        let content = html[0].innerHTML;
        const types = game.settings
            .get('fvtt-2neal', 'createItemTypesHidden')
            .split(',');

        // remove selected attribute
        content = content.replace(' selected=""', '');

        // remove options
        types.map((type) => {
            type = type.trim();
            content = content.replace(
                '<option value="' + type + '">' + type + '</option>',
                ''
            );
        });

        html[0].innerHTML = content;
    }
});
