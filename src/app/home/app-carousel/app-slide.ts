export class AppSlide {

  constructor(public id: string, public caption: string, public image: string, public state: string = 'inactive') {}

  static fromData(data: AppSlideData): AppSlide {

    return new AppSlide(data.id, data.caption, data.image);

  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

}

export class AppSlideData {
  id: string;
  caption: string;
  image: string;

}


// TODO: refactor / simplify
