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

document.getElementById("pixi-content").style.background = "#" + "000000"; //app.renderer.backgroundColor.toString(16);
document.getElementById("pixi-content").appendChild(app.view);

Loader.shared.add("logo", "./img/logo.png");
Loader.shared.onComplete.once(() => {
	app.stage.addChild(new Main());
});
Loader.shared.load();

document.body.onload = () => {
	window.onresize = () => {
		const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

		//comment this to keep the size fixed
		const scale = Math.min(w / WIDTH, h / HEIGHT);
		if (!app.resizeTo) {
			app.view.style.width = Math.floor(scale * WIDTH) + "px";
			app.view.style.height = Math.floor(scale * HEIGHT) + "px";
			app.view.style.marginLeft = app.view.style.marginRight = (w - Math.floor(scale * WIDTH)) / 2 + "px";
			app.view.style.marginTop = app.view.style.marginBottom = (h - Math.floor(scale * HEIGHT)) / 2 + "px";
		}
		app.stage.emit("resize", w, h);
	};
	window.onresize(null);
};

export { app as App };
