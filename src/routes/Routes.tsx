import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages'

// import Loader from '../shared/components/Loader'

const MainRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* <Route path="/" element={<ProtectedLayout />}>
          <Route path="/" element={<LiveMode />} />
          <Route path="planningmode" element={<PlanningMode />} />
          <Route path="playbackmode" element={<PlaybackMode />} />
          <Route path="ums" element={<Ums />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Route> */}
      </Routes>
    </Suspense>
  )
}

export default MainRoutes
