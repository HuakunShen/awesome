const data = await Bun.file("./awesome-repo.json").json()
const urls = Object.values(data).flat()
console.log(urls.length)
console.log(new Set(urls).size)
