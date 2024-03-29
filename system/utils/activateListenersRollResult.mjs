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
};
