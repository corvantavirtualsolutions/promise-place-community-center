"use client";

import { useState } from "react";
import { ChevronDown } from "./Icons";

const ITEMS = [
  {
    q: "What services does Promise Place Community Center provide?",
    a: "We provide therapy and counseling, assessments, family and child support services, and specialized community services. That includes therapy, telehealth therapy, grief and loss counseling, anger management, mental health assessments, substance abuse assessments, parenting assessments, case management, life skills, behavior management, behavior plans for children, domestic violence services, and school-based mental health services.",
  },
  {
    q: "Do you provide services for children?",
    a: "Yes. Promise Place provides services for children, including behavior management, behavior plans, and school-based services.",
  },
  {
    q: "Do you provide services for adults?",
    a: "Yes. We provide mental health and supportive services for adults as well as children and families.",
  },
  {
    q: "Do you offer telehealth?",
    a: "Yes. Telehealth therapy is available, which allows clients to receive support virtually.",
  },
  {
    q: "Do you accept Medicaid?",
    a: "Yes, we accept Medicaid. Coverage and eligibility may vary, so please contact us to discuss your individual situation.",
  },
  {
    q: "Do you accept commercial insurance?",
    a: "Yes, we accept commercial insurance. Coverage and eligibility may vary, so please contact us to discuss your individual situation.",
  },
  {
    q: "Do you offer sliding-scale services?",
    a: "Yes. Sliding-scale services are available to help cover costs and make care more accessible.",
  },
  {
    q: "Do you provide school-based services?",
    a: "Yes. We provide school-based mental health and behavioral support delivered within school environments, including support for students who may need additional help at school.",
  },
  {
    q: "What is the Alternative to Explosion Program?",
    a: "The Alternative to Explosion Program is a specialized program that Promise Place Community Center offers to schools. If you would like to know more about how the program works or bring it to your school, please contact us and our team can share more information.",
  },
  {
    q: "How do I get started?",
    a: "Reach out with your questions or your request for services using the contact form below or by email. Share a little about yourself or your family and the kind of support you're looking for, and our team can provide information about available services and help you understand the next steps.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section section--sky" id="faq">
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow eyebrow--grape">Common Questions</span>
          <h2>Questions? We have answers.</h2>
          <p>If you don&rsquo;t see your question here, just ask &mdash; we&rsquo;re glad to help.</p>
        </div>

        <div className="faq">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq__item ${isOpen ? "is-open" : ""}`} key={item.q}>
                <h3 style={{ margin: 0 }}>
                  <button
                    className="faq__q"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq__icon"><ChevronDown /></span>
                  </button>
                </h3>
                <div
                  className="faq__panel"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div><p>{item.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
