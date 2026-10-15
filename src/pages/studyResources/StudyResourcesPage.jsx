import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
        <ul className="resources-totals" aria-label="Totals across the four exams" style={{ color: theme.text }}>
          <li>{totalTests} practice tests</li>
          <li>{totalQuestions.toLocaleString("en-US")} questions</li>
          <li>{totalGuidePages} guide pages</li>
        </ul>
      </section>
      <section className="resources-section" aria-labelledby="resources-exams-title">
        <h2 id="resources-exams-title" style={{ color: theme.text }}>The four exams</h2>
        <p className="resources-section-intro">{page.examsIntroduction}</p>
        <div className="resources-grid">
          {page.exams.map((exam, index) => <motion.article {...revealMotion(index)} key={exam.code} aria-labelledby={`resources-exam-${exam.code}`} className="resources-card" style={{ background: theme.cardBackgroundAlt, borderColor: theme.borderSoft }}>
            <p className="resources-code" style={{ color: theme.secondaryText }}>{exam.code}</p>
            <h3 id={`resources-exam-${exam.code}`} style={{ color: theme.text }}>{exam.name}</h3>
            <p>{exam.audience}</p>
            <p>{exam.summary}</p>
            <ul className="resources-facts" style={{ color: theme.text }}>
              <li>{page.testsPerExam} practice tests of {exam.questionsPerTest} questions ({page.testsPerExam * exam.questionsPerTest} in total)</li>
              <li>{exam.guidePages}-page study guide</li>
            </ul>
            <ul className="resources-links">
              <li><a href={exam.udemyUrl} target="_blank" rel="noopener noreferrer" aria-label={`Practice tests on Udemy for ${exam.code}`}>Practice tests on Udemy</a></li>
              <li><a href={exam.topmateUrl} target="_blank" rel="noopener noreferrer" aria-label={`Guide and PDFs bundle on Topmate for ${exam.code}`}>Guide and PDFs bundle on Topmate</a></li>
            </ul>
          </motion.article>)}
        </div>
      </section>
      <section className="resources-section" aria-labelledby="resources-process-title">
        <h2 id="resources-process-title" style={{ color: theme.text }}>{page.processTitle}</h2>
        <ul className="resources-process" style={{ color: theme.text }}>
          {page.process.map(step => <li key={step}>{step}</li>)}
        </ul>
      </section>
      <section className="resources-section" aria-labelledby="resources-notice-title">
        <h2 id="resources-notice-title" style={{ color: theme.text }}>{page.noticeTitle}</h2>
        <p className="resources-section-intro">{page.notice}</p>
        <div className="resources-actions">
          <Link to="/education">See the credentials</Link>
          <a href={page.topmateProfileUrl} target="_blank" rel="noopener noreferrer">All offerings on Topmate</a>
          <Link to="/contact">Contact me</Link>
        </div>
      </section>
    </main>
    <Footer theme={theme} />
  </div>;
}
