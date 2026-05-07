import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'О нём',
  icon: 'i-lucide-home',
  to: '/'
// }, {
//   label: 'Projects',
//   icon: 'i-lucide-folder',
//   to: '/projects'
}, {
  label: 'Земной путь',
  icon: 'i-lucide-mic',
  to: '/lifeline'
}, {
  label: 'Свет памяти',
  icon: 'i-lucide-file-text',
  to: '/blog'
// }, {
//   label: 'Speaking',
//   icon: 'i-lucide-mic',
//   to: '/speaking'
}, {
  label: 'Биография',
  icon: 'i-lucide-user',
  to: '/about'
}]
