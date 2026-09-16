import Contact from './Contact'
import Hero from './Hero'
import Projects from './Projects'
import TechStack from './TechStack'

/** HTML sections rendered inside Drei `<Scroll html>`. */
export default function PageContent() {
  return (
    <div className="w-screen text-ink">
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
    </div>
  )
}
