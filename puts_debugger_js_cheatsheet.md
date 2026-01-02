# 🔧 JavaScript / Node.js "Puts Debugger" Cheatsheet

Inspired by [Aaron Patterson's](https://tenderlovemaking.com/2016/02/05/i-am-a-puts-debuggerer/) classic Ruby article *I am a puts debuggerer*.

---

## ✨ Philosophy
> Debugging is about visibility, not elegance.
>
> Print, trace, intercept, and experiment until you **see** what's happening.

---

## 1. Print Call Stack
```js
console.trace('Trace:')
// or
console.log(new Error('Stack trace').stack)
```
🔹 Shows how the code execution reached here. Great for React hooks, Express middleware, async bugs.

---

## 2. Pretty Print Objects
```js
console.log(JSON.stringify(obj, null, 2))
```
🔹 Equivalent to Ruby's `puts obj.inspect`. Formats deeply nested objects clearly.

---

## 3. Inspect Function Definitions
```js
console.log(myFunction.toString())
```
🔹 Displays the source code of a function.

List class methods:
```js
console.log(Object.getOwnPropertyNames(MyClass.prototype))
```

---

## 4. See Which Modules Are Loaded
```js
console.log(Object.keys(require.cache))
```
To detect what a `require` adds:
```js
const before = Object.keys(require.cache)
require('./myModule')
console.log(Object.keys(require.cache).filter(x => !before.includes(x)))
```

---

## 5. Conditional Prints & Markers
```js
if (user?.id === 42) {
  console.log('💡 Suspicious user reached here!', new Error().stack)
}
```
Or simply:
```js
console.log('======= DEBUG START =======')
...
console.log('======= DEBUG END =======')
```
🔹 Helps isolate specific execution paths.

---

## 6. Trace Function Calls (Monkey Patch)
```js
const original = app.get
app.get = function (...args) {
  console.log('GET called with:', args)
  return original.apply(this, args)
}
```
🔹 Lets you log arguments and intercept runtime behavior without changing source logic.

---

## 7. Track Async Errors
```js
process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Promise:', reason)
})
```
Add `.catch(console.error)` in Promises for visibility.

---

## 8. Timing Sections
```js
console.time('Task')
// ... code ...
console.timeEnd('Task')
```
🔹 See how long operations or loops take.

---

## 9. Express Middleware Debug Example
```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body)
  next()
})
```
🔹 Quick request logging alternative to morgan.

---

## 🎓 Remember
- Temporary hacks are fine. Delete after success.
- No shame in `console.log`.
- Use `trace`, `inspect`, and `require.cache` for deeper introspection.

---

**Author:** Bailin Xu  
*Based on Full Stack Open / Debugging Studies 2025*