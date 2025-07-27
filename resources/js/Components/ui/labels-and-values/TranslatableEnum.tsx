"use client";

import { useTranslation } from "react-i18next";

const TranslatableEnum = ({ value }: { value: string | undefined }) => {
    const { t } = useTranslation();
    if (!value) {
        return t("components.no_data");
    }
    return <>{t(`enums_types.${value}` as any)}</>;
};

export default TranslatableEnum;
