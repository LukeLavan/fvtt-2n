/**
 * Activates listeners for a item sheet chat template;
 * Arguments come from renderChatMessage hook
 */
export const activateListenersItemSheetChat = (_message, html, _data) => {
    html.find('.itemSheet-render').click((ev) => {
        const currentTarget = ev.currentTarget;
        const id = currentTarget.dataset.id;
        const owner = currentTarget.dataset.parent;
        if (owner) {
            game.actors.get(owner).items.get(id).sheet.render(true);
        } else {
            game.items.get(id).sheet.render(true);
        }
    });
};
