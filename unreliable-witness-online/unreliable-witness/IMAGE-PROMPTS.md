# Making realistic art for The Unreliable Witness

The game ships with drawn, animated characters and scenes. If you want a more
realistic look, make your own images and drop them into `public/img/`. The game
detects them automatically and keeps the same motion: breathing, drifting dust,
flickering lights, a speaking pulse, and the lights-out effect.

One difference: a photo cannot open and close its mouth the way the drawing does,
so while a suspect speaks, the photo gently pulses instead.

## File names

| File | What it is | Size |
|---|---|---|
| `portrait-amina.png` | Head and shoulders, **transparent background** | about 800 x 1050 |
| `portrait-brian.png` | same | same |
| `portrait-wanjiru.png` | same | same |
| `portrait-otieno.png` | same | same |
| `scene-amina.jpg` | Gallery main hall, landscape | about 1600 x 650 |
| `scene-brian.jpg` | Entrance with security desk and monitors | same |
| `scene-wanjiru.jpg` | Courtyard at night | same |
| `scene-otieno.jpg` | Bar | same |
| `intro.jpg` | Opening shot: gallery wall with an empty space where a painting hung | same |

`.png`, `.jpg` and `.webp` all work. Portraits should be cut out on a transparent
background (most image tools have a free "remove background" option), otherwise the
photo shows as a rectangle over the scene. Keep the person centered with the head near
the top, because the stage crops from the bottom.

## Prompts (paste into any image generator)

Use the same style words in every prompt so the cast looks like one set. Add
"photorealistic, soft cinematic lighting, shallow depth of field" to all of them.

**Amina Hassan**: head-and-shoulders portrait of a poised Kenyan woman in her
late 30s, a plum-coloured headscarf and a charcoal blazer, a small gold brooch, warm
confident expression, plain neutral studio backdrop.

**Brian Mutua**: head-and-shoulders portrait of a Kenyan man in his mid 30s in a navy
security uniform and cap with a gold badge, anxious, slightly sweaty, plain neutral
studio backdrop.

**Wanjiru Kamau**: head-and-shoulders portrait of an intense Kenyan woman artist in her
30s, natural hair with a colourful beaded headband, a paint-splattered cream apron over
a rust-coloured top, small teal earrings, plain neutral studio backdrop.

**Dr. Peter Otieno**: head-and-shoulders portrait of a theatrical Kenyan man in his late
50s with grey temples, a neat grey goatee, round gold glasses, a charcoal suit with a red
bow tie and a pocket square, plain neutral studio backdrop.

**scene-amina**: wide shot of an upscale art gallery in Nairobi at night, track lighting,
framed paintings on a dark plum wall, one large empty space on the wall where a painting
was removed, polished floor, blurred guests in the background.

**scene-brian**: dim gallery entrance at night, glass double doors showing a moonlit
garden, a security desk with four CCTV monitors (one showing "NO SIGNAL"), a green exit sign.

**scene-wanjiru**: walled courtyard behind a gallery at night, string lights, an acacia
tree silhouette, full moon, a starry sky, a low stone wall.

**scene-otieno**: warm, moody gallery bar, shelves of colourful bottles behind a polished
wooden counter, soft golden bokeh lights, a small pink neon sign.

## Important: do not give away the solution

- **Do not put a green shawl on Amina.** The green shawl is a clue that only Wanjiru
  mentions. Showing it in her portrait would solve the case for the player.
- Keep every suspect's expression similarly neutral or mildly nervous. The game already
  makes all suspects look more nervous the more they are questioned, so nobody looks guilty
  by default.

## Before you sell or publish the game

- Check the terms of whatever image tool you use. Some free tools limit commercial use.
- Do not use photos of real people without their permission.
