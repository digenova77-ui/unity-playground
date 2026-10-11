import assert from 'node:assert/strict'
import test from 'node:test'
import { addBite, addCustom, dayView, FOODS, loadDiary, removeBite, renderNutrition, searchFoods, setGoal, type Diary } from './nutrition.ts'

const blank = (): Diary => ({ goal: 2000, bites: [], customs: [] })

test('a named food scales, an unknown calorie is refused, and the week keeps both', () => {
  const apple = FOODS.find(food => food.id === 'apple')!
  let diary = addBite(blank(), apple, 'breakfast', 2, '2026-10-05T12:00:00')
  assert.equal(diary.bites[0].kcal, 190)
  assert.equal(addCustom(diary, '  ', 10, 'snack'), null)
  assert.equal(addCustom(diary, 'soup', Number.NaN, 'snack'), null)
  diary = addCustom(diary, 'Kitchen soup', 180, 'lunch', '2026-10-05T18:00:00')!
  assert.equal(diary.customs.length, 1)
  assert.equal(searchFoods(diary, 'soup')[0]?.name, 'Kitchen soup')
  const view = dayView(diary, '2026-10-05', 'app', 'breakfast')
  assert.equal(view.eaten.kcal, 370)
  assert.equal(view.left, 1630)
  assert.equal(view.hits[0]?.id, 'apple')
  diary = removeBite(diary, diary.bites[0].id)
  assert.equal(dayView(diary, '2026-10-05', '', 'lunch').eaten.kcal, 180)
  assert.equal(setGoal(diary, 0).goal, 1)
  assert.equal(loadDiary('nope').goal, 2000)
  assert.equal(loadDiary(null).bites.length, 0)
})

test('a food name is escaped before it is drawn', () => {
  const diary = addCustom(blank(), 'a<b>&"c', 40, 'snack', '2026-10-05T12:00:00')!
  const html = renderNutrition(dayView(diary, '2026-10-05', '', 'snack'))
  const want = 'a' + '\u0026lt;b\u0026gt;\u0026amp;\u0026quot;c'
  assert.equal(html.includes(want), true)
  assert.equal(html.includes('a<b>'), false)
})
