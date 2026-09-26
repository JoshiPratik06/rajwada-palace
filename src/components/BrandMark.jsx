export default function BrandMark({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <circle cx="24" cy="24" r="21.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13 18.5 18 23l6-8 6 8 5-4.5-2 12.5H15l-2-12.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M17 34h14" stroke="currentColor" strokeWidth="1.4" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="Georgia, serif"
        fontSize="11"
        fontWeight="700"
      >
        J
      </text>
    </svg>
  );
}
