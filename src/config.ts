import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

import settings from "./config/settings.json";

export const siteConfig: SiteConfig = settings.site;
export const profileConfig: ProfileConfig = settings.profile;
export const licenseConfig: LicenseConfig = settings.license;
export const expressiveCodeConfig: ExpressiveCodeConfig = settings.expressiveCode;

export const navBarConfig: NavBarConfig = {
  links: settings.navBar.links.map(link => {
    if (link.name === 'Home') return LinkPreset.Home;
    if (link.name === 'Archive') return LinkPreset.Archive;
    if (link.name === 'About') return LinkPreset.About;
    
    return {
      name: link.name,
      url: link.url,
      external: link.external,
    };
  }),
};
