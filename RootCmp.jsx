const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { About } from "./pages/About.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader/>
                <main className="main-layout">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/books" element={<BookIndex />}/>
                    </Routes>
                </main>
            </section>
        </Router>
    )
}