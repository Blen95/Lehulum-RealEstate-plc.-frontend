import { useTranslation } from 'react-i18next';
import { Menu, UnstyledButton } from '@mantine/core';
import { MdLanguage } from 'react-icons/md';

type SupportedLanguages = 'en' | 'am';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

 const changeLanguage = async (language: SupportedLanguages) => {
    await i18n.changeLanguage(language); // Wait for the change to complete
  };


  return (
    <Menu shadow="md" width={150}>
      <Menu.Target>
        <UnstyledButton>
          <MdLanguage size={20} />
          <span>{t('language.' + i18n.language)}</span>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => changeLanguage('en')}>
          {t('language.en')} (EN)
        </Menu.Item>
        <Menu.Item onClick={() => changeLanguage('am')}>
          {t('language.am')} (AM)
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default LanguageSwitcher;