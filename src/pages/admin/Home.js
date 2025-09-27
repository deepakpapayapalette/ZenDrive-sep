import React from 'react'
import '../../assets/styles/home.css'
import FilterSidebar from '../../components/admin/Filters/FilterSidebar'
import Overview from '../../components/admin/Overview/Overview'
import DriveRatingQuickAction from '../../components/admin/DriveRatingQuickActions/DriveRatingQuickAction'
import LiveFleetTracking2 from '../../components/admin/LiveFleetTracking2/LiveFleetTracking2'
import DangerousDriving from '../../components/admin/DangerousDriving/DangerousDriving'
import ViolationTracker from '../../components/admin/ViolationTracker/ViolationTracker'
import ViolationTrackerGraph from '../../components/admin/ViolationTrackerGraph/ViolationTrackerGraph'
import FitnessAssessment from '../../components/admin/FitnessAssessment/FitnessAssessment '
import DriverHabits from '../../components/admin/DriverHabits/DriverHabits'
import HealthAssessment from '../../components/admin/HealthAssessment/HealthAssessment'
import DriverHealthStatistics from '../../components/admin/DriverHealthStatistics/DriverHealthStatistics'
import TopVioletears from '../../components/admin/TopVioletears/TopVioletears'
import ImpactStudy from '../../components/admin/ImpactStudy/ImpactStudy'

const Home = () => {
  return (
    <div className='p-4'>
      <FilterSidebar />
      <Overview />
      <DriveRatingQuickAction />
      <LiveFleetTracking2 />
      <DangerousDriving />
      <ViolationTracker />
      <ViolationTrackerGraph />
      <FitnessAssessment />
      <DriverHabits />
      <HealthAssessment />
      <DriverHealthStatistics />
      <TopVioletears />
      <ImpactStudy />
    </div>
  )
}

export default Home