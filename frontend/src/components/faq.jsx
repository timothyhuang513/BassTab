// "use client"

import { useState } from "react"
import styles from "./faq.module.css"

const faqData = [
  {
    question: "What does BassTab do?",
    answer:
      "BassTab is an AI-powered tool that isolates the bassline from a song and generates bass tablature (tabs) from it.",
  },
  {
    question: "What audio formats can I upload?",
    answer:
      "Currently, BassTab supports MP3 files. Support for more formats like WAV and FLAC may be added in the future.",
  },
  {
    question: "Do I need to know music theory to use BassTab?",
    answer:
      "Not at all! BassTab is designed to be beginner-friendly. Just upload a song and we’ll handle the bass isolation and tab generation for you.",
  },
  {
    question: "Can I download the tabs?",
    answer:
      "Not yet, but downloadable tab files are coming soon. For now, you can view generated tabs directly in the app.",
  },
  {
    question: "Is my uploaded audio stored?",
    answer:
      "No. BassTab processes your file temporarily to generate the bassline and tabs. Once the result is returned, the file is discarded.",
  },
  {
    question: "Does it work with any song?",
    answer:
      "BassTab works best with clear recordings where the bass is not heavily distorted or buried in the mix. Results may vary depending on the quality of the input.",
  },
];


export function Faq() {
  const [openItem, setOpenItem] = useState(null)

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index)
  }

  return (
    <div className={styles.accordion}>
      {faqData.map((item, index) => (
        <div key={index} className={styles.accordionItem}>
          <button className={styles.question} onClick={() => toggleItem(index)} aria-expanded={openItem === index}>
            {item.question}
            <span className={`${styles.icon} ${openItem === index ? styles.iconOpen : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
          <div className={`${styles.answer} ${openItem === index ? styles.answerOpen : ""}`}>
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
