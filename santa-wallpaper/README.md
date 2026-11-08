# Dancing Santa sketch wallpaper

An original hand-sketched Santa who dances on a seamless loop. It's drawn at 12 frames per second with "boiling" pencil lines, like traditional hand-drawn animation. There are three styles:

| File | Look |
|---|---|
| `santa-dance-pencil.mp4` | Graphite and red-pencil hatching on cream sketchbook paper |
| `santa-dance-ink.mp4` | Black ink with loose, slightly off-register marker colour |
| `santa-dance-chalk.mp4` | White and red chalk on a chalkboard, with falling snow |
| `santa-dance.html` | Live version of all three: sharp at any screen size, with adjustable tempo |

Each video is 1920×1080 and loops every 16 seconds (32 beats at 120 BPM) with no visible jump.
The routine has four 8-beat moves: a side-step groove, a disco point, hands in the air, and a folded-arm kick.

The videos have no sound. Play the song yourself (from Spotify or similar) alongside the wallpaper.

## Set it as your wallpaper

### Windows: Lively Wallpaper (free, easiest)
1. Install **Lively Wallpaper** from the Microsoft Store.
2. Drag one of the `.mp4` files into the Lively window. It plays on a loop as your desktop background.
   - To use the live version instead, drag in `santa-dance.html`.
3. Lively pauses the wallpaper automatically while a game or fullscreen app is running.

You can also use **Wallpaper Engine** (paid, on Steam): Open Wallpaper → Open from file → choose the `.mp4` or the `.html` file.

### macOS
macOS has no built-in video wallpaper, so use a small app:
- **Plash** (free, Mac App Store) shows a web page as your wallpaper. Add a website and choose `santa-dance.html` as a local file.
- Video-wallpaper apps from the App Store (for example "Backdrop" or "Wallper") can loop one of the `.mp4` files.

### Linux
- KDE Plasma: install the "Smart Video Wallpaper" plugin and select an `.mp4`.
- Wayland (Sway or Hyprland): `mpvpaper -o "loop" '*' santa-dance-ink.mp4`
- X11: `xwinwrap -fs -ov -ni -nf -- mpv -wid WID --loop --no-audio santa-dance-ink.mp4`

## The live HTML version

Open `santa-dance.html` in a browser to preview it. URL options:

```
santa-dance.html?style=pencil   (or ink, or chalk)
santa-dance.html?bpm=104        tempo, 60–200
santa-dance.html?snow=1         snow on any style (snow=0 turns it off)
```

Keyboard controls work when the page has focus, for example in a browser tab:
- <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> switch style
- <kbd>+</kbd> / <kbd>-</kbd> change tempo
- <kbd>T</kbd> tap along with your music and Santa matches its tempo
- <kbd>S</kbd> toggles snow
- <kbd>H</kbd> shows help

To match the tempo of the song, tap <kbd>T</kbd> along with it. Then put that BPM in the URL you give to Lively or Plash.

## Re-render the videos (for example at a different tempo or 4K)

```
npm i playwright        # also needs ffmpeg installed
node export-videos.js 104            # 104 BPM, 1920x1080
node export-videos.js 120 3840 2160  # 4K
```
