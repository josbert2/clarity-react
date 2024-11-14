"use client"

import { motion } from "motion/react"

const Feature = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.h3
        className="text-xl font-semibold mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>

      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/50 pointer-events-none"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

const BecomeSponsor = () => {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent/10 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div className="flex flex-col items-center gap-4">
        <motion.h3
          className="text-xl font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Become a Sponsor
        </motion.h3>

        <motion.p
          className="text-muted-foreground text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          If you find AnnUI helpful, please consider sponsoring us to support
          our development
        </motion.p>

        <motion.a
          href="https://discord.gg/EnzWx4Ck"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sponsor on Discord
        </motion.a>
      </motion.div>

      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/50 pointer-events-none"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export { Feature, BecomeSponsor }
