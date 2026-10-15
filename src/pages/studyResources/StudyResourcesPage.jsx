import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiBookOpen, FiMonitor } from "react-icons/fi";
import { revealMotion } from "../../themeMotion";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { studyResourcesPageData as page } from "../../portfolio";
import "./StudyResourcesPage.css";

const totalTests = page.exams.length * page.testsPerExam;
const totalQuestions = page.exams.reduce((sum, exam) => sum + exam.questionsPerTest * page.testsPerExam, 0);
const totalGuidePages = page.exams.reduce((sum, exam) => sum + exam.guidePages, 0);

export default function StudyResourcesPage({ theme }) {
  return <div className="resources-main">
    <Header />
    <main id="main-content" style={{ color: theme.secondaryText }}>
      <section className="resources-hero" aria-labelledby="resources-title" style={{ background: theme.heroGradient, borderColor: theme.borderSoft }}>
        <motion.p {...revealMotion(0, true)} className="resources-eyebrow" style={{ color: theme.secondaryText }}>{page.eyebrow}</motion.p>
        <h1 id="resources-title" style={{ color: theme.text }}>{page.title}</h1>
        <motion.p {...revealMotion(1, true)} className="resources-intro">{page.introduction}</motion.p>
        <div className="resources-hero-actions">
          <a className="resources-button resources-button-primary" href="#exam-options">Choose your exam</a>
          <a className="resources-button" href="#study-formats">Compare formats</a>
        </div>
        <ul className="resources-totals" aria-label="Totals across the four exams" style={{ color: theme.text }}>
          <li>{totalTests} practice tests</li>
          <li>{totalQuestions.toLocaleString("en-US")} questions</li>
          <li>{totalGuidePages} guide pages</li>
        </ul>
      </section>
      <section className="resources-section" id="study-formats" aria-labelledby="resources-formats-title">
        <p className="resources-eyebrow">Two ways to study</p>
        <h2 id="resources-formats-title" style={{ color: theme.text }}>Choose your format</h2>
        <div className="resources-grid resources-formats">
          {page.formats.map((format, index) => <motion.div {...revealMotion(index)} key={format.platform} className="resources-format">
            <span className="resources-format-icon" aria-hidden="true">{format.platform === "Udemy" ? <FiMonitor /> : <FiBookOpen />}</span>
            <h3>{format.title}</h3>
            <p>{format.description}</p>
            <ul>{format.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          </motion.div>)}
        </div>
        <p className="resources-format-note">{page.formatsNote}</p>
      </section>
      <section className="resources-section" id="exam-options" aria-labelledby="resources-exams-title">
        <p className="resources-eyebrow">Four certifications</p>
        <h2 id="resources-exams-title" style={{ color: theme.text }}>Choose your exam</h2>
        <p className="resources-section-intro">{page.examsIntroduction}</p>
        <div className="resources-grid">
          {page.exams.map((exam, index) => <motion.article {...revealMotion(index)} key={exam.code} aria-labelledby={`resources-exam-${exam.code}`} className="resources-card" style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
            <p className="resources-code">{exam.code}</p>
            <h3 id={`resources-exam-${exam.code}`} style={{ color: theme.text }}>{exam.name}</h3>
            <p className="resources-audience">{exam.audience}</p>
            <p className="resources-summary">{exam.summary}</p>
            <dl className="resources-facts">
              <div><dt>Practice tests</dt><dd>{page.testsPerExam}</dd></div>
              <div><dt>Questions per test</dt><dd>{exam.questionsPerTest}</dd></div>
              <div><dt>Total questions</dt><dd>{page.testsPerExam * exam.questionsPerTest}</dd></div>
              <div><dt>Study guide</dt><dd>{exam.guidePages} pages</dd></div>
            </dl>
            <ul className="resources-links">
              <li><a className="resources-button" href={exam.udemyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Practice tests on Udemy for ${exam.code}`}>Practice tests on Udemy<FiArrowUpRight aria-hidden="true" /></a></li>
              <li><a className="resources-button" href={exam.topmateUrl} target="_blank" rel="noopener noreferrer" aria-label={`Guide + PDFs on Topmate for ${exam.code}`}>Guide + PDFs on Topmate<FiArrowUpRight aria-hidden="true" /></a></li>
            </ul>
          </motion.article>)}
        </div>
      </section>
      <section className="resources-section" aria-labelledby="resources-author-title">
        <div className="resources-author">
          <div>
            <p className="resources-eyebrow">About the author</p>
            <h2 id="resources-author-title">Created by Ahmad Mujtaba</h2>
            <p>{page.authorIntroduction}</p>
          </div>
          <Link className="resources-button" to="/education">See the credentials</Link>
        </div>
      </section>
      <section className="resources-section" aria-labelledby="resources-notice-title">
        <h2 id="resources-notice-title" style={{ color: theme.text }}>{page.noticeTitle}</h2>
        <div className="resources-notice">{page.notice.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
        <div className="resources-actions">
          <a href={page.topmateProfileUrl} target="_blank" rel="noopener noreferrer">View my Topmate page</a>
          <Link to="/contact">Contact me</Link>
        </div>
      </section>
    </main>
    <Footer theme={theme} />
  </div>;
}
