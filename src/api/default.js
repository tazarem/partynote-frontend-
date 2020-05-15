// 탑바 계정 랜덤 결정기
export function randomAvatar () {
  const str = 'mdi-'
  const icons = [
    'cupcake',
    'cup-water',
    'cat',
    'dog',
    'cow',
    'fruit-watermelon',
    'fruit-pineapple',
    'fishbowl',
    'castle',
    'chef-hat',
    'skull'
  ]
  const randomCase = Math.floor(Math.random() * 11)
  return `${str}${icons[randomCase]}`
}
export function randomColor () {
  const colors = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'light-green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deep-orange'
  ]
  const brighten = ['lighten-3', 'lighten-2', 'lighten-1']
  const colorCase = Math.floor(Math.random() * 16)
  const brightCase = Math.floor(Math.random() * 3)

  return `${colors[colorCase]} ${brighten[brightCase]}`
}
