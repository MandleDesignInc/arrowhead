export class MdlSlide {

    link: string;
    linkIsExternal: boolean;

    constructor(public id: string, public caption: string, public image: string, public state: string = 'inactive') {

    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }

    static fromData(data: MdlSlideData): MdlSlide {

        let slide = new MdlSlide(data.id, data.caption, data.image);

        slide.link = data.link;

        if (slide.link && slide.link.substr(0, 4).toLowerCase() === 'http') slide.linkIsExternal = true;

        return slide;
    }
}

export class MdlSlideData {
    id: string;
    caption: string;
    image: string;
    link: string;
}