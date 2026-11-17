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
    },
    ja: {
      confirmTitle: 'メールアドレスの確認', confirmLead: 'あと一歩です。ボタンを押して、このアドレスを DawnRSS のアカウントとして確認してください。', confirmButton: 'メールアドレスを確認', confirmDone: 'メールアドレスを確認しました。DawnRSS に戻って、このアドレスでログインしてください。',
      resetTitle: '新しいパスワードを設定', resetLead: 'DawnRSS アカウントの新しいパスワードを入力してください。', password: '新しいパスワード', show: '表示', hide: '隠す', ruleLength: '8 文字以上', ruleMix: '英字と数字の両方を含む', resetButton: 'パスワードを保存', resetDone: 'パスワードを変更しました。DawnRSS に戻って、新しいパスワードでログインしてください。',
      working: '処理中…', missing: 'リンクが不完全です。メールからもう一度開くか、アプリで再申請してください。', expired: 'このリンクは期限切れか、すでに使用されています。アプリで再申請してください。', samePassword: '新しいパスワードは以前のものと違うものにしてください。', weakPassword: 'このパスワードは弱すぎます。別のものにしてください。', network: 'サーバーに接続できません。接続を確認して、もう一度お試しください。', failed: 'エラーが発生しました：', home: 'DawnRSS ホーム'
    },
    ko: {
      confirmTitle: '이메일 확인', confirmLead: '한 단계만 남았습니다. 버튼을 눌러 이 주소를 DawnRSS 계정으로 확인하세요.', confirmButton: '이메일 확인', confirmDone: '이메일이 확인되었습니다. DawnRSS로 돌아가 이 주소로 로그인하세요.',
      resetTitle: '새 비밀번호 설정', resetLead: 'DawnRSS 계정의 새 비밀번호를 입력하세요.', password: '새 비밀번호', show: '표시', hide: '숨기기', ruleLength: '8자 이상', ruleMix: '영문자와 숫자를 모두 포함', resetButton: '비밀번호 저장', resetDone: '비밀번호가 변경되었습니다. DawnRSS로 돌아가 새 비밀번호로 로그인하세요.',
      working: '처리 중…', missing: '링크가 불완전합니다. 메일에서 다시 열거나 앱에서 다시 요청하세요.', expired: '이 링크는 만료되었거나 이미 사용되었습니다. 앱에서 다시 요청하세요.', samePassword: '새 비밀번호는 이전 비밀번호와 달라야 합니다.', weakPassword: '비밀번호가 너무 약합니다. 다른 것을 고르세요.', network: '서버에 연결할 수 없습니다. 연결을 확인하고 다시 시도하세요.', failed: '문제가 발생했습니다: ', home: 'DawnRSS 홈'
    },
    es: {
      confirmTitle: 'Confirma tu correo', confirmLead: 'Falta un paso: pulsa el botón para confirmar esta dirección en tu cuenta de DawnRSS.', confirmButton: 'Confirmar correo', confirmDone: 'Tu correo está confirmado. Vuelve a DawnRSS e inicia sesión con él.',
      resetTitle: 'Elige una contraseña nueva', resetLead: 'Escribe una contraseña nueva para tu cuenta de DawnRSS.', password: 'Contraseña nueva', show: 'Mostrar', hide: 'Ocultar', ruleLength: 'Al menos 8 caracteres', ruleMix: 'Contiene letras y dígitos', resetButton: 'Guardar contraseña', resetDone: 'Tu contraseña ha cambiado. Vuelve a DawnRSS e inicia sesión con la nueva.',
      working: 'Un momento…', missing: 'Este enlace está incompleto. Ábrelo de nuevo desde el correo o pide otro en la app.', expired: 'Este enlace ha caducado o ya se ha usado. Pide otro en la app.', samePassword: 'La contraseña nueva debe ser distinta de la anterior.', weakPassword: 'Esta contraseña es demasiado débil. Elige otra.', network: 'No se pudo acceder al servidor. Comprueba tu conexión e inténtalo de nuevo.', failed: 'Algo salió mal: ', home: 'Inicio de DawnRSS'
    },
    fr: {
      confirmTitle: 'Confirmez votre e-mail', confirmLead: 'Plus qu’une étape : appuyez sur le bouton pour confirmer cette adresse pour votre compte DawnRSS.', confirmButton: 'Confirmer l’e-mail', confirmDone: 'Votre e-mail est confirmé. Revenez dans DawnRSS et connectez-vous avec.',
      resetTitle: 'Choisissez un nouveau mot de passe', resetLead: 'Saisissez un nouveau mot de passe pour votre compte DawnRSS.', password: 'Nouveau mot de passe', show: 'Afficher', hide: 'Masquer', ruleLength: 'Au moins 8 caractères', ruleMix: 'Contient des lettres et des chiffres', resetButton: 'Enregistrer', resetDone: 'Votre mot de passe a été modifié. Revenez dans DawnRSS et connectez-vous avec le nouveau.',
      working: 'Un instant…', missing: 'Ce lien est incomplet. Rouvrez-le depuis l’e-mail ou faites une nouvelle demande dans l’app.', expired: 'Ce lien a expiré ou a déjà servi. Faites une nouvelle demande dans l’app.', samePassword: 'Le nouveau mot de passe doit être différent de l’ancien.', weakPassword: 'Ce mot de passe est trop faible. Choisissez-en un autre.', network: 'Impossible de joindre le serveur. Vérifiez votre connexion et réessayez.', failed: 'Une erreur s’est produite : ', home: 'Accueil DawnRSS'
    },
    de: {
      confirmTitle: 'E-Mail bestätigen', confirmLead: 'Noch ein Schritt: Tippe auf die Schaltfläche, um diese Adresse für dein DawnRSS-Konto zu bestätigen.', confirmButton: 'E-Mail bestätigen', confirmDone: 'Deine E-Mail ist bestätigt. Kehre zu DawnRSS zurück und melde dich damit an.',
      resetTitle: 'Neues Passwort festlegen', resetLead: 'Gib ein neues Passwort für dein DawnRSS-Konto ein.', password: 'Neues Passwort', show: 'Anzeigen', hide: 'Verbergen', ruleLength: 'Mindestens 8 Zeichen', ruleMix: 'Enthält Buchstaben und Ziffern', resetButton: 'Passwort speichern', resetDone: 'Dein Passwort wurde geändert. Kehre zu DawnRSS zurück und melde dich mit dem neuen an.',
      working: 'Einen Moment …', missing: 'Dieser Link ist unvollständig. Öffne ihn erneut aus der E-Mail oder fordere in der App einen neuen an.', expired: 'Dieser Link ist abgelaufen oder wurde schon verwendet. Fordere in der App einen neuen an.', samePassword: 'Das neue Passwort muss sich vom alten unterscheiden.', weakPassword: 'Dieses Passwort ist zu schwach. Bitte wähle ein anderes.', network: 'Der Server ist nicht erreichbar. Prüfe deine Verbindung und versuche es erneut.', failed: 'Etwas ist schiefgegangen: ', home: 'DawnRSS-Startseite'
    },
    pt: {
      confirmTitle: 'Confirme seu e-mail', confirmLead: 'Falta um passo: toque no botão para confirmar este endereço na sua conta do DawnRSS.', confirmButton: 'Confirmar e-mail', confirmDone: 'Seu e-mail foi confirmado. Volte ao DawnRSS e entre com ele.',
      resetTitle: 'Escolha uma nova senha', resetLead: 'Digite uma nova senha para sua conta do DawnRSS.', password: 'Nova senha', show: 'Mostrar', hide: 'Ocultar', ruleLength: 'Pelo menos 8 caracteres', ruleMix: 'Contém letras e dígitos', resetButton: 'Salvar senha', resetDone: 'Sua senha foi alterada. Volte ao DawnRSS e entre com a nova.',
      working: 'Aguarde…', missing: 'Este link está incompleto. Abra-o de novo pelo e-mail ou peça outro no app.', expired: 'Este link expirou ou já foi usado. Peça outro no app.', samePassword: 'A nova senha precisa ser diferente da antiga.', weakPassword: 'Esta senha é fraca demais. Escolha outra.', network: 'Não foi possível acessar o servidor. Verifique sua conexão e tente de novo.', failed: 'Algo deu errado: ', home: 'Página do DawnRSS'
    },
    it: {
      confirmTitle: 'Conferma la tua email', confirmLead: 'Manca un passo: premi il pulsante per confermare questo indirizzo per il tuo account DawnRSS.', confirmButton: 'Conferma email', confirmDone: 'La tua email è confermata. Torna su DawnRSS e accedi con questo indirizzo.',
      resetTitle: 'Scegli una nuova password', resetLead: 'Inserisci una nuova password per il tuo account DawnRSS.', password: 'Nuova password', show: 'Mostra', hide: 'Nascondi', ruleLength: 'Almeno 8 caratteri', ruleMix: 'Contiene lettere e cifre', resetButton: 'Salva password', resetDone: 'La password è stata cambiata. Torna su DawnRSS e accedi con quella nuova.',
      working: 'Un momento…', missing: 'Il link è incompleto. Riaprilo dall’email o richiedine un altro nell’app.', expired: 'Il link è scaduto o è già stato usato. Richiedine un altro nell’app.', samePassword: 'La nuova password deve essere diversa da quella vecchia.', weakPassword: 'Questa password è troppo debole. Scegline un’altra.', network: 'Impossibile raggiungere il server. Controlla la connessione e riprova.', failed: 'Qualcosa è andato storto: ', home: 'Home di DawnRSS'
    },
    ru: {
      confirmTitle: 'Подтвердите почту', confirmLead: 'Остался один шаг: нажмите кнопку, чтобы подтвердить этот адрес для аккаунта DawnRSS.', confirmButton: 'Подтвердить почту', confirmDone: 'Почта подтверждена. Вернитесь в DawnRSS и войдите с этим адресом.',
      resetTitle: 'Новый пароль', resetLead: 'Введите новый пароль для аккаунта DawnRSS.', password: 'Новый пароль', show: 'Показать', hide: 'Скрыть', ruleLength: 'Не менее 8 символов', ruleMix: 'Есть и буквы, и цифры', resetButton: 'Сохранить пароль', resetDone: 'Пароль изменён. Вернитесь в DawnRSS и войдите с новым паролем.',
      working: 'Подождите…', missing: 'Ссылка неполная. Откройте её снова из письма или запросите новую в приложении.', expired: 'Срок действия ссылки истёк или она уже использована. Запросите новую в приложении.', samePassword: 'Новый пароль должен отличаться от старого.', weakPassword: 'Пароль слишком простой. Выберите другой.', network: 'Не удалось связаться с сервером. Проверьте подключение и повторите попытку.', failed: 'Что-то пошло не так: ', home: 'DawnRSS — главная'
    },
    vi: {
      confirmTitle: 'Xác nhận email', confirmLead: 'Chỉ còn một bước: bấm nút để xác nhận địa chỉ này cho tài khoản DawnRSS của bạn.', confirmButton: 'Xác nhận email', confirmDone: 'Email đã được xác nhận. Hãy quay lại DawnRSS và đăng nhập bằng địa chỉ này.',
      resetTitle: 'Đặt mật khẩu mới', resetLead: 'Nhập mật khẩu mới cho tài khoản DawnRSS của bạn.', password: 'Mật khẩu mới', show: 'Hiện', hide: 'Ẩn', ruleLength: 'Ít nhất 8 ký tự', ruleMix: 'Có cả chữ cái và chữ số', resetButton: 'Lưu mật khẩu', resetDone: 'Mật khẩu đã được đổi. Hãy quay lại DawnRSS và đăng nhập bằng mật khẩu mới.',
      working: 'Đang xử lý…', missing: 'Liên kết không đầy đủ. Hãy mở lại từ email hoặc yêu cầu lại trong ứng dụng.', expired: 'Liên kết đã hết hạn hoặc đã được dùng. Hãy yêu cầu lại trong ứng dụng.', samePassword: 'Mật khẩu mới phải khác mật khẩu cũ.', weakPassword: 'Mật khẩu quá yếu. Hãy chọn mật khẩu khác.', network: 'Không kết nối được tới máy chủ. Hãy kiểm tra kết nối và thử lại.', failed: 'Đã xảy ra lỗi: ', home: 'Trang chủ DawnRSS'
    },
    id: {
      confirmTitle: 'Konfirmasi email Anda', confirmLead: 'Tinggal satu langkah: tekan tombol untuk mengonfirmasi alamat ini bagi akun DawnRSS Anda.', confirmButton: 'Konfirmasi email', confirmDone: 'Email Anda sudah dikonfirmasi. Kembali ke DawnRSS dan masuk dengan alamat ini.',
      resetTitle: 'Buat kata sandi baru', resetLead: 'Masukkan kata sandi baru untuk akun DawnRSS Anda.', password: 'Kata sandi baru', show: 'Tampilkan', hide: 'Sembunyikan', ruleLength: 'Minimal 8 karakter', ruleMix: 'Berisi huruf dan angka', resetButton: 'Simpan kata sandi', resetDone: 'Kata sandi Anda sudah diubah. Kembali ke DawnRSS dan masuk dengan kata sandi baru.',
      working: 'Mohon tunggu…', missing: 'Tautan ini tidak lengkap. Buka lagi dari email atau minta ulang di aplikasi.', expired: 'Tautan ini sudah kedaluwarsa atau sudah dipakai. Minta ulang di aplikasi.', samePassword: 'Kata sandi baru harus berbeda dari yang lama.', weakPassword: 'Kata sandi ini terlalu lemah. Pilih yang lain.', network: 'Server tidak dapat dijangkau. Periksa koneksi Anda lalu coba lagi.', failed: 'Terjadi kesalahan: ', home: 'Beranda DawnRSS'
    }
  };

  var HOME = { en: '../index.html', 'zh-Hans': '../zh.html', 'zh-Hant': '../zh-Hant.html' };
  ['ja', 'ko', 'es', 'fr', 'de', 'pt', 'it', 'ru', 'vi', 'id'].forEach(function (l) {
    HOME[l] = '../' + l + '.html';
  });

  function pickLang() {
    var stored = null;
    try { stored = localStorage.getItem('lang'); } catch (e) {}
    if (stored && T[stored]) return stored;
    var l = (navigator.language || '').toLowerCase();
    if (l.indexOf('zh') === 0) return /hant|tw|hk|mo/.test(l) ? 'zh-Hant' : 'zh-Hans';
    return T[l.slice(0, 2)] ? l.slice(0, 2) : 'en';
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
