# Tonal Categories

Salt's palette uses perceptual lightness weights from `000` to `999`.

## Categories

| Category | Weights | Use |
| --- | --- | --- |
| Highlights | `000`, `025`, `050` | light surfaces, dark foregrounds |
| 1/4 tones | `100`–`350` | borders, dividers, structural lines |
| Mid-tones | `400`–`600` | icons, colored foreground, solid tone fills |
| 3/4 tones | `650`–`900` | high-contrast foreground, dark elevated surfaces |
| Shadows | `950`, `999` | dark surfaces, highest light-mode contrast |

## Rules

- Do not use 1/4 tones for readable text.
- Use mid-tones or darker for foreground content on light surfaces.
- Use highlights for foreground content on dark surfaces.
- A single scale should serve both light and dark modes; avoid separate dark palettes.

## Expression mapping

Expression tokens are curated from these categories:

| Token | Light | Dark |
| --- | --- | --- |
| `--{tone}-subtle` | `050` | `950` |
| `--{tone}-fg` | `600` | `400` |
| `--{tone}-border` | `300` | `700` |
| `--{tone}-solid` | `500` | `500` |
| `--{tone}-solid-fg` | `000` | `050` |
