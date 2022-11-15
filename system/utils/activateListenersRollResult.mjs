/**
 * Activates listeners for a rollResult template;
 * Arguments come from renderChatMessage hook
 */
export const activateListenersRollResult = (_message, html, _data) => {
    html.find('.rollResult-collapse').click((_ev) => {
        html.find('.rollResult-mods').toggle();
    });
};
