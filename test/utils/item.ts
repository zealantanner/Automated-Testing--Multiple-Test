
class Item {
    constructor(
        private element:WebdriverIO.Element,
    ) {}
    public get name() {
        return this.element.$('.inventory_item_name').getText()
    }
    public get id() {
        return (async () => {
            const idAttr = await this.element.$('[id^="item_"][id$="_title_link"]').getAttribute('id')
            const match = idAttr.match(/item_(\d+)_title_link/)
            return match ? parseInt(match[1]) : null
        })()
    }
}
