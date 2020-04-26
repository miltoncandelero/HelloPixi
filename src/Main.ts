import { Container, Sprite } from "pixi.js";

export class Main extends Container {
	constructor() {
		super();
		const logo = Sprite.from("logo");
		this.addChild(logo);
	}
}
