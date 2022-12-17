import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Editor from "@monaco-editor/react"
import pretty from 'pretty'

export default function Home() {
  const [dark, setDark] = useState(false)

  const framework = [
    { id: 1, name: 'TailwindCSS', unavailable: false },
  ]
  const [selectedFW, setSelectedFW] = useState(framework[0])

  const [mode, setMode] = useState('manual')

  const [loading, setLoading] = useState(false)

  const [input, setInput] = useState(`VStack(alignment: .center) {
    Spacer()
    Image(systemName: "globe")
      .foregroundColor(.blue)
    Text("Hello World!")
    Spacer()
}`)

  useEffect(() => {
    if (mode == 'auto') {
      conversion()
    }
  }, [input])

  function conversion() {
    setLoading(true)
    fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input })
    })
    .then(res => res.json())
    .then(data => {
      setRender(pretty(`<html> <head> <script src="https://cdn.tailwindcss.com"></script> <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" /> </head>` + data.result + ` </html>`))
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      alert('Due to high demand or connection issue at the moment. Please try again later.')
      setLoading(false)
    })
  }

  const [render, setRender] = useState(`<html> <head> <script src="https://cdn.tailwindcss.com"></script> <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" /> </head> <body class="flex flex-col items-center justify-center w-screen h-screen"> <div class="flex flex-col items-center justify-center"> <div class="flex flex-col items-center justify-center"> <!-- Spacer() --> <div class="flex flex-col items-center justify-center"> <!-- Image(systemName: "globe") --> <i class="fas fa-globe text-blue-500"></i> </div> <!-- Text("Hello World!") --> <div class="flex flex-col items-center justify-center"> <p>Hello World!</p> </div> <!-- Spacer() --> <div class="flex flex-col items-center justify-center"> </div> </div> </div> </body> </html>`)
  
  return (
    <>
      <Head>
        <title>Swift to HTML - Simple and Powerful App</title>
        <meta name="description" content="Convert Swift to HTML -as- Simple and Powerful App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdn.1998.media/css/fontawesome.css" />
      </Head>
      <main className={`${inter.className} ${dark ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-black text-black dark:text-white w-screen h-screen">

          <nav className="flex flex-wrap justify-between items-center gap-3 md:gap-6 px-3 py-1.5">
            <h1 className="text-xl font-bold font-sans">
              <span className="text-orange-500">
                <i className="fab fa-swift mr-2" />
                Swift
              </span>
              <i className="fa fa-circle-arrow-right mx-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500"></i>
              <span className="text-red-500">
                HTML
                <i className="fab fa-html5 ml-2"></i>
              </span>
            </h1>

            <div className="bg-indigo-100 text-indigo-800 dark:bg-gray-800 dark:text-indigo-100 text-sm font-semibold rounded-xl p-2 h-8 flex items-center flex-1">
              <i className="fab fa-css3 mr-1" />
              Framework:
              <select className="bg-transparent underline decoration-dotted underline-offset-4 select-none" onChange={(e) => setSelectedFW(framework.find(f => f.id === parseInt(e.target.value)))}>
                {framework.map(f => (
                  <option key={f.id} value={f.id} disabled={f.unavailable}>{f.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 text-sm">
              <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-white font-bold rounded-xl p-2 h-8 flex items-center">
                <i className="fa fa-circle-info mr-1" />
                Experimental
                1.0.0
              </div>
              
              <button className="bg-blue-200 text-blue-800 dark:bg-indigo-800 dark:text-indigo-200 rounded-xl p-2 h-8 flex items-center" onClick={() => setMode(mode == 'manual' ? 'auto' : 'manual')}>
                <i className={`fa ${mode == 'manual' ? 'fa-hand' : 'fa-play animate-pulse'}`}></i>
                <span className="hidden md:inline font-semibold ml-1">{mode == 'manual' ? 'Manual' : 'AutoPilot'}</span>
              </button>

              <button
                className="bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200 rounded-xl p-2 w-8 h-8 flex items-center justify-center"
                onClick={conversion}
              >
                <i className={`fa fa-sync-alt ${loading ? 'animate-spin' : ''}`}></i>
              </button>

              <button
                className="bg-orange-100 text-orange-500 dark:bg-blue-800 dark:text-orange-300 rounded-xl p-2 h-8 flex items-center"
                onClick={() => setDark(!dark)}
              >
                <i className={`fa ${dark ? 'fa-moon' : 'fa-sun'}`}></i>
                <span className="hidden md:inline font-semibold ml-1 dark:text-">{dark ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </nav>

          <div className="flex flex-wrap md:flex-nowrap px-2">

            <div className="flex flex-col gap-1 flex-1">

              <section id="input" className="flex-1 border-2 border-orange-300 hover:border-orange-500 rounded-xl overflow-hidden m-1 resize-y">
                <h3 className="text-lg font-bold px-3 font-sans flex justify-between items-center text-orange-500 border-b">
                  Swift
                  <i className="fab fa-swift" />
                </h3>
                <Editor
                  height="40vh"
                  theme={dark ? 'vs-dark' : 'vs-light'}
                  defaultLanguage="swift"
                  defaultValue={input}
                  onChange={(value) => (
                    setInput(value)
                  )}
                  className="resize-y"
                />
              </section>

              <section id="output" className="flex-1 border-2 border-red-300 hover:border-red-500 rounded-xl overflow-hidden m-1 resize-y">
                <h3 className="text-lg font-bold px-3 font-sans flex justify-between items-center text-red-500 border-b">
                  HTML
                  <i className="fab fa-html5"></i>
                </h3>
                {
                  loading ? <span className="m-3">Reloading...</span> :
                    <Editor
                      height="40vh"
                      theme={dark ? 'vs-dark' : 'vs-light'}
                      defaultLanguage="html"
                      defaultValue={render}
                      value={
                        pretty(render)
                      }
                      onChange={(value) => (
                        setRender(value)
                      )}
                      className="resize-y"
                    />
                }
              </section>
            </div>

            <iframe className={`flex-1 h-[90vh] max-w-none md:max-w-[35vw] border-2 border-teal-300 hover:border-teal-500 rounded-lg m-1 ${dark ? 'invert' : ''}`} srcDoc={loading ? "" : render}></iframe>

          </div>

          <footer className="fixed bottom-0 w-full text-gray-500 dark:text-gray-300 text-center bg-white/80 dark:bg-black/80 filter backdrop-blur-md py-5 font-mono">
            &lt;Made by MING (<a href="https://github.com/1998code" target="_blank">@1998code</a>) with <i className="fa fa-heart text-red-500" /> and Open Source at <a href="https://github.com/1998code/Swift2HTML" target="_blank" className="text-black dark:text-white font-semibold"><i className="fab fa-github" /></a> /&gt;
          </footer>

        </div>
      </main>
    </>
  )
}
