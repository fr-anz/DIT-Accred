/* Dithered dusk skyline: the PUP Pylon, the Obelisk and the Main Building.

   The scene is painted once in grayscale, where the value is the amount of light.
   Each frame adds the moving parts (birds, lagoon ripples, sun glitter), then an
   8×8 Bayer matrix quantizes the light to the brand inks, darkest first. Ordered
   dithering keeps still pixels still, so only the parts that move shimmer. */

export type Rgb = [number, number, number];

/* Design height in scene units. Everything is drawn in units and scaled to fit. */
const SCENE_H = 300;
const GROUND = 236;
const WATER = 250;

const BAYER = (() => {
	const m = [0, 2, 3, 1];
	let size = 2;
	let cells = [0, 2, 3, 1];
	while (size < 8) {
		const next: number[] = [];
		for (let y = 0; y < size * 2; y++)
			for (let x = 0; x < size * 2; x++) {
				const q = m[(y >= size ? 2 : 0) + (x >= size ? 1 : 0)];
				next.push(4 * cells[(y % size) * size + (x % size)] + q);
			}
		cells = next;
		size *= 2;
	}
	return Float32Array.from(cells, (c) => (c + 0.5) / 64);
})();

/* Interleaved gradient noise: a stable, blue-ish rank used to dissolve the art in. */
const ign = (x: number, y: number) => {
	const v = 52.9829189 * ((0.06711056 * x + 0.00583715 * y) % 1);
	return v - Math.floor(v);
};

