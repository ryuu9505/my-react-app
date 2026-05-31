export function transformCompanyLogos(careers) {
  if (!Array.isArray(careers)) return [];

  return careers
    .slice(0, 3)
    .map((career) => {
      const company = career.company;
      if (company?.wideLogo?.url) {
        return {
          url: company.wideLogo.url,
          altText: company.wideLogo.altText,
          isWide: true,
        };
      }
      if (company?.logo?.url) {
        return {
          url: company.logo.url,
          altText: company.logo.altText,
          isWide: false,
        };
      }
      return null;
    })
    .filter(Boolean);
}
