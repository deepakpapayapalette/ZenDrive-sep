import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const faqs = [
    {
      question: "How do I register as a driver on the portal?",
      answer: "To register as a driver, click on the 'Sign Up' button on the homepage, fill in your personal details, upload required documents (driver's license, vehicle registration, insurance), and complete the verification process. Once approved, you'll receive a confirmation email and can start using the portal."
    },
    {
      question: "Is my data and information secure?",
      answer: "Yes, we take data security very seriously. All your personal information and driving data is encrypted using industry-standard SSL/TLS protocols. We comply with data protection regulations and never share your information with third parties without your explicit consent. Our systems undergo regular security audits to ensure maximum protection."
    },
    {
      question: "Can I manage my appointments through the portal?",
      answer: "Absolutely! The portal allows you to schedule, reschedule, and cancel appointments for vehicle maintenance, fitness checks, and training sessions. You'll receive reminders via email and SMS, and can view your complete appointment history in your dashboard."
    },
    {
      question: "Can I access the portal on my mobile phone?",
      answer: "Yes, our portal is fully responsive and optimized for mobile devices. You can access all features through your mobile browser, or download our dedicated mobile app available for both iOS and Android devices for an even better experience on the go."
    },
    {
      question: "How can I collaborate with other drivers or specialists?",
      answer: "The portal features a community section where you can connect with other drivers, share experiences, and learn best practices. You can also request consultations with road safety specialists, join discussion forums, and participate in group training sessions. Fleet managers can coordinate with their entire team through our collaboration tools."
    }
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className="space-top bg-gray-50 ">
      <div className="container">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semibold text-primary mb-4">
            FAQs (Frequently Asked Questions)
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-4xl">
            Here are some sample FAQs for a Driver Portal, suitable for a website or app used by drivers for managing appointments, records, safety compliance, etc.
          </p>
        </div>

        {/* MUI Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                background: 'var(--primary)',
                borderRadius: '6px !important',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                '&:before': {
                  display: 'none',
                  fontSize: '18px',

                },
                '&.Mui-expanded': {
                  margin: '0 0 10px 0',
                },
                fontWeight: 'Normal',
              }}
            >
              <AccordionSummary
                expandIcon={
                  expanded === `panel${index}` ? (
                    <FaMinus size={18} color="white" />
                  ) : (
                    <FaPlus size={18} color="white" />
                  )
                }
                sx={{
                  padding: '16px 18px',
                  '&:hover': {
                    background: 'var(--primary2)',
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: '0',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: 'white',
                    fontSize: { xs: '16px', sm: '18px' },
                    fontWeight: 500,
                    paddingRight: '16px',
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: '0 24px 24px 24px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: { xs: '14px', sm: '16px' },
                  lineHeight: 1.7,
                }}
              >
                <Typography sx={{ fontSize: 'inherit', lineHeight: 'inherit' }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
