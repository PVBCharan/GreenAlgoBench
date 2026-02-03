// About.jsx
// About page with project information and proper spacing
import { motion } from 'framer-motion'
import { Leaf, Target, Users, Code, Heart } from 'lucide-react'
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection'
import Card from '@/components/ui/Card'

const values = [
  {
    icon: Leaf,
    title: 'Sustainability First',
    description: 'Every optimization decision is guided by environmental impact.',
  },
  {
    icon: Target,
    title: 'Accuracy',
    description: 'Precise measurements using industry-standard profiling tools.',
  },
  {
    icon: Code,
    title: 'Developer-Friendly',
    description: 'Easy to understand metrics that help you make better decisions.',
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description: 'Open source and built for developers by developers.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-hero py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
          >
            <Leaf className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About GreenAlgoBench
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Making software development sustainable, one algorithm at a time.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Mission */}
        <AnimatedSection className="mb-20">
          <Card className="text-center p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              GreenAlgoBench helps developers understand and reduce the environmental impact
              of their code. By measuring energy consumption and carbon emissions of different
              algorithms, we empower you to make informed decisions that benefit both
              performance and the planet.
            </p>
          </Card>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Values</h2>
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title}>
                <Card hover glow className="h-full">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                      <p className="text-slate-600 leading-relaxed">{description}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </AnimatedSection>

        {/* Team Note */}
        <AnimatedSection>
          <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-12">
            <Heart className="w-14 h-14 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Built with Care</h3>
            <p className="text-slate-600 max-w-xl mx-auto leading-relaxed text-lg">
              GreenAlgoBench is a hackathon project focused on promoting sustainable software development
              and helping developers make environmentally conscious decisions.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}