function random(seed: number) {
	return () => {
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const gray = (v: number, a = 1) => {
	const c = Math.round(Math.min(1, Math.max(0, v)) * 255);
	return a === 1 ? `rgb(${c},${c},${c})` : `rgba(${c},${c},${c},${a})`;
};

type Layout = {
	width: number;
	sun: { x: number; y: number; r: number };
	pylon: { x: number; w: number };
	building: { x: number; w: number };
	obeliskX: number;
};

function layoutFor(width: number): Layout {
	const pylonW = 3 * 52 + 2 * 3;
	const pylonX = Math.min(Math.max(width * 0.08, 34), 220);
	const buildingW = Math.min(Math.max(width * 0.3, 290), 520);
	const buildingX = width - buildingW - Math.min(Math.max(width * 0.05, 22), 140);
	const gapStart = pylonX + pylonW;
	return {
		width,
		sun: { x: gapStart + (buildingX - gapStart) * 0.48, y: 176, r: Math.min(46, width * 0.06) },
		pylon: { x: pylonX, w: pylonW },
		building: { x: buildingX, w: buildingW },
		obeliskX: buildingX + buildingW * 0.24
	};
}

function canopy(
	ctx: CanvasRenderingContext2D,
	rand: () => number,
	cx: number,
	top: number,
	rx: number,
	litSide: number
) {
	const ry = GROUND - top;
	const cy = GROUND;
	for (let k = 0; k < 220; k++) {
		const a = Math.PI + rand() * Math.PI;
		const d = Math.sqrt(rand());
		const x = cx + Math.cos(a) * rx * d;
		const y = cy + Math.sin(a) * ry * d;
		ctx.fillStyle = gray(0.08 + rand() * 0.06);
		ctx.beginPath();
		ctx.arc(x, y, 5 + rand() * 7, 0, Math.PI * 2);
		ctx.fill();
	}
	// Leaves catching the low sun on one side of the crown.
	for (let k = 0; k < 160; k++) {
		const a = Math.PI + rand() * Math.PI;
		const d = 0.55 + rand() * 0.45;
		const x = cx + Math.cos(a) * rx * d;
		const y = cy + Math.sin(a) * ry * d;
		const facing = (x - cx) * litSide > 0 ? 1 : 0.35;
		ctx.fillStyle = gray(0.2 + rand() * 0.22 * facing, 0.8);
		ctx.beginPath();
		ctx.arc(x, y, 1.2 + rand() * 2.6, 0, Math.PI * 2);
		ctx.fill();
	}
}

function paintSky(ctx: CanvasRenderingContext2D, l: Layout, rand: () => number) {
	const sky = ctx.createLinearGradient(0, 0, 0, GROUND);
	sky.addColorStop(0, gray(0));
	sky.addColorStop(0.1, gray(0));
	sky.addColorStop(0.35, gray(0.16));
	sky.addColorStop(0.62, gray(0.42));
	sky.addColorStop(0.86, gray(0.7));
	sky.addColorStop(1, gray(0.82));
	ctx.fillStyle = sky;
	ctx.fillRect(0, 0, l.width, GROUND);

	ctx.globalCompositeOperation = 'lighter';
	const glow = ctx.createRadialGradient(l.sun.x, l.sun.y, l.sun.r * 0.6, l.sun.x, l.sun.y, 300);
	glow.addColorStop(0, gray(0.42));
	glow.addColorStop(0.45, gray(0.14));
	glow.addColorStop(1, gray(0));
	ctx.fillStyle = glow;
	ctx.fillRect(0, 0, l.width, GROUND);
	ctx.globalCompositeOperation = 'source-over';
	const seam = ctx.createLinearGradient(0, 0, 0, 70);
	seam.addColorStop(0, gray(0));
	seam.addColorStop(1, gray(0, 0));
	ctx.fillStyle = seam;
	ctx.fillRect(0, 0, l.width, 70);

	// Sun, cut by widening bands the way the old footer art did it.
	const { x, y, r } = l.sun;
	ctx.fillStyle = gray(1);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fill();
	ctx.save();
	ctx.beginPath();
	ctx.arc(x, y, r + 1, 0, Math.PI * 2);
	ctx.clip();
	for (let i = 0; i < 5; i++) {
		ctx.fillStyle = gray(0.6 - i * 0.03);
		ctx.fillRect(x - r - 2, y + 4 + i * 8.5, r * 2 + 4, 1.6 + i * 1.2);
	}
	ctx.restore();

	// Long, thin dusk clouds; darker than the glow so they read as silhouettes.
	for (let i = 0; i < 9; i++) {
		const cx = rand() * l.width;
		const cy = 78 + rand() * 100;
		const w = 90 + rand() * 220;
		const h = 2.5 + rand() * 4;
		ctx.fillStyle = gray(0.3 + (cy - 78) / 400, 0.75);
		ctx.beginPath();
		ctx.ellipse(cx, cy, w / 2, h, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = gray(0.85, 0.5);
		ctx.beginPath();
		ctx.ellipse(cx + w * 0.05, cy + h * 0.7, w * 0.4, h * 0.35, 0, 0, Math.PI * 2);
		ctx.fill();
	}
}

function paintCity(ctx: CanvasRenderingContext2D, l: Layout, rand: () => number) {
	// Hazy Manila skyline on the horizon, lighter the further it is from the eye.
	let x = -10;
	while (x < l.width) {
		const w = 8 + rand() * 20;
		const tall = rand() < 0.18;
		const h = tall ? 34 + rand() * 30 : 8 + rand() * 22;
		ctx.fillStyle = gray(0.5 + rand() * 0.06);
		ctx.fillRect(x, 228 - h, w, h + 8);
		if (tall && rand() < 0.5) ctx.fillRect(x + w / 2 - 0.6, 228 - h - 8, 1.2, 8);
		x += w + rand() * 3;
	}
	const haze = ctx.createLinearGradient(0, 174, 0, 230);
	haze.addColorStop(0, gray(1, 0));
	haze.addColorStop(1, gray(1, 0.28));
	ctx.fillStyle = haze;
	ctx.fillRect(0, 174, l.width, 56);

	for (let tx = -10; tx < l.width + 10; tx += 5) {
		ctx.fillStyle = gray(0.2 + rand() * 0.05);
		ctx.beginPath();
		ctx.arc(tx + rand() * 4, 226 + rand() * 6, 5 + rand() * 6, 0, Math.PI * 2);
		ctx.fill();
	}
}

function paintBuilding(ctx: CanvasRenderingContext2D, l: Layout, rand: () => number) {
	const { x, w } = l.building;
	const top = 126;
	const floors = 5;
	const floorH = (GROUND - top - 6) / floors;

	ctx.fillStyle = gray(0.2);
	ctx.beginPath();
	ctx.moveTo(x + w, top - 4);
	ctx.lineTo(x + w + 16, top + 4);
	ctx.lineTo(x + w + 16, GROUND);
	ctx.lineTo(x + w, GROUND);
	ctx.fill();

	const face = ctx.createLinearGradient(x, 0, x + w, 0);
	face.addColorStop(0, gray(0.66));
	face.addColorStop(1, gray(0.42));
	ctx.fillStyle = face;
	ctx.fillRect(x, top, w, GROUND - top);

	for (let i = 0; i < floors; i++) {
		const y = top + 6 + i * floorH;
		const bandH = floorH * 0.6;
		ctx.fillStyle = gray(0.86);
		ctx.fillRect(x, y - 2.4, w, 2.4);
		const glass = ctx.createLinearGradient(0, y, 0, y + bandH);
		glass.addColorStop(0, gray(0.1));
		glass.addColorStop(1, gray(0.24));
		ctx.fillStyle = glass;
		ctx.fillRect(x, y, w, bandH);
		for (let fx = x + 4; fx < x + w - 2; fx += 8) {
			// Lights left on in a few rooms.
			if (rand() < 0.07) {
				ctx.fillStyle = gray(0.92);
				ctx.fillRect(fx + 2.2, y + 1.5, 5.8, bandH - 3);
			}
			ctx.fillStyle = gray(0.62 - ((fx - x) / w) * 0.22);
			ctx.fillRect(fx, y, 2.2, bandH);
		}
	}

	ctx.fillStyle = gray(0.84);
	ctx.fillRect(x - 6, top - 10, w + 12, 9);
	ctx.fillStyle = gray(0.22);
	ctx.fillRect(x - 6, top - 1, w + 12, 2);

	for (const [bx, r] of [
		[x - 10, 22],
		[x + w * 0.5, 16],
		[x + w + 14, 26]
	]) {
		ctx.fillStyle = gray(0.12);
		ctx.beginPath();
		ctx.ellipse(bx, GROUND, r, r * 0.55, 0, Math.PI, 0);
		ctx.fill();
		ctx.fillStyle = gray(0.3, 0.8);
		for (let k = 0; k < 18; k++) {
			ctx.beginPath();
			ctx.arc(
				bx - r * 0.7 + rand() * r,
				GROUND - rand() * r * 0.5,
				1 + rand() * 1.8,
				0,
				Math.PI * 2
			);
			ctx.fill();
		}
	}
}

function paintObelisk(ctx: CanvasRenderingContext2D, l: Layout) {
	const cx = l.obeliskX;
	for (const [i, half] of [60, 46, 33].entries()) {
		const y = GROUND - 5 * (i + 1);
		ctx.fillStyle = gray(0.74 - i * 0.04);
		ctx.fillRect(cx - half, y, half * 2, 5);
		ctx.fillStyle = gray(0.95);
		ctx.fillRect(cx - half, y, half * 2, 1);
	}
	const base = GROUND - 15;
	const shaftTop = 48;
	const bottomHalf = 16;
	const topHalf = 11;
	const ridge = cx - 3;

	ctx.fillStyle = gray(0.92);
	ctx.beginPath();
	ctx.moveTo(cx - bottomHalf, base);
	ctx.lineTo(cx - topHalf, shaftTop);
	ctx.lineTo(ridge, shaftTop);
	ctx.lineTo(ridge, base);
	ctx.fill();
	const shade = ctx.createLinearGradient(0, shaftTop, 0, base);
	shade.addColorStop(0, gray(0.46));
	shade.addColorStop(1, gray(0.3));
	ctx.fillStyle = shade;
	ctx.beginPath();
	ctx.moveTo(ridge, base);
	ctx.lineTo(ridge, shaftTop);
	ctx.lineTo(cx + topHalf, shaftTop);
	ctx.lineTo(cx + bottomHalf, base);
	ctx.fill();

	ctx.fillStyle = gray(1);
	ctx.beginPath();
	ctx.moveTo(cx - topHalf, shaftTop);
	ctx.lineTo(cx, 26);
	ctx.lineTo(ridge, shaftTop);
	ctx.fill();
	ctx.fillStyle = gray(0.5);
	ctx.beginPath();
	ctx.moveTo(ridge, shaftTop);
	ctx.lineTo(cx, 26);
	ctx.lineTo(cx + topHalf, shaftTop);
	ctx.fill();
}

function paintPylon(ctx: CanvasRenderingContext2D, l: Layout, rand: () => number) {
	const pw = 52;
	const top = 72;
	const left = l.pylon.x;

	canopy(ctx, rand, left - 34, 130, 74, 1);
	canopy(ctx, rand, left + l.pylon.w + 40, 152, 70, -1);

	ctx.fillStyle = gray(0.62);
	ctx.fillRect(left - 14, GROUND - 9, l.pylon.w + 28, 9);
	ctx.fillStyle = gray(0.9);
	ctx.fillRect(left - 14, GROUND - 9, l.pylon.w + 28, 1.4);

	ctx.textAlign = 'center';
	ctx.textBaseline = 'alphabetic';
	ctx.font = `700 44px Georgia, 'Times New Roman', serif`;
	for (const [i, letter] of ['P', 'U', 'P'].entries()) {
		const x = left + i * (pw + 3);
		const bottom = GROUND - 9;
		const face = ctx.createLinearGradient(0, top, 0, bottom);
		face.addColorStop(0, gray(0.9));
		face.addColorStop(1, gray(0.66));
		ctx.fillStyle = face;
		ctx.fillRect(x, top, pw, bottom - top);

		ctx.fillStyle = gray(1);
		ctx.fillRect(x + pw - 6, top, 6, bottom - top);
		ctx.fillRect(x, top, pw, 1.6);
		ctx.fillStyle = gray(0.42);
		ctx.fillRect(x, top, 2.4, bottom - top);

		ctx.strokeStyle = gray(0.5, 0.55);
		ctx.lineWidth = 0.7;
		for (let jy = top + 36; jy < bottom; jy += 34) {
			ctx.beginPath();
			ctx.moveTo(x + 2.4, jy);
			ctx.lineTo(x + pw - 6, jy);
			ctx.stroke();
		}
		// Marble veins.
		ctx.strokeStyle = gray(0.4, 0.4);
		for (let v = 0; v < 4; v++) {
			let vx = x + 6 + rand() * (pw - 16);
			let vy = top + 10 + rand() * (bottom - top - 30);
			ctx.beginPath();
			ctx.moveTo(vx, vy);
			for (let s = 0; s < 6; s++) {
				vx = Math.min(x + pw - 8, Math.max(x + 4, vx + (rand() - 0.5) * 9));
				vy += 3 + rand() * 6;
				ctx.lineTo(vx, vy);
			}
			ctx.stroke();
		}

		ctx.fillStyle = gray(0.05);
		ctx.fillText(letter, x + pw / 2 - 2, top + 62);
	}
}

function paintGround(ctx: CanvasRenderingContext2D, l: Layout, rand: () => number) {
	ctx.fillStyle = gray(0.16);
	ctx.fillRect(0, GROUND, l.width, WATER - GROUND);
	ctx.strokeStyle = gray(0.34, 0.8);
	ctx.lineWidth = 0.8;
	for (let k = 0; k < l.width * 0.9; k++) {
		const x = rand() * l.width;
		const y = GROUND + 2 + rand() * (WATER - GROUND - 6);
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x + (rand() - 0.5) * 1.5, y - 2 - rand() * 2.5);
		ctx.stroke();
	}
	// Promenade edge and its lamps.
	ctx.fillStyle = gray(0.66);
	ctx.fillRect(0, WATER - 3, l.width, 3);
	for (let x = 40 + rand() * 30; x < l.width; x += 84) {
		ctx.fillStyle = gray(0.1);
		ctx.fillRect(x, WATER - 23, 1.4, 20);
		ctx.fillStyle = gray(1);
		ctx.beginPath();
		ctx.arc(x + 0.7, WATER - 24, 2.2, 0, Math.PI * 2);
		ctx.fill();
	}
}

/* x is an offset from the sun; the flock drifts right and wraps around. */
const BIRDS = [
	{ x: -150, y: 128, speed: 6, size: 5, phase: 0 },
	{ x: -136, y: 120, speed: 6, size: 4, phase: 1.3 },
	{ x: -124, y: 134, speed: 6, size: 4.4, phase: 2.1 },
	{ x: 60, y: 108, speed: 4.5, size: 3.6, phase: 0.6 },
	{ x: 74, y: 116, speed: 4.5, size: 3.2, phase: 2.8 },
	{ x: 210, y: 146, speed: 8, size: 4, phase: 1.9 }
];

/* Vertical range the birds can reach, in scene units. */
const BIRD_TOP = 96;
const BIRD_BOTTOM = 160;

export function createSkyline(canvas: HTMLCanvasElement, inks: Rgb[]) {
	const out = canvas.getContext('2d')!;
	const base = document.createElement('canvas');
	const work = document.createElement('canvas');
	const ctx = work.getContext('2d', { willReadFrequently: true })!;
	const palette = new Uint32Array(inks.map(([r, g, b]) => (255 << 24) | (b << 16) | (g << 8) | r));
	let W = 0;
	let H = 0;
	let unit = 1;
	let layout = layoutFor(1000);
	let image: ImageData | null = null;
	let settled = false;

	function resize(width: number, height: number) {
		W = Math.max(1, width);
		H = Math.max(1, height);
		unit = H / SCENE_H;
		layout = layoutFor(W / unit);
		canvas.width = base.width = work.width = W;
		canvas.height = base.height = work.height = H;
		image = out.createImageData(W, H);
		settled = false;

		const b = base.getContext('2d')!;
		b.setTransform(unit, 0, 0, unit, 0, 0);
		const rand = random(1904);
		paintSky(b, layout, rand);
		paintCity(b, layout, rand);
		paintBuilding(b, layout, rand);
		paintObelisk(b, layout);
		paintGround(b, layout, rand);
		paintPylon(b, layout, rand);
		b.fillStyle = gray(0.12);
		b.fillRect(0, WATER, layout.width, SCENE_H - WATER);
	}

	function paintMotion(t: number) {
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(base, 0, 0);

		// Lagoon: each row mirrors the scene above the shore, pushed sideways by ripples.
		const shore = Math.round(WATER * unit);
		for (let y = shore; y < H; y++) {
			const depth = (y - shore) / Math.max(1, H - shore);
			const src = Math.max(0, 2 * shore - y - 1);
			const shift = Math.sin(y * 1.7 + t * 2.2) * (0.6 + depth * 3.5) * unit;
			ctx.drawImage(base, 0, src, W, 1, shift, y, W, 1);
		}
		ctx.setTransform(unit, 0, 0, unit, 0, 0);
		ctx.fillStyle = gray(0, 0.42);
		ctx.fillRect(0, WATER, layout.width, SCENE_H - WATER);

		const glints = random(Math.floor(t * 6));
		ctx.fillStyle = gray(1, 0.9);
		for (let y = WATER + 2; y < SCENE_H; y += 2.5) {
			const spread = 8 + (y - WATER) * 1.6;
			if (glints() < 0.45) continue;
			const gx = layout.sun.x + (glints() - 0.5) * spread * 2;
			ctx.fillRect(gx, y, 3 + glints() * 10, 1);
		}

		ctx.strokeStyle = gray(0.04);
		ctx.lineWidth = 1.6;
		ctx.lineCap = 'round';
		const span = layout.width + 60;
		for (const bird of BIRDS) {
			const x = ((((layout.sun.x + bird.x + 30 + t * bird.speed) % span) + span) % span) - 30;
			const size = bird.size * 1.4;
			const flap = Math.sin(t * 5 + bird.phase) * size * 0.55;
			const y = bird.y + Math.sin(t * 0.7 + bird.phase) * 2;
			ctx.beginPath();
			ctx.moveTo(x - size, y - flap);
			ctx.quadraticCurveTo(x - size * 0.4, y - flap * 0.2 - 1, x, y);
			ctx.quadraticCurveTo(x + size * 0.4, y - flap * 0.2 - 1, x + size, y - flap);
			ctx.stroke();
		}
	}

	function dither(y0: number, y1: number, reveal: number) {
		if (!image || y1 <= y0) return;
		const light = ctx.getImageData(0, y0, W, y1 - y0).data;
		const px = new Uint32Array(image.data.buffer);
		const steps = palette.length - 1;
		for (let y = y0, j = 0; y < y1; y++) {
			const row = (y & 7) << 3;
			const lift = 0.3 * (1 - y / H);
			for (let x = 0, i = y * W; x < W; x++, i++, j += 4) {
				let ink = 0;
				if (reveal >= 1 || 0.7 * ign(x, y) + lift < reveal) {
					const v = (light[j] / 255) * steps;
					const lower = Math.min(steps - 1, Math.floor(v));
					ink = v - lower > BAYER[row + (x & 7)] ? lower + 1 : lower;
				}
				px[i] = palette[ink];
			}
		}
		out.putImageData(image, 0, 0, 0, y0, W, y1 - y0);
	}

	/* `reveal` runs 0 → 1: pixels resolve out of the darkest ink in noise order.
	   Once the art is whole, only the bands with birds and water are redrawn. */
	function frame(t: number, reveal = 1) {
		if (!image) return;
		paintMotion(t);
		if (reveal < 1 || !settled) {
			dither(0, H, reveal);
			settled = reveal >= 1;
			return;
		}
		dither(Math.floor(BIRD_TOP * unit), Math.ceil(BIRD_BOTTOM * unit), 1);
		dither(Math.floor(WATER * unit), H, 1);
	}

	return { resize, frame };
}
