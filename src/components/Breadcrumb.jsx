import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumb Component
 *
 * @param {Array} items - Array of { label: string, href?: string }
 *   - If `href` is omitted or it's the last item, it renders as plain text.
 *
 * Usage:
 * <Breadcrumb items={[
 *   { label: 'Rooms', href: '/rooms' },
 *   { label: 'Presidential Suite' }
 * ]} />
 * Renders: Home > Rooms > Presidential Suite
 */
const Breadcrumb = ({ items = [] }) => {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-1 text-sm" role="list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {/* Separator (not for first item) */}
              {!isFirst && (
                <ChevronRight
                  size={14}
                  className="text-[#c5a059]/60 flex-shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}

              {/* Link or plain text */}
              {!isLast && item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 text-[#0f1f3d] hover:text-[#c5a059] transition-colors duration-200 font-medium"
                  aria-label={isFirst ? 'Go to Home' : `Go to ${item.label}`}
                >
                  {isFirst && (
                    <Home size={13} strokeWidth={2} className="flex-shrink-0" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              ) : (
                <span
                  className="text-[#c5a059] font-semibold"
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
