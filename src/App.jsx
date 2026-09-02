import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SpeciesPage from './pages/Species'
import SpeciesDetailPage from './pages/SpeciesDetail'
import VisitPage from './pages/Visit'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/species" element={<SpeciesPage />} />
        <Route path="/species/:speciesId" element={<SpeciesDetailPage />} />
        <Route path="/visit" element={<VisitPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
