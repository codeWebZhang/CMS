import * as React from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import store from "store";

import en_US from "./translations/en.json";
import zh_CN from "./translations/zh.json";

export interface IntlProps {
  locale;
  translations;
}

const locale = store.get("locale") ? store.get("locale") : "en";
console.log(navigator, "0-0--0-");

class Intl extends React.Component<IntlProps, any> {
  chooseLocale = () => {
    let _val = navigator.language.split("_")[0];
    switch (_val) {
      case "en":
        return en_US;
      case "zh":
        return zh_CN;
      default:
        return en_US;
    }
  };
  public render() {
    // let { locale, translations } = this.props;
    return (
      <IntlProvider
        locale={navigator.language}
        key={locale}
        messages={this.chooseLocale()}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

const mapState2Props = state => {
  return {
    // locale: state.intl.locale,
    // translations: state.intl.translations
  };
};

export default connect(mapState2Props)(Intl);
