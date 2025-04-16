import { useState } from "react";
import { FileUpload } from "./components/file-upload";
import { Faq } from "./components/faq";
import { Header } from "./components/header";
import { Tab } from "./components/tab";
import "./App.css";

function App() {
  const [tabData, setTabData] = useState([]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <section className="section">
          <h2 className="section-title">Upload Your File</h2>
          <div className="section-content">
            <FileUpload setTabData={setTabData} />
            <Tab tabJson={tabData} />
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            <Faq />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-content">
          © {new Date().getFullYear()} BassTab. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
