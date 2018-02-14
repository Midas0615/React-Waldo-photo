import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import pt from 'react-intl/locale-data/pt';

import enTranslations from 'translations/en.json';
import ptTranslations from 'translations/pt.json';

addLocaleData([...en, ...pt]);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
/* istanbul ignore next */
const language =
  (navigator.languages && navigator.languages[0]) ||
  /* istanbul ignore next */
  navigator.language ||
  navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Build the object containing all of the translations
const translations = {
  en: enTranslations,
  pt: ptTranslations,
};

// Try full locale, try locale without region code, fallback to 'en'
const defaultMessages =
  translations[language] ||
  translations[languageWithoutRegionCode] ||
  /* istanbul ignore next */
  translations.en;

const I18n = ({ locale, messages, children }) => (
  <IntlProvider locale={locale} messages={messages || translations[locale] || defaultMessages}>
    {children}
  </IntlProvider>
);

I18n.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.element.isRequired,
};

I18n.defaultProps = {
  locale: language,
  messages: null,
};

export default I18n;
