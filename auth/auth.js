// Landing pages for the links in DawnRSS's account emails.
//
// The emails link here with a one-time `token_hash` (see
// docs/email-templates/). Nothing is spent on page load: the token is only
// sent to Supabase when the reader presses the button, so mail scanners that
// open links in advance cannot use it up. Talks to Supabase Auth's REST API
// directly; the publishable key in config.js is public by design.

(function () {
  'use strict';

  var T = {
    en: {
      confirmTitle: 'Confirm your email',
      confirmLead: 'One step left: press the button to confirm this address for your DawnRSS account.',
      confirmButton: 'Confirm email',
      confirmDone: 'Your email is confirmed. Go back to DawnRSS and sign in with it.',
      resetTitle: 'Choose a new password',
      resetLead: 'Enter a new password for your DawnRSS account.',
      password: 'New password',
      show: 'Show',
      hide: 'Hide',
      ruleLength: 'At least 8 characters',
      ruleMix: 'Contains both letters and digits',
      resetButton: 'Save password',
      resetDone: 'Your password has been changed. Go back to DawnRSS and sign in with the new one.',
      working: 'Working…',
      missing: 'This link is incomplete. Open it again from the email, or request a new one in the app.',
      expired: 'This link has expired or has already been used. Request a new one in the app.',
      samePassword: 'The new password must be different from the old one.',
      weakPassword: 'This password is too weak. Please choose another.',
      network: 'Could not reach the server. Check your connection and try again.',
      failed: 'Something went wrong: ',
      home: 'DawnRSS home'
    },
    'zh-Hans': {
      confirmTitle: '确认邮箱',
      confirmLead: '还差一步：点下面的按钮，确认这是你的朝闻道RSS 账号邮箱。',
      confirmButton: '确认邮箱',
      confirmDone: '邮箱已确认。回到朝闻道RSS，用这个邮箱登录即可。',
      resetTitle: '设置新密码',
      resetLead: '为你的朝闻道RSS 账号输入一个新密码。',
      password: '新密码',
      show: '显示',
      hide: '隐藏',
      ruleLength: '至少 8 位',
      ruleMix: '同时包含英文字母和数字',
      resetButton: '保存密码',
      resetDone: '密码已修改。回到朝闻道RSS，用新密码登录即可。',
      working: '请稍候…',
      missing: '链接不完整。请从邮件里重新打开，或在应用里重新申请。',
      expired: '链接已过期或已经用过。请在应用里重新申请。',
      samePassword: '新密码不能与原密码相同。',
      weakPassword: '这个密码太弱，请换一个。',
      network: '连不上服务器，请检查网络后重试。',
      failed: '出错了：',
      home: '朝闻道RSS 首页'
    },
    'zh-Hant': {
      confirmTitle: '確認電子郵件',
      confirmLead: '還差一步：點下面的按鈕，確認這是你的朝聞道RSS 帳號信箱。',
      confirmButton: '確認電子郵件',
      confirmDone: '信箱已確認。回到朝聞道RSS，用這個信箱登入即可。',
      resetTitle: '設定新密碼',
      resetLead: '為你的朝聞道RSS 帳號輸入一個新密碼。',
      password: '新密碼',
      show: '顯示',
      hide: '隱藏',
      ruleLength: '至少 8 位',
      ruleMix: '同時包含英文字母和數字',
      resetButton: '儲存密碼',
      resetDone: '密碼已修改。回到朝聞道RSS，用新密碼登入即可。',
      working: '請稍候…',
      missing: '連結不完整。請從郵件裡重新開啟，或在應用程式裡重新申請。',
      expired: '連結已過期或已經用過。請在應用程式裡重新申請。',
      samePassword: '新密碼不能與原密碼相同。',
      weakPassword: '這個密碼太弱，請換一個。',
      network: '連不上伺服器，請檢查網路後重試。',
      failed: '出錯了：',
      home: '朝聞道RSS 首頁'
    }
  };

  var HOME = { en: '../index.html', 'zh-Hans': '../zh.html', 'zh-Hant': '../zh-Hant.html' };

  function pickLang() {
    var stored = null;
    try { stored = localStorage.getItem('lang'); } catch (e) {}
    if (stored && T[stored]) return stored;
    var l = (navigator.language || '').toLowerCase();
    if (l.indexOf('zh') !== 0) return 'en';
    return /hant|tw|hk|mo/.test(l) ? 'zh-Hant' : 'zh-Hans';
  }

  var lang = pickLang();
  var t = T[lang];
  var cfg = window.DAWNRSS_AUTH || {};
  var params = new URLSearchParams(location.search);
  var tokenHash = params.get('token_hash');
  var type = params.get('type');

  document.documentElement.lang = lang;
  document.querySelectorAll('[data-t]').forEach(function (el) {
    el.textContent = t[el.getAttribute('data-t')];
  });
  document.querySelectorAll('[data-home]').forEach(function (el) {
    el.href = HOME[lang];
  });

  var status = document.getElementById('status');
  function say(text, done) {
    status.textContent = text;
    status.className = done ? 'status done' : 'status';
  }

  function explain(err) {
    if (err === 'network') return t.network;
    var code = (err && (err.error_code || err.code)) || '';
    if (/otp_expired|expired|invalid|not_found|403/.test(String(code))) return t.expired;
    if (code === 'same_password') return t.samePassword;
    if (code === 'weak_password') return t.weakPassword;
    return t.failed + ((err && (err.msg || err.message || err.error_description)) || code || '?');
  }

  function call(method, path, body, token) {
    var headers = { 'Content-Type': 'application/json', apikey: cfg.key };
    if (token) headers.Authorization = 'Bearer ' + token;
    return fetch(cfg.url + '/auth/v1/' + path, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    }).then(
      function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok) throw data;
          return data;
        });
      },
      function () { throw 'network'; }
    );
  }

  // Spends the token; resolves to a session for that user.
  function verify(expected) {
    return call('POST', 'verify', { type: expected, token_hash: tokenHash });
  }

  var form = document.querySelector('form');
  var button = form.querySelector('button[type=submit]');
  var page = document.body.getAttribute('data-page');
  var expected = page === 'reset' ? 'recovery' : 'email';

  if (!tokenHash || !cfg.url || (type && type !== expected && !(page === 'confirm' && type === 'signup'))) {
    say(t.missing);
    form.hidden = true;
    return;
  }

  function finish(text) {
    // The token is spent; keep it out of the address bar and history.
    history.replaceState(null, '', location.pathname);
    form.hidden = true;
    say(text, true);
  }

  function busy(on) {
    button.disabled = on;
    if (on) say(t.working);
  }

  if (page === 'confirm') {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      busy(true);
      verify('email').then(
        function () { finish(t.confirmDone); },
        function (err) { busy(false); say(explain(err)); }
      );
    });
    return;
  }

  // page === 'reset'
  var input = document.getElementById('password');
  var toggle = document.getElementById('toggle');
  var rules = {
    length: document.getElementById('rule-length'),
    mix: document.getElementById('rule-mix')
  };
  var session = null; // kept if the token was spent but saving failed

  function check() {
    var v = input.value;
    var length = v.length >= 8;
    var mix = /[A-Za-z]/.test(v) && /[0-9]/.test(v);
    rules.length.classList.toggle('met', length);
    rules.mix.classList.toggle('met', mix);
    button.disabled = !(length && mix);
  }
  input.addEventListener('input', check);
  check();

  toggle.addEventListener('click', function () {
    var shown = input.type === 'text';
    input.type = shown ? 'password' : 'text';
    toggle.textContent = shown ? t.show : t.hide;
    toggle.setAttribute('aria-pressed', String(!shown));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    busy(true);
    var start = session ? Promise.resolve(session) : verify('recovery');
    start
      .then(function (s) {
        session = s;
        return call('PUT', 'user', { password: input.value }, s.access_token);
      })
      .then(
        function () { finish(t.resetDone); },
        function (err) { button.disabled = false; check(); say(explain(err)); }
      );
  });
})();
