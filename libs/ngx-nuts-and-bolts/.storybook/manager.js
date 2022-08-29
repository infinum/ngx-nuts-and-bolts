import { addons } from '@storybook/addons';

addons.setConfig({
  isFullscreen: true,
  showNav: false,
  showPanel: false,
  panelPosition: 'right',
  enableShortcuts: false,
  showToolbar: false,
  theme: undefined,
  selectedPanel: undefined,
  initialActive: 'canvas',
  sidebar: {
    disabled: true,
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    disabled: true,
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
  },
});
