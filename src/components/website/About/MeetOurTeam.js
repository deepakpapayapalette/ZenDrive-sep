import React from 'react'
import team from '../../../assets/images/website/about/ab-team.png'
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import MeetTeamCard from '../../../UI/MeetTeamCard';

const MeetOurTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Ravi Rai",
      role: "Founder",
      image: team,
      linkedin: "#"
    },
    {
      id: 2,
      name: "Ravi Rai",
      role: "Founder",
      image: team,
      linkedin: "#"
    },
    {
      id: 3,
      name: "Ravi Rai",
      role: "Founder",
      image: team,
      linkedin: "#"
    },
  ];

  return (
    <>
      <section className="space-top">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-primary mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 lg:gap-12">
            {teamMembers.map(member => (
              <MeetTeamCard key={member.id} data={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default MeetOurTeam

