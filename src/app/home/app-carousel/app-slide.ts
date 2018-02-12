export class AppSlide {

  constructor(public id: string, public caption: string, public image: string, public link: string, public state: string = 'inactive') {}

  static fromData(data: AppSlideData): AppSlide {

    return new AppSlide(data.id, data.caption, data.image, data.link);

  }

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

}

export class AppSlideData {
  id: string;
  caption: string;
  image: string;
  link: string;
}


// TODO: refactor / simplify
