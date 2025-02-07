const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"

export function App() {

    return (
        <section className="app">
            <AppHeader/>
        </section>
    )
}