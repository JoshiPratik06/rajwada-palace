import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const { name, avatar, location, room, rating, text, date, verified } = review;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 card-shadow flex flex-col gap-4 h-full"
    >
      {/* Stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-xl ${i < rating ? 'text-[#c5a059]' : 'text-gray-200'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-400">{rating}.0</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* Room tag */}
      <div className="flex items-center gap-2">
        <span className="text-xs bg-[#fdfaf1] text-[#c5a059] border border-[#c5a059]/30 px-3 py-1 rounded-full font-medium">
          {room}
        </span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
        <div className="w-10 h-10 rounded-full bg-[#0f1f3d] text-white flex items-center justify-center font-bold text-sm shrink-0">
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-[#0f1f3d] text-sm truncate">{name}</span>
            {verified && (
              <BadgeCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
            )}
          </div>
          <span className="text-xs text-gray-400">{location}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
