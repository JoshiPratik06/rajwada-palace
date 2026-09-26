import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle, center = true, light = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${center ? 'text-center' : 'text-left'}`}
    >
      <h2
        className={`section-title ${light ? 'text-white' : 'text-[#0f1f3d]'}`}
        style={{ fontFamily: 'Cinzel, serif' }}
      >
        {title}
      </h2>

      {center ? (
        <div className="gold-line mx-auto mb-4" />
      ) : (
        <div className="gold-line-left mb-4" />
      )}

      {subtitle && (
        <p className={`mt-2 text-base md:text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/75' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
