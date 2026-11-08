// Renders each style to a seamless-looping 1080p MP4 (needs Node, Playwright and ffmpeg).
// Usage: node export-videos.js [bpm] [width] [height]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');

const bpm = +(process.argv[2] || 120), w = +(process.argv[3] || 1920), h = +(process.argv[4] || 1080);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  for (const style of ['pencil', 'ink', 'chalk']) {
    const url = 'file://' + path.join(__dirname, 'santa-dance.html') + `?export=1&style=${style}&bpm=${bpm}`;
    await page.goto(url);
    const { loop, fps } = await page.evaluate(() => ({ loop: __santa.loopSeconds(), fps: __santa.FPS }));
    const frames = Math.round(loop * fps);
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'santa-'));
    for (let f = 0; f < frames; f++) {
      await page.evaluate(t => __santa.render(t), (f + 0.5) / fps);
      await page.locator('canvas').screenshot({ path: path.join(dir, `f${String(f).padStart(4, '0')}.png`) });
    }
    const out = path.join(__dirname, `santa-dance-${style}.mp4`);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(dir, 'f%04d.png'),
      '-vf', 'fps=24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
    fs.rmSync(dir, { recursive: true });
    console.log(`${out}  (${frames} drawings, ${loop.toFixed(1)}s loop)`);
  }
  await browser.close();
})();
