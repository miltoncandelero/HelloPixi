import { settings, Application, PRECISION, Loader } from "pixi.js";
import { Main } from "./Main";

// Two constants to represent the ideal size of the game
const WIDTH = 800;
const HEIGHT = 600;

settings.STRICT_TEXTURE_CACHE = true; //Forces you to load you stuff before using it
settings.PRECISION_FRAGMENT = PRECISION.HIGH; //It says that this makes iOS looks better
settings.ANISOTROPIC_LEVEL = 16;

const app = new Application({
	// forceCanvas: true,
	backgroundColor: 0x333333,
	width: WIDTH,
	height: HEIGHT,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	autoStart: true,
	antialias: true,
	clearBeforeRender: true, //squeeze every drop of performance. set to true if things go haywire
	resizeTo: document.getElementById("pixi-content"), // liquid rescale
});

document.getElementById("pixi-content").style.background = "#000000"; //This color will be the one you see if you need to scale your game via CSS
document.getElementById("pixi-content").appendChild(app.view);

//Add assets: .add() as many as you want. Call .load() once.
Loader.shared.add("logo", "./img/logo.png");
Loader.shared.onComplete.once(() => {
	//after we have our assets loaded, we launch our Main
	app.stage.addChild(new Main());
});
Loader.shared.load();

//Add some events to handle resizing correctly
document.body.onload = () => {
	window.onresize = () => {
		//Guess the size of the window
		const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		//If our renderer isn't set to resize, we do CSS magic to keep our game centered. Black bars will cover the rest
		if (!app.resizeTo) {
			const scale = Math.min(w / WIDTH, h / HEIGHT);
			app.view.style.width = Math.floor(scale * WIDTH) + "px";
			app.view.style.height = Math.floor(scale * HEIGHT) + "px";
			app.view.style.marginLeft = app.view.style.marginRight = (w - Math.floor(scale * WIDTH)) / 2 + "px";
			app.view.style.marginTop = app.view.style.marginBottom = (h - Math.floor(scale * HEIGHT)) / 2 + "px";
		}

		//emit a resize event, maybe somebody needs to change its position or size depending on the screen size
		app.stage.emit("resize", w, h);
	};
	window.onresize(null);
};

//Export our app object so we can access the stage and the ticker
export { app as App };
