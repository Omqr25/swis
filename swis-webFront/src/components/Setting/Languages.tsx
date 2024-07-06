import { Checkbox, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import '../../i18n';
import useLanguage from "../../stores/LanguageStore";
export const Languages = () => {
  const { i18n } = useTranslation();
  const setLng = useLanguage((s) => s.setLng);
  const Lng = useLanguage((s) => s.lng); 
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
    setLng(lng);
    localStorage.setItem("lng" , lng);
  };
  return (
    <HStack p={2}>
      <Checkbox
        isChecked={Lng == 'ar' ? true:false}
        onChange={() => {
          changeLanguage("ar");
        }}
      >
        {"عربي"}
      </Checkbox>
      <Checkbox
        isChecked={Lng == 'en' ? true:false}
        onChange={() => {
          changeLanguage("en");
        }}
      >
        {"English"}
      </Checkbox>
    </HStack>
  );
};
