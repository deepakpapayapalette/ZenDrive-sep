
import icon1 from "../../../assets/images/svg/driver.svg"
import icon2 from "../../../assets/images/svg/busIcon.svg"
import icon3 from "../../../assets/images/svg/accident.svg"
import icon4 from "../../../assets/images/svg/death.svg"
import icon5 from "../../../assets/images/svg/first-aid2.svg"
import icon6 from "../../../assets/images/svg/money.svg"
import icon7 from "../../../assets/images/svg/time-sand.svg"
import icon8 from "../../../assets/images/svg/premium.svg"
import StatCard from "../Stats/StatCard"
 const Overview = () => {
  return (
    <>
        <div className='pt-4'>
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="No of Drivers"  value="1200" color="#1976d2" data={icon1} />
                <StatCard title="Fleet Size" value="350 Buses" color="#009688" data={icon2} />
                <StatCard title="No of Accidents" value="195" color="#d32f2f" data={icon3} />
                <StatCard title="No of Deaths" value="12" color="#221122" data={icon4} />
                <StatCard title="No of Injuries" value="245" color="#fb8c00" data={icon5} />
                <StatCard title="Financial Claims" value="17.5 Crore" color="#6a1b9a" data={icon6} />
                <StatCard title="Duty Disruptions" value="175 Hrs" color="#dda00a" data={icon7} />
                <StatCard title="Increase in insurance burden" value="57.0 Lacs" color="#512da8" data={icon8} />
            </div>
        </div>
    </>
  )
}
export default Overview
