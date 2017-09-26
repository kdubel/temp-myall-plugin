import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { iconNode } from 'discourse-common/lib/icon-library';
import { wantsNewWindow } from 'discourse/lib/intercept-click';
import DiscourseURL from 'discourse/lib/url';

export default createWidget('home-logo', {
  tagName: 'div.title',

  settings: {
    href: "http://myallergy.themasters.io"
  },

  href() {
    const href = this.settings.href;
    return (typeof href === "function") ? href() : href;
  },

  logo() {
    const { siteSettings } = this;
    const mobileView = this.site.mobileView;

    const mobileLogoUrl = 'http://myallergy.com/assets/logo-0951d61fba9c9f9c27bacdbf5fd318efad20b2f6e05eae8aed3c02fc3cc1839f.png';
    const showMobileLogo = mobileView && (mobileLogoUrl.length > 0);

    const logoUrl = 'http://myallergy.com/assets/logo-0951d61fba9c9f9c27bacdbf5fd318efad20b2f6e05eae8aed3c02fc3cc1839f.png';
    const title = siteSettings.title;

    if (!mobileView && this.attrs.minimized) {
      const logoSmallUrl = siteSettings.logo_small_url || '';
      if (logoSmallUrl.length) {
        return h('img#site-logo.logo-small', { key: 'logo-small', attributes: { src: logoSmallUrl, width: 33, height: 33, alt: title } });
      } else {
        return iconNode('home');
      }
    } else if (showMobileLogo) {
      return h('img#site-logo.logo-big', { key: 'logo-mobile', attributes: { src: mobileLogoUrl, alt: title } });
    } else if (logoUrl.length) {
      return h('img#site-logo.logo-big', { key: 'logo-big', attributes: { src: logoUrl, alt: title } });
    } else {
      return h('h2#site-text-logo.text-logo', { key: 'logo-text' }, title);
    }
  },

  html() {
    return h('a', { attributes: { href: this.href(), 'data-auto-route': true } }, this.logo());
  },

  click(e) {
    if (wantsNewWindow(e)) { return false; }
    e.preventDefault();

    DiscourseURL.routeToTag($(e.target).closest('a')[0]);
    return false;
  }
});
