export const registerHandlebarsHelpers = () => {
    Handlebars.registerHelper('log', (x) => console.log(x));
    Handlebars.registerHelper('or', (a, b) => a || b);

    Handlebars.registerHelper('anyActiveMods', (mods) => {
        for (const mod of mods) {
            console.log(mod);
            if (mod.active) return true;
        }
        return false;
    });
};
