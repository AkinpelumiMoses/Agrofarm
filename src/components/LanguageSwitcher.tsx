import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang); // persist selected language
  };

  return (
    <div className="relative inline-block">
      <select
        onChange={handleChange}
        value={i18n.language}
        className="appearance-none pl-3 pr-8 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="yo">Yorùbá</option>
        <option value="ha">Hausa</option>
      </select>

      {/* Dropdown Arrow Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400">
        <svg
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 12l-4-4h8l-4 4z" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
