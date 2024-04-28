// A generator that will yield positive integers
async function* integers() {
  let i = 1
  while (true) {
    console.log(`yielding ${i}`)
    yield i++

    await sleep(100)
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Wraps a generator into a ReadableStream
function createStream(generator) {
  return new ReadableStream({
    async start(controller) {
      for await (const v of generator) {
        controller.enqueue(v)
      }
      controller.close()
    },
    // async pull(controller) {
    //   const { value, done } = await generator.next()

    //   if (done) {
    //     controller.close()
    //   } else {
    //     controller.enqueue(value)
    //   }
    // },
  })
}
// Collect data from stream
async function run() {
  // Set up a stream that of integers
  const stream = createStream(integers())

  // Read values from our stream
  const reader = stream.getReader()
  // We're only reading 3 items this time:
  for (let i = 0; i < 3; i++) {
    // we know our stream is infinite, so there's no need to check `done`.
    const { value } = await reader.read()
    console.log(`read ${value}`)

    await sleep(1000)
  }
}
run()
