# Listmonk Custom Styling

This directory contains custom CSS files for styling the Listmonk newsletter service to match the Fables Monster Studio website theme.

## Files

- **`admin-custom.css`** - Custom styles for the Listmonk admin panel
- **`public-custom.css`** - Custom styles for public subscription pages

## Theme

The styling follows the website's sci-fi neon theme with:
- **Colors**: Dark backgrounds (#000000), red accents (#ff1f1f)
- **Fonts**: Orbitron (headers), Rajdhani (body), Nunito (text)
- **Effects**: Neon glow, text shadows, smooth transitions
- **Style**: Cyberpunk/sci-fi aesthetic

## Installation

### 1. Access Listmonk Admin

Navigate to your Listmonk admin panel:
- URL: `https://newsletter.fables.monster`
- Login with your admin credentials

### 2. Apply Admin Panel Styling

1. Click **Settings** in the sidebar
2. Go to the **Appearance** tab
3. Scroll to **Admin custom CSS**
4. Copy the entire contents of `admin-custom.css`
5. Paste into the text area
6. Click **Save**
7. Refresh the page to see changes

### 3. Apply Public Pages Styling

In the same **Appearance** settings page:

1. Scroll to **Public custom CSS**
2. Copy the entire contents of `public-custom.css`
3. Paste into the text area
4. Click **Save**

### 4. Verify Installation

1. Navigate to any admin page to see the dark theme
2. Visit a public subscription page to verify public styling
3. Check that fonts are loading correctly
4. Verify neon glow effects are visible

## Customization

Both CSS files use CSS custom properties (variables) for easy customization:

```css
:root {
  --primary-color: #ff1f1f;        /* Main accent color */
  --bg-dark: #000000;               /* Background color */
  --border-color: #ff1f1f;          /* Border color */
  --text-primary: #ffffff;          /* Primary text color */
  --neon-glow: 0 0 10px rgba(255, 31, 31, 0.5); /* Glow effect */
}
```

To customize colors:
1. Edit the CSS files
2. Change the values in the `:root` section
3. Re-apply to Listmonk admin as described above

## Features

### Admin Panel Styles
- Dark theme for all admin pages
- Styled navigation and sidebar
- Custom table styling
- Neon-accented buttons and forms
- Styled modals and notifications
- Custom scrollbars
- Responsive design

### Public Page Styles
- Full dark theme for subscription pages
- Custom form styling with validation states
- Styled checkboxes and radio buttons
- Animated buttons with neon effects
- Success/error message styling
- Responsive mobile design
- Loading spinners
- Custom scrollbars

## Browser Compatibility

Tested and working on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### CSS Not Applying

1. **Clear browser cache**: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. **Check CSS was saved**: Verify in Settings → Appearance
3. **Check for errors**: Open browser DevTools console
4. **Ensure CSS is enabled**: Check Listmonk settings allow custom CSS

### Fonts Not Loading

The public CSS imports fonts from Google Fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Orbitron...');
```

If fonts don't load:
1. Check internet connection
2. Verify Google Fonts is accessible
3. Check for Content Security Policy issues
4. Consider hosting fonts locally

### Colors Look Wrong

1. Verify you copied the entire CSS file
2. Check for conflicting inline styles in Listmonk
3. Use browser DevTools to inspect elements
4. Ensure all color variables are defined

### Layout Broken on Mobile

1. Clear mobile browser cache
2. Test in multiple browsers
3. Check browser console for errors
4. Verify responsive CSS is applied

## Updates

When updating the CSS:

1. Edit the local CSS file
2. Test changes locally if possible
3. Copy updated CSS to Listmonk admin
4. Clear cache and test thoroughly
5. Document changes in this README

## Notes

- The CSS uses `!important` declarations to override Listmonk's default styles
- Some Listmonk versions may have different HTML structure
- Custom CSS may need updates when Listmonk is updated
- Always backup your CSS before making major changes

## Support

For issues or questions:
- Email: info@fables.monster
- Discord: https://discord.gg/eAwK9DfKf4
- Website: https://fables.monster

## License

These CSS files are part of the Fables Monster Studio website project.
© 2025 Fables Monster Studio. All rights reserved.
