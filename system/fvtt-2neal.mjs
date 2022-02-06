import {TwoDotNealActor} from './actor.mjs';
import {TwoDotNealActorSheet} from './actor-sheet.mjs';

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
});

// make rolls show dice automatically
Hooks.on('renderChatMessage', function (message) {
    setTimeout(() => {
        $(
            `li.chat-message[data-message-id="${message.id}"] div.dice-tooltip`
        ).css('display', 'block');
    }, 250);
});
