export class TwoDotNealActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['twodotneal', 'sheet', 'actor'],
            template: 'systems/fvtt-2neal/templates/actor-sheet.html',
            width: 600,
            height: 600,
            tabs: [
                {
                    navSelector: '.sheet-tabs',
                    contentSelector: '.sheet-body',
                    initial: 'basic',
                },
            ],
        });
    }

    getData() {
        const context = super.getData();
        const actorData = context.actor.data;
        switch (actorData.type) {
            case 'pc':
                this._preparePCData(context);
                break;
        }
        context.rollData = context.actor.getRollData();
        return context;
    }

    _preparePCData(context) {
        context.alignmentChoices = {
            '(choose one)': '(choose one)',
            'Lawful Good': 'Lawful Good',
            'Lawful Neutral': 'Lawful Neutral',
            'Lawful Evil': 'Lawful Evil',
            'Neutral Good': 'Neutral Good',
            'Neutral Neutral': 'Neutral Neutral',
            'Neutral Evil': 'Neutral Evil',
            'Chaotic Good': 'Chaotic Good',
            'Chaotic Neutral': 'Chaotic Neutral',
            'Chaotic Evil': 'Chaotic Evil',
        };
    }

    activateListeners(html) {
        super.activateListeners(html);
    }
}
