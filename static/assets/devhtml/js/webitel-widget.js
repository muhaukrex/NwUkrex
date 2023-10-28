const script = document.createElement('script');
script.src = 'https://cloud.eu-central-1.webitel.com/omni-widget/WtOmniWidget.umd.js';
script.onload = function() {
    const body = document.querySelector('body');
    const widgetEl = document.createElement('div');
    widgetEl.setAttribute('id', 'wt-omnichannel-widget');
    body.appendChild(widgetEl);

    const config = {
        "view": {
            "borderRadiusStyle": "rounded",
            "lang": "ua",
            "btnOpacity": "1",
            "logoUrl": "https://www.eximb.com/assets/images/logos/25x25-logo-exim.svg",
            "accentColor": "hsl(207, 92%, 26%)"
        },
        "chat": {
            "url": "wss://cloud.eu-central-1.webitel.com/chat/fsmatcwkiitqveyntdxlpjcrxndyqef"
        },
        "alternativeChannels": {
            "viber": "viber://pa?chatURI=jscukreximbank",
            "telegram": "https://t.me/JSC_Ukreximbank_bot"
        }
    };

    const app = new WtOmniWidget('#wt-omnichannel-widget', config);
};
document.head.appendChild(script);

const link = document.createElement('link');
link.href = 'https://cloud.eu-central-1.webitel.com/omni-widget/WtOmniWidget.css';
link.type = 'text/css';
link.rel = 'stylesheet';
link.media = 'screen,print';
document.head.appendChild(link);