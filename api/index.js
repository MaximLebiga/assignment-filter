export const fetcher = (...args) => fetch(...args).then((res) => res.json()).catch(err => console.log(err))
