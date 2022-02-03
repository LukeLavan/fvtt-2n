export class TwoDotNealActor extends Actor {
    prepareDerivedData() {
        const actorData = this.data;
        switch (actorData.type) {
            case 'pc':
                this._preparePCDerivedData(actorData);
                break;
        }
    }

    _preparePCDerivedData(actorData) {
        const data = actorData.data;
        data.humanity = 99;
        console.log(data);
    }
}